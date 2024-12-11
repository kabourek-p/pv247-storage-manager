'use client';

import RestockForm from '@/components/restocks/restock-form';
import { createRestockServerAction } from '@/server-actions/restocks';

const CreateRestockForm = (props: { commodities: string[] }) => (
	<div>
		<RestockForm
			defaultValues={{
				note: '',
				restocks: [
					{
						commodity: '',
						quantity: 0,
						unitPrice: 0,
						supplierName: '0',
						invoiceNumber: ''
					}
				]
			}}
			submitFn={createRestockServerAction}
			commodities={props.commodities}
		/>
	</div>
);
export default CreateRestockForm;
