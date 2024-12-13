import React from 'react';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrderElementHeader = () => (
	<TableHeader className="bg-primary-light font-bold">
		<TableRow>
			<TableHead className="1/22b border-gray-300 px-4 py-2" />
			<TableHead className="w-fit border-l border-r px-4 py-2">
				Commodity
			</TableHead>
			<TableHead className="w-fit border-l border-r border-gray-300 px-4 py-2">
				Quantity Per Unit
			</TableHead>
			<TableHead className="w-fit border-l border-r border-gray-300 px-4 py-2">
				Unit Price
			</TableHead>
			<TableHead className="w-fit border-l border-r border-gray-300 px-4 py-2">
				Number of Units
			</TableHead>
			<TableHead className="w-1/4 border-l border-gray-300 px-4 py-2">
				Note
			</TableHead>
		</TableRow>
	</TableHeader>
);

export default OrderElementHeader;
