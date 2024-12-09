'use client';

import { addRandomOrder } from '@/server-actions/mock';

const AddOrderButton = () => {
	const handleClick = async () => {
		await addRandomOrder();
	};

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={handleClick}
				className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-600"
			>
				Add Order
			</button>
		</div>
	);
};

export default AddOrderButton;
