import React from 'react';

import { cn } from '@/lib/cn';

type CommodityCardProps = {
	name: string;
	quantity: number;
	unit: string;
	unitPrice: number;
	horizontalScroll?: boolean;
};

const CommodityCard: React.FC<CommodityCardProps> = ({
	name,
	quantity,
	unit,
	unitPrice,
	horizontalScroll = false
}) => {
	const formattedQuantity = quantity
		.toLocaleString('en-US')
		.replace(/,/g, '\u202F');

	const formattedUnitPrice = unitPrice
		.toLocaleString('en-US')
		.replace(/,/g, '\u202F');

	const formattedUnit =
		unit === 'PIECE' && Number(quantity) > 1 ? `${unit}S` : unit;

	return (
		<div
			className={cn(
				'flex h-40 w-28 flex-col items-center justify-between rounded-lg border border-black bg-gradient-to-b from-secondary-light to-secondary p-4 text-black shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl md:h-64 md:w-56',
				horizontalScroll && 'md:min-w-56'
			)}
		>
			<div className="self-start text-lg font-semibold text-gray-800">
				{name}
			</div>

			<div className="flex w-full flex-grow items-center justify-center">
				<div className="text-2xl font-extrabold text-gray-900 md:text-4xl">
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
