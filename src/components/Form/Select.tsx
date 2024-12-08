'use client';

import { type DetailedHTMLProps, type SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

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
	...selectProps
}: SelectProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col gap-2 p-1">
			{label && (
				<label className="p-2" htmlFor={name}>
					{label}
				</label>
			)}
			<select
				className={`rounded-lg bg-slate-50 px-3 py-1.5 shadow ${
					error ? 'border-red-600 border' : 'border-gray-300'
				}`}
				id={name}
				{...selectProps}
				{...register(name)}
			>
				{options.map(movieType => (
					<option key={movieType} value={movieType}>
						{movieType}
					</option>
				))}
			</select>
			{error && <span className="text-red-600 text-sm mt-1">{error}</span>}
		</div>
	);
};
