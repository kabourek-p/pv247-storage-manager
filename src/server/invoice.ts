import prisma from '@/lib/prisma';

export const createInvoice = async (invoiceNumber: string, orderId: number) =>
	await prisma.invoice.create({
		data: {
			invoiceNumber,
			order: {
				connect: { id: orderId }
			}
		}
	});
