'use client';

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table';
import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/cn';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	rowClickHandler?: (id: string) => void;
	filter?: boolean;
};

const DataTable = <TData, TValue>({
	columns,
	data,
	rowClickHandler,
	filter
}: DataTableProps<TData, TValue>) => {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters
		},
		initialState: {
			columnVisibility: { id: false }
		}
	});

	const handleRowClick = rowClickHandler ? rowClickHandler : (_: string) => {};
	return (
		<div>
			{filter && (
				<div className="flex items-center pb-4">
					<Input
						placeholder="Filter by identifier..."
						value={(table.getColumn('note')?.getFilterValue() as string) ?? ''}
						onChange={event =>
							table.getColumn('note')?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
				</div>
			)}
			<div className="overflow-hidden rounded-md border shadow">
				<Table className="w-full">
					<TableHeader className="hidden text-center md:table-header-group">
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead
										key={header.id}
										className="bg-primary-light text-center text-primary-dark"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="w-full">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									className={cn(
										'w-full odd:bg-gray-100 even:bg-secondary even:text-white',
										'even:text-black md:border-b-2 md:odd:bg-white md:even:bg-white'
									)}
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									onClick={() => handleRowClick(row.getValue('id'))}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell
											className={cn(
												`relative block border-b border-gray-300 px-2 py-1 text-left`,
												`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
												`md:table-cell md:text-center md:before:content-none`,
												`${filter ? 'cursor-pointer' : ''}`
											)}
											key={cell.id}
											data-label={`${cell.column.columnDef.header}:`}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					colorType="secondary"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					colorType="secondary"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
};
export default DataTable;
