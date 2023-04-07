'use client';

import { useQuery } from '@apollo/client';
import { Project } from '../../../../../../../graphql.types';
import { GetCustomerNfts } from '../../../../../../../queries/customer.graphql';
import Mint from '../../../../../../../components/Mint';
import { Button } from '@holaplex/ui-library-react';
import { Icon } from '../../../../../../../components/Icon';

interface NftsProps {
  children: React.ReactNode;
  project: string;
  customer: string;
  loading: boolean;
}

interface GetCustomerNftsData {
  project: Pick<Project, 'id' | 'customer'>;
}

interface GetCustomerNftsVars {
  project: string;
  customer: string;
}

export default function Nfts({ children, project, customer, loading }: NftsProps) {
  const mintsQuery = useQuery<GetCustomerNftsData, GetCustomerNftsVars>(GetCustomerNfts, {
    variables: { project, customer },
  });
  const mints = mintsQuery.data?.project.customer?.mints || [];
  const noMints = mints.length === 0;

  return (
    <>
      <div className="h-full flex flex-col flex-1">
        {mintsQuery.loading || loading ? (
          <div />
        ) : (
          <>
            {noMints ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <span className="mt-6 text-xl font-semibold">
                  The customer does not own any NFTs yet
                </span>
                <span className="mt-2 text-gray-500 text-sm">
                  Click button below to understand how to mint NFTs.
                </span>
                <a href="https://docs.holaplex.dev/hub/Guides/minting-drops">
                  <Button icon={<Icon.Help stroke="#ffffff" />} className="mt-8">
                    How to mint
                  </Button>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mints.map((mint) => (
                  <Mint.Card mint={mint} key={mint.id} />
                ))}
              </div>
            )}
            {children}
          </>
        )}
      </div>
    </>
  );
}
