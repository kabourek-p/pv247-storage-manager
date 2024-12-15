import React from 'react';
import type { Unit } from '@prisma/client';

import CommodityCard from '@/components/commodities/commodity-card';

type CommodityGridProps = {
	commodities: {
		name: string;
		quantity: number;
		unit: Unit;
		unitPrice: number;
		date: Date;
	}[];
	maxCards?: number; // Optional prop to limit the number of cards displayed
};

const CommodityGrid: React.FC<CommodityGridProps> = ({ commodities, maxCards }) => (
	<div className="flex flex-wrap justify-center gap-10 sm:justify-start">
		{commodities
			.slice(0, maxCards ?? commodities.length) // Limit the number of cards if maxCards is provided
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
