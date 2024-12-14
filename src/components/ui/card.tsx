import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const Card = ({
	children,
	className
}: PropsWithChildren & { className?: string }) => (
	<div className="items-center">
		<div
			className={cn(
				'w-full rounded-lg bg-white sm:p-6 sm:shadow-md',
				className
			)}
		>
			{children}
		</div>
	</div>
);
