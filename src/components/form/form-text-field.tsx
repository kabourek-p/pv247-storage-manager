import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/form/text-input';

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
	name: string;
	label?: string;
	error?: string;
};

export const FormTextField = ({
	name,
	label,
	error,
	...inputProps
}: FormTextFieldProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col">
			{label && (
				<label className="py-2" htmlFor={name}>
					{label}
				</label>
			)}
			<TextInput error={error} {...inputProps} {...register(name)} />
		</div>
	);
};
