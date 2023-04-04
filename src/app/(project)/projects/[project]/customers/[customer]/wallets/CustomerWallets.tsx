'use client';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Project } from '../../../../../../../graphql.types';
import { GetWallets } from '../../../../../../../queries/customer.graphql';
import Wallet from '../../../../../../../components/Wallet';
import { Icon } from '../../../../../../../components/Icon';

interface CustomerWalletsProps {
  children: React.ReactNode;
  project: string;
  customer: string;
}

interface GetWalletsData {
  project: Pick<Project, 'id' | 'customer'>;
}

interface GetWalletsVars {
  project: string;
  customer: string;
}

export default function CustomerWallets({ children, project, customer }: CustomerWalletsProps) {
  const router = useRouter();

  const walletsQuery = useQuery<GetWalletsData, GetWalletsVars>(GetWallets, {
    variables: { project, customer },
  });
  const loading = walletsQuery.loading;
  const wallets = walletsQuery.data?.project.customer?.treasury?.wallets || [];
  const noWallets = wallets.length === 0;

  return (
    <>
      <div className="h-full flex flex-col">
        {loading ? (
          <div></div>
        ) : (
          <>
            {noWallets ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center"></div>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {wallets.map((wallet) => (
                  <Wallet key={wallet.address} wallet={wallet} />
                ))}
              </div>
            )}

            {children}
          </>
        )}
        ;
      </div>
    </>
  );
}
