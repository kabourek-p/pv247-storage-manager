import React from 'react';

import { getOrderRows } from '@/server-actions/orders';
import { Card } from '@/components/card';
import OrderTable from '@/components/orders/order-table';
import authUser from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Orders'
};

const OrdersPage = async () => {
	const user = await authUser();
	const data = await getOrderRows(user?.role === 'ADMIN' ? null : user.id);
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-8 text-4xl">List of orders</h2>

				<OrderTable data={data} />
			</Card>
		</div>
	);
};

export default OrdersPage;
