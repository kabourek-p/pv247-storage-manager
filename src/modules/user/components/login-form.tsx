'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';

import { useLoginMutation } from '../hooks';
import { loginFormSchema, type LoginFormSchema } from '../schema';

export const LoginForm = () => {
	const mutation = useLoginMutation();
	const router = useRouter();

	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema)
	});

	const onSubmit = (values: LoginFormSchema) => {
		mutation.mutate(values, {
			onSuccess: () => {
				toast.success(`Logged in successfully!`);
				router.push('/');
			},
			onError: () => {
				toast.error('Invalid credentials');
			}
		});
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-4"
			>
				<FormInput label="Email" name="email" />
				<FormInput label="Password" type="password" name="password" />
				<div className="my-2">
					<SubmitButton>Log In</SubmitButton>
				</div>
			</form>
		</FormProvider>
	);
};
