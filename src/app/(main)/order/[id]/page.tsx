import React from 'react';

import DataTable from '@/components/ui/data-table';
import { orderElementColumns } from '@/components/orders/order-table-columns';
import { getOrderData, getOrderElementRows } from '@/server-actions/orders';
import EditOrderButton from '@/components/orders/edit-order-button';
import LockOrderButton from '@/components/orders/lock-order-button';

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
	const { id } = await params;
	const data = await getOrderElementRows(+id);
	const order = await getOrderData(+id);
	if (order === undefined) {
		throw new Error();
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<div>
				<h2 className="text-4xl">Details of order: {order?.note}</h2>
			</div>
			<div className="flex space-x-3">
				<EditOrderButton order={order} />
				<LockOrderButton order={order} />
			</div>
			{order?.invoice && (
				<span className="text-gray-700">
					Order was closed with invoice number: {order.invoice.invoiceNumber} on{' '}
					{order.invoice.date.toString()}
				</span>
			)}
			<DataTable data={data} columns={orderElementColumns} filter={false} />
		</div>
	);
};

export default Page;