import CreateCommodityForm from '@/components/form/commodities/create-commodity-form';
import { Card } from '@/components/ui/card';

const CommodityPage = async () => (
	<div className="flex items-start justify-center p-4">
		<Card>
			<h2 className="mb-6 text-center text-4xl">Create new commodity</h2>
			<CreateCommodityForm />
		</Card>
	</div>
);

export default CommodityPage;
