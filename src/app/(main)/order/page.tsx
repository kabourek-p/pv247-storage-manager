import CreateOrderForm from '@/components/form/orders/create-order-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';

const OrderPage = async () => {
	const commodities = await getAvailableCommodities();
	return (
		<div className="p-4">
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
