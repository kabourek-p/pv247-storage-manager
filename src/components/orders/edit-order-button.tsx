'use client';

import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const AddOrderButton = ({ id }: { id: number }) => (
	<div>
		<Button
			className="mb-2 w-40 bg-primary-dark"
			type="button"
			onClick={() => redirect(`/order/${id}/edit`)}
		>
			Edit Order
		</Button>
	</div>
);

export default AddOrderButton;
