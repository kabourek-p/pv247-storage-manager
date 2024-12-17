'use client';

import { useRouter } from 'next/navigation';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

export const BackArrowButton = () => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
		>
			<MdOutlineArrowBackIosNew className="text-2xl" />
		</button>
	);
};
