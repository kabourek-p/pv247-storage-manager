import React from 'react';
import { forbidden, notFound } from 'next/navigation';
import { type Metadata } from 'next';

import DataTable from '@/components/ui/data-table';
import { orderElementColumns } from '@/components/orders/order-table-columns';
import { getOrderData, getOrderElementRows } from '@/server-actions/orders';
import EditOrderButton from '@/components/orders/edit-order-button';
import LockOrderButton from '@/components/orders/lock-order-button';
import { Card } from '@/components/card';
import authUser from '@/lib/auth';
import { BackArrowButton } from '@/components/ui/back-arrow-button';

export const metadata: Metadata = {
	title: 'Order detail'
};

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
	const user = await authUser();

	const { id } = await params;
	const order = await getOrderData(+id);
	if (user.id !== order?.authorId && user.role !== 'ADMIN') {
		forbidden();
	}

	const data = await getOrderElementRows(+id);
	if (order === undefined) {
		notFound();
	}

	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<div className="ml-4 sm:ml-0">
					<BackArrowButton />
				</div>
				<div>
					<h2 className="py-4 text-4xl sm:p-4">
						Details of order: {order?.note}
					</h2>
				</div>
				<div className="flex space-x-3 p-4 pt-0">
					<EditOrderButton order={order} />
					<LockOrderButton order={order} />
				</div>
				{order?.invoice && (
					<span className="text-gray-700">
						Order was closed with invoice number: {order.invoice.invoiceNumber}{' '}
						on {order.invoice.date.toString()}
					</span>
				)}
				<DataTable
					data={data}
					columns={orderElementColumns}
					filter={undefined}
				/>
			</Card>
		</div>
	);
};

export default Page;
