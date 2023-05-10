'use client';
import { Button } from '@holaplex/ui-library-react';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';
import { Icon } from '../../../components/Icon';
import Tabs from '../../../layouts/Tabs';
import { GetOrganizationCreditAndDeductionTotals } from './../../../queries/credits.graphql';
import { useQuery } from '@apollo/client';
import { useOrganization } from '../../../hooks/useOrganization';
import { Organization } from '../../../graphql.types';
import { ACTION_LABEL } from './constant';
import Link from 'next/link';

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
  const creditAndDeductionsQuery = useQuery<
    GetOrganizationCreditBalanceData,
    GetOrganizationBalanceVars
  >(GetOrganizationCreditAndDeductionTotals, {
    variables: { organization: organization?.id },
  });

  const deductions = creditAndDeductionsQuery.data?.organization.deductionTotals || [];

  return (
    <div className="h-full flex flex-col p-4">
      {creditAndDeductionsQuery.loading ? (
        <>
          <div className="bg-stone-950 h-8 w-10 rounded-md animate-pulse" />
          <div className="mt-8 flex gap-8">
            <div className="flex flex-col basis-1/3 gap-4 items-center justify-center p-6 bg-stone-900 rounded-lg animate-pulse">
              <div className="bg-stone-950 h-6 w-40 rounded-md animate-pulse" />
              <div className="bg-stone-950 animate-pulse rounded-md h-[60px] w-2/3" />
              <div className="bg-stone-950 h-10 w-44 rounded-md animate-pulse" />
            </div>
            <div className="flex basis-2/3 gap-8 bg-stone-900 rounded-lg p-6 animate-pulse">
              <div className="flex flex-col gap-4 basis-1/4">
                <div className="bg-stone-950 h-6 w-24 rounded-md animate-pulse" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="bg-stone-950 rounded-full h-5 w-full animate-pulse" />
                  <div className="bg-stone-950 rounded-full h-5 w-full animate-pulse" />
                  <div className="bg-stone-950 rounded-full h-5 w-full animate-pulse" />
                  <div className="bg-stone-950 rounded-full h-5 w-full animate-pulse" />
                </div>
              </div>
              <div className="flex gap-4 py-10 px-4 bg-stone-950 basis-3/4 rounded-lg items-center">
                <div className="flex flex-col gap-1 grow">
                  <div className="bg-stone-900 rounded-full h-3.5 w-full animate-pulse" />
                  <div className="bg-stone-900 rounded-full h-3.5 w-full animate-pulse" />
                  <div className="bg-stone-900 rounded-full h-3.5 w-full animate-pulse" />
                  <div className="bg-stone-900 rounded-full h-3.5 w-2/3 animate-pulse" />
                </div>
                <div className="bg-stone-900 rounded-md h-10 w-32 animate-pulse" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-medium">Credits</h1>
          <div className="mt-8 flex gap-8">
            <div className="flex flex-col basis-1/3 gap-4 items-center justify-center p-6 bg-stone-900 rounded-lg">
              <span className="text-gray-400">Current credit balance</span>
              <span className="text-6xl font-semibold">
                {creditAndDeductionsQuery.data?.organization.credits?.balance}
              </span>
              <Link href="/credits/buy">
                <Button icon={<Icon.Add />}>Buy more credits</Button>
              </Link>
            </div>
            <div className="flex basis-2/3 gap-8 bg-stone-900 rounded-lg p-6">
              <div className="flex flex-col gap-4 basis-1/4">
                <span className="font-bold">Credits used</span>
                <div className="flex flex-col gap-2 w-full">
                  {deductions.map((deduction) => {
                    return (
                      <div
                        className="flex items-center justify-between w-full"
                        key={deduction.action}
                      >
                        <span className="text-gray-400 text-sm">
                          {ACTION_LABEL[deduction.action]}:
                        </span>
                        <span className="text-sm font-semibold">{deduction.spent}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-4 py-10 px-4 bg-stone-950 basis-3/4 rounded-lg items-center">
                <span className="text-gray-400 font-medium text-sm">
                  Based on estimated usage you will need about 34,000 credits to create wallets and
                  mint all the NFTs available in your current active drops. You currently have
                  16,921 credits.
                </span>
                <Button onClick={() => {}} variant="secondary" className="shrink-0">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <Tabs.Page className="mt-8">
        <Tabs.Panel loading={creditAndDeductionsQuery.loading}>
          <Tabs.Tab
            name="Cost in credits"
            href="/credits/costs"
            active={pathname === '/credits/costs'}
          />
          <Tabs.Tab
            name="Credits purchase history"
            href="/credits/purchases"
            active={pathname === '/credits/purchases'}
          />
          <Tabs.Tab name="Alerts" href="/credits/alerts" active={pathname === '/credits/alerts'} />
        </Tabs.Panel>
        <Tabs.Content>
          {cloneElement(children as JSX.Element, { loading: creditAndDeductionsQuery.loading })}
        </Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
