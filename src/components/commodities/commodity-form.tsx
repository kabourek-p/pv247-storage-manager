'use client';

import React from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Unit } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { FormTextField } from '@/components/form/form-text-field';

export type CommodityFormProps = {
	defaultValues: {
		name: string;
		unit: keyof typeof Unit;
	};
	submitFn: (data: CommodityFormSchema) => Promise<unknown>;
};

const commoditySchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	unit: z.enum(['KG', 'MM', 'PIECE'])
});

export type CommodityFormSchema = z.infer<typeof commoditySchema>;

const CommodityForm = ({ defaultValues, submitFn }: CommodityFormProps) => {
	const form = useForm<CommodityFormSchema>({
		resolver: zodResolver(commoditySchema),
		defaultValues: {
			name: defaultValues.name,
			unit: defaultValues.unit as CommodityFormSchema['unit']
		}
	});

	const onSubmit = async (values: CommodityFormSchema) => {
		console.log('data', values);
		await submitFn(values);
	};
	console.log(form.formState.errors?.name?.message);

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
								form.formState.errors?.name
									? 'border-red-600'
									: 'border-gray-300'
							}`}
						>
							<FormTextField
								name="name"
								label="Commodity name"
								className="m-4 w-64 rounded-lg bg-slate-50 py-1.5 shadow"
								error={form.formState.errors?.name?.message}
							/>
						</div>

						<div
							className={`rounded border px-4 py-2 ${
								form.formState.errors?.unit
									? 'border-red-600'
									: 'border-gray-300'
							}`}
						>
							<label
								htmlFor="unit"
								className="block text-sm font-medium text-gray-700"
							>
								Unit
							</label>
							<select
								{...form.register('unit')}
								id="unit"
								className="m-4 w-64 rounded-lg bg-slate-50 py-1.5 shadow"
							>
								<option value="KG">Kilogram (KG)</option>
								<option value="MM">Millimeter (MM)</option>
								<option value="PIECE">Piece</option>
							</select>
							{form.formState.errors?.unit && (
								<p className="mt-2 text-sm text-red-600">
									{form.formState.errors.unit.message}
								</p>
							)}
						</div>
					</div>

					<Button className="m-4 bg-secondary-dark" type="submit">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default CommodityForm;
