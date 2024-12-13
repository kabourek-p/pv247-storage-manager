'use client';

import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const AddOrderButton = () => (
	<div>
		<Button
			className="mb-2 w-40"
			type="button"
			onClick={() => redirect('/order')}
		>
			+ New order
		</Button>
	</div>
);

export default AddOrderButton;
