import React from 'react';

const OrderElementHeader = () => (
	<thead className="bg-primary-light font-bold">
		<tr>
			<th className="1/22 border border-gray-300 bg-white px-4 py-2" />
			<th className="w-fit border border-gray-300 px-4 py-2">Commodity</th>
			<th className="w-fit border border-gray-300 px-4 py-2">
				Quantity Per Unit
			</th>
			<th className="w-fit border border-gray-300 px-4 py-2">Unit Price</th>
			<th className="w-fit border border-gray-300 px-4 py-2">
				Number of Units
			</th>
			<th className="w-1/4 border border-gray-300 px-4 py-2">Note</th>
		</tr>
	</thead>
);

export default OrderElementHeader;
