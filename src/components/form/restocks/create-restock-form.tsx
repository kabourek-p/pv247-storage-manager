'use client';

import RestockForm from '@/components/form/restocks/restock-form';
import { createRestockServerAction } from '@/server-actions/restocks';

const CreateRestockForm = (props: { commodities: string[] }) => (
	<div>
		<RestockForm
			defaultValues={{
				commodity: '',
				quantity: 0,
				unitPrice: 0,
				supplierName: '',
				invoiceNumber: ''
			}}
			submitFn={createRestockServerAction}
			commodities={props.commodities}
		/>
	</div>
);
export default CreateRestockForm;
