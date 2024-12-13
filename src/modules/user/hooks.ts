import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { createUser } from '@/server/users';

import { type RegisterFormSchema, type LoginFormSchema } from './schema';

export const useLoginMutation = () =>
	useMutation({
		mutationFn: async (data: LoginFormSchema) => {
			const response = await signIn('credentials', {
				...data,
				redirect: false
			});
			if (response?.error) {
				throw new Error(response?.error);
			}
			return response;
		}
	});

export const useRegisterMutation = () =>
	useMutation({
		mutationFn: async (data: RegisterFormSchema) => {
			console.log('was here', data);
			const user = await createUser(data);
			return user;
		}
	});
