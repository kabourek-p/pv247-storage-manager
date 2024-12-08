'use client';

import OrderForm, { type OrderFormSchema } from '@/components/orders/OrderForm';

const CreateOrderForm = () => {
	const defaultValues = {
		name: '',
		type: ''
	};

	const mutationFn = async (data: OrderFormSchema) => {
		const response = await fetch('/api/movie', {
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
				defaultValues={defaultValues}
				// typeSelector={typeSelector}

				mutationFn={mutationFn}
			/>
		</div>
	);
};
export default CreateOrderForm;
