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
		<div className="flex flex-col space-x-2">
			{label && (
				<label className="py-2" htmlFor={name}>
					{label}
				</label>
			)}
			<select
				className={`w-11/12 rounded-lg border-2 bg-slate-50 px-3 py-1.5 shadow ${
					error ? 'border border-red-600' : 'border-gray-300'
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
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	);
};
