'use server';

import { getAvailableCommodities } from '@/server-actions/commodities';
import EditOrderForm from '@/components/form/orders/edit-order-form';
import { getOrderData } from '@/server-actions/orders';
import { Card } from '@/components/ui/card';

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
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<Card>
				<h2 className="mb-4 text-4xl">Edit order</h2>
				<EditOrderForm
					defaultValues={orderData}
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default OrderEditPage;
