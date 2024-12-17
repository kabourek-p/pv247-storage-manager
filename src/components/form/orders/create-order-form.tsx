'use client';

import React from 'react';
import { type User } from '@prisma/client';

import OrderForm from '@/components/form/orders/order-form';
import { createOrderServerAction } from '@/server-actions/orders';
import { useLoggedInUser } from '@/context/logged-in-user';
import { BackArrowButton } from '@/components/ui/back-arrow-button';

const CreateOrderForm = (props: {
	loggedInUser: User;
	commodities: string[];
}) => {
	const { user } = useLoggedInUser();
	return (
		<div>
			<div className="ml-4 sm:ml-0">
				<BackArrowButton />
			</div>
			<div className="sm:content-center sm:p-2">
				<h2 className="mb-8 pl-4 pt-4 text-4xl">Create new order</h2>
				<OrderForm
					redirectPath="/orders"
					defaultValues={{
						note: '',
						authorId: user?.id ?? '',
						orders: [
							{
								id: undefined,
								commodity: '',
								unitQuantity: 0,
								unitPrice: 0,
								numUnits: 0,
								note: ''
							}
						]
					}}
					submitFn={createOrderServerAction}
					commodities={props.commodities}
					allowSaveNext
				/>
			</div>
		</div>
	);
};
export default CreateOrderForm;
