'use client';

import React, { useEffect } from 'react';

import OrderForm, {
	type OrderFormDefaultData
} from '@/components/form/orders/order-form';
import { editOrderServerAction } from '@/server-actions/orders';

const EditOrderForm = (props: {
	defaultValues: OrderFormDefaultData;
	commodities: string[];
}) => {
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
				defaultValues={props.defaultValues}
				submitFn={editOrderServerAction}
				commodities={props.commodities}
			/>
		</div>
	);
};
export default EditOrderForm;
