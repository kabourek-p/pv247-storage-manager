'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useState } from 'react';
import * as React from 'react';

import {
	Card,
	CardContent,
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
					<ChartTooltip
						cursor
						content={<CustomTooltip chartData={chartData} />}
					/>
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

const CustomTooltip = ({ chartData, active, payload, label }: any) => {
	if (active && payload?.length) {
		const selectedData: BarRestockData = chartData.find(
			(restock: BarRestockData) => restock.invoiceNumber === label
		);
		return (
			<div className="custom-tooltip rounded border bg-white shadow-md">
				<div className="tooltip-header mb-2 rounded bg-primary p-2 text-white">
					<span className="font-bold">Restock Data</span>
				</div>
				<div className="pb-2 pl-2 pr-2">
					{selectedData ? (
						<div className="tooltip-content grid grid-cols-3 gap-4">
							<div className="tooltip-item text-center">
								<span className="block font-bold">Buying Price</span>
								<span className="block">
									{new Intl.NumberFormat('cs-CZ', {
										style: 'currency',
										currency: 'CZK'
									}).format(selectedData.unitPrice)}
								</span>
							</div>
							<div className="tooltip-item text-center">
								<span className="block font-bold">Remaining Quantity</span>
								<span className="block">{selectedData.remaining}</span>
							</div>
							<div className="tooltip-item text-center">
								<span className="block font-bold">Already Used</span>
								<span className="block">{selectedData.taken}</span>
							</div>
						</div>
					) : (
						<p className="italic text-gray-500">No data available</p>
					)}
				</div>
			</div>
		);
	}

	return null;
};
