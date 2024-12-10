import React from 'react';

import AddOrderButton from '@/components/orders/add-order-button';
import OrderTable from '@/components/orders/order-table';
import { getOrderRows } from '@/server-actions/orders';
import { columns } from '@/components/orders/order-table-columns';

const Page = async () => {
	const data = await getOrderRows();
	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<AddOrderButton />
			<OrderTable data={data} columns={columns} />
		</div>
	);
};

export default Page;
