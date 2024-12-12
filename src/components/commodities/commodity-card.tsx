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
    <div className="bg-[#EFD5BE] p-10 w-64 h-64 flex items-start justify-start text-2xl font-medium text-black rounded-lg border border-black">
      <div>{name}</div>
      <div>{formattedQuantity}</div>
      <div>{unit}</div>
      <div>{formattedUnitPrice}</div>
    </div>
  );
};

export default CommodityCard;
