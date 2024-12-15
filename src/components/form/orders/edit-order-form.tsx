'use client';

import OrderForm, {
	type OrderFormDefaultData
} from '@/components/form/orders/order-form';
import { editOrderServerAction } from '@/server-actions/orders';

const EditOrderForm = (props: {
	defaultValues: OrderFormDefaultData;
	commodities: string[];
}) => (
	<div>
		<OrderForm
			redirectPath="/orders"
			allowSaveNext={false}
			defaultValues={props.defaultValues}
			submitFn={editOrderServerAction}
			commodities={props.commodities}
		/>
	</div>
);
export default EditOrderForm;
