import CreateOrderForm from '@/components/form/orders/create-order-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';

const OrderPage = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<Card>
				<h2 className="mb-4 text-4xl">Create new order</h2>

				<CreateOrderForm
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default OrderPage;
