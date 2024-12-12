'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import RestockElementRow, {
	RestockElementTableRowSchema
} from '@/components/restocks/restock-element-row';

import RestockElementHeader from './restock-element-header';

export type RestockFormProps = {
	defaultValues: {
		note: string;
		restocks: {
			commodity: string;
			quantity: number;
			unitPrice: number;
			supplierName: string;
			invoiceNumber: string;
		}[];
	};
	commodities: string[];
	submitFn: (data: RestockFormSchema) => Promise<unknown>;
};

const restockSchema = z.object({
	restocks: z.array(RestockElementTableRowSchema)
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
			restocks: defaultValues.restocks
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'restocks'
	});

	const onSubmit = async (values: RestockFormSchema) => {
		console.log('data', values);
		await submitFn(values);
		redirect('/restocks');
	};
	return (
		<div className="flex p-4">
			<FormProvider {...form}>
				<form
					className="w-full space-x-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="relative mx-2 flex w-full flex-col items-start justify-between space-y-4">
						<div className="absolute bottom-0 right-0">
							<Button
								className="mb-2 w-40 bg-primary-dark"
								type="button"
								onClick={() =>
									append({
										commodity: '',
										quantity: 0,
										unitPrice: 0,
										supplierName: '',
										invoiceNumber: ''
									})
								}
							>
								Add field
							</Button>
						</div>
					</div>

					<table className="w-full table-auto border-collapse border border-gray-300">
						<RestockElementHeader />

						<tbody className="divide-y divide-gray-200">
							{fields.map((field, index) => (
								<RestockElementRow
									commodities={commodities}
									key={field.id}
									onClick={() => remove(index)}
									index={index}
									errors={form.formState.errors?.restocks?.[index]}
								/>
							))}
						</tbody>
					</table>

					<Button className="m-4 bg-secondary-dark" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default RestockForm;
