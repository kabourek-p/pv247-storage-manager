import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';

import { cn } from '@/lib/cn';

export type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const Button = ({ className, ...buttonProps }: ButtonProps) => (
	<button
		className={cn('w-96 rounded-md py-1 text-white', className)}
		{...buttonProps}
	/>
);
