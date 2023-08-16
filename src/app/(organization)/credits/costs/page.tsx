'use client';
import { useQuery } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import Spreadsheet from './../../../../components/Spreadsheet';
import { GetCreditSheet } from './../../../../queries/credits.graphql';
import { ActionCost, BlockchainCost, Maybe } from './../../../../graphql.types';
import { ACTION_LABEL } from './../constant';

interface CreditLineItem {
  action: string;
  [key: string]: Maybe<number> | undefined | string;
}

interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export default function CostPage() {
  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditSheet = creditSheetQuery.data?.creditSheet;
  const loading = creditSheetQuery.loading;

  const data: CreditLineItem[] =
    creditSheet?.map((sheet: ActionCost) => {
      const creditCost = sheet.blockchains.reduce(
        (creditLineItem: CreditLineItem, blockchain: BlockchainCost) => {
          creditLineItem[blockchain.blockchain] = blockchain.credits;
          return creditLineItem;
        },
        { action: ACTION_LABEL[sheet.action] }
      );

      return creditCost;
    }) || [];

  const columnHelper = createColumnHelper<CreditLineItem>();
  const loadingColumnHelper = createColumnHelper<any>();

  return (
    <div className="mt-4">
      {loading ? (
        <Spreadsheet
          columns={[
            loadingColumnHelper.display({
              id: 'action',
              header: () => <div />,
              cell: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
            }),
            loadingColumnHelper.display({
              id: 'SOLANA',
              header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
              cell: () => <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />,
            }),
            loadingColumnHelper.display({
              id: 'POLYGON',
              header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
              cell: () => <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />,
            }),
          ]}
          data={new Array(4)}
        />
      ) : (
        <Spreadsheet
          columns={[
            columnHelper.accessor('action', {
              header: () => <div />,
              cell: (info) => {
                return <span className="text-gray-400">{info.getValue()}</span>;
              },
            }),
            columnHelper.accessor('SOLANA', {
              header: () => <div className="text-gray-400">Solana</div>,
              cell: (info) => {
                return <span className="text-white font-semibold">{info.getValue()}</span>;
              },
            }),
            columnHelper.accessor('POLYGON', {
              header: () => <div className="text-gray-400">Polygon</div>,
              cell: (info) => {
                return <span className="text-white font-semibold">{info.getValue()}</span>;
              },
            }),
          ]}
          data={data}
        />
      )}
    </div>
  );
}
