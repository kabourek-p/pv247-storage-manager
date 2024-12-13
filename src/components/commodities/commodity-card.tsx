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
		quantity instanceof Decimal ? quantity.toString() : quantity;
	const formattedUnitPrice =
		unitPrice instanceof Decimal ? unitPrice.toString() : unitPrice;

	return (
		<div className="flex h-80 w-72 flex-col items-center justify-between rounded-lg border border-black bg-[#EFD5BE] p-6 text-black shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
			<div className="self-start text-xl font-semibold text-gray-800">
				{name}
			</div>

			<div className="flex w-full flex-grow items-center justify-center">
				<div className="text-5xl font-extrabold text-gray-900">
					{formattedQuantity}
				</div>
				<div className="ml-2 text-2xl font-medium text-gray-700">{unit}</div>
			</div>

			<div className="mt-4 self-start text-2xl font-normal text-gray-700">
				{formattedUnitPrice} CZK
			</div>
		</div>
	);
};

export default CommodityCard;
