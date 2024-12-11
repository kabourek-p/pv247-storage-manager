'use server';

import { getCommodities } from '@/server/commodity';
import { revalidatePath } from 'next/cache';

import type { CommodityFormSchema } from '@/components/commodities/commodity-form';
import { createCommodity } from '@/server/commodities';

export const createCommodityServerAction = async (commodity: CommodityFormSchema) => {
	await createCommodity(commodity);

	revalidatePath('/commodities');
};

export const getAvailableCommodities = async () => getCommodities();
