import React from 'react';

import { getRestockRows } from '@/server-actions/restocks';
import { Card } from '@/components/card';
import RestockTable from '@/components/restocks/restocks-table';
import authUser from '@/lib/auth';

const Restocks = async () => {
	const user = await authUser();
	const data = await getRestockRows(user?.role === 'ADMIN' ? null : user.id);

	return (
		<div className="flex min-h-screen grid-rows-[20px_1fr_20px] flex-col gap-16 bg-white p-8 pt-20 text-center font-[family-name:var(--font-geist-sans)] sm:bg-gray-100 sm:p-20 sm:text-left">
			<Card className="pb-10">
				<h2 className="mb-8 text-4xl">Restocks</h2>

				<RestockTable data={data} />
			</Card>
		</div>
	);
};

export default Restocks;
