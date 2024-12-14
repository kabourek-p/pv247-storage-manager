'use server';

import { revalidatePath } from 'next/cache';

import { getCommodities } from '@/server/commodity';
import type { CommodityFormSchema } from '@/components/form/commodities/commodity-form';
import { createCommodity } from '@/server/commodities';

export const createCommodityServerAction = async (
	commodity: CommodityFormSchema
) => {
	await createCommodity(commodity);

	revalidatePath('/commodities');
};

export const getAvailableCommodities = async () => getCommodities();
