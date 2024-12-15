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
	filter?: string;
	filterByName?: string;
};

const DataTable = <TData, TValue>({
	columns,
	data,
	rowClickHandler,
	filter,
	filterByName
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

	return (
		<div>
			{filter && (
				<div className="flex items-center pb-4">
					<Input
						placeholder={`Filter by ${filterByName}...`}
						value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
						onChange={event =>
							table.getColumn(filter)?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
				</div>
			)}
			<div className="overflow-hidden rounded-md border shadow">
				<Table className="w-full table-auto border-collapse border border-gray-300">
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
										'w-full odd:bg-gray-100 even:bg-secondary-light hover:odd:bg-gray-200 hover:even:bg-secondary',
										'even:text-white md:hover:even:bg-gray-200',
										'even:text-black md:border-b-2 md:odd:bg-white md:even:bg-white'
									)}
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									onClick={
										rowClickHandler
											? () => rowClickHandler(row.getValue('id'))
											: undefined
									}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell
											className={cn(
												`relative block h-10 border-b border-gray-300 px-2 py-1 text-left`,
												`before:pr-2 before:font-bold before:content-[attr(data-label)]`,
												`md:table-cell md:text-center md:before:content-none`,
												`${filter === 'note' ? 'cursor-pointer' : 'hover:cursor-default'}`
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
					className={
						!table.getCanPreviousPage()
							? 'cursor-not-allowed bg-secondary-light hover:bg-secondary-light'
							: ''
					}
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					colorType="secondary"
					className={
						!table.getCanNextPage()
							? 'cursor-not-allowed bg-secondary-light hover:bg-secondary-light'
							: ''
					}
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
