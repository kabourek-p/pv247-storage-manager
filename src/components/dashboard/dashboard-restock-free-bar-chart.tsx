'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip
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
	chartData,
	unit,
	commodityType
}: {
	chartData: BarRestockData[];
	unit: string;
	commodityType: string;
}) => (
	<Card className="max-h-[500px] overflow-hidden">
		<CardHeader>
			<CardTitle>Undepleted Restocks</CardTitle>
			<div className="flex gap-2 pt-1 font-medium leading-none">
				Available capacity from each restocks of commodities measured by{' '}
				{commodityType}.
			</div>
		</CardHeader>
		<CardContent className="flex h-full items-center justify-center">
			<ChartContainer config={chartConfig} className="max-h-[300px] h-1/2 w-full">
				{chartData.length ? (
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
							content={<CustomTooltip unit={unit} chartData={chartData} />}
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
				) : (
					<div className="flex h-full items-center justify-center border text-center">
						No data to display!
					</div>
				)}
			</ChartContainer>
		</CardContent>
	</Card>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomTooltip = ({ unit, chartData, active, payload, label }: any) => {
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
								<span className="block">
									{selectedData.remaining} {unit}
								</span>
							</div>
							<div className="tooltip-item text-center">
								<span className="block font-bold">Already Used</span>
								<span className="block">
									{selectedData.taken} {unit}
								</span>
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
