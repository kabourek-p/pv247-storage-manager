'use server';

import { hash } from 'bcryptjs';

import generateRandomString from '@/server/utils';
import { type RegisterFormSchema } from '@/modules/user/schema';

import prisma from '../lib/prisma';

export const createRandomUser = async () =>
	prisma.user.create({
		data: {
			firstName: generateRandomString(5),
			lastName: generateRandomString(5),
			password: generateRandomString(8),
			email: `${generateRandomString(8)}@seznam.cz`
		}
	});

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
			email: data.email,
			password: passwordHash
		}
	});
};
