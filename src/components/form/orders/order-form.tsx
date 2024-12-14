'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

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

const orderSchema = z.object({
	id: z.coerce.number().optional(),
	note: z.string().min(3, 'Name must be at least 3 characters'),
	orders: z.array(OrderElementTableRowSchema)
});

export type OrderFormSchema = z.infer<typeof orderSchema>;

const OrderForm = (params: {
	defaultValues: OrderFormDefaultData;
	commodities: string[];
	redirectPath: string;
	allowSaveNext: boolean;
	submitFn: (
		data: OrderFormSchema
	) => Promise<{ error: boolean; message: string }>;
}) => {
	const form = useForm<OrderFormSchema>({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			id: params.defaultValues.id,
			note: params.defaultValues.note,
			orders: params.defaultValues.orders
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'orders'
	});

	const onSubmit = async (values: OrderFormSchema) => {
		const result = await params.submitFn(values);
		if (result.error) {
			toast.error(result.message);
			return;
		}
		console.log('got here');
		toast.success(result.message);
		form.reset();
		redirect(params.redirectPath);
	};

	const onSubmitAndNext = async (values: OrderFormSchema) => {
		const result = await params.submitFn(values);
		if (result.error) {
			toast.error(result.message);
			return;
		}
		toast.success(result.message);
		form.reset();
	};

	return (
		<div className="flex px-4">
			<FormProvider {...form}>
				<form
					className="w-full space-x-2"
					onSubmit={form.handleSubmit(() => {})}
				>
					<div className="relative m-2 mb-4 flex w-full flex-col items-start justify-between space-y-4">
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
								className="m-4 w-64 rounded-lg bg-slate-50 p-4 py-1.5 shadow"
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
					</div>
					<div className="relative flex w-full flex-col items-start justify-between space-y-4">
						<div className="mb-4 lg:absolute lg:bottom-0 lg:right-3">
							{params.allowSaveNext && (
								<Button
									colorType="secondary"
									className="mr-4"
									onClick={form.handleSubmit(onSubmitAndNext)}
								>
									Save and continue
								</Button>
							)}
							<Button
								colorType="secondary"
								className="mr-4"
								onClick={form.handleSubmit(onSubmit)}
							>
								Save
							</Button>

							<Button
								className="mt-2 w-40"
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
								Add item
							</Button>
						</div>
					</div>
					<div className="overflow-hidden rounded-md border shadow">
						<Table className="w-full table-auto border-collapse border border-gray-300">
							<OrderElementHeader />

							<TableBody className="w-full">
								{fields.map((field, index) => (
									<OrderElementFormRow
										disabledDelete={fields.length <= 1}
										commodities={params.commodities}
										key={field.id}
										onClick={() => remove(index)}
										index={index}
										errors={form.formState.errors?.orders?.[index]}
									/>
								))}
							</TableBody>
						</Table>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default OrderForm;
