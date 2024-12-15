import React from 'react';

import authUser from '@/lib/auth';
import { Card } from '@/components/card';
import { DashboardLineChart } from '@/components/dashboard/dashboard-line-chart';
import { getOrderCountsServerAction } from '@/server-actions/orders';
import { getBarRestockDataServerAction } from '@/server-actions/restocks';
import RestockFreeTabs from '@/components/dashboard/dashboard-restock-free-tabs';

const Dashboard = async () => {
	const _ = await authUser();
	const ordersData = await getOrderCountsServerAction(7);
	const restockData = await getBarRestockDataServerAction();
	console.log(restockData);
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-4 text-4xl">Dashboard</h2>
				<DashboardLineChart chartData={ordersData} />
				<RestockFreeTabs chartData={restockData} />
			</Card>
		</div>
	);
};

export default Dashboard;
