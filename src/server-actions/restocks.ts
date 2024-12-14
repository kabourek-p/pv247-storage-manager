'use server';

import { revalidatePath } from 'next/cache';

import type { RestockFormSchema } from '@/components/form/restocks/restock-form';
import { createRestock, getRestocks } from '@/server/restocks';
import { Decimal } from '@prisma/client/runtime/library';

export const createRestockServerAction = async (restock: RestockFormSchema) => {
	await createRestock(restock);

	revalidatePath('/restocks');
};

export const getRestockRows = async (): Promise<RestockRow[]> => {
	const restocks = await getRestocks();
	return restocks.map(r => {
		return {
			date: new Intl.DateTimeFormat('cs-CZ', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			}).format(new Date(r.date)),
			commodity: r.commodityId,
			quantity: r.quantity.toString(),
			unitPrice: r.unitPrice.toString(),
			supplierName: r.supplierName,
			invoiceNumber: r.invoiceNumber,
			authorName: `${r.author.name}`
		};
	});
};

export type RestockRow = {
	date: string;
	commodity: string;
	quantity: string;
	unitPrice: string;
	supplierName: string | null;
	invoiceNumber: string | null;
};
