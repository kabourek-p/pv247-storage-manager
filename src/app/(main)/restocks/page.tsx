import React from 'react';

import AddRestockButton from '@/components/restocks/add-restock-button';
import { getRestockRows } from '@/server-actions/restocks';
import DataTable from '@/components/ui/data-table';
import { Card } from '@/components/ui/card';
import { restockColumns } from '@/components/restocks/restock-table-column';

const Restocks = async () => {
	const data = await getRestockRows();

	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<AddRestockButton />
				<DataTable data={data} columns={restockColumns} filter="commodity" />
			</Card>
		</div>
	);
};

export default Restocks;
