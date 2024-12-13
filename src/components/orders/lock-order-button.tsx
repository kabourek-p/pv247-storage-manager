'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { lockOrderServerAction, type OrderData } from '@/server-actions/orders';

const LockOrderButton = ({ order }: { order: OrderData }) => (
	<div>
		<Button
			className={`mb-2 w-40 ${
				order?.invoice !== null
					? 'cursor-not-allowed bg-secondary-light hover:bg-secondary-light'
					: 'cursor-pointer bg-secondary-dark hover:bg-secondary-light'
			}`}
			type="button"
			disabled={order?.invoice !== null}
			onClick={() => lockOrderServerAction(order.id)}
		>
			Finish Order
		</Button>
	</div>
);

export default LockOrderButton;
