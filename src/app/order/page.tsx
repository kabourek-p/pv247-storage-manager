import { Providers } from '@/app/providers';
import CreateOrderForm from '@/components/orders/CreateOrderForm';

const Page = async () => (
	<Providers>
		<h2 className="text-4xl">Create new order</h2>
		<CreateOrderForm />;
	</Providers>
);

export default Page;
