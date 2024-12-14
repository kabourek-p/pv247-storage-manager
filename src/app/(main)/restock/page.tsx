import CreateRestockForm from '@/components/form/restocks/create-restock-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';

const RestockPage = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<div className="flex items-start justify-center p-4">
			<Card>
				<h2 className="mb-6 text-center text-4xl">Register new restock</h2>
				<CreateRestockForm
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default RestockPage;
