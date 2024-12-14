import CreateCommodityForm from '@/components/form/commodities/create-commodity-form';
import { Card } from '@/components/ui/card';

const CommodityPage = async () => (
	<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
		<Card className="pb-10">
			<h2 className="mb-6 text-center text-4xl">Create new commodity</h2>
			<CreateCommodityForm />
		</Card>
	</div>
);

export default CommodityPage;
