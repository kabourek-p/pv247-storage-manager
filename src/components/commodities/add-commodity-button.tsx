'use client';

import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const AddCommodityButton = () => (
	<Button
		className="mb-2 w-40"
		type="button"
		onClick={() => redirect('/commodity')}
	>
		+ New commodity
	</Button>
);

export default AddCommodityButton;
