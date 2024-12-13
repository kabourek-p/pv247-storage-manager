'use server';

import { getAvailableCommodities } from '@/server-actions/commodities';
import EditOrderForm from '@/components/form/orders/edit-order-form';
import { getOrderData } from '@/server-actions/orders';

const OrderEditPage = async ({
	params
}: {
	params: Promise<{ id: number }>;
}) => {
	const { id } = await params;
	const commodities = await getAvailableCommodities();
	const orderData = await getOrderData(+id);
	if (orderData === undefined) {
		throw new Error();
	}
	return (
		<div className="p-4">
			<h2 className="text-4xl">Edit order</h2>
			<EditOrderForm
				defaultValues={orderData}
				commodities={commodities.map(commodity => commodity.name)}
			/>
		</div>
	);
};

export default OrderEditPage;
