import React from 'react';
import { type Metadata } from 'next';

import CommodityGrid from '@/components/commodities/commodity-grid';
import { getCommodityCardsServerAction } from '@/server-actions/commodities';
import { Card } from '@/components/card';
import { DashboardLineChart } from '@/components/dashboard/dashboard-line-chart';
import { getOrderCountsServerAction } from '@/server-actions/orders';
import { getBarRestockDataServerAction } from '@/server-actions/restocks';
import RestockFreeTabs from '@/components/dashboard/dashboard-restock-free-tabs';

export const metadata: Metadata = {
	title: 'Dashboard'
};

const Dashboard = async () => {
	const ordersData = await getOrderCountsServerAction(7);
	const restockData = await getBarRestockDataServerAction();
	const commodityData = await getCommodityCardsServerAction();
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-4 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card>
				<h2 className="mb-8 pl-4 pt-4 text-4xl">Commodities</h2>
				<CommodityGrid
					commodities={commodityData}
					sortingEnabled
					horizontalScroll
				/>
			</Card>
			<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
				<Card className="flex h-full items-center justify-center">
					<RestockFreeTabs chartData={restockData} />
				</Card>
				<Card className="grid h-full items-center">
					<DashboardLineChart chartData={ordersData} />
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
