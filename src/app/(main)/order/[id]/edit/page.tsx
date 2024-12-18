import { forbidden, notFound } from 'next/navigation';
import React from 'react';

import { getAvailableCommodities } from '@/server-actions/commodities';
import EditOrderForm from '@/components/form/orders/edit-order-form';
import { getOrderData } from '@/server-actions/orders';
import { Card } from '@/components/card';
import authUser from '@/lib/auth';
import { BackArrowButton } from '@/components/ui/back-arrow-button';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Edit order'
};

const OrderEditPage = async ({
	params
}: {
	params: Promise<{ id: number }>;
}) => {
	const user = await authUser();
	const { id } = await params;
	const order = await getOrderData(+id);

	if (user.id !== order?.authorId && user.role !== 'ADMIN') {
		forbidden();
	}

	const commodities = await getAvailableCommodities();
	const orderData = await getOrderData(+id);

	if (order?.id === undefined || orderData === undefined) {
		notFound();
	}

	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<Card>
				<div className="ml-4 sm:ml-0">
					<BackArrowButton />
				</div>
				<h2 className="mb-8 pl-4 pt-4 text-4xl">Edit order</h2>
				<EditOrderForm
					defaultValues={orderData}
					commodities={commodities.map(commodity => commodity.name)}
				/>
			</Card>
		</div>
	);
};

export default OrderEditPage;
