import prisma from '@/lib/prisma';

export const createStockDispatches = async (dispatches: StockDispatch[]) =>
	Promise.all(
		dispatches.map(dispatch =>
			prisma.stockDispatch.create({
				data: {
					orderElement: {
						connect: { id: dispatch.orderElementId }
					},
					quantity: dispatch.quantity,
					restockSource: {
						connect: { id: dispatch.restockId }
					}
				}
			})
		)
	);

export type StockDispatch = {
	orderElementId: number;
	quantity: number;
	restockId: number;
};
