import React from 'react';

import AddOrderButton from '@/components/orders/add-order-button';
import { getOrderRows } from '@/server-actions/orders';
import { Card } from '@/components/ui/card';
import OrderTable from '@/components/orders/order-table';
import authUser from '@/lib/auth';

const Page = async () => {
	const user = await authUser();
	//TODO  admin send null
	const data = await getOrderRows(user.id);
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-4 text-4xl">List of orders</h2>

				<div className="lg:top-58 mb-4 lg:absolute lg:right-28">
					<AddOrderButton />
				</div>
				<OrderTable data={data} />
			</Card>
		</div>
	);
};

export default Page;
