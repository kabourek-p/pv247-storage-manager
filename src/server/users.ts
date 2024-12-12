'use server';

import generateRandomString from '@/server/utils';

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
