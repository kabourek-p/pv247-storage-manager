"use client"

import React from 'react';

import CommodityCard from '@/components/commodities/commodity-card';

type CommodityGridProps = {
	commodities: {
		name: string;
		quantity: number;
		unit: string;
		unitPrice: number;
		date: Date;
	}[];
	maxCards?: number;
};

const CommodityGrid: React.FC<CommodityGridProps> = ({ commodities, maxCards }) => (
	<div className="flex flex-wrap justify-center gap-10 sm:justify-start">
		{commodities
			.slice(0, maxCards ?? commodities.length)
			.map(commodity => (
				<CommodityCard
					key={commodity.name}
					name={commodity.name}
					quantity={commodity.quantity}
					unit={commodity.unit}
					unitPrice={commodity.unitPrice}
				/>
			))}
	</div>
);

export default CommodityGrid;
