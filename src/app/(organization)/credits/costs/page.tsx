'use client';
import { useQuery } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import GridTable from '../../../../components/GridTable';
import { GetCreditSheet } from '../../../../queries/credits.graphql';
import { ActionCost, Blockchain, BlockchainCost } from '../../../../graphql.types';

interface CreditLineItem {
  action: string;
  solana: number;
  polygon: number;
}

interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export default function CostPage() {
  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);
  console.log('creditSheet', creditSheetQuery.data);
  const creditSheet = creditSheetQuery.data?.creditSheet;
  const loading = creditSheetQuery.loading;
  const data: CreditLineItem[] = [];
  creditSheet?.map((ac: ActionCost) => {
    data.push({
      action: ac.action as string,
      solana: ac.blockchains.filter((bc: BlockchainCost) => bc.blockchain === Blockchain.Solana)[0]
        .credits,
      polygon: ac.blockchains.filter(
        (bc: BlockchainCost) => bc.blockchain === Blockchain.Polygon
      )[0].credits,
    });
  });

  const columnHelper = createColumnHelper<CreditLineItem>();
  const loadingColumnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.display({
      id: 'action',
      header: () => <div />,
      cell: (info) => {
        const action = info.row.original.action;
        return <span className="text-gray-400">{action}</span>;
      },
    }),
    columnHelper.accessor('solana', {
      header: () => <div className="text-gray-400">Solana</div>,
      cell: (info) => {
        return <span className="text-white font-semibold">{info.getValue()}</span>;
      },
    }),
    columnHelper.accessor('polygon', {
      header: () => <div className="text-gray-400">Polygon</div>,
      cell: (info) => {
        return <span className="text-white font-semibold">{info.getValue()}</span>;
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
                id: 'solana',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'polygon',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />,
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : (
        <>
          <GridTable className="mt-4" columns={columns} data={data} />
        </>
      )}
    </div>
  );
}
