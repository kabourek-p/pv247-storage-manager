import { Providers } from '@/app/providers';
import CreateRestockForm from '@/components/restocks/create-restock-form';
import { getAvailableCommodities } from '@/server-actions/commodities';

const Page = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<Providers>
			<h2 className="text-4xl">Register new restock</h2>
			<CreateRestockForm
				commodities={commodities.map(commodity => commodity.name)}
			/>
		</Providers>
	);
};

export default Page;
