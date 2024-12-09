import { getOrders } from '@/server/orders';

const OrdersPage = async () => {
	const orders = await getOrders();

	return (
		<div>
			<h1 className="p-6 text-9xl">Orders</h1>
			<div className="gap-2">
				{orders.map(order => (
					<div className="gap-2" key={order.id}>
						<span className="p-4">{order.date.toLocaleDateString()}</span>
						<span className="p-4">{order.author?.name ?? 'Unknown'}</span>
						<span className="p-4">{order.authorId}</span>
						<span className="p-4">{order.note}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrdersPage;
