import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const Button = ({
	children,
	className,
	...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<button
		className={cn(
			'inline-block cursor-pointer rounded-md bg-secondary px-4 py-2 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-95',
			className
		)}
		{...props}
	>
		<div className="flex h-6 items-center gap-2">{children}</div>
	</button>
);
