'use server';

import { generateRandomString } from '@/server/utils';

import prisma from '../lib/prisma';

export const createRandomUser = async () =>
	prisma.user.create({
		data: {
			name: generateRandomString(5),
			surname: generateRandomString(5),
			email: `${generateRandomString(8)}@seznam.cz`
		}
	});
