import React from 'react';
import AddCommodityButton from '@/components/commodities/add-commodity-button';
import { getCommodityCard } from '@/server/commodities';
import CommodityGrid from '@/components/commodities/commodity-grid';

const Commodities = async () => {
  const data = await getCommodityCard(); // Fetch commodities with their quantities

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <AddCommodityButton />
      <CommodityGrid commodities={data} />
    </div>
  );
};

export default Commodities;
