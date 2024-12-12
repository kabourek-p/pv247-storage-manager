'use server';

import generateRandomString from '@/server/utils';
import { type CommodityFormSchema } from '@/components/commodities/commodity-form';

import prisma from '../lib/prisma';

export const getCommodities = async () => prisma.commodity.findMany();

export const createRandomCommodity = async () =>
	prisma.commodity.create({
		data: {
			name: generateRandomString(10),
			unit: 'KG'
		}
	});

export const createCommodity = async (commodity: CommodityFormSchema) =>
	prisma.commodity.create({
		data: {
			name: commodity.name,
			unit: commodity.unit
		}
	});

// Fetch commodities with their total quantities, unit, and unit price from the oldest restock
export const getCommodityCard = async () => {
	  const commodities = await prisma.commodity.findMany();
	
	  // For each commodity, calculate the total quantity from all related restocks
	  const commoditiesWithDetails = await Promise.all(
		commodities.map(async (commodity) => {
		  // Calculate total quantity
		  const totalQuantity = await prisma.restock.aggregate({
			where: {
			  commodityId: commodity.name, // commodityId links to name
			},
			_sum: {
			  quantity: true,
			},
		  });
	
		  // Get the oldest restock entry (earliest)
		  const oldestRestock = await prisma.restock.findFirst({
			where: {
			  commodityId: commodity.name,
			},
			orderBy: {
			  date: 'asc', // Get the oldest restock (earliest entry)
			},
		  });
	
		  return {
			name: commodity.name,
			quantity: totalQuantity._sum.quantity || 0, // If no restocks found, return 0
			unit: commodity.unit, // Add unit from the commodity model
			unitPrice: oldestRestock?.unitPrice || 0, // Get unit price from the oldest restock
		  };
		})
	  );
	
	  return commoditiesWithDetails;
	};
	
