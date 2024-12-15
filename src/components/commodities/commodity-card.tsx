import type { Unit } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import React from 'react';

type CommodityCardProps = {
	name: string;
	quantity: Decimal | number;
	unit: Unit;
	unitPrice: Decimal | number;
};

const CommodityCard: React.FC<CommodityCardProps> = ({
	name,
	quantity,
	unit,
	unitPrice
}) => {
	const formattedQuantity = 
		typeof quantity === 'number' || quantity instanceof Decimal
			? Number(quantity).toLocaleString('en-US').replace(/,/g, '\u202F')
			: quantity;

	const formattedUnitPrice = 
		typeof unitPrice === 'number' || unitPrice instanceof Decimal
			? Number(unitPrice).toLocaleString('en-US').replace(/,/g, '\u202F')
			: unitPrice;

	const formattedUnit = 
		unit === 'PIECE' && Number(quantity) > 1 ? `${unit}S` : unit;

	return (
		<div className="flex h-64 w-56 flex-col items-center justify-between rounded-lg border border-black bg-gradient-to-b from-secondary-light to-secondary p-4 text-black shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
			<div className="self-start text-lg font-semibold text-gray-800">
				{name}
			</div>

			<div className="flex w-full flex-grow items-center justify-center">
				<div className="text-4xl font-extrabold text-gray-900">
					{formattedQuantity}
				</div>
				<div className="ml-2 text-xl font-medium text-gray-700">
					{formattedUnit}
				</div>
			</div>

			<div className="mt-3 self-start text-xl font-normal text-gray-800">
				{formattedUnitPrice} CZK
			</div>
		</div>
	);
};

export default CommodityCard;
