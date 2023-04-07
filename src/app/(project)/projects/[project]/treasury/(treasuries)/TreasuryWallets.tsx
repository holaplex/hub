'use client';

import { useQuery } from '@apollo/client';
import { Icon } from '../../../../../../components/Icon';
import { Project, Treasury } from '../../../../../../graphql.types';
import { GetTreasuryWallets } from '../../../../../../queries/treasury.graphql';
import Wallet from '../../../../../../components/Wallet';

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
        <div className="flex justify-between flex-row text-gray-100">
          <div className="w-40 h-8 rounded-md bg-gray-100 animate-pulse" />
        </div>
      ) : (
        <>
          <div className="text-2xl text-primary font-medium">Treasury wallets</div>
          {noTreasury ? (
            <div className="h-full flex-1 flex flex-col items-center justify-center">
              <Icon.Large.Treasury />
              <span className="mt-6 text-xl font-semibold">Project treasury coming soon</span>
              {/* <span className="mt-2 text-gray-500 text-sm">Click button below to add wallet</span>
            <Link href={`/projects/${project}/treasuries/new`} className="mt-8">
              <Button icon={<Icon.AddWallet stroke="#ffffff" />}>Add wallet</Button>
            </Link> */}
            </div>
          ) : (
            <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {wallets.map((wallet) => (
                <Wallet key={wallet.address} wallet={wallet} />
              ))}
            </div>
          )}

          {children}
        </>
      )}
    </div>
  );
}
