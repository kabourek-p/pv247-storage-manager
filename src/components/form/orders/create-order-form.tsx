'use client';

import React, { useEffect } from 'react';
import { type User } from '@prisma/client';

import OrderForm from '@/components/form/orders/order-form';
import { createOrderServerAction } from '@/server-actions/orders';
import { useLoggedInUser } from '@/context/logged-in-user';

const CreateOrderForm = (props: {
	loggedInUser: User;
	commodities: string[];
}) => {
	const { user } = useLoggedInUser();

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	});

	return (
		<div>
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
	);
};
export default CreateOrderForm;
