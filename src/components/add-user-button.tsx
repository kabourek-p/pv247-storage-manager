'use client';

import { addRandomUser } from '@/server-actions/mock';

const AddUserButton = () => {
	const handleClick = async () => {
		await addRandomUser();
	};

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={handleClick}
				className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-600"
			>
				Add User
			</button>
		</div>
	);
};

export default AddUserButton;
