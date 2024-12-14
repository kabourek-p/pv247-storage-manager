import React from 'react';
import { z } from 'zod';
import {
	type FieldError,
	type FieldErrorsImpl,
	type Merge
} from 'react-hook-form';

import TrashButton from '@/components/trash-button';
import { FormTextField } from '@/components/form/form-text-field';
import { Select } from '@/components/form/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/cn';

export const OrderElementTableRowSchema = z.object({
	commodity: z.string().min(1, 'Commodity is required'),
	unitQuantity: z.coerce
		.number()
		.positive('Unit quantity must be a positive number')
		.max(1000000, 'Unit quantity can be at most 1000000'),
	unitPrice: z.coerce
		.number()
		.positive('Unit price must be a positive number')
		.max(1000000, 'Unit price can be at most 1000000'),
	numUnits: z.coerce
		.number()
		.positive('Units must be a positive number')
		.max(1000000, 'Unit price can be at most 1000000'),
	note: z.string().optional(),
	id: z.coerce.number().optional()
});

type OrderElementTableRowErrorSchema =
	| Merge<
			FieldError,
			FieldErrorsImpl<{
				commodity: string;
				unitPrice: number;
				numUnits: number;
				note: string;
				unitQuantity: number;
			}>
	  >
	| undefined;

const OrderElementFormRow = (props: {
	onClick: () => void;
	index: number;
	commodities: string[];
	errors?: OrderElementTableRowErrorSchema;
	disabledDelete: boolean;
}) => (
	<TableRow
		className={cn(
			'w-full odd:bg-gray-100 even:bg-secondary hover:odd:bg-gray-200 hover:even:bg-secondary-dark',
			'even:text-white md:hover:even:bg-gray-200',
			'even:text-black md:border-b-2 md:odd:bg-white md:even:bg-white'
		)}
	>
		<TableCell
			className={cn(
				`relative block border-b border-gray-300 px-2 py-1 text-left md:max-w-12`,
				`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
				`md:table-cell md:text-center md:before:content-none`
			)}
		>
			<TrashButton
				disabled={props.disabledDelete}
				type="button"
				onClick={props.onClick}
			/>
		</TableCell>

		<TableCell
			className={cn(
				`border border-gray-300 py-2 md:w-3/12`,
				`relative block border-b border-gray-300 px-2 py-1 text-left`,
				`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
				`md:table-cell md:text-center md:before:content-none`
			)}
			data-label="Commodity"
		>
			<Select
				options={props.commodities}
				name={`orders[${props.index}].commodity`}
				error={props.errors?.commodity?.message}
			/>
		</TableCell>
		<TableCell className="hidden" data-label="Id">
			<FormTextField name={`orders[${props.index}].id`} />
		</TableCell>
		<TableCell
			className={cn(
				`border border-gray-300 py-2`,
				`relative block border-b border-gray-300 px-2 py-1 text-left`,
				`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
				`md:table-cell md:w-2/12 md:text-center md:before:content-none`
			)}
			data-label="Unit Quantity"
		>
			<FormTextField
				name={`orders[${props.index}].unitQuantity`}
				error={props.errors?.unitQuantity?.message}
			/>
		</TableCell>

		<TableCell
			className={cn(
				`border border-gray-300 py-2`,
				`relative block border-b border-gray-300 px-2 py-1 text-left`,
				`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
				`md:table-cell md:w-2/12 md:text-center md:before:content-none`
			)}
			data-label="Price per unit"
		>
			<FormTextField
				name={`orders[${props.index}].unitPrice`}
				error={props.errors?.unitPrice?.message}
			/>
		</TableCell>

		<TableCell
			className={cn(
				`border border-gray-300 py-2`,
				`relative block border-b border-gray-300 px-2 py-1 text-left`,
				`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
				`md:table-cell md:w-2/12 md:text-center md:before:content-none`
			)}
			data-label="Number of Units"
		>
			<FormTextField
				name={`orders[${props.index}].numUnits`}
				error={props.errors?.numUnits?.message}
			/>
		</TableCell>

		<TableCell
			className={cn(
				`border border-gray-300 py-2 md:w-3/12`,
				`relative block border-b border-gray-300 px-2 py-1 text-left`,
				`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
				`md:table-cell md:text-center md:before:content-none`
			)}
			data-label="Note"
		>
			<FormTextField
				name={`orders[${props.index}].note`}
				error={props.errors?.note?.message}
			/>
		</TableCell>
	</TableRow>
);
export default OrderElementFormRow;
