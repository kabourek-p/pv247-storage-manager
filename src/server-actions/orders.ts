'use server';

import { revalidatePath } from 'next/cache';

import type { OrderFormSchema } from '@/components/form/orders/order-form';
import {
	createOrder,
	editOrder,
	getOrder,
	getOrderCounts,
	getOrders
} from '@/server/orders';
import {
	createStockDispatches,
	type StockDispatch
} from '@/server/stock-dispatch';
import { createInvoice } from '@/server/invoice';
import { getRestockData } from '@/server/restocks';

export const createOrderServerAction = async (order: OrderFormSchema) => {
	try {
		await createOrder(order);
	} catch (e) {
		if (typeof e === 'string') {
			return {
				error: true,
				message: e.toUpperCase()
			};
		} else if (e instanceof Error) {
			return {
				error: true,
				message: e.message
			};
		}
	}

	revalidatePath('/orders');

	return { error: false, message: 'Order successfully created!' };
};

export const editOrderServerAction = async (order: OrderFormSchema) => {
	try {
		await editOrder(order.id ?? -1, order);
	} catch (e) {
		if (typeof e === 'string') {
			return {
				error: true,
				message: e.toUpperCase()
			};
		} else if (e instanceof Error) {
			return {
				error: true,
				message: e.message
			};
		}
	}

	revalidatePath('/orders');
	revalidatePath(`/order/${order.id}`);
	revalidatePath(`/order/${order.id}/edit`);

	return {
		error: false,
		message: 'Order successfully updated!'
	};
};

export const getOrderRows = async (
	authorId: string | null
): Promise<OrderRow[]> => {
	const orders = await getOrders(authorId);
	return orders.map(o => {
		const numberOfElements = o.orderElements.length;
		const totalPrice = o.orderElements
			.map(e => +e.unitPrice * +e.numberOfUnits)
			.reduce((sum, current) => sum + current, 0);
		return {
			id: o.id,
			note: o.note,
			date: new Intl.DateTimeFormat('cs-CZ', {
				day: '2-digit',
				//month: 'long',
				month: '2-digit',
				year: 'numeric'
			}).format(new Date(o.date)),
			numberOfElements,
			totalPrice,
			authorName: o.author.name!,
			closed: o.invoices !== null
		};
	});
};

export const getOrderElementRows = async (
	id: number
): Promise<OrderElementRow[]> => {
	const order = await getOrder(id);
	const orderElements = order ? order.orderElements : [];
	console.log(orderElements);
	return orderElements.map(e => ({
		id: e.id,
		commodity: e.commodityId,
		commodityUnit: e.commodity.unit,
		processingNote: e.processingNote,
		unitQuantity: e.unitLength.toNumber(),
		numberOfUnits: e.numberOfUnits.toNumber(),
		unitPrice: e.unitPrice.toNumber()
	}));
};

export const getOrderData = async (
	id: number
): Promise<OrderData | undefined> => {
	const order = await getOrder(id);
	if (!order) return undefined;
	const invoice = order.invoices;
	return {
		id: order.id,
		note: order.note ? order.note : '',
		authorId: order.authorId,
		invoice: !invoice
			? null
			: {
					invoiceNumber: invoice.invoiceNumber,
					date: new Intl.DateTimeFormat('cs-CZ', {
						day: '2-digit',
						//month: 'long',
						month: '2-digit',
						year: 'numeric'
					}).format(new Date(invoice.date))
				},
		orders: order.orderElements.map(e => ({
			id: e.id,
			commodity: e.commodity.name,
			note: e.processingNote ? e.processingNote : '',
			numUnits: e.numberOfUnits.toNumber(),
			unitQuantity: e.unitLength.toNumber(),
			unitPrice: e.unitPrice.toNumber()
		}))
	};
};

export const lockOrderServerAction = async (id: number) => {
	const order = await getOrder(id);
	if (order === null) {
		return {
			error: true,
			message: 'Order not found!'
		};
	}
	const orderElements = order ? order.orderElements : [];
	let newDispatches: StockDispatch[] = [];
	for (const e of orderElements) {
		let leftToProcess = e.unitLength.toNumber() * e.numberOfUnits.toNumber();
		const restocks = await getRestockData(e.commodity.name);
		for (const restock of restocks) {
			const available = restock.quantity - restock.taken;
			const taken = available >= leftToProcess ? leftToProcess : available;
			leftToProcess = leftToProcess - taken;
			const newDispatch = {
				orderElementId: e.id,
				quantity: taken,
				restockId: restock.id
			};
			newDispatches = [newDispatch, ...newDispatches];
			if (leftToProcess === 0) {
				break;
			}
		}
		if (leftToProcess !== 0) {
			return {
				error: true,
				message: `Insufficient commodity "${e.commodity.name}" in stock!`
			};
		}
	}
	await createStockDispatches(newDispatches);
	await createInvoice(generateInvoiceNumber(order.id), order.id);

	revalidatePath('/orders');
	revalidatePath(`/order/${order.id}`);

	return { error: false, message: 'Order successfully locked!' };
};

export const getOrderCountsServerAction = async (days_back: number) => {
	const data = await getOrderCounts(days_back);
	return data.map(day => {
		const orderNotes = day.ordernotes.filter(x => x !== null);
		return {
			date: new Intl.DateTimeFormat('cs-CZ', {
				day: '2-digit',
				//month: 'long',
				month: '2-digit',
				year: 'numeric'
			}).format(new Date(day.date)),
			orderNotes,
			count: orderNotes.length
		};
	});
};

const generateInvoiceNumber = (orderId: number) => `INV-${orderId.toString()}`;

export type OrderRow = {
	id: number;
	note: string | null;
	date: string;
	numberOfElements: number;
	totalPrice: number;
	authorName: string;
	closed: boolean;
};

export type OrderElementRow = {
	id: number;
	commodity: string;
	commodityUnit: string;
	processingNote: string | null;
	unitQuantity: number;
	numberOfUnits: number;
	unitPrice: number;
};

export type OrderData = {
	id: number;
	note: string;
	authorId: string;
	invoice: {
		invoiceNumber: string;
		date: string;
	} | null;
	orders: {
		id: number;
		commodity: string;
		note: string;
		numUnits: number;
		unitQuantity: number;
		unitPrice: number;
	}[];
};
