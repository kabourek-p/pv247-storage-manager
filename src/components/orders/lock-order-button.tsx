'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { lockOrderServerAction } from '@/server-actions/orders';

const LockOrderButton = ({ id }: { id: number }) => (
	<div>
		<Button
			className="mb-2 w-40 bg-secondary-dark"
			type="button"
			onClick={() => lockOrderServerAction(id)}
		>
			Finish Order
		</Button>
	</div>
);

export default LockOrderButton;
