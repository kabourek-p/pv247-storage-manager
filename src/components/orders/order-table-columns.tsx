'use client';
import { type ColumnDef } from '@tanstack/react-table';

import { type OrderRow } from '@/server-actions/orders';

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
		header: 'Total Price'
	},
	{
		accessorKey: 'authorName',
		header: 'Author'
	}
];
