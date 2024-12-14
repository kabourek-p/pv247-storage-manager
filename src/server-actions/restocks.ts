'use server';

import { revalidatePath } from 'next/cache';

import type { RestockFormSchema } from '@/components/form/restocks/restock-form';
import { createRestock } from '@/server/restocks';

export const createRestockServerAction = async (restock: RestockFormSchema) => {
	await createRestock(restock);

	revalidatePath('/restocks');
};
