import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const Button = ({
	children,
	className,
	...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<button
		className={cn(
			'bg-secondary hover:bg-secondary-dark focus-visible:ring-secondary inline-block cursor-pointer rounded-md px-4 py-2 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95',
			className
		)}
		{...props}
	>
		<div className="flex h-6 items-center gap-2">{children}</div>
	</button>
);
