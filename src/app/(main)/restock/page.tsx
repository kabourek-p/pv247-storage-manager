import CreateRestockForm from '@/components/form/restocks/create-restock-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';

const RestockPage = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="">
				<h2 className="mb-3 text-center text-4xl">Register new restock</h2>
				<CreateRestockForm
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default RestockPage;
