import React from 'react';
import { z } from 'zod';
import {
	type FieldError,
	type FieldErrorsImpl,
	type Merge
} from 'react-hook-form';

import TrashButton from '@/components/TrashButton';
import { FormTextField } from '@/components/Form/FormTextField';
import { Select } from '@/components/Form/Select';

export const RestockElementTableRowSchema = z.object({
	commodity: z.string().min(1, 'Commodity is required'),
	quantity: z.coerce.number().positive('Quantity must be a positive number'),
	unitPrice: z.coerce.number().positive('Unit price must be a positive number'),
	supplierName: z.string().optional(),
	invoiceNumber: z.string().optional()
});

type RestockElementTableRowErrorSchema =
	| Merge<
			FieldError,
			FieldErrorsImpl<{
				commodity: string;
				quantity: number;
				unitPrice: number;
				supplierName: string;
				invoiceNumber: string;
			}>
	  >
	| undefined;

const RestockElementRow = (props: {
	onClick: () => void;
	index: number;
	commodities: string[];
	errors?: RestockElementTableRowErrorSchema;
}) => (
	<tr className="hover:bg-gray-100">
		<td className="justify-center border border-gray-300 p-1">
			<TrashButton type="button" onClick={props.onClick} />
		</td>

		<td className="border border-gray-300 px-4 py-2" data-label="Commodity">
			<Select
				options={props.commodities}
				name={`orders[${props.index}].commodity`}
				error={props.errors?.commodity?.message}
			/>
		</td>

		<td className="border border-gray-300 px-4 py-2" data-label="Quantity">
			<FormTextField
				name={`orders[${props.index}].quantity`}
				error={props.errors?.quantity?.message}
			/>
		</td>

		<td
			className="border border-gray-300 px-4 py-2"
			data-label="Price per unit"
		>
			<FormTextField
				name={`orders[${props.index}].unitPrice`}
				error={props.errors?.unitPrice?.message}
			/>
		</td>

		<td
			className="border border-gray-300 px-4 py-2"
			data-label="Number of Units"
		>
			<FormTextField
				name={`orders[${props.index}].numUnits`}
				error={props.errors?.supplierName?.message}
			/>
		</td>

		<td className="border border-gray-300 px-4 py-2" data-label="Note">
			<FormTextField
				name={`orders[${props.index}].note`}
				error={props.errors?.invoiceNumber?.message}
			/>
		</td>
	</tr>
);
export default RestockElementRow;
