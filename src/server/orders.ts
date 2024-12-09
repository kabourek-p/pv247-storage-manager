'use server';
import { $Enums } from '@prisma/client';

import generateRandomString from '@/server/utils';
import { type OrderFormSchema } from '@/components/orders/OrderForm';

import prisma from '../lib/prisma';

import ProcessingType = $Enums.ProcessingType;

export const getOrders = async () =>
	prisma.order.findMany({
		include: {
			author: true
		}
	});

export const createRandomOrder = async () => {
	const users = await prisma.user.findMany();
	return prisma.order.create({
		data: {
			authorId: users.length,
			note: generateRandomString(10)
		}
	});
};

export const createOrder = async (order: OrderFormSchema) => {
	const users = await prisma.user.findMany();

	return prisma.order.create({
		data: {
			author: {
				connect: { id: users[users.length - 1].id }
			},
			note: order.note,
			orderElements: {
				create: order.orders.map(o => ({
					commodity: {
						connect: { name: o.commodity }
					},
					processingNote: o.note,
					processingType: ProcessingType.STRAIGHT,
					unitLength: o.numUnits,
					numberOfUnits: o.numUnits,
					unitPrice: o.unitPrice,
					ticketNumber: undefined,
					stockDispatches: undefined
				}))
			}
		}
	});
};
