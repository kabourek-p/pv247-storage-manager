'use client';

import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const AddCommodityButton = () => (
	<div>
		<Button
			className="mb-2 w-40 bg-primary-dark"
			type="button"
			onClick={() => redirect('/commodity')}
		>
			+ New commodity
		</Button>
	</div>
);

export default AddCommodityButton;
