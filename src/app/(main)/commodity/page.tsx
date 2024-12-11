import { Providers } from '@/app/providers';
import CreateCommodityForm from '@/components/commodities/create-commodity-form';

const Page = async () => (
	<Providers>
		<h2 className="text-4xl">Create new commodity</h2>
		<CreateCommodityForm />
	</Providers>
);

export default Page;
