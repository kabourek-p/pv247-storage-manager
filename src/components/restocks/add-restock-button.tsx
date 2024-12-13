'use client';

import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const AddRestockButton = () => (
	<div>
		<Button
			className="mb-2 w-40"
			type="button"
			onClick={() => redirect('/restock')}
		>
			+ New Restock
		</Button>
	</div>
);

export default AddRestockButton;
