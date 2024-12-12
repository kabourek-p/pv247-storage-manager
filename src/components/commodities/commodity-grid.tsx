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
	<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
