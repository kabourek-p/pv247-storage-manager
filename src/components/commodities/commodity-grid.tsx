import React from 'react';
import type { Decimal } from '@prisma/client/runtime/library';
import type { Unit } from '@prisma/client';

import CommodityCard from '@/components/commodities/commodity-card';

type CommodityGridProps = {
	commodities: {
		name: string;
		quantity: Decimal | number;
		unit: Unit;
		unitPrice: Decimal | number;
	}[];
};

const CommodityGrid: React.FC<CommodityGridProps> = ({ commodities }) => (
	<div className="flex flex-wrap gap-4">
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
