'use client';
import { useQuery } from '@apollo/client';
import { Project } from '../../../../../../../graphql.types';
import { GetWallets } from '../../../../../../../queries/customer.graphql';
import Wallet from '../../../../../../../components/Wallet';
import { Button } from '@holaplex/ui-library-react';
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
  const walletsQuery = useQuery<GetWalletsData, GetWalletsVars>(GetWallets, {
    variables: { project, customer },
  });
  const wallets = walletsQuery.data?.project.customer?.treasury?.wallets || [];
  const noWallets = wallets.length === 0;

  return (
    <div className="h-full flex flex-col">
      {walletsQuery.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from(Array(6)).map((_, index) => (
            <Wallet.Skeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {noWallets ? (
            <div className="h-full flex-1 flex flex-col items-center justify-center">
              <span className="mt-6 text-xl font-semibold">
                The customer does not have any wallets yet
              </span>
              <span className="mt-2 text-subtletext text-sm">
                Click button below to learn how to create customer wallets.
              </span>
              <a href="https://docs.holaplex.dev/hub/Guides/creating-a-customer-wallet">
                <Button icon={<Icon.Help className="primary-button-icon" />} className="mt-8">
                  How to create wallets
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
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
