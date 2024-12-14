'use client';

import React from 'react';
import { redirect } from 'next/navigation';

import DataTable from '@/components/ui/data-table';
import { getOrderColumns } from '@/components/orders/order-table-columns';
import { useLoggedInUser } from '@/context/logged-in-user';

type OrderTableProps<TData> = {
	data: TData[];
};

const handleRowClick = async (id: string) => {
	redirect(`/order/${id}`);
};

const OrderTable = ({ data }: OrderTableProps<TData>) => {
	const { user } = useLoggedInUser();
	return (
		<DataTable
			data={data}
			columns={getOrderColumns(user?.role === 'ADMIN')}
			rowClickHandler={handleRowClick}
			filter="note"
		/>
	);
};

export default OrderTable;
