import React from 'react';

import AddCommodityButton from '@/components/commodities/add-commodity-button';
import CommodityGrid from '@/components/commodities/commodity-grid';
import { Card } from '@/components/card';
import { getCommodityCardsServerAction } from '@/server-actions/commodities';
import authUser from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Commodities'
  };

const Commodities = async () => {
	const user = await authUser();
	const data = await getCommodityCardsServerAction(); // Fetch commodities with their quantities

	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-8 pl-4 pt-4 text-4xl">Commodities</h2>
				<div className="flex items-center justify-end">
					{user.role === 'ADMIN' && <AddCommodityButton />}
				</div>
				<div className="rounded-lg p-4 md:border md:border-gray-300 md:shadow-lg">
					<CommodityGrid commodities={data} />
				</div>
			</Card>
		</div>
	);
};

export default Commodities;
