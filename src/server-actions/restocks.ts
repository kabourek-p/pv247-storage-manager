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
		quantity: Number(r.quantity).toLocaleString('en-US').replace(/,/g, '\u202F'),
		unit: r.commodity.unit,
		unitPrice: Number(r.unitPrice).toLocaleString('en-US').replace(/,/g, '\u202F'),
		supplierName: r.supplierName,
		invoiceNumber: r.invoiceNumber,
		authorName: r.author.name
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
