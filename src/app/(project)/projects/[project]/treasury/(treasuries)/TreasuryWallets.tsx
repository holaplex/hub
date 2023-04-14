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
    <div className="h-full flex flex-col p-4">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from(Array(6)).map((_, index) => (
            <Wallet.Skeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="text-2xl text-primary font-medium">Treasury wallets</div>
          {noTreasury ? (
            <div className="h-full flex-1 flex flex-col items-center justify-center">
              <Icon.Large.Treasury />
              <span className="mt-2 text-gray-500 text-sm">Click button below to add wallet</span>
              <Link href={`/projects/${project}/treasuries/new`} className="mt-8">
                <Button icon={<Icon.AddWallet className="primary-button-icon" />}>
                  Add wallet
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
