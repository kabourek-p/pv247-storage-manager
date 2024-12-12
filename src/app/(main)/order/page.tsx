import { Providers } from '@/app/providers';
import CreateOrderForm from '@/components/form/orders/create-order-form';
import { getAvailableCommodities } from '@/server-actions/commodities';

const Page = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<Providers>
			<h2 className="text-4xl">Create new order</h2>
			<CreateOrderForm
				commodities={commodities.map(commodity => commodity.name)}
			/>
		</Providers>
	);
};

export default Page;
