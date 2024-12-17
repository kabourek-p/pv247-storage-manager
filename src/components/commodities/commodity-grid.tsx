'use client';

import React, { useState } from 'react';

import CommodityCard from '@/components/commodities/commodity-card';
import { cn } from '@/lib/cn';

import { Button } from '../ui/button';

type CommodityGridProps = {
	commodities: {
		name: string;
		quantity: number;
		unit: string;
		unitPrice: number;
		date: Date;
	}[];
	maxCards?: number;
	sortingEnabled?: boolean;
	horizontalScroll?: boolean;
};

const CommodityGrid: React.FC<CommodityGridProps> = ({
	commodities,
	maxCards,
	sortingEnabled = false,
	horizontalScroll = false
}) => {
	const [sortOrder, setSortOrder] = useState<
		'highestPrice' | 'lowestPrice' | 'recentDate' | null
	>(null);

	const toggleSortOrder = (
		order: 'highestPrice' | 'lowestPrice' | 'recentDate'
	) => {
		setSortOrder(current => (current === order ? null : order));
	};

	const sortedCommodities = [...commodities].sort((a, b) => {
		switch (sortOrder) {
			case 'highestPrice':
				return b.unitPrice - a.unitPrice;
			case 'lowestPrice':
				return a.unitPrice - b.unitPrice;
			case 'recentDate':
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			default:
				return 0;
		}
	});

	return (
		<div className="flex flex-col gap-3 md:gap-10">
			{sortingEnabled && (
				<div className="mb-4 flex gap-4">
					<Button
						onClick={() => toggleSortOrder('highestPrice')}
						colorType={sortOrder === 'highestPrice' ? 'primary' : 'secondary'}
						className="rounded-md px-4 py-2 text-white"
					>
						Highest Price
					</Button>
					<Button
						onClick={() => toggleSortOrder('lowestPrice')}
						className={`rounded-md px-4 py-2 ${sortOrder === 'lowestPrice' ? 'bg-primary' : 'bg-secondary'} text-white`}
					>
						Lowest Price
					</Button>
					<Button
						onClick={() => toggleSortOrder('recentDate')}
						className={`rounded-md px-4 py-2 ${sortOrder === 'recentDate' ? 'bg-primary' : 'bg-secondary'} text-white`}
					>
						Recent Date
					</Button>
				</div>
			)}

			<div
				className={cn(
					'flex flex-wrap gap-3 md:gap-10',
					horizontalScroll && 'flex-nowrap overflow-x-scroll'
				)}
			>
				{sortedCommodities
					.slice(0, maxCards ?? commodities.length)
					.map(commodity => (
						<CommodityCard
							key={commodity.name}
							name={commodity.name}
							quantity={commodity.quantity}
							unit={commodity.unit}
							unitPrice={commodity.unitPrice}
							horizontalScroll={horizontalScroll}
						/>
					))}
			</div>
		</div>
	);
};

export default CommodityGrid;
