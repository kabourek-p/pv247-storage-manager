'use client';

import React, { useEffect } from 'react';

import OrderForm from '@/components/form/orders/order-form';
import { createOrderServerAction } from '@/server-actions/orders';

const CreateOrderForm = (props: { commodities: string[] }) => {
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return (
		<div>
			<OrderForm
				defaultValues={{
					note: '',
					orders: [
						{ commodity: '', quantity: 0, unitPrice: 0, numUnits: 0, note: '' }
					]
				}}
				submitFn={createOrderServerAction}
				commodities={props.commodities}
			/>
		</div>
	);
};
export default CreateOrderForm;
