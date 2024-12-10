'use server';

import { revalidatePath } from 'next/cache';

import type { OrderFormSchema } from '@/components/orders/order-form';
import { createOrder } from '@/server/orders';

export const createOrderServerAction = async (order: OrderFormSchema) => {
	await createOrder(order);

	revalidatePath('/orders');
};
