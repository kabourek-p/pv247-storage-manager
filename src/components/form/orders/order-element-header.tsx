import React from 'react';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrderElementHeader = () => (
	<TableHeader className="hidden bg-primary-light text-center font-bold md:table-header-group">
		<TableRow>
			<TableHead className="border-gray-300 px-4 py-2 text-center" />
			<TableHead className="w-fit border-l border-r px-4 py-2 text-center">
				Commodity
			</TableHead>
			<TableHead className="w-fit border-l border-r border-gray-300 px-4 py-2 text-center">
				Amount per Piece
			</TableHead>
			<TableHead className="w-fit border-l border-r border-gray-300 px-4 py-2 text-center">
				Price per Unit (CZK)
			</TableHead>
			<TableHead className="w-fit border-l border-r border-gray-300 px-4 py-2 text-center">
				Number of Pieces
			</TableHead>
			<TableHead className="border-l border-gray-300 px-4 py-2 text-center">
				Note
			</TableHead>
		</TableRow>
	</TableHeader>
);

export default OrderElementHeader;
