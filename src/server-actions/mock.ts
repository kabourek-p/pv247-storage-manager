import { createRandomOrder } from '@/server/orders';
import { createRandomUser } from '@/server/users';

export const addRandomOrder = async () => {
	await createRandomOrder();
};

export const addRandomUser = async () => {
	await createRandomUser();
};
