'use server';

import { revalidatePath } from 'next/cache';

import type { RestockFormSchema } from '@/components/form/restocks/restock-form';
import { createRestock, getRestockData, getRestocks } from '@/server/restocks';
import { getCommodities } from '@/server/commodities';

export const createRestockServerAction = async (restock: RestockFormSchema) => {
	try {
		await createRestock(restock);
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

	revalidatePath('/restocks');
	revalidatePath('/');
	return { error: false, message: 'Restock successfully registered!' };
};

export const getRestockRows = async (
	authorId: string | null
): Promise<RestockRow[]> => {
	const restocks = await getRestocks(authorId);
	return restocks.map(r => ({
		date: new Intl.DateTimeFormat('cs-CZ', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(new Date(r.date)),
		commodity: r.commodityId,
		quantity: Number(r.quantity)
			.toLocaleString('en-US')
			.replace(/,/g, '\u202F'),
		unit: r.commodity.unit,
		unitPrice: Number(r.unitPrice)
			.toLocaleString('en-US')
			.replace(/,/g, '\u202F'),
		supplierName: r.supplierName,
		invoiceNumber: r.invoiceNumber,
		authorName: r.author.name
	}));
};

export const getBarRestockDataServerAction = async () => {
	const commodities = await getCommodities();
	const restocks = await Promise.all(
		commodities.map(async commodity => {
			const restocks = await getRestockData(commodity.name);
			return restocks.map(restock => ({
				invoiceNumber: restock.invoiceNumber,
				unitPrice: Number(restock.unitPrice),
				taken: Number(restock.taken),
				remaining: Number(restock.quantity - restock.taken),
				unitType: commodity.unit,
				commodity: commodity.name
			}));
		})
	);
	return restocks.reduce((accumulator, value) => accumulator.concat(value), []);
};

export type BarRestockData = {
	invoiceNumber: string;
	taken: number;
	remaining: number;
	unitPrice: number;
	unitType: string;
	commodity: string;
};

export type RestockRow = {
	date: string;
	commodity: string;
	quantity: string;
	unit: string;
	unitPrice: string;
	supplierName: string | null;
	invoiceNumber: string | null;
};
