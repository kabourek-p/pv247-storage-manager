import React from 'react';
import { redirect } from 'next/navigation';

import AddRestockButton from '@/components/restocks/add-restock-button';
import { getRestockRows } from '@/server-actions/restocks';
import DataTable from '@/components/ui/data-table';
import { Card } from '@/components/ui/card';
import { restockColumns } from '@/components/restocks/restock-table-column';

const Restocks = async () => {
	const data = await getRestockRows();

	const handleRowClick = async (id: string) => {
		'use server';
		redirect(`/order/${id}`);
	};

	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<Card>
				<AddRestockButton />
				<DataTable
					data={data}
					columns={restockColumns}
					rowClickHandler={handleRowClick}
					filter="commodity"
				/>
			</Card>
		</div>
	);
};

export default Restocks;
