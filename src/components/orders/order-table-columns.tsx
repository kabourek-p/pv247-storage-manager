'use client';
import { type ColumnDef } from '@tanstack/react-table';

import { type OrderElementRow, type OrderRow } from '@/server-actions/orders';
import { cn } from '@/lib/cn';

export const orderColumns: ColumnDef<OrderRow, string>[] = [
	{
		accessorKey: 'note',
		header: 'Identifier'
	},
	{
		accessorKey: 'date',
		header: 'Date of Creation'
	},
	{
		accessorKey: 'numberOfElements',
		header: 'Number of Elements'
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total Price',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('totalPrice'));

			const formatted = new Intl.NumberFormat('cs-CZ', {
				style: 'currency',
				currency: 'CZK'
			}).format(amount);

			return <span className="font-medium">{formatted}</span>;
		}
	},
	{
		accessorKey: 'authorName',
		header: 'Author'
	},
	{
		accessorKey: 'closed',
		header: 'Status',
		cell: ({ row }) => {
			const closed = row.getValue('closed');

			return (
				<span
					className={cn(
						'rounded-md p-1 font-medium text-white',
						closed ? 'bg-gray-400' : 'bg-primary'
					)}
				>
					{closed ? 'CLOSED' : 'OPEN'}
				</span>
			);
		}
	},
	{
		accessorKey: 'id',
		header: 'id'
	}
];

export const orderElementColumns: ColumnDef<OrderElementRow, string>[] = [
	{
		accessorKey: 'id',
		header: 'id'
	},
	{
		accessorKey: 'commodity',
		header: 'Commodity'
	},
	{
		accessorKey: 'numberOfUnits',
		header: 'Number of units'
	},
	{
		accessorKey: 'unitPrice',
		header: 'Price per Unit',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('unitPrice'));

			const formatted = new Intl.NumberFormat('cs-CZ', {
				style: 'currency',
				currency: 'CZK'
			}).format(amount);

			return <div className="font-medium">{formatted}</div>;
		}
	},
	{
		accessorKey: 'processingNote',
		header: 'Note'
	},
	{
		accessorKey: 'unitLength',
		header: 'Lenght of Unit'
	}
];
