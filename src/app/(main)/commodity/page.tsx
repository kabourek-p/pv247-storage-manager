import { Providers } from '@/app/providers';
import CreateCommodityForm from '@/components/commodities/create-commodity-form';
import { getAvailableCommodities } from '@/server-actions/commodities';

const Page = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<Providers>
			<h2 className="text-4xl">Create new commodity</h2>
			<CreateCommodityForm/>
		</Providers>
	);
};

export default Page;
