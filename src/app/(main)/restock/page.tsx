import CreateRestockForm from '@/components/restocks/create-restock-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';

const RestockPage = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<div className="p-4">
			<Card>
				<h2 className="text-4xl">Register new restock</h2>
				<CreateRestockForm
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default RestockPage;
