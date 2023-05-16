'use client';

import { useQuery } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import Table from './../../../../components/Table';
import { CreditDeposit, Organization } from './../../../../graphql.types';
import { useOrganization } from './../../../../hooks/useOrganization';
import { DateFormat, formatDateString } from './../../../../modules/time';
import { GetOrganizationCreditDeposits } from './../../../../queries/credits.graphql';

interface GetOrganizationDepositsVars {
  organization: string;
}

interface GetOrganizationCreditDepositsData {
  organization: Organization;
}

export default function PurchaseHistoryPage() {
  const { organization } = useOrganization();
  const creditDepositsQuery = useQuery<
    GetOrganizationCreditDepositsData,
    GetOrganizationDepositsVars
  >(GetOrganizationCreditDeposits, {
    variables: { organization: organization?.id },
  });

  const columnHelper = createColumnHelper<CreditDeposit>();
  const loadingColumnHelper = createColumnHelper<any>();

  const deposits = creditDepositsQuery.data?.organization.credits?.deposits || [];

  const loading = creditDepositsQuery.loading;

  return (
    <div>
      {loading ? (
        <>
          <Table
            className="mt-4"
            columns={[
              loadingColumnHelper.display({
                id: 'event',
                header: () => <div className="rounded-full h-4 w-14 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-24 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'credits',
                header: () => <div className="rounded-full h-4 w-14 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-24 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'perCreditCost',
                header: () => <div className="rounded-full h-4 w-20 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-24 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'cost',
                header: () => <div className="rounded-full h-4 w-14 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-24 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'createdAt',
                header: () => <div className="rounded-full h-4 w-20 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-col gap-1">
                    <div className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />
                    <div className="rounded-full h-3 w-8 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : (
        <>
          {!deposits ? (
            <div />
          ) : (
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor('reason', {
                  header: () => <span>Event</span>,
                  cell: (info) => {
                    return <span className="text-xs font-medium">{info.getValue()}</span>;
                  },
                }),
                columnHelper.accessor('credits', {
                  header: () => <span>Amount</span>,
                  cell: (info) => {
                    return <span className="text-xs font-medium">{info.getValue()}</span>;
                  },
                }),
                columnHelper.accessor('perCreditCost', {
                  header: () => <span>Price per credit</span>,
                  cell: (info) => {
                    return <span className="text-xs font-medium">${info.getValue()}</span>;
                  },
                }),
                columnHelper.accessor('cost', {
                  header: () => <span>Total</span>,
                  cell: (info) => {
                    return <span className="text-xs font-medium">${info.getValue()}</span>;
                  },
                }),
                columnHelper.accessor('createdAt', {
                  header: () => <span>Date</span>,
                  cell: (info) => {
                    return (
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-xs font-medium">
                          {formatDateString(info.getValue(), DateFormat.DATE_1)}
                        </span>
                        <span className="text-white text-xs">
                          {formatDateString(info.getValue(), DateFormat.TIME_1)}
                        </span>
                      </div>
                    );
                  },
                }),
              ]}
              data={deposits}
            />
          )}
        </>
      )}
    </div>
  );
}
