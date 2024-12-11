import React from 'react';

import DataTable from '@/components/ui/data-table';
import { orderElementColumns } from '@/components/orders/order-table-columns';
import { getOrderElementRows } from '@/server-actions/orders';
import EditOrderButton from '@/components/orders/edit-order-button';

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	const data = await getOrderElementRows(+id);
	console.log(id);
	console.log(data);
	return (
		<div className="grid grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<div>
				<h1>Order Details</h1>
				<span>Details of order: {id}</span>
			</div>
			<div>
				<EditOrderButton id={id} />
			</div>
			<DataTable data={data} columns={orderElementColumns} filter={false} />
		</div>
	);
};

export default Page;
