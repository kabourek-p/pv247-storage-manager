'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import DataTable from '@/components/ui/data-table';
import { getOrderColumns } from '@/components/orders/order-table-columns';
import { useLoggedInUser } from '@/context/logged-in-user';
import { type OrderRow } from '@/server-actions/orders';

import { Button } from '../ui/button';

const OrderTable = ({ data }: { data: OrderRow[] }) => {
	const router = useRouter();
	const { user } = useLoggedInUser();

	const handleRowClick = async (id: string) => {
		router.push(`/order/${id}`);
	};

	return (
		<DataTable
			data={data}
			columns={getOrderColumns(user?.role === 'ADMIN')}
			rowClickHandler={handleRowClick}
			filter="note"
			filterByName="Identifier"
			addButton={
				<Button
					type="button"
					className="w-full md:w-auto"
					onClick={() => router.push('/order')}
				>
					+ New order
				</Button>
			}
		/>
	);
};

export default OrderTable;
