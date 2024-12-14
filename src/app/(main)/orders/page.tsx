import React from 'react';
import { redirect } from 'next/navigation';

import AddOrderButton from '@/components/orders/add-order-button';
import { getOrderRows } from '@/server-actions/orders';
import DataTable from '@/components/ui/data-table';
import { orderColumns } from '@/components/orders/order-table-columns';
import { Card } from '@/components/ui/card';

const Page = async () => {
	const data = await getOrderRows();

	const handleRowClick = async (id: string) => {
		'use server';
		redirect(`/order/${id}`);
	};

	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<Card>
				<h2 className="mb-4 text-4xl">List of orders</h2>

				<div className="lg:top-58 mb-4 lg:absolute lg:right-28">
					<AddOrderButton />
				</div>
				<DataTable
					data={data}
					columns={orderColumns}
					rowClickHandler={handleRowClick}
					filter
				/>
			</Card>
		</div>
	);
};

export default Page;
