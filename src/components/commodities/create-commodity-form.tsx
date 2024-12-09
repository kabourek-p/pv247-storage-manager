'use client';

import CommodityForm from '@/components/commodities/commodity-form';
import { createCommodityServerAction } from '@/server-actions/commodities';

const CreateCommodityForm = () => (
	<div>
		<CommodityForm
			defaultValues={{
				name: '',
				unit: 'KG'
			}}
			submitFn={createCommodityServerAction}
		/>
	</div>
);
export default CreateCommodityForm;
