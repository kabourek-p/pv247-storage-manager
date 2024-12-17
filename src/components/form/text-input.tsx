import { forwardRef, type HTMLProps } from 'react';

import { cn } from '@/lib/cn';

type TextInputProps = HTMLProps<HTMLInputElement> & {
	error?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ error, className, ...inputProps }, ref) => (
		<div className="flex flex-col">
			<input
				ref={ref}
				className={cn(
					'rounded-lg border-2 p-2 shadow focus:outline-none focus:ring-2 focus:ring-primary',
					error ? 'border-red-600' : 'border-gray-300',
					className
				)}
				{...inputProps}
			/>
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	)
);

export default TextInput;
