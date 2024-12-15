'use server';

import { revalidatePath } from 'next/cache';

import { getCommodities, createCommodity } from '@/server/commodities';
import type { CommodityFormSchema } from '@/components/form/commodities/commodity-form';
import { getRestockData } from '@/server/restocks';

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
	console.log(commodities);
	return await Promise.all(
		commodities.map(async commodity => {
			const restocks = await getRestockData(commodity.name);
			console.log(restocks);
			const quantity = restocks.reduce(
				(sum, current) => sum + current.quantity - current.taken,
				0
			);
			return {
				name: commodity.name,
				quantity,
				unit: commodity.unit,
				unitPrice: restocks[0]?.unitPrice ?? 0
			};
		})
	);
};

export const getAvailableCommodities = async () => getCommodities();
