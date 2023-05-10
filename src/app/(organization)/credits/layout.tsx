'use client';
import { Button } from '@holaplex/ui-library-react';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';
import { Icon } from '../../../components/Icon';
import Tabs from '../../../layouts/Tabs';
import { GetOrganizationCreditAndDeductionTotals } from './../../../queries/credits.graphql';
import { GetOrganizationDrops } from './../../../queries/drop.graphql';
import { useQuery } from '@apollo/client';
import { useOrganization } from '../../../hooks/useOrganization';
import { ActionCost, Organization, Project, Drop, Action } from '../../../graphql.types';
import Link from 'next/link';
import clsx from 'clsx';

interface GetOrganizationBalanceVars {
  organization: string;
}

interface GetOrganizationCreditBalanceData {
  organization: Organization;
}

interface GetOrganizationDropsVars {
  organization: string;
}

interface GetOrganizationDropsData {
  organization: Organization;
  creditSheet: ActionCost[];
}

interface ActionCreditMap {
  createDrop: Map<string, number>;
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
  const balance = creditAndDeductionsQuery.data?.organization.credits?.balance;

  const dropsQuery = useQuery<GetOrganizationDropsData, GetOrganizationDropsVars>(
    GetOrganizationDrops,
    {
      variables: { organization: organization?.id },
    }
  );

  const projects = dropsQuery.data?.organization.projects;
  const creditSheet = dropsQuery.data?.creditSheet;

  const actionCreditMap: ActionCreditMap =
    creditSheet?.reduce((result: ActionCreditMap, sheet: ActionCost) => {
      if (sheet.action === Action.CreateDrop) {
        const creditCost = sheet.blockchains.reduce(
          (map: Map<string, number>, blockchain: { blockchain: string; credits: number }) => {
            map.set(blockchain.blockchain, blockchain.credits);
            return map;
          },
          new Map<string, number>()
        );

        result.createDrop = creditCost;
      }
      return result;
    }, {} as ActionCreditMap) || ({} as ActionCreditMap);

  const estimatedCredits = projects?.reduce((result: number, project: Project) => {
    return (
      result +
      (project.drops?.reduce((dropResult: number, drop: Drop) => {
        const toMint = drop.collection.totalMints - (drop.collection.supply ?? 0);
        const createDropPrice = actionCreditMap.createDrop.get(drop.collection.blockchain);
        return dropResult + (createDropPrice ? toMint * createDropPrice : 0);
      }, 0) ?? 0)
    );
  }, 0);

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <h1 className="text-2xl font-medium">Credits</h1>
        <div className="mt-8 flex gap-8">
          <div className="flex flex-col basis-1/3 gap-4 items-center justify-center p-6 bg-stone-900 rounded-lg">
            <span className="text-gray-400">Current credit balance</span>
            {creditAndDeductionsQuery.loading ? (
              <div className="bg-stone-950 animate-pulse rounded-md h-[60px] w-2/3" />
            ) : (
              <span className="text-6xl font-semibold">{balance}</span>
            )}
            <Link href="/credits/buy">
              <Button icon={<Icon.Add />}>Buy more credits</Button>
            </Link>
          </div>
          <div className="flex basis-2/3 gap-8 bg-stone-900 rounded-lg p-6">
            <div className="flex flex-col gap-4 basis-1/4">
              <span className="font-bold">Credits used</span>
              <div className="flex flex-col gap-2 w-full">
                {creditAndDeductionsQuery.loading ? (
                  <>
                    <div className="bg-stone-950 rounded-full h-8 w-full animate-pulse" />
                    <div className="bg-stone-950 rounded-full h-8 w-full animate-pulse" />
                    <div className="bg-stone-950 rounded-full h-8 w-full animate-pulse" />
                    <div className="bg-stone-950 rounded-full h-8 w-full animate-pulse" />
                    <div className="bg-stone-950 rounded-full h-8 w-full animate-pulse" />
                  </>
                ) : (
                  deductions.map((deduction) => {
                    return (
                      <div
                        className="flex items-center justify-between w-full"
                        key={deduction.action}
                      >
                        <span className="text-gray-400 text-sm">{deduction.action}:</span>
                        <span className="text-sm font-semibold">{deduction.spent}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="flex gap-4 py-10 px-4 bg-stone-950 basis-3/4 rounded-lg items-center">
              <span className="text-gray-400 font-medium text-sm">
                Based on estimated usage you will need about{' '}
                {dropsQuery.loading ? (
                  <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />
                ) : (
                  <span className="text-white">{estimatedCredits}</span>
                )}{' '}
                credits to create wallets and mint all the NFTs available in your current active
                drops. You currently have{' '}
                {creditAndDeductionsQuery.loading || dropsQuery.loading ? (
                  <div className="rounded-full h-4 w-8 bg-stone-800 animate-pulse" />
                ) : balance ? (
                  <span
                    className={clsx({
                      'text-red-500': estimatedCredits && estimatedCredits > balance,
                      'text-green-400': estimatedCredits && estimatedCredits <= balance,
                    })}
                  >
                    {balance}
                  </span>
                ) : (
                  <>no</>
                )}{' '}
                credits.
              </span>

              <Button onClick={() => {}} variant="secondary" className="shrink-0">
                Learn more
              </Button>
            </div>
          </div>
        </div>
        <Tabs.Page className="mt-8">
          <Tabs.Panel loading={creditAndDeductionsQuery.loading}>
            <Tabs.Tab
              name="Cost in credits"
              href="/credits/costs"
              active={pathname === '/credits/costs'}
            />
            <Tabs.Tab
              name="Credits purchase history"
              href="/credits/purchasehistory"
              active={pathname === '/credits/purchasehistory'}
            />
            <Tabs.Tab
              name="Alerts"
              href="/credits/alerts"
              active={pathname === '/credits/alerts'}
            />
          </Tabs.Panel>
          <Tabs.Content>
            {cloneElement(children as JSX.Element, { loading: creditAndDeductionsQuery.loading })}
          </Tabs.Content>
        </Tabs.Page>
      </div>
    </>
  );
}
