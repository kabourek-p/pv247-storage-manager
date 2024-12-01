'use server'

import prisma from '../lib/prisma'
import {generateRandomString} from "@/server/utils";

export const getOrders = async () => {
    return prisma.order.findMany({
        include: {
            author: true,
        },
    });
}

export const createRandomOrder = async () => {
    const users = await prisma.user.findMany();
    return prisma.order.create({
        data: {
            authorId: users.length,
            note: generateRandomString(10)
        }});
}