'use client';
import { type ColumnDef } from '@tanstack/react-table';

import type { RestockRow } from '@/server-actions/restocks';

export const getRestockColumns = (admin: boolean) =>
	admin
		? restockColumns
		: restockColumns.filter(col => col.header !== 'Author');

const restockColumns: ColumnDef<RestockRow, string>[] = [
	{
		accessorKey: 'date',
		header: 'Date of Creation'
	},
	{
		accessorKey: 'commodity',
		header: 'Commodity'
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity'
	},
	{
		accessorKey: 'unit',
		header: 'Unit'
	},
	{
		accessorKey: 'unitPrice',
		header: 'Unit Price'
	},
	{
		accessorKey: 'supplierName',
		header: 'Supplier Name'
	},
	{
		accessorKey: 'invoiceNumber',
		header: 'Invoice Number'
	},
	{
		accessorKey: 'authorName',
		header: 'Author'
	}
];
