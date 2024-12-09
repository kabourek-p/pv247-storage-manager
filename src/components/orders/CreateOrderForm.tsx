'use client';

import OrderForm from '@/components/orders/OrderForm';
import { createOrderServerAction } from '@/server-actions/orders';

const CreateOrderForm = (props: { commodities: string[] }) => (
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
export default CreateOrderForm;
