import React from 'react';

const RestockElementHeader = () => (
	<thead className="bg-primary-light font-bold">
		<tr>
			<th className="w-fit border border-gray-300 bg-white px-4 py-2" />
			<th className="w-1/5 border border-gray-300 px-4 py-2">Commodity</th>
			<th className="w-1/5 border border-gray-300 px-4 py-2">Quantity</th>
			<th className="w-1/5 border border-gray-300 px-4 py-2">Unit Price</th>
			<th className="w-1/5 border border-gray-300 px-4 py-2">Supplier Name</th>
			<th className="w-1/5 border border-gray-300 px-4 py-2">Invoice Number</th>
		</tr>
	</thead>
);

export default RestockElementHeader;
