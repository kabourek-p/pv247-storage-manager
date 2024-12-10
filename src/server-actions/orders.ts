'use server';

import { revalidatePath } from 'next/cache';

import type { OrderFormSchema } from '@/components/form/orders/order-form';
import { createOrder } from '@/server/orders';

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
