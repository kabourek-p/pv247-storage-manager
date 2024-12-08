'use client';

import OrderForm, { type OrderFormSchema } from '@/components/orders/OrderForm';

const CreateOrderForm = () => {
	const mutationFn = async (data: OrderFormSchema) => {
		const response = await fetch('/api/order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error('Failed to submit the movie');
		}

		return response.json();
	};

	return (
		<div>
			<OrderForm
				defaultValues={{
					note: '',
					orders: [
						{ commodity: '', quantity: 0, unitPrice: 0, numUnits: 0, note: '' }
					]
				}}
				// typeSelector={typeSelector}
				mutationFn={mutationFn}
			/>
		</div>
	);
};
export default CreateOrderForm;
