'use server';

import { generateRandomString } from '@/server/utils';

import prisma from '../lib/prisma';

export const getOrders = async () =>
	prisma.order.findMany({
		include: {
			author: true
		}
	});

export const createRandomOrder = async () => {
	const users = await prisma.user.findMany();
	return prisma.order.create({
		data: {
			authorId: users.length,
			note: generateRandomString(10)
		}
	});
};
