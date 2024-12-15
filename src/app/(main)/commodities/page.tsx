import React from 'react';

import AddCommodityButton from '@/components/commodities/add-commodity-button';
import CommodityGrid from '@/components/commodities/commodity-grid';
import { Card } from '@/components/card';
import { getCommodityCardsServerAction } from '@/server-actions/commodities';
import authUser from '@/lib/auth';

const Commodities = async () => {
	const user = await authUser();
	const data = await getCommodityCardsServerAction(); // Fetch commodities with their quantities

	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-4 pl-4 pt-4 text-4xl">Commodities</h2>
				{user.role === 'ADMIN' && <AddCommodityButton />}
				<CommodityGrid commodities={data} />
			</Card>
		</div>
	);
};

export default Commodities;
