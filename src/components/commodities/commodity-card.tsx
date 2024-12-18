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
				'flex min-h-40 min-w-28 flex-col items-center justify-between rounded-lg border border-black bg-gradient-to-b from-secondary-light to-secondary p-4 text-black shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl md:h-64 md:w-56',
				horizontalScroll && 'md:min-w-56'
			)}
		>
			<div className="self-start text-xs font-semibold text-gray-800 sm:text-sm md:text-lg">
				{name}
			</div>

			<div className="flex w-full flex-grow items-center justify-center">
				<div className="text-lg font-extrabold text-gray-900 sm:text-xl md:text-4xl">
					{formattedQuantity}
				</div>
				<div className="text-md ml-2 font-medium text-gray-700 md:text-xl">
					{formattedUnit}
				</div>
			</div>

			<div className="text-md mt-3 self-start font-normal text-gray-800 sm:text-lg md:text-xl">
				{formattedUnitPrice} CZK
			</div>
		</div>
	);
};

export default CommodityCard;
