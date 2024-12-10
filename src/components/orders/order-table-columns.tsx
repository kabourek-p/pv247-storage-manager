'use client';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { type OrderRow } from '@/server-actions/orders';

import { Button } from '../ui/button';

export const columns: ColumnDef<OrderRow, string>[] = [
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
