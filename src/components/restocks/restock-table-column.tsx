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
		header: 'Amount',
		cell: ({ row }) => {
			const quantity = parseFloat(row.getValue('quantity'));
			const unit = row.getValue('unit');
			const formatted = `${quantity} ${unit}`;

			return <span className="font-medium">{formatted}</span>;
		}
	},
	{
		accessorKey: 'unit'
	},
	{
		accessorKey: 'unitPrice',
		header: 'Unit Price',

		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('unitPrice'));
			const formatted = new Intl.NumberFormat('cs-CZ', {
				style: 'currency',
				currency: 'CZK'
			}).format(amount);

			return <span className="font-medium">{formatted}</span>;
		}
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
