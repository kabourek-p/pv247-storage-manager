import React from 'react';

import AddOrderButton from '@/components/orders/add-order-button';
import OrderTable from "@/components/orders/order-table";

const Page = () => (
	<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
		<AddOrderButton />
		<OrderTable />
	</div>
);
export default Page;
