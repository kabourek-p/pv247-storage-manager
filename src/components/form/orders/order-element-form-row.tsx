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

export const OrderElementTableRowSchema = z.object({
	commodity: z.string().min(1, 'Commodity is required'),
	unitQuantity: z.coerce
		.number()
		.positive('Quantity per unit must be a positive number'),
	unitPrice: z.coerce.number().positive('Unit price must be a positive number'),
	numUnits: z.coerce.number().positive('Units must be a positive number'),
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
}) => (
	<TableRow className="hover:bg-gray-100">
		<TableCell className="border border-gray-300 text-center">
			<TrashButton type="button" onClick={props.onClick} />
		</TableCell>

		<TableCell
			className="w-2/6 border border-gray-300 py-2"
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
			className="border border-gray-300 py-2"
			data-label="Unit Quantity"
		>
			<FormTextField
				name={`orders[${props.index}].unitQuantity`}
				error={props.errors?.unitQuantity?.message}
			/>
		</TableCell>

		<TableCell
			className="border border-gray-300 py-2"
			data-label="Price per unit"
		>
			<FormTextField
				name={`orders[${props.index}].unitPrice`}
				error={props.errors?.unitPrice?.message}
			/>
		</TableCell>

		<TableCell
			className="border border-gray-300 py-2"
			data-label="Number of Units"
		>
			<FormTextField
				name={`orders[${props.index}].numUnits`}
				error={props.errors?.numUnits?.message}
			/>
		</TableCell>

		<TableCell className="w-2/8 border border-gray-300 py-2" data-label="Note">
			<FormTextField
				name={`orders[${props.index}].note`}
				error={props.errors?.note?.message}
			/>
		</TableCell>
	</TableRow>
);
export default OrderElementFormRow;
