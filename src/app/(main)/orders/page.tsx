'use client';
import { redirect } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const Page = () => (
	<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
		<div className="">
			<Button
				className="mb-2 w-40 bg-primary-dark"
				type="button"
				onClick={() => redirect('/order')}
			>
				Add field
			</Button>
		</div>
	</div>
);
export default Page;
