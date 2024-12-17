'use client';

import { type DetailedHTMLProps, type SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/cn';

type SelectProps = DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	options: string[];
	name: string;
	label?: string;
	error?: string;
};

export const Select = ({
	label,
	name,
	options,
	error,
	className,
	...selectProps
}: SelectProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col">
			{label && (
				<label className="py-2" htmlFor={name}>
					{label}
				</label>
			)}
			<select
				className={cn(
					'rounded-lg border-2 p-2 shadow focus:outline-none focus:ring-2 focus:ring-primary',
					error ? 'border border-red-600' : 'border-gray-300',
					className
				)}
				id={name}
				{...selectProps}
				{...register(name)}
			>
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	);
};
