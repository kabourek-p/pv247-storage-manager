'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { OrderFormSchema } from '@/components/form/orders/order-form';
import { createOrder, editOrder, getOrder, getOrders } from '@/server/orders';

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
	redirect(`/orders`);
};

export const getOrderRows = async (): Promise<OrderRow[]> => {
	const orders = await getOrders();
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
			authorName: `${o.author.name} ${o.author.surname}`
		};
	});
};

export const getOrderElementRows = async (
	id: number
): Promise<OrderElementRow[]> => {
	const order = await getOrder(id);
	const orderElements = order ? order.orderElements : [];
	return orderElements.map(e => ({
		id: e.id,
		commodity: e.commodityId,
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

	return {
		id: order.id,
		note: order.note ? order.note : '',
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

export type OrderRow = {
	id: number;
	note: string | null;
	date: string;
	numberOfElements: number;
	totalPrice: number;
	authorName: string;
};

export type OrderElementRow = {
	id: number;
	commodity: string;
	processingNote: string | null;
	unitQuantity: number;
	numberOfUnits: number;
	unitPrice: number;
};

export type OrderData = {
	id: number;
	note: string;
	orders: {
		id: number;
		commodity: string;
		note: string;
		numUnits: number;
		unitQuantity: number;
		unitPrice: number;
	}[];
};
