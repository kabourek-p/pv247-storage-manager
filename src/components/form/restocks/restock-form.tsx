'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FormTextField } from '@/components/form/form-text-field';
import { Select } from '@/components/form/select';

export type RestockFormProps = {
	defaultValues: {
		commodity: string;
		quantity: number;
		unitPrice: number;
		supplierName: string;
		invoiceNumber: string;
	};
	commodities: string[];
	submitFn: (data: RestockFormSchema) => Promise<unknown>;
};

export const restockSchema = z.object({
	commodity: z.string().min(1, 'Commodity is required'),
	quantity: z
		.coerce.number()
		.positive('Quantity must be a positive number')
		.max(1000000, 'Quantity must be less than or equal to 1,000,000'), // Maximum 1,000,000
	unitPrice: z
		.coerce.number()
		.positive('Unit price must be a positive number')
		.max(1000000, 'Unit price must be less than or equal to 1,000,000'), // Maximum 1,000,000
	supplierName: z.string().min(1, 'Supplier name is required'),
	invoiceNumber: z.string().min(1, 'Invoice number is required')
});

export type RestockFormSchema = z.infer<typeof restockSchema>;

const RestockForm = ({
	defaultValues,
	submitFn,
	commodities
}: RestockFormProps) => {
	const form = useForm<RestockFormSchema>({
		resolver: zodResolver(restockSchema),
		defaultValues: {
			commodity: defaultValues.commodity,
			quantity: defaultValues.quantity,
			unitPrice: defaultValues.unitPrice,
			supplierName: defaultValues.supplierName,
			invoiceNumber: defaultValues.invoiceNumber
		}
	});

	const onSubmit = async (values: RestockFormSchema) => {
		console.log('data', values);
		await submitFn(values);
		redirect('/restocks');
	};

	return (
		<div className="flex items-start justify-center min-h-screen p-4">
			<FormProvider {...form}>
				<form
					className="w-full max-w-xl space-y-4 bg-white p-10 rounded-lg shadow-lg"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<Select
						options={commodities}
						label="Commodity"
						name={`commodity`}
						error={form.formState.errors?.commodity?.message}
					/>

					<FormTextField
						name={`quantity`}
						label="Quantity"
						className="w-full rounded-lg bg-slate-50 py-1.5 shadow"
						error={form.formState.errors?.quantity?.message}
					/>

					<FormTextField
						name={`unitPrice`}
						label="Unit price"
						className="w-full rounded-lg bg-slate-50 py-1.5 shadow"
						error={form.formState.errors?.unitPrice?.message}
					/>

					<FormTextField
						name={`supplierName`}
						label="Supplier name"
						className="w-full rounded-lg bg-slate-50 py-1.5 shadow"
						error={form.formState.errors?.supplierName?.message}
					/>

					<FormTextField
						name={`invoiceNumber`}
						label="Invoice number"
						className="w-full rounded-lg bg-slate-50 py-1.5 shadow"
						error={form.formState.errors?.invoiceNumber?.message}
					/>

					<Button colorType="secondary" className="mt-4" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default RestockForm;
