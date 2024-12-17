'use client';

import CommodityForm from '@/components/form/commodities/commodity-form';
import { BackArrowButton } from '@/components/ui/back-arrow-button';
import { createCommodityServerAction } from '@/server-actions/commodities';

const CreateCommodityForm = () => (
	<div>
		<div className="pb-6 sm:ml-0">
			<BackArrowButton />
		</div>
		<div className="sm:content-center sm:p-2">
			<h2 className="mb-6 text-center text-4xl">Create new commodity</h2>
			<CommodityForm
				defaultValues={{
					name: '',
					unit: 'KG'
				}}
				submitFn={createCommodityServerAction}
			/>
		</div>
	</div>
);
export default CreateCommodityForm;
