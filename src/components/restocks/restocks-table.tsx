'use client';

import React from 'react';

import DataTable from '@/components/ui/data-table';
import { getRestockColumns } from '@/components/restocks/restock-table-column';
import { useLoggedInUser } from '@/context/logged-in-user';

type RestockTableProps<TData> = {
	data: TData[];
};

const RestockTable = ({ data }: RestockTableProps<TData>) => {
	const { user } = useLoggedInUser();
	return (
		<DataTable
			data={data}
			columns={getRestockColumns(user?.role === 'ADMIN')}
			filter="commodity"
		/>
	);
};

export default RestockTable;
