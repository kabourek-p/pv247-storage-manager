'use client';
import { type ColumnDef } from '@tanstack/react-table';

import { RestockRow } from '@/server-actions/restocks';

export const restockColumns: ColumnDef<RestockRow, string>[] = [
	{
		accessorKey: 'date',
		header: 'Date of Creation'
	},
	{
		accessorKey: 'commodity',
		header: 'Commodity'
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
