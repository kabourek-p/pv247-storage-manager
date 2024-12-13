import { forwardRef, type HTMLProps } from 'react';

type TextInputProps = HTMLProps<HTMLInputElement> & {
	error?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ error, ...inputProps }, ref) => (
		<div className="flex flex-col">
			<input
				ref={ref}
				className={`mx-1.5 w-11/12 rounded-lg border-2 bg-slate-50 py-1.5 shadow ${
					error ? 'border-red-600' : 'border-gray-300'
				}`}
				{...inputProps}
			/>
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	)
);

export default TextInput;
