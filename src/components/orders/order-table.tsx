'use client';

import React from 'react';
import { redirect } from 'next/navigation';

import DataTable from '@/components/ui/data-table';
import { getOrderColumns } from '@/components/orders/order-table-columns';
import { useLoggedInUser } from '@/context/logged-in-user';
import { type OrderRow } from '@/server-actions/orders';

const handleRowClick = async (id: string) => {
	redirect(`/order/${id}`);
};

const OrderTable = ({ data }: { data: OrderRow[] }) => {
	const { user } = useLoggedInUser();
	return (
		<DataTable
			data={data}
			columns={getOrderColumns(user?.role === 'ADMIN')}
			rowClickHandler={handleRowClick}
			filter="note"
			filterByName="Identifier"
		/>
	);
};

export default OrderTable;
