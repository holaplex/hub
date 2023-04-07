'use client';

import Tabs from '../../../../../../layouts/Tabs';
import Link from 'next/link';
import { format } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import { GetCustomerBasicDetail } from './../../../../../../queries/customer.graphql';
import { convertLocalTime, DateFormat } from './../../../../../../modules/time';
import { useQuery } from '@apollo/client';
import { Project } from '../../../../../../graphql.types';
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
  const loading = customerQuery.loading;

  return (
    <div className="flex flex-col px-4 py-2 flex-grow">
      {loading ? (
        <div className="flex justify-between flex-row text-gray-100">
          <div className="flex flex-row gap-1  items-center">
            <div className="w-36 h-8 rounded-md bg-gray-100 animate-pulse" /> /{' '}
            <div className="w-60 h-8 rounded-md bg-gray-100 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="w-14 h-4 rounded-full bg-gray-100 animate-pulse" />
            <div className="w-32 h-4 rounded-full bg-gray-100 animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex gap-2 text-2xl font-medium items-center text-gray-500">
            <Link href={`/projects/${project}/customers`}>Customers</Link> /{' '}
            <span className="text-primary">{customer}</span>
          </div>
          <ul className="flex-row gap-4">
            <li className="flex flex-col items-end gap-1">
              <span className="text-gray-500 font-medium text-xs">Registered</span>
              <span className="text-xs">
                {format(
                  convertLocalTime(customerQuery?.data?.project?.customer?.createdAt),
                  DateFormat.DATE_2
                )}
              </span>
            </li>
          </ul>
        </div>
      )}
      <Tabs.Page className="mt-8">
        <Tabs.Panel loading={loading}>
          <Tabs.Tab
            name="Nfts"
            href={`/projects/${project}/customers/${customer}/nfts`}
            active={pathname === `/projects/${project}/customers/${customer}/nfts`}
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
