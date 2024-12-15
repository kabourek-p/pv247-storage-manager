'use server';

import { revalidatePath } from 'next/cache';

import { getCommodities } from '@/server/commodity';
import type { CommodityFormSchema } from '@/components/form/commodities/commodity-form';
import { createCommodity } from '@/server/commodities';
import { getRestockData } from '@/server/orders';

export const createCommodityServerAction = async (
	commodity: CommodityFormSchema
) => {
	try {
		await createCommodity(commodity);
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

	revalidatePath('/commodities');

	return { error: false, message: 'Commodity successfully created!' };
};

export const getCommodityCardsServerAction = async () => {
	const commodities = await getCommodities();
	return await Promise.all(
		commodities.map(async commodity => {
			const restocks = await getRestockData(commodity.name);
			const quantity = restocks.reduce(
				(sum, current) => sum + current.quantity - current.taken,
				0
			);
			return {
				name: commodity.name,
				quantity: Number(quantity),
				unit: commodity.unit,
				unitPrice: Number(restocks[0]?.unitPrice ?? 0),
				date: restocks[0]?.date
			};
		})
	);
};

export const getAvailableCommodities = async () => getCommodities();
