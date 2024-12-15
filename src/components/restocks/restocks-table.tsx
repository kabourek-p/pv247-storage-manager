'use client';

import React from 'react';

import DataTable from '@/components/ui/data-table';
import { getRestockColumns } from '@/components/restocks/restock-table-column';
import { useLoggedInUser } from '@/context/logged-in-user';
import { type RestockRow } from '@/server-actions/restocks';

const RestockTable = ({ data }: { data: RestockRow[] }) => {
	const { user } = useLoggedInUser();
	return (
		<DataTable
			data={data}
			columns={getRestockColumns(user?.role === 'ADMIN')}
			filter="commodity"
			filterByName="Commodity"
		/>
	);
};

export default RestockTable;
