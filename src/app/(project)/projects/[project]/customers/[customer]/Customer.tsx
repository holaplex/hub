'use client';

import Tabs from '../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GetCustomerBasicDetail } from './../../../../../../queries/customer.graphql';

import { useQuery } from '@apollo/client';
import { Project } from '../../../../../../graphql.types';
import clsx from 'clsx';
import { cloneElement } from 'react';

interface CustomerProps {
  project: string;
  customer: string;
  children: React.ReactNode;
}

interface GetCustomerVars {
  project: string;
  customer: string;
}

interface GetCustomerData {
  project: Pick<Project, 'customer'>;
}

export default function Customer({ children, project, customer }: CustomerProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const customerQuery = useQuery<GetCustomerData, GetCustomerVars>(GetCustomerBasicDetail, {
    variables: { project, customer },
  });
  console.log('customer', customerQuery);
  const loading = customerQuery.loading;

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-2xl font-medium items-center">
          <Link href={`/projects/${project}/drops`} className="text-gray-500">
            Customers
          </Link>{' '}
          /<span className="text-primary">{customer}</span>
        </div>
      </div>

      <Tabs.Page className="mt-8">
        <Tabs.Panel loading={loading}>
          <Tabs.Tab
            name="Nfts"
            href={`/projects/${project}/customers/${customer}/nfts`}
            active={pathname === `/projects/${project}/customers/${customer}/nfts`}
          />
          <Tabs.Tab
            name="Activity"
            href={`/projects/${project}/customers/${customer}/activity`}
            active={pathname === `/projects/${project}/customers/${customer}/activity`}
          />
          <Tabs.Tab
            name="Wallets"
            href={`/projects/${project}/customers/${customer}/wallets`}
            active={pathname === `/projects/${project}/customers/${customer}/wallets`}
          />
        </Tabs.Panel>
        <Tabs.Content>{cloneElement(children as JSX.Element, { loading })}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
