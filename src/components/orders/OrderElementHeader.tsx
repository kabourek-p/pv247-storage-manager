import React from 'react';

const OrderElementHeader = () => (
	<thead className="bg-lightblue font-bold">
		<tr>
			<th className="border border-gray-300 bg-white px-4 py-2 w-fit" />
			<th className="border border-gray-300 px-4 py-2 w-1/5">Commodity</th>
			<th className="border border-gray-300 px-4 py-2 w-1/5">Quantity</th>
			<th className="border border-gray-300 px-4 py-2 w-1/5">Unit Price</th>
			<th className="border border-gray-300 px-4 py-2 w-1/5">
				Number of Units
			</th>
			<th className="border border-gray-300 px-4 py-2 w-1/5">Note</th>
		</tr>
	</thead>
);

export default OrderElementHeader;
