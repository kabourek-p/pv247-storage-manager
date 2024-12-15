'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BarRestockData } from '@/server-actions/restocks';
import { DashboardRestockFreeBarChart } from '@/components/dashboard/dashboard-restock-free-bar-chart';

const RestockFreeTabs = ({ chartData }: { chartData: BarRestockData[] }) => (
	<Tabs defaultValue="KG" className="mt-8 w-full border">
		<TabsList className="grid w-full grid-cols-3 rounded-md">
			<TabsTrigger
				className="rounded-none rounded-l-md bg-primary text-white data-[state=active]:bg-primary-light"
				value="KG"
			>
				Weight
			</TabsTrigger>
			<TabsTrigger
				className="rounded-none bg-primary text-white data-[state=active]:bg-primary-light"
				value="PIECES"
			>
				Pieces
			</TabsTrigger>
			<TabsTrigger
				className="rounded-none rounded-r-md bg-primary text-white data-[state=active]:bg-primary-light"
				value="MM"
			>
				Length
			</TabsTrigger>
		</TabsList>
		<TabsContent value="KG">
			<DashboardRestockFreeBarChart
				chartData={chartData.filter(r => r.unitType === 'KG')}
				unit="KG"
				commodityType="weight"
			/>
		</TabsContent>
		<TabsContent value="PIECES">
			<DashboardRestockFreeBarChart
				chartData={chartData.filter(r => r.unitType === 'PIECES')}
				unit="Pieces"
				commodityType="pieces"
			/>
		</TabsContent>
		<TabsContent value="MM">
			<DashboardRestockFreeBarChart
				chartData={chartData.filter(r => r.unitType === 'MM')}
				unit="mm"
				commodityType="length"
			/>
		</TabsContent>
	</Tabs>
);

export default RestockFreeTabs;
