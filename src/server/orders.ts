'use server';
import { $Enums } from '@prisma/client';

import { type OrderFormSchema } from '@/components/form/orders/order-form';

import prisma from '../lib/prisma';

import ProcessingType = $Enums.ProcessingType;

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
					unitLength: 0,
					numberOfUnits: o.numUnits,
					unitPrice: o.unitPrice,
					ticketNumber: undefined,
					stockDispatches: undefined
				}))
			}
		}
	});
};

export const getOrders = async () =>
	prisma.order.findMany({
		include: {
			orderElements: true,
			author: true
		}
	});

export const getOrderElements = async (id: number) =>
	prisma.orderElement.findMany({
		where: {
			orderId: id
		},
		include: { commodity: true }
	});
