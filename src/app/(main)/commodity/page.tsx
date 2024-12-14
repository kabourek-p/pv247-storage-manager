import CreateCommodityForm from '@/components/form/commodities/create-commodity-form';
import { Card } from '@/components/ui/card';

const CommodityPage = async () => (
	<div className="p-4">
		<h2 className="text-4xl">Create new commodity</h2>
		<Card>
			<CreateCommodityForm />
		</Card>
	</div>
);

export default CommodityPage;
