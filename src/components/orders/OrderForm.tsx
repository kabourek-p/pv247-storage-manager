'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormTextField } from '@/components/Form/FormTextField';
import { Button } from '@/components/Button';
import OrderElementHeader from '@/components/orders/OrderElementHeader';
import OrderElementFormRow, {
	OrderElementTableRowSchema
} from '@/components/orders/OrderElementFormRow';

export type OrderFormProps = {
	defaultValues: {
		note: string;
		orders: {
			commodity: string;
			note?: string;
			numUnits: number;
			quantity: number;
			unitPrice: number;
		}[];
	};
	commodities: string[];
	submitFn: (data: OrderFormSchema) => Promise<unknown>;
};

const orderSchema = z.object({
	note: z.string().min(3, 'Name must be at least 3 characters'),
	orders: z.array(OrderElementTableRowSchema)
});

export type OrderFormSchema = z.infer<typeof orderSchema>;

const OrderForm = ({
	defaultValues,
	submitFn,
	commodities
}: OrderFormProps) => {
	const form = useForm<OrderFormSchema>({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			note: defaultValues.note,
			orders: defaultValues.orders
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'orders'
	});

	const onSubmit = async (values: OrderFormSchema) => {
		console.log('data', values);
		await submitFn(values);
	};
	console.log(form.formState.errors?.note?.message);
	return (
		<div className="flex p-4">
			<FormProvider {...form}>
				<form
					className="space-x-2 w-full"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="flex flex-col items-start justify-between space-y-4 w-full relative mx-2">
						<div
							className={`px-4 py-2 border rounded ${
								form.formState.errors?.note
									? 'border-red-600'
									: 'border-gray-300'
							}`}
						>
							<FormTextField
								name="note"
								label="Order Identifier"
								className="rounded-lg bg-slate-50 py-1.5 shadow m-4 w-64"
								error={form.formState.errors?.note?.message}
							/>
						</div>
						<div className="absolute bottom-0 right-0">
							<Button
								className="bg-strongblue w-40 mb-2"
								type="button"
								onClick={() =>
									append({
										commodity: '',
										note: '',
										numUnits: 0,
										quantity: 0,
										unitPrice: 0
									})
								}
							>
								Add field
							</Button>
						</div>
					</div>

					<table className="table-auto w-full border-collapse border border-gray-300">
						<OrderElementHeader />

						<tbody className="divide-y divide-gray-200">
							{fields.map((field, index) => (
								<OrderElementFormRow
									commodities={commodities}
									key={field.id}
									onClick={() => remove(index)}
									index={index}
									errors={form.formState.errors?.orders?.[index]}
								/>
							))}
						</tbody>
					</table>

					<Button className="bg-strongorage m-4" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default OrderForm;
