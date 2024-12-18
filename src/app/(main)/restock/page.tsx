import CreateRestockForm from '@/components/form/restocks/create-restock-form';
import { Card } from '@/components/card';
import { getAvailableCommodities } from '@/server-actions/commodities';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create restock'
  };

const RestockPage = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card>
				<CreateRestockForm
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default RestockPage;
