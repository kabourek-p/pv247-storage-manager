import { forbidden } from 'next/navigation';
import { type Metadata } from 'next';

import CreateCommodityForm from '@/components/form/commodities/create-commodity-form';
import { Card } from '@/components/card';
import authUser from '@/lib/auth';

export const metadata: Metadata = {
	title: 'Create commodity'
};

const CommodityPage = async () => {
	const user = await authUser();
	if (user.role !== 'ADMIN') {
		forbidden();
	}

	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card>
				<CreateCommodityForm />
			</Card>
		</div>
	);
};

export default CommodityPage;
