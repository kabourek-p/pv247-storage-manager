'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Unit } from '@prisma/client';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FormTextField } from '@/components/form/form-text-field';
import { Select } from '@/components/form/select';

export type CommodityFormProps = {
	defaultValues: {
		name: string;
		unit: keyof typeof Unit;
	};
	submitFn: (data: CommodityFormSchema) => Promise<unknown>;
};

const commoditySchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	unit: z.enum(['KG', 'MM', 'PIECE'])
});

export type CommodityFormSchema = z.infer<typeof commoditySchema>;

const CommodityForm = ({ defaultValues, submitFn }: CommodityFormProps) => {
	const form = useForm<CommodityFormSchema>({
		resolver: zodResolver(commoditySchema),
		defaultValues: {
			name: defaultValues.name,
			unit: defaultValues.unit as CommodityFormSchema['unit']
		}
	});

	const onSubmit = async (values: CommodityFormSchema) => {
		console.log('data', values);
		await submitFn(values);
		redirect('/commodities');
	};
	console.log(form.formState.errors?.name?.message);

	return (
		<div className="flex min-h-screen items-start justify-center p-4">
			<FormProvider {...form}>
				<form
					className="w-full max-w-xl space-y-4 rounded-lg bg-white p-10 shadow-lg"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormTextField
						name="name"
						label="Commodity name"
						className="w-full rounded-lg bg-slate-50 py-1.5 shadow"
						error={form.formState.errors?.name?.message}
					/>

					<Select
						options={['KG', 'PIECE', 'MM']}
						label="Commodity"
						name="commodity"
						error={form.formState.errors?.unit?.message}
					/>

					<Button colorType="secondary" className="mt-4" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default CommodityForm;
