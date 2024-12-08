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

	return (
		<div className="flex p-4">
			<FormProvider {...form}>
				<form
					className="space-x-2 w-full"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="flex items-center justify-between space-x-10 w-full">
						<FormTextField
							name="note"
							label="Order Identifier"
							className="flex-grow"
							error={form.formState.errors?.note?.message}
						/>

						<Button
							className="bg-strongblue w-40"
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

					<div className="border-2 rounded-xl">
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
					</div>

					<Button className="bg-strongorage m-4" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default OrderForm;
