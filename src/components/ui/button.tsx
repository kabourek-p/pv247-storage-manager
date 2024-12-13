import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type ButtonProps = PropsWithChildren<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
	colorType?: 'primary' | 'secondary';
};

export const Button = ({
	children,
	className,
	colorType = 'primary',
	...props
}: ButtonProps) => (
	<button
		className={cn(
			'inline-block cursor-pointer rounded-md px-4 py-2 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-95',
			colorType === 'primary'
				? 'bg-primary hover:bg-primary-dark'
				: 'bg-secondary hover:bg-secondary-dark',

			className
		)}
		{...props}
	>
		{children}
	</button>
);
