import React from 'react';

import CommodityGrid from '@/components/commodities/commodity-grid';
import { getCommodityCardsServerAction } from '@/server-actions/commodities';
// import authUser from '@/lib/auth';
import { Card } from '@/components/card';
import { DashboardLineChart } from '@/components/dashboard/dashboard-line-chart';
import { getOrderCountsServerAction } from '@/server-actions/orders';
import { getBarRestockDataServerAction } from '@/server-actions/restocks';
import RestockFreeTabs from '@/components/dashboard/dashboard-restock-free-tabs';

const Dashboard = async () => {
	// const _ = await authUser();
	const ordersData = await getOrderCountsServerAction(7);
	const restockData = await getBarRestockDataServerAction();
	const commodityData = await getCommodityCardsServerAction();
	console.log(restockData);
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-4 text-4xl">Dashboard</h2>
				<div className="mb-8 rounded-md border p-2">
					<h2 className="mb-4 pl-4 pt-4 text-4xl">Commodities</h2>
					<CommodityGrid
						commodities={commodityData}
						maxCards={5}
						sortingEnabled
					/>
				</div>
				<DashboardLineChart chartData={ordersData} />
				<RestockFreeTabs chartData={restockData} />
			</Card>
		</div>
	);
};

export default Dashboard;
