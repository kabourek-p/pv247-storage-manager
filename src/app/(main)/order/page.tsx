import CreateOrderForm from '@/components/form/orders/create-order-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';
import authUser from '@/lib/auth';

const OrderPage = async () => {
	const user = await authUser();
	const commodities = await getAvailableCommodities();
	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-24 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-4 pl-4 pt-4 text-4xl">Create new order</h2>
				<CreateOrderForm
					loggedInUser={user}
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default OrderPage;
