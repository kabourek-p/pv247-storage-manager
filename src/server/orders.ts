'use server';
import { $Enums } from '@prisma/client';

import { type OrderFormSchema } from '@/components/form/orders/order-form';

import prisma from '../lib/prisma';

import ProcessingType = $Enums.ProcessingType;

export const createOrder = async (order: OrderFormSchema) =>
	prisma.order.create({
		data: {
			author: {
				connect: { id: order.authorId }
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

export const getOrders = async (authorId: string | null) =>
	prisma.order.findMany({
		include: {
			orderElements: true,
			author: true,
			invoices: true
		},
		where: authorId ? { authorId } : undefined,
		orderBy: {
			invoices: {
				invoiceNumber: 'desc'
			}
		}
	});

export const getOrder = async (id: number) =>
	prisma.order.findUnique({
		where: {
			id: +id
		},
		include: {
			invoices: true,
			author: true,
			orderElements: {
				include: {
					commodity: true,
					stockDispatches: true
				}
			}
		}
	});

export const getOrderCounts = async (days_back: number) =>
	await prisma.$queryRawUnsafe<
		OrderCount[]
	>(`SELECT gs.day AS date, COUNT(o."date") AS orders
										FROM generate_series(
												CURRENT_DATE - interval '${days_back} days',
												CURRENT_DATE,
												interval '1 day'
											) AS gs(day)
										LEFT JOIN  "Order" AS o 
										ON  date(o."date") = gs.day
										GROUP BY gs.day
										ORDER BY gs.day;`);

export const getRestockData = async (commodity: string) =>
	prisma.$queryRaw<
		RestockData[]
	>`SELECT r.id, r.date, r.quantity, r."unitPrice", SUM(sd."quantity") AS taken, c.name
									FROM "Restock" AS r LEFT JOIN "StockDispatch" AS sd
									ON sd."restockId" = r."id"
									LEFT JOIN "Commodity" AS c
									ON c."name" = r."commodityId"
									GROUP BY r."id", c.name
									HAVING SUM(sd."quantity") IS NULL OR SUM(sd."quantity") < r."quantity" AND c."name" = ${commodity}
									ORDER BY r."date"`;

type OrderCount = {
	date: Date;
	orders: bigint;
};

export type RestockData = {
	id: number;
	date: Date;
	quantity: number;
	unitPrice: number;
	taken: number;
	name: string;
};
