'use server';

import { revalidatePath } from 'next/cache';

import type { RestockFormSchema } from '@/components/form/restocks/restock-form';
import { createRestock, getRestocks } from '@/server/restocks';

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

	return { error: false, message: 'Restock successfully registered!' };
};

export const getRestockRows = async (): Promise<RestockRow[]> => {
	const restocks = await getRestocks();
	return restocks.map(r => ({
		date: new Intl.DateTimeFormat('cs-CZ', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(new Date(r.date)),
		commodity: r.commodityId,
		quantity: r.quantity.toString(),
		unit: r.commodity.unit,
		unitPrice: r.unitPrice.toString(),
		supplierName: r.supplierName,
		invoiceNumber: r.invoiceNumber,
		authorName: `${r.author.name}`
	}));
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
