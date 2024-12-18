'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
		authorId: string;
	};
	commodities: string[];
	submitFn: (
		data: RestockFormSchema
	) => Promise<{ error: boolean; message: string }>;
};

export const restockSchema = z.object({
	commodity: z.string().min(1, 'Commodity is required'),
	quantity: z.coerce
		.number()
		.positive('Quantity must be a positive number')
		.max(1000000, 'Quantity must be less than or equal to 1,000,000'), // Maximum 1,000,000
	unitPrice: z.coerce
		.number()
		.positive('Unit price must be a positive number')
		.max(1000000, 'Unit price must be less than or equal to 1,000,000'), // Maximum 1,000,000
	supplierName: z.string().min(1, 'Supplier name is required'),
	invoiceNumber: z.string().min(1, 'Invoice number is required'),
	authorId: z.string()
});

export type RestockFormSchema = z.infer<typeof restockSchema>;

const RestockForm = ({
	defaultValues,
	submitFn,
	commodities
}: RestockFormProps) => {
	const router = useRouter();
	const form = useForm<RestockFormSchema>({
		resolver: zodResolver(restockSchema),
		defaultValues: {
			commodity: defaultValues.commodity,
			quantity: defaultValues.quantity,
			unitPrice: defaultValues.unitPrice,
			supplierName: defaultValues.supplierName,
			invoiceNumber: defaultValues.invoiceNumber,
			authorId: defaultValues.authorId
		}
	});

	const onSubmit = async (values: RestockFormSchema) => {
		const result = await submitFn(values);
		if (result.error) {
			toast.error(result.message);
			return;
		}
		toast.success(result.message);
		router.push('/restocks');
	};

	return (
		<div className="flex items-start justify-center">
			<FormProvider {...form}>
				<form
					className="w-full max-w-xl space-y-4 rounded-lg bg-white p-5 lg:shadow-lg"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<Select
						options={commodities}
						label="Commodity"
						name="commodity"
						error={form.formState.errors?.commodity?.message}
					/>

					<FormTextField
						name="quantity"
						label="Quantity"
						error={form.formState.errors?.quantity?.message}
					/>

					<FormTextField
						name="unitPrice"
						label="Price per Unit (CZK)"
						error={form.formState.errors?.unitPrice?.message}
					/>

					<FormTextField
						name="supplierName"
						label="Supplier name"
						error={form.formState.errors?.supplierName?.message}
					/>

					<FormTextField
						name="invoiceNumber"
						label="Invoice number"
						error={form.formState.errors?.invoiceNumber?.message}
					/>
					<span className="hidden">
						<FormTextField name="authorId" label="authorId" />
					</span>
					<Button colorType="secondary" className="mt-4" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default RestockForm;
