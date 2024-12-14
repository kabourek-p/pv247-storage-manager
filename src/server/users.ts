'use server';

import { hash } from 'bcryptjs';

import { type RegisterFormSchema } from '@/modules/user/schema';

import prisma from '../lib/prisma';

export const getUser = async (email: string) =>
	prisma.user.findUnique({
		where: {
			email
		}
	});

export const createUser = async (data: RegisterFormSchema) => {
	const passwordHash = await hash(data.password, 10);
	if (await getUser(data.email)) {
		throw new Error('User already exists');
	}

	return prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: passwordHash
		}
	});
};
