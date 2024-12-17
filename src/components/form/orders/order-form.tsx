'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
	authorId: string;
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
	authorId: z.string(),
	orders: z.array(OrderElementTableRowSchema)
});

export type OrderFormSchema = z.infer<typeof orderSchema>;

const OrderForm = (params: {
	defaultValues: OrderFormDefaultData;
	commodities: string[];
	redirectPath: string;
	allowSaveNext?: boolean;
	submitFn: (
		data: OrderFormSchema
	) => Promise<{ error: boolean; message: string }>;
}) => {
	const router = useRouter();
	const form = useForm<OrderFormSchema>({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			id: params.defaultValues.id,
			note: params.defaultValues.note,
			orders: params.defaultValues.orders,
			authorId: params.defaultValues.authorId
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
		toast.success(result.message);
		form.reset();
		router.push(params.redirectPath);
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
		<div className="flex justify-center">
			<FormProvider {...form}>
				<form
					className="w-11/12 justify-center space-x-2 md:w-full"
					onSubmit={form.handleSubmit(() => {})}
				>
					<div className="m-2 mb-4 flex flex-col items-end justify-between space-y-4 md:w-full md:flex-row md:space-x-4">
						<div className="w-full rounded-lg border border-gray-200 px-4 py-4 shadow-lg">
							<FormTextField
								name="note"
								label="Order Identifier"
								error={form.formState.errors?.note?.message}
								className="w-full py-1.5"
							/>
							<span className="hidden">
								<FormTextField name="id" label="Id" />
							</span>
							<span className="hidden">
								<FormTextField name="authorId" label="authorId" />
							</span>
						</div>
						<div className="mb-4 flex min-h-12 w-full flex-col justify-end gap-1 sm:gap-2 md:flex-row md:gap-4">
							<div className="flex gap-2">
								{params.allowSaveNext && (
									<Button
										colorType="secondary"
										className="mt-2 w-full grow"
										onClick={form.handleSubmit(onSubmitAndNext)}
									>
										Save and continue
									</Button>
								)}
								<Button
									colorType="secondary"
									className="mt-2 w-full md:w-auto"
									onClick={form.handleSubmit(onSubmit)}
								>
									Save
								</Button>
							</div>
							<Button
								className="mt-2 w-full md:w-36"
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
						<Table className="table-auto border-collapse border border-gray-300 md:w-full">
							<OrderElementHeader />

							<TableBody className="md:w-full">
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
