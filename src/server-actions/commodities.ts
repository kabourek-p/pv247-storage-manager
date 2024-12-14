'use server';

import { revalidatePath } from 'next/cache';

import { getCommodities } from '@/server/commodity';
import type { CommodityFormSchema } from '@/components/form/commodities/commodity-form';
import { createCommodity } from '@/server/commodities';

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

export const getAvailableCommodities = async () => getCommodities();
