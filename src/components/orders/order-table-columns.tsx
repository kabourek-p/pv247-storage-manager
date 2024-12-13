'use client';
import { type ColumnDef } from '@tanstack/react-table';

import { type OrderElementRow, type OrderRow } from '@/server-actions/orders';

export const orderColumns: ColumnDef<OrderRow, string>[] = [
	{
		accessorKey: 'id',
		header: 'id'
	},
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

			return <div className="font-medium">{formatted}</div>;
		}
	},
	{
		accessorKey: 'authorName',
		header: 'Author'
	}
];

export const orderElementColumns: ColumnDef<OrderElementRow, string>[] = [
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
