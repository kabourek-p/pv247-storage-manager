'use client';

import RestockForm from '@/components/form/restocks/restock-form';
import { createRestockServerAction } from '@/server-actions/restocks';
import { useLoggedInUser } from '@/context/logged-in-user';

const CreateRestockForm = (props: { commodities: string[] }) => {
	const { user } = useLoggedInUser();
	return (
		<div>
			<RestockForm
				defaultValues={{
					authorId: user?.id ?? '',
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
};
export default CreateRestockForm;
