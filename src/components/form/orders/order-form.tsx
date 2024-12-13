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
import { Table, TableBody } from '@/components/ui/table';

export type OrderFormDefaultData = {
	id?: number;
	note: string;
	orders: {
		id: number | undefined;
		commodity: string;
		note: string;
		numUnits: number;
		unitQuantity: number;
		unitPrice: number;
	}[];
};

export type OrderFormProps = {
	defaultValues: OrderFormDefaultData;
	commodities: string[];
	submitFn: (
		data: OrderFormSchema
	) => Promise<{ error: boolean; message: string }>;
};

const orderSchema = z.object({
	id: z.coerce.number().optional(),
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
			id: defaultValues.id,
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
		<div className="flex px-4">
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
							<span className="hidden">
								<FormTextField
									name="id"
									label="Id"
									className="m-4 w-64 rounded-lg bg-slate-50 py-1.5 shadow"
								/>
							</span>
						</div>
						<div className="bottom-0 right-0">
							<Button
								className="mb-2 w-40"
								type="button"
								onClick={() =>
									append({
										commodity: '',
										note: '',
										numUnits: 0,
										unitQuantity: 0,
										unitPrice: 0
									})
								}
							>
								Add row
							</Button>
						</div>
					</div>
					<div className="overflow-hidden rounded-md border">
						<Table className="w-full table-auto border-collapse border border-gray-300">
							<OrderElementHeader />

							<TableBody>
								{fields.map((field, index) => (
									<OrderElementFormRow
										commodities={commodities}
										key={field.id}
										onClick={() => remove(index)}
										index={index}
										errors={form.formState.errors?.orders?.[index]}
									/>
								))}
							</TableBody>
						</Table>
					</div>

					<Button colorType="secondary" className="m-4" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default OrderForm;
