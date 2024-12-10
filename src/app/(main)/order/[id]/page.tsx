import React from 'react';

import DataTable from '@/components/ui/data-table';
import { orderElementColumns } from '@/components/orders/order-table-columns';
import { getOrderElementRows } from '@/server-actions/orders';
import EditOrderButton from '@/components/orders/edit-order-button';

const Page = async ({ params }: { params: { id: string } }) => {
	const data = await getOrderElementRows(+params.id);
	console.log(params.id);
	console.log(data);
	return (
		<div className="grid grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<div>
				<h1>Order Details</h1>
				<span>Details of order: {params.id}</span>
			</div>
			<div>
				<EditOrderButton id={params.id} />
			</div>
			<DataTable data={data} columns={orderElementColumns} filter={false} />
		</div>
	);
};

export default Page;
