import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Icon } from './Icon';

const defaultData: Project[] = [
  {
    projectName: 'Space Fox',
    totalBalance: '843.27',
    createdDate: '20.11.22, 9:54am',
  },
  {
    projectName: 'Green Fox',
    totalBalance: '5000.27',
    createdDate: '20.11.19, 9:54am',
  },
  {
    projectName: 'Blue Fox',
    totalBalance: '0.00',
    createdDate: '20.11.22, 9:54am',
  },
];
type Project = {
  projectName: string;
  totalBalance: string;
  createdDate: string;
};
const columnHelper = createColumnHelper<Project>();

const columns = [
  columnHelper.accessor('projectName', {
    header: () => (
      <div className="flex gap-2">
        <Icon.CheckBox />
        <span className="text-xs text-gray-600 font-medium">Project Name</span>
      </div>
    ),
    cell: (info) => (
      <div className="flex gap-2">
        <Icon.CheckBox />
        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('totalBalance', {
    header: () => <span className="flex text-xs text-gray-600 font-medium">Total balance</span>,
    cell: (info) => (
      <div className="flex gap-1">
        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
        <span className="text-xs text-gray-600 font-medium">USD</span>
      </div>
    ),
  }),
  columnHelper.accessor('createdDate', {
    header: () => (
      <span className="flex text-xs text-gray-600 font-medium self-start">Created date</span>
    ),
    cell: (info) => (
      <div className="flex flex-col">
        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
];

interface ProjectsTableProps {
  className?: string;
}

//TODO: Replace with real dynamic data.
export default function ProjectsTable({ className }: ProjectsTableProps) {
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={className}>
      <table className="min-w-full border border-gray-100 rounded-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 border-r border-gray-100">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-100 p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
