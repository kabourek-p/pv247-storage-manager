'use server';

import { type CommodityFormSchema } from '@/components/form/commodities/commodity-form';

import prisma from '../lib/prisma';

export const getCommodities = async () => prisma.commodity.findMany({
	include: {
		restocks: {
			select: {
				date: true,
			},
		},
	},
});

export const createCommodity = async (commodity: CommodityFormSchema) =>
	prisma.commodity.create({
		data: {
			name: commodity.name,
			unit: commodity.unit
		}
	});

export const getCommodityCard = async () => {
	const commodities = await prisma.commodity.findMany();

	const commoditiesWithDetails = await Promise.all(
		commodities.map(async commodity => {
			const totalQuantity = await prisma.restock.aggregate({
				where: {
					commodityId: commodity.name
				},
				_sum: {
					quantity: true
				}
			});

			const oldestRestock = await prisma.restock.findFirst({
				where: {
					commodityId: commodity.name
				},
				orderBy: {
					date: 'asc'
				}
			});

			return {
				name: commodity.name,
				quantity: totalQuantity._sum.quantity ?? 0,
				unit: commodity.unit,
				unitPrice: oldestRestock?.unitPrice ?? 0
			};
		})
	);

	return commoditiesWithDetails;
};
