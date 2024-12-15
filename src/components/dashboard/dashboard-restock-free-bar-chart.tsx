'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';
import { type BarRestockData } from '@/server-actions/restocks';
const chartData = [
	{ invoiceNumber: 'January', taken: 186, remaining: 80, unitPrice: 100 },
	{ invoiceNumber: 'February', taken: 305, remaining: 200, unitPrice: 100 },
	{ invoiceNumber: 'March', taken: 237, remaining: 120, unitPrice: 100 },
	{ invoiceNumber: 'April', taken: 73, remaining: 190, unitPrice: 100 },
	{ invoiceNumber: 'May', taken: 209, remaining: 130, unitPrice: 100 },
	{ invoiceNumber: 'June', taken: 214, remaining: 140, unitPrice: 100 }
];

const chartConfig = {
	taken: {
		label: 'Taken',
		color: 'var(--primary)'
	},
	remaining: {
		label: 'Remaining',
		color: 'var(--secondary)'
	}
} satisfies ChartConfig;

export const DashboardRestockFreeBarChart = ({
	chartData
}: {
	chartData: BarRestockData[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Undepleted Restocks</CardTitle>
		</CardHeader>
		<CardContent>
			<ChartContainer config={chartConfig}>
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="invoiceNumber"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar
						dataKey="taken"
						stackId="a"
						fill="var(--color-taken)"
						radius={[0, 0, 4, 4]}
					/>
					<Bar
						dataKey="remaining"
						stackId="a"
						fill="var(--color-remaining)"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ChartContainer>
		</CardContent>
		<CardFooter className="flex-col items-start gap-2 text-sm">
			<div className="flex gap-2 font-medium leading-none">
				Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
			</div>
			<div className="text-muted-foreground leading-none">
				Showing total visitors for the last 6 months
			</div>
		</CardFooter>
	</Card>
);
