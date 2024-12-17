'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import DataTable from '@/components/ui/data-table';
import { getRestockColumns } from '@/components/restocks/restock-table-column';
import { useLoggedInUser } from '@/context/logged-in-user';
import { type RestockRow } from '@/server-actions/restocks';

import { Button } from '../ui/button';

const RestockTable = ({ data }: { data: RestockRow[] }) => {
	const router = useRouter();
	const { user } = useLoggedInUser();
	return (
		<DataTable
			data={data}
			columns={getRestockColumns(user?.role === 'ADMIN')}
			filter="commodity"
			filterByName="Commodity"
			addButton={
				<Button
					type="button"
					className="w-full md:w-auto"
					onClick={() => router.push('/restock')}
				>
					+ New restock
				</Button>
			}
		/>
	);
};

export default RestockTable;
