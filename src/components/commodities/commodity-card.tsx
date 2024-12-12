import { Unit } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import React from 'react';

interface CommodityCardProps {
  name: string;
  quantity: Decimal | number;
  unit: Unit;
  unitPrice: Decimal | number;
}

const CommodityCard: React.FC<CommodityCardProps> = ({ name, quantity, unit, unitPrice }) => {
  const formattedQuantity = quantity instanceof Decimal ? quantity.toString() : quantity;
  const formattedUnitPrice = unitPrice instanceof Decimal ? unitPrice.toString() : unitPrice;

  return (
    <div className="bg-[#EFD5BE] p-6 w-72 h-80 flex flex-col justify-between items-center text-black rounded-lg border border-black shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="text-xl font-semibold text-gray-800 self-start">{name}</div>

      <div className="flex items-center justify-center w-full flex-grow">
        <div className="text-5xl font-extrabold text-gray-900">{formattedQuantity}</div>
        <div className="text-2xl font-medium ml-2 text-gray-700">{unit}</div>
      </div>

      <div className="mt-4 text-2xl font-normal text-gray-700 self-start">{formattedUnitPrice} CZK</div>
    </div>
  );
};

export default CommodityCard;
