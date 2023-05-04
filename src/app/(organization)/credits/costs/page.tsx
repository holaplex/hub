'use client';
import { useQuery } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import GridTable from '../../../../components/GridTable';
import { GetCreditSheet } from '../../../../queries/credits.graphql';
import { ActionCost } from '../../../../graphql.types';

interface CreditLineItem {
  action: string;
  [key: string]: number | string;
}

interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export default function CostPage() {
  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditSheet = creditSheetQuery.data?.creditSheet;
  const loading = creditSheetQuery.loading;

  const data: CreditLineItem[] =
    creditSheet?.reduce((result: CreditLineItem[], sheet: ActionCost) => {
      const creditCost = sheet.blockchains.reduce(
        (creditLineItem: CreditLineItem, blockchain: { blockchain: string; credits: number }) => {
          creditLineItem[blockchain.blockchain] = blockchain.credits;
          return creditLineItem;
        },
        { action: sheet.action }
      );

      result.push(creditCost);

      return result;
    }, []) || [];

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
  ];

  data.length > 0 &&
    Object.entries(data[0]).forEach(([key, _value]) => {
      if (key !== 'action') {
        columns.push(
          columnHelper.display({
            id: key,
            header: () => <div className="text-gray-400">{key}</div>,
            cell: (info) => {
              const credits = info.row.original[key];
              return <span className="text-white font-semibold">{credits}</span>;
            },
          })
        );
      }
    });

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
