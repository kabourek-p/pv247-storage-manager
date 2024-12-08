import { forwardRef, type HTMLProps } from 'react';

type TextInputProps = HTMLProps<HTMLInputElement> & {
	error?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ error, ...inputProps }, ref) => {
		console.log(error);
		return (
			<div className="flex flex-col">
				<input
					ref={ref}
					className={`rounded-lg bg-slate-50 px-3 py-1.5 shadow ${
						error ? 'border-red-600 border' : 'border-gray-300'
					}`}
					{...inputProps}
				/>
				{error && <span className="text-red-600 text-sm mt-1">{error}</span>}
			</div>
		);
	}
);

export default TextInput;
