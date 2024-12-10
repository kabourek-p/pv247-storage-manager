'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { FormTextField } from '@/components/form/form-text-field';
import { Button } from '@/components/ui/button';
import OrderElementHeader from '@/components/form/orders/order-element-header';
import OrderElementFormRow, {
	OrderElementTableRowSchema
} from '@/components/form/orders/order-element-form-row';

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
	submitFn: (
		data: OrderFormSchema
	) => Promise<{ error: boolean; message: string }>;
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
		const result = await submitFn(values);
		if (result.error) {
			toast.error(result.message);
			return;
		}
		toast.success(result.message);
		form.reset();
	};

	console.log(form.formState.errors?.note?.message);
	return (
		<div className="flex p-4">
			<FormProvider {...form}>
				<form
					className="w-full space-x-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="relative mx-2 flex w-full flex-col items-start justify-between space-y-4">
						<div
							className={`rounded border px-4 py-2 ${
								form.formState.errors?.note
									? 'border-red-600'
									: 'border-gray-300'
							}`}
						>
							<FormTextField
								name="note"
								label="Order Identifier"
								className="m-4 w-64 rounded-lg bg-slate-50 py-1.5 shadow"
								error={form.formState.errors?.note?.message}
							/>
						</div>
						<div className="bottom-0 right-0">
							<Button
								className="mb-2 w-40 bg-primary-dark"
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

					<table className="w-full table-auto border-collapse border border-gray-300">
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

					<Button className="m-4 bg-secondary-dark" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default OrderForm;
