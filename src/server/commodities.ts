'use server';
import { $Enums } from '@prisma/client';

import generateRandomString from '@/server/utils';
import { type CommodityFormSchema } from '@/components/commodities/commodity-form';

import prisma from '../lib/prisma';

import ProcessingType = $Enums.ProcessingType;

export const getCommodities = async () => prisma.commodity.findMany();

export const createRandomCommodity = async () => {
	return prisma.commodity.create({
		data: {
			name: generateRandomString(10),
            unit: 'KG'
		}
	});
};

export const createCommodity = async (commodity: CommodityFormSchema) => {

	return prisma.commodity.create({
		data: {
			name: commodity.name,
			unit: commodity.unit
		}
	});
};
