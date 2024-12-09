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
