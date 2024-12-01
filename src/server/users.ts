'use server'

import prisma from '../lib/prisma'
import {generateRandomString} from "@/server/utils";

export const createRandomUser = async () => {
    return prisma.user.create({
        data: {
            name: generateRandomString(5),
            surname: generateRandomString(5),
            email: generateRandomString(8) + '@seznam.cz'
        }});
}