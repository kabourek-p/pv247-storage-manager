'use client';
import { type ColumnDef } from '@tanstack/react-table';

import { type OrderElementRow, type OrderRow } from '@/server-actions/orders';

export const getOrderColumns = (admin: boolean) =>
	admin ? orderColumns : orderColumns.filter(col => col.header !== 'Author');

const orderColumns: ColumnDef<OrderRow, string>[] = [
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
		header: 'Number of Entries'
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

			return <span>{closed ? 'CLOSED' : 'OPEN'}</span>;
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
		accessorKey: 'commodityUnit',
		header: 'commodityUnit'
	},
	{
		accessorKey: 'commodity',
		header: 'Commodity'
	},
	{
		accessorKey: 'numberOfUnits',
		header: 'Amount per Piece',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('numberOfUnits'));
			const unit = row.getValue('commodityUnit');
			const formatted = `${amount} ${unit}`;

			return <span className="font-medium">{formatted}</span>;
		}
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

			return <span className="font-medium">{formatted}</span>;
		}
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total Price',
		cell: ({ row }) => {
			const amount =
				parseFloat(row.getValue('unitPrice')) *
				parseFloat(row.getValue('numberOfUnits'));

			const formatted = new Intl.NumberFormat('cs-CZ', {
				style: 'currency',
				currency: 'CZK'
			}).format(amount);

			return <span className="font-medium">{formatted}</span>;
		}
	},
	{
		accessorKey: 'unitQuantity',
		header: 'Number of Pieces'
	},
	{
		accessorKey: 'processingNote',
		header: 'Note'
	}
];
