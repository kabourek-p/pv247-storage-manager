import { z } from 'zod';

export const userRoleType = z.enum(['admin', 'user']);

export type UserRole = z.infer<typeof userRoleType>;

export const userSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	password: z.string(),
	role: z.enum(['admin', 'user'])
});

export type User = z.infer<typeof userSchema>;

export const loginFormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.max(32, 'Password must be less than 32 characters')
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
	.object({
		name: z.string().min(1, 'Full Name is required'),
		email: z.string().min(1, 'Email is required').email('Invalid email'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(32, 'Password must be less than 32 characters'),
		retypePassword: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(32, 'Password must be less than 32 characters')
	})
	.refine(data => data.password === data.retypePassword, {
		message: 'Passwords must match',
		path: ['retypePassword']
	});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
