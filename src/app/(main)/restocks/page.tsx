import React from 'react';
import AddRestockButton from '@/components/restocks/add-restock-button';

const Restocks = async () => {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <AddRestockButton />
    </div>
  );
};

export default Restocks;