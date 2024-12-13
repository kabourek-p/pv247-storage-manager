'use client';

import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { type OrderData } from '@/server-actions/orders';

const EditOrderButton = ({ order }: { order: OrderData | undefined }) => (
	<div>
		<Button
			className={`mb-2 w-40 ${
				order?.invoice !== null
					? 'cursor-not-allowed bg-primary-light hover:bg-primary-light'
					: 'cursor-pointer bg-primary-dark hover:bg-primary-light'
			}`}
			type="button"
			disabled={order?.invoice !== null}
			onClick={() => redirect(`/order/${order?.id}/edit`)}
		>
			Edit Order
		</Button>
	</div>
);

export default EditOrderButton;
