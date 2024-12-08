'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { FormTextField } from '@/components/Form/FormTextField';
import { Button } from '@/components/Button';
import OrderElementFormRow, {
	OrderElementTableRowSchema
} from '@/components/orders/OrderElementFormRow';
import OrderElementHeader from '@/components/orders/OrderElementHeader';

export type OrderFormProps = {
	message: string;
	// typeSelector: React.ReactNode;
	defaultValues: {
		orders: { firstName: string; lastName: string }[];
	};
	mutationFn: (data: OrderFormSchema) => Promise<unknown>;
};

const orderSchema = z.object({
	note: z.string().min(3, 'Name must be at least 3 characters'),
	orders: z.array(OrderElementTableRowSchema)
});

export type OrderFormSchema = z.infer<typeof orderSchema>;

const OrderForm = ({
	// defaultValues,
	// typeSelector,
	mutationFn
}: OrderFormProps) => {
	const form = useForm<OrderFormSchema>({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			note: '',
			orders: [
				{ commodity: '', quantity: 0, unitPrice: 0, numUnits: 0, note: '' }
			]
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'orders'
	});

	const router = useRouter();

	const mutation = useMutation({
		mutationFn,
		onSuccess: () => {
			router.push('/orders');
			router.refresh();
		},
		onError: error => {
			console.error('Error submitting movie:', error);
		}
	});

	const onSubmit = (values: OrderFormSchema) => {
		// mutation.mutate(values);
		console.log('data', values);
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
							onClick={() => append({})}
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
										key={field.id}
										onClick={() => remove(index)}
										index={index}
										errors={form.formState.errors?.orders?.[index]}
									/>
								))}
							</tbody>
						</table>
					</div>

					<Button
						className="bg-strongorage m-4"
						type="submit"
						disabled={mutation.isPending}
					>
						{mutation.isPending ? 'Submitting...' : 'Submit'}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default OrderForm;
