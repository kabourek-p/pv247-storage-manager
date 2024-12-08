'use server';

import prisma from '../lib/prisma';

export const getCommodities = async () => prisma.commodity.findMany();
