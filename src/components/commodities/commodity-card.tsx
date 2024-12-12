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
    <div className="bg-[#EFD5BE] p-6 w-64 h-64 flex flex-col justify-between items-center text-black rounded-lg border border-black">
      <div className="text-lg font-semibold self-start">{name}</div>

      <div className="flex items-center justify-center w-full flex-grow">
        <div className="text-4xl font-bold">{formattedQuantity}</div>
        <div className="text-xl font-medium ml-2">{unit}</div>
      </div>

      <div className="mt-4 text-xl font-normal text-gray-700 self-start">{formattedUnitPrice} Czk</div>
    </div>
  );
};

export default CommodityCard;
