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

export const RestockElementTableRowSchema = z.object({
	commodity: z.string().min(1, 'Commodity is required'),
	quantity: z.coerce.number().positive('Quantity must be a positive number'),
	unitPrice: z.coerce.number().positive('Unit price must be a positive number'),
	supplierName: z.string().min(1, 'Supplier name is required'),
	invoiceNumber: z.string().min(1, 'Invoice number is required')
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
				name={`restocks[${props.index}].commodity`}
				error={props.errors?.commodity?.message}
			/>
		</td>

		<td className="border border-gray-300 px-4 py-2" data-label="Quantity">
			<FormTextField
				name={`restocks[${props.index}].quantity`}
				error={props.errors?.quantity?.message}
			/>
		</td>

		<td
			className="border border-gray-300 px-4 py-2"
			data-label="Price per unit"
		>
			<FormTextField
				name={`restocks[${props.index}].unitPrice`}
				error={props.errors?.unitPrice?.message}
			/>
		</td>

		<td
			className="border border-gray-300 px-4 py-2"
			data-label="Number of Units"
		>
			<FormTextField
				name={`restocks[${props.index}].supplierName`}
				error={props.errors?.supplierName?.message}
			/>
		</td>

		<td className="border border-gray-300 px-4 py-2" data-label="Note">
			<FormTextField
				name={`restocks[${props.index}].invoiceNumber`}
				error={props.errors?.invoiceNumber?.message}
			/>
		</td>
	</tr>
);
export default RestockElementRow;
