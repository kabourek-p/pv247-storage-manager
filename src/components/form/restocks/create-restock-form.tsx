'use client';

import RestockForm from '@/components/form/restocks/restock-form';
import { createRestockServerAction } from '@/server-actions/restocks';
import { useLoggedInUser } from '@/context/logged-in-user';
import { BackArrowButton } from '@/components/ui/back-arrow-button';

const CreateRestockForm = (props: { commodities: string[] }) => {
	const { user } = useLoggedInUser();
	return (
		<div>
			<div className="pb-6 sm:ml-0">
				<BackArrowButton />
			</div>
			<div className="sm:content-center sm:p-2">
				<h2 className="mb-3 text-center text-4xl">Register new restock</h2>
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
		</div>
	);
};
export default CreateRestockForm;
