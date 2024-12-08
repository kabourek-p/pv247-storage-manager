import { forwardRef, type HTMLProps } from 'react';

type TextInputProps = HTMLProps<HTMLInputElement> & {
	error?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ error, ...inputProps }, ref) => (
		<div className="flex-col flex">
			<input
				ref={ref}
				className={`rounded-lg bg-slate-50 px-3 py-1.5 shadow border-2 ${
					error ? 'border-red-600' : 'border-gray-300'
				}`}
				{...inputProps}
			/>
			{error && <span className="text-red-600 text-sm">{error}</span>}
		</div>
	)
);

export default TextInput;
