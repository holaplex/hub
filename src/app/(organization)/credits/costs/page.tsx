'use client';
import { createColumnHelper } from '@tanstack/react-table';
import GridTable from '../../../../components/GridTable';
import Table from '../../../../components/Table';

interface CreditBlockchain {
  cost: number;
}

interface CreditLineItem {
  action: string;
  blockchains: CreditBlockchain[];
}
export default function CostPage() {
  const columnHelper = createColumnHelper<CreditLineItem>();
  const loadingColumnHelper = createColumnHelper<any>();

  //TODO: Replace with real data
  const sampleData: CreditLineItem[] = [
    {
      action: 'Mint Nft',
      blockchains: [{ cost: 23 }],
    },
    {
      action: 'Create drop',
      blockchains: [{ cost: 28 }],
    },
    {
      action: 'Create wallet',
      blockchains: [{ cost: 100 }],
    },
    {
      action: 'Transfer Nft',
      blockchains: [{ cost: 2 }],
    },
  ];

  const loading = false;

  const columns = [
    columnHelper.display({
      id: 'action',
      header: () => <div />,
      cell: (info) => {
        const action = info.row.original.action;
        return <span className="text-gray-400">{action}</span>;
      },
    }),
    columnHelper.display({
      id: 'solana',
      header: () => <div className="text-gray-400">Solana</div>,
      cell: (info) => {
        const cost = info.row.original.blockchains[0].cost;
        return <span className="text-white font-semibold">{cost}</span>;
      },
    }),
  ];

  return (
    <div>
      {loading ? (
        <>
          <GridTable
            className="mt-4"
            columns={[
              loadingColumnHelper.display({
                id: 'action',
                header: () => <div />,
                cell: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'blockchain1',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'blockchain2',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />,
              }),
            ]}
            data={new Array(5)}
          />
        </>
      ) : (
        <>
          <GridTable className="mt-4" columns={columns} data={sampleData} />
        </>
      )}
    </div>
  );
}
