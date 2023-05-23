'use client';

import { useQuery } from '@apollo/client';
import { Icon } from '../../../../../../components/Icon';
import { Project, Treasury } from '../../../../../../graphql.types';
import { GetTreasuryWallets } from '../../../../../../queries/treasury.graphql';
import Wallet from '../../../../../../components/Wallet';
import Link from '../../../../../../components/Link';
import { Button } from '@holaplex/ui-library-react';

interface TreasuryLayoutProps {
  children: React.ReactNode;
  project: string;
}

interface GetWalletsData {
  project: Pick<Project, 'id' | 'treasury'>;
}

interface GetWalletsVars {
  project: string;
}

export default function TreasuryWallets({ children, project }: TreasuryLayoutProps) {
  const walletsQuery = useQuery<GetWalletsData, GetWalletsVars>(GetTreasuryWallets, {
    variables: { project },
  });
  const loading = walletsQuery.loading;
  const wallets = walletsQuery.data?.project.treasury?.wallets || [];
  const noTreasury = wallets.length === 0;

  return (
    <div className="h-full flex flex-col p-6">
      {walletsQuery.loading ? (
        <>
          <div className="h-8 w-60 bg-stone-900 rounded-md animate-pulse" />
          <div className="flex max-w-lg flex-col gap-2  my-4">
            <div className="h-4 w-full bg-stone-900 rounded-md animate-pulse" />
            <div className="h-4 w-full bg-stone-900 rounded-md animate-pulse" />
            <div className="h-4 w-full bg-stone-900 rounded-md animate-pulse" />
            <div className="h-4 w-1/4 bg-stone-900 rounded-md animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from(Array(4)).map((_, index) => (
              <Wallet.Skeleton key={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl text-white font-medium">Treasury wallets</h1>
          <p className="text-gray-400 max-w-lg mt-4">
            Project Treasury wallets act as the update authority for any NFTs/Drops created by that
            project. They are also the default destination for any royalties that come in from
            primary or secondary sales.
          </p>
          {noTreasury ? (
            <div className="h-full flex-1 flex flex-col items-center justify-center">
              <Icon.Large.Treasury />
              <span className="mt-2 text-gray-400 text-sm">Click button below to add wallet</span>
              <Link href={`/projects/${project}/treasuries/new`} className="mt-8">
                <Button icon={<Icon.AddWallet />}>Add wallet</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {wallets.map((wallet) => (
                <Wallet.Card key={wallet.address} wallet={wallet} />
              ))}
            </div>
          )}

          {children}
        </>
      )}
    </div>
  );
}
