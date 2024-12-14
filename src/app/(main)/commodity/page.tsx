import CreateCommodityForm from '@/components/form/commodities/create-commodity-form';
import { Card } from '@/components/ui/card';

const CommodityPage = async () => (
	<div className="flex items-start justify-center p-4">
			<Card>
				<h2 className="text-4xl text-center mb-6">Create new commodity</h2>
			<CreateCommodityForm />
		</Card>
	</div>
);

export default CommodityPage;
