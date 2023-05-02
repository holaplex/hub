'use client';
import { Button } from '@holaplex/ui-library-react';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';
import { Icon } from '../../../components/Icon';
import Tabs from '../../../layouts/Tabs';
import { GetOrganizationCreditBalance } from './../../../queries/credits.graphql';
import { useQuery } from '@apollo/client';
import { useOrganization } from '../../../hooks/useOrganization';
import { Organization } from '../../../graphql.types';

interface GetOrganizationBalanceVars {
  organization: string;
}

interface GetOrganizationCreditBalanceData {
  organization: Organization;
}
export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const pathname = usePathname();

  const { organization } = useOrganization();
  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: organization?.id },
    }
  );
  return (
    <>
      <div className="h-full flex flex-col p-4">
        <h1 className="text-2xl font-medium">Credits</h1>
        <div className="mt-8 flex gap-8">
          <div className="flex flex-col basis-1/3 gap-4 items-center p-6 bg-stone-900 rounded-lg">
            <span className="text-gray-400">Current credit balance</span>
            <span className="text-6xl font-semibold">
              {creditBalanceQuery.data?.organization.credits?.balance}
            </span>
            <Button icon={<Icon.Add className="primary-button-icon" />} onClick={() => {}}>
              Buy more credits
            </Button>
          </div>
          <div className="flex basis-2/3 gap-8 bg-stone-900 rounded-lg p-6">
            <div className="flex gap-4 basis-1/4">
              <span className="font-bold">Credits used</span>
              <div></div>
            </div>
            <div className="flex gap-4 py-10 px-4 bg-stone-950 basis-3/4 rounded-lg items-center">
              <span className="text-gray-400 font-medium text-sm">
                Based on estimated usage you will need about 34,000 credits to create wallets and
                mint all the NFTs available in your current active drops. You currently have 16,921
                credits.
              </span>
              <Button onClick={() => {}} variant="secondary" className="shrink-0">
                Learn more
              </Button>
            </div>
          </div>
        </div>
        <Tabs.Page className="mt-8">
          <Tabs.Panel loading={creditBalanceQuery.loading}>
            <Tabs.Tab
              name="Cost in credits"
              href="/credits/cost"
              active={pathname === '/credits/costs'}
            />
            <Tabs.Tab
              name="Credits purchase history"
              href="/credits/history"
              active={pathname === '/credits/history'}
            />
            <Tabs.Tab
              name="Alerts"
              href="/credits/alerts"
              active={pathname === '/credits/alerts'}
            />
          </Tabs.Panel>
          <Tabs.Content>
            {cloneElement(children as JSX.Element, { loading: creditBalanceQuery.loading })}
          </Tabs.Content>
        </Tabs.Page>
      </div>
      {children}
    </>
  );
}
