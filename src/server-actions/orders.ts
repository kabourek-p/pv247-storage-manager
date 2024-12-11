'use server';

import { revalidatePath } from 'next/cache';
import { OrderElement } from '@prisma/client';

import type { OrderFormSchema } from '@/components/form/orders/order-form';
import { createOrder, getOrderElements, getOrders } from '@/server/orders';

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

export const getOrderRows = async (): Promise<OrderRow[]> => {
	const orders = await getOrders();
	console.log(orders);
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
	const orderElements = await getOrderElements(id);

	return orderElements.map(e => ({
		commodity: e.commodityId,
		processingNote: e.processingNote,
		unitLength: e.unitLength.toNumber(),
		numberOfUnits: e.numberOfUnits.toNumber(),
		unitPrice: e.unitPrice.toNumber()
	}));
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
	commodity: string;
	processingNote: string | null;
	unitLength: number;
	numberOfUnits: number;
	unitPrice: number;
};
