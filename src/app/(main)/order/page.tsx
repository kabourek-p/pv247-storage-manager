import { Suspense } from 'react';

import CreateOrderForm from '@/components/form/orders/create-order-form';
import { Card } from '@/components/ui/card';
import { getAvailableCommodities } from '@/server-actions/commodities';
import authUser from '@/lib/auth';

const OrderPage = async () => {
	const user = await authUser();
	const commodities = await getAvailableCommodities();
	return (
		<Suspense>
			<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
				<Card>
					<h2 className="mb-4 text-4xl">Create new order</h2>
					<CreateOrderForm
						loggedInUser={user}
						commodities={commodities.map(commodity => commodity.name)}
					/>
				</Card>
			</div>
		</Suspense>
	);
};

export default OrderPage;
