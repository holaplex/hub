'use client';
import { createColumnHelper } from '@tanstack/react-table';

interface CreditBlockchain {
  cost: number;
}

interface CreditLineItem {
  action: string;
  blockchains: CreditBlockchain[];
}
export default function CostPage() {
  const columnHelper = createColumnHelper<CreditLineItem>();

  const columns = [
    columnHelper.accessor('action', {
      cell: (info) => {
        return info.getValue();
      },
    }),
  ];
  return <div />;
}
