'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { type OrderData } from '@/server-actions/orders';

const EditOrderButton = ({ order }: { order: OrderData | undefined }) => {
	const router = useRouter();
	return (
		<div>
			<Button
				className={`mb-2 w-28 sm:w-40 ${
					order?.invoice !== null
						? 'cursor-not-allowed bg-primary-light hover:bg-primary-light active:scale-100'
						: 'cursor-pointer'
				}`}
				type="button"
				disabled={order?.invoice !== null}
				onClick={() => router.push(`/order/${order?.id}/edit`)}
			>
				Edit Order
			</Button>
		</div>
	);
};

export default EditOrderButton;
