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
					unitLength: o.unitQuantity,
					numberOfUnits: o.numUnits,
					unitPrice: o.unitPrice,
					ticketNumber: undefined,
					stockDispatches: undefined
				}))
			}
		}
	});
};

export const editOrder = async (
	orderId: number,
	updatedOrder: OrderFormSchema
) => {
	const existingOrder = await prisma.order.findUnique({
		where: { id: orderId },
		include: { orderElements: true }
	});

	if (!existingOrder) {
		throw new Error('Order not found');
	}

	return prisma.order.update({
		where: { id: orderId },
		data: {
			note: updatedOrder.note,
			// author: {
			// 	connect: { id: updatedOrder }
			// },
			orderElements: {
				deleteMany: {
					id: {
						notIn: updatedOrder.orders
							.map(o => (o.id ? o.id : -1))
							.filter(Boolean)
					}
				},
				upsert: updatedOrder.orders.map(o => ({
					where: { id: o.id ?? -1 },
					create: {
						commodity: {
							connect: { name: o.commodity }
						},
						processingNote: o.note,
						processingType: ProcessingType.STRAIGHT,
						unitLength: o.unitQuantity,
						numberOfUnits: o.numUnits,
						unitPrice: o.unitPrice,
						ticketNumber: undefined,
						stockDispatches: undefined
					},
					update: {
						commodity: {
							connect: { name: o.commodity }
						},
						processingNote: o.note,
						processingType: ProcessingType.STRAIGHT,
						unitLength: o.unitQuantity,
						numberOfUnits: o.numUnits,
						unitPrice: o.unitPrice,
						ticketNumber: undefined,
						stockDispatches: undefined
					}
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

export const getOrder = async (id: number) =>
	prisma.order.findUnique({
		where: {
			id
		},
		include: {
			orderElements: {
				include: {
					commodity: true
				}
			}
		}
	});
