'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip
} from '@/components/ui/chart';

const chartConfig = {
	orders: {
		label: 'Orders:',
		color: 'var(--secondary)'
	}
} satisfies ChartConfig;

type ChartData = {
	date: string;
	orderNotes: string[];
	count: number;
};

export const DashboardLineChart = ({
	chartData
}: {
	chartData: ChartData[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Number of orders per day</CardTitle>
			<CardDescription>Last {chartData.length} days</CardDescription>
		</CardHeader>
		<CardContent>
			<ChartContainer config={chartConfig}>
				<LineChart
					accessibilityLayer
					data={chartData}
					margin={{
						left: 12,
						right: 12
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
					/>
					<YAxis
						dataKey="count"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
					/>
					<ChartTooltip
						cursor={false}
						content={<CustomTooltip chartData={chartData} />}
					/>
					<Line
						dataKey="count"
						type="linear"
						stroke="var(--color-orders)"
						strokeWidth={2}
						dot
					/>
				</LineChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

const CustomTooltip = ({ chartData, active, payload, label }: any) => {
	if (active && payload?.length) {
		return (
			<div className="custom-tooltip">
				<ul>
					{chartData
						.filter((day: ChartData) => day.date === label)[0]
						.orderNotes.map((order: string) => (
							<li key={order}>{order}</li>
						))}
				</ul>
			</div>
		);
	}

	return null;
};
