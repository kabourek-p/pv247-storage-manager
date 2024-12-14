import React from 'react';
import type { Unit } from '@prisma/client';

import CommodityCard from '@/components/commodities/commodity-card';

type CommodityGridProps = {
	commodities: {
		name: string;
		quantity: number;
		unit: Unit;
		unitPrice: number;
	}[];
};

const CommodityGrid: React.FC<CommodityGridProps> = ({ commodities }) => (
	<div className="flex flex-wrap justify-center gap-10 sm:justify-start">
		{commodities.map(commodity => (
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
