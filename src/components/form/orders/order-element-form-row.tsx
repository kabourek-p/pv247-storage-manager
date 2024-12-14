import React from 'react';
import { z } from 'zod';
import {
	type FieldError,
	type FieldErrorsImpl,
	type Merge
} from 'react-hook-form';

import { FormTextField } from '@/components/form/form-text-field';
import { Select } from '@/components/form/select';
import TrashButton from '@/components/trash-button';

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
	<tr className="hover:bg-gray-100">
		<td className="border border-gray-300 text-center">
			<TrashButton type="button" onClick={props.onClick} />
		</td>

		<td className="border border-gray-300 py-2" data-label="Commodity">
			<Select
				options={props.commodities}
				name={`orders[${props.index}].commodity`}
				error={props.errors?.commodity?.message}
			/>
		</td>
		<td className="hidden border border-gray-300 py-4" data-label="Id">
			<FormTextField name={`orders[${props.index}].id`} />
		</td>
		<td className="border border-gray-300 py-2" data-label="Unit Quantity">
			<FormTextField
				name={`orders[${props.index}].unitQuantity`}
				error={props.errors?.unitQuantity?.message}
			/>
		</td>

		<td className="border border-gray-300 py-2" data-label="Price per unit">
			<FormTextField
				name={`orders[${props.index}].unitPrice`}
				error={props.errors?.unitPrice?.message}
			/>
		</td>

		<td className="border border-gray-300 py-2" data-label="Number of Units">
			<FormTextField
				name={`orders[${props.index}].numUnits`}
				error={props.errors?.numUnits?.message}
			/>
		</td>

		<td className="border border-gray-300 py-2" data-label="Note">
			<FormTextField
				name={`orders[${props.index}].note`}
				error={props.errors?.note?.message}
			/>
		</td>
	</tr>
);
export default OrderElementFormRow;
