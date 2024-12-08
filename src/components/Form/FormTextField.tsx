import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/Form/TextInput';

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
		<div className="flex flex-col space-x-2">
			{label && (
				<label className="p-2" htmlFor={name}>
					{label}
				</label>
			)}
			<TextInput error={error} {...inputProps} {...register(name)} />
		</div>
	);
};
