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
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';

const chartConfig = {
	orders: {
		label: 'Orders:',
		color: 'var(--secondary)'
	}
} satisfies ChartConfig;

export const DashboardLineChart = ({
	chartData
}: {
	chartData: { date: string; orders: number }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Number of orders per day</CardTitle>
			<CardDescription>Last month</CardDescription>
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
						dataKey="orders"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Line
						dataKey="orders"
						type="linear"
						stroke="var(--color-orders)"
						strokeWidth={2}
						dot
						activeDot={{
							className: 'hover:cursor-pointer',
							onClick: (_event, payload) => console.log(payload.index)
						}}
					/>
				</LineChart>
			</ChartContainer>
		</CardContent>
	</Card>
);
