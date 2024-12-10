'use server';

import { revalidatePath } from 'next/cache';
import { number } from 'zod';

import type { OrderFormSchema } from '@/components/form/orders/order-form';
import { createOrder, getOrders } from '@/server/orders';

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

export const getOrderRows = async () => {
	const orders = await getOrders();
	return orders.map(o => {
		const numberOfElements = o.orderElements.length;
		const totalPrice = o.orderElements
			.map(e => e.unitPrice.e * e.numberOfUnits.e)
			.reduce((a, c) => a + c, 0);
		return {
			id: o.id,
			note: o.note,
			date: o.date,
			numberOfElements,
			totalPrice,
			authorName: `${o.author.name} ${o.author.surname}`
		};
	});
};

export type OrderRow = {
	id: number;
	note: string;
	data: Date;
	numberOfElements: number;
	totalPrice: number;
	authorName: string;
};
