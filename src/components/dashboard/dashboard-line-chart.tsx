'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import * as React from 'react';

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
	<Card className="max-h-[500px] overflow-hidden">
		<CardHeader>
			<CardTitle>Number of orders per day</CardTitle>
			<CardDescription>Last {chartData.length} days</CardDescription>
		</CardHeader>
		<CardContent className="flex h-full items-center justify-center">
			<ChartContainer
				config={chartConfig}
				className="h-1/2 max-h-[300px] w-full"
			>
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
						cursor
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
/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomTooltip = ({ chartData, active, payload, label }: any) => {
	if (active && payload?.length) {
		const selectedData = chartData.find((day: ChartData) => day.date === label);

		return (
			<div className="custom-tooltip rounded border bg-white shadow-md">
				<div className="tooltip-header mb-2 rounded bg-primary p-2 text-white">
					<span className="font-bold">Created Orders</span>
				</div>

				<div className="pb-2 pl-2 pr-2">
					{selectedData.orderNotes.length ? (
						<ul className="tooltip-list list-inside list-disc">
							{selectedData.orderNotes.map((order: string, index: number) => (
								<li key={index} className="tooltip-item text-gray-800">
									{order}
								</li>
							))}
						</ul>
					) : (
						<p className="italic text-gray-500">No orders available</p>
					)}
				</div>
			</div>
		);
	}
	return null;
};
