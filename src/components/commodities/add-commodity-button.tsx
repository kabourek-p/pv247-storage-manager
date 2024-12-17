'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const AddCommodityButton = () => {
	const router = useRouter();
	return (
		<Button
			className="mb-4 h-12 w-full md:w-52"
			type="button"
			onClick={() => router.push('/commodity')}
		>
			+ New commodity
		</Button>
	);
};

export default AddCommodityButton;
