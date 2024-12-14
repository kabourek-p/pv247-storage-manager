'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';

import { registerFormSchema, type RegisterFormSchema } from '../schema';
import { useRegisterMutation } from '../hooks';

export const RegisterForm = () => {
	const mutation = useRegisterMutation();
	const router = useRouter();

	const form = useForm<RegisterFormSchema>({
		resolver: zodResolver(registerFormSchema)
	});

	const onSubmit = (values: RegisterFormSchema) => {
		mutation.mutate(values, {
			onSuccess: () => {
				toast.success('Your account has been created');
				router.push('/');
			},
			onError: error => {
				toast.error(error.message);
			}
		});
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-4"
			>
				<FormInput label="Full Name" name="name" />
				<FormInput label="Email" name="email" />
				<FormInput label="Password" type="password" name="password" />
				<FormInput
					label="Retype Password"
					type="password"
					name="retypePassword"
				/>
				<div className="my-2">
					<SubmitButton>Register</SubmitButton>
				</div>
			</form>
		</FormProvider>
	);
};
