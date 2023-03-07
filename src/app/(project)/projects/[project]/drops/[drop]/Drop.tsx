'use client';

import { Button } from '@holaplex/ui-library-react';
import { Icon } from '../../../../../../components/Icon';
import Tabs from '../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GetDrop } from './../../../../../../queries/drop.graphql';
import { useQuery } from '@apollo/client';
import { DropStatus, Project } from '../../../../../../graphql.types';
import clsx from 'clsx';
import { cloneElement } from 'react';

type Drop = {
  name: string;
};

interface DropProps {
  project: string;
  drop: string;
  children: React.ReactNode;
}

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropsData {
  project: Pick<Project, 'drop'>;
}

export default function Drop({ children, project, drop }: DropProps): JSX.Element {
  const pathname = usePathname();

  const dropQuery = useQuery<GetDropsData, GetDropVars>(GetDrop, { variables: { project, drop } });
  const percent = Math.ceil(
    (dropQuery.data?.project?.drop?.collection?.totalMints as number) /
      (dropQuery.data?.project?.drop?.collection?.supply as number)
  );
  const loading = dropQuery.loading;

  return (
    <div className="flex flex-col px-4 py-2">
      {loading ? (
        <>
          <div className="flex items-center justify-between">
            <div className="h-8 w-60 bg-gray-100 animate-pulse rounded-md" />
            <div className="flex items-center gap-2">
              <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-md" />
            </div>
          </div>
          <div className="mt-5 flex gap-4">
            <div className="basis-1/3">
              <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg" />
            </div>
            <div className="basis-2/3 flex flex-col gap-2">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-gray-100 animate-pulse rounded-full" />

                  <div className="h-4 w-14 bg-gray-100 animate-pulse rounded-full" />
                </div>
                <div className="w-full rounded-full h-[12px] bg-gray-100 animate-pulse mt-1 relative overflow-hidden" />
              </div>
              <div className="flex p-4 bg-white rounded-md">
                <div className="basis-1/2 h-full flex flex-col border-r border-r-gray-100 pr-4">
                  <div className="h-4 w-8 bg-gray-100 animate-pulse rounded-full mb-2" />
                  <span className="h-8 w-2/3 bg-gray-100 animate-pulse rounded-md mb-1" />
                  <span className="h-6 w-1/3 bg-gray-100 animate-pulse rounded-md mb-7" />
                  <div className="h-4 w-10 bg-gray-100 animate-pulse rounded-full mb-1" />
                  <span className="h-12 w-3/4 bg-gray-100 animate-pulse rounded-md" />
                  <div className="flex gap-2 mt-4">
                    <span className="h-14 w-full bg-gray-100 animate-pulse rounded-md" />
                    <span className="h-14 w-full bg-gray-100 animate-pulse rounded-md" />
                  </div>
                </div>
                <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-8 bg-gray-100 animate-pulse rounded-full mb-2" />
                    <span className="h-8 w-1/3 bg-gray-100 animate-pulse rounded-md mb-7" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="h-12 w-full flex flex-col rounded-md bg-gray-100 animate-pulse" />
                    </div>

                    <div className="flex gap-2 mt-3">
                      <div className="h-12 w-full flex flex-col rounded-md bg-gray-100 animate-pulse" />
                      <div className="h-12 w-full flex flex-col rounded-md bg-gray-100 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-2xl font-medium items-center">
              <Link href={`/projects/${project}/drops`} className="text-gray-500">
                Manage drops
              </Link>{' '}
              /
              <span className="text-primary">
                {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button icon={<Icon.Edit />} variant="secondary">
                Edit
              </Button>
              <Button icon={<Icon.Pause />} variant="secondary">
                Pause
              </Button>
              <Button icon={<Icon.Close />} variant="secondary">
                Shut down Minting
              </Button>
            </div>
          </div>
          <div className="mt-5 flex gap-4">
            <div className="basis-1/3">
              <img
                src={dropQuery.data?.project?.drop?.collection?.metadataJson?.image}
                className="w-full aspect-square rounded-lg"
              />
            </div>
            <div className="basis-2/3 flex flex-col gap-2">
              <div className="w-full text-xs font-medium">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-primary">
                      {dropQuery.data?.project?.drop?.status} - {percent}%
                    </span>
                    <span className="text-gray-500">
                      {dropQuery.data?.project?.drop?.collection?.totalMints}/
                      {dropQuery.data?.project?.drop?.collection?.supply}
                    </span>
                  </div>
                  <span className="text-gray-500">10 days to start</span>
                </div>
                <div className="w-full rounded-full h-[12px] bg-gray-100 mt-1 relative overflow-hidden">
                  <div
                    className={clsx('top-0 bottom-0 left-0 absolute rounded-r-full', {
                      'bg-blue-600': dropQuery.data?.project?.drop?.status === DropStatus.Minting,
                    })}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
              <div className="flex p-4 bg-white rounded-md">
                <div className="basis-1/2 h-full flex flex-col border-r border-r-gray-100 pr-4">
                  <span className="text-gray-500 text-xs font-medium mb-2">Name</span>
                  <span className="text-primary text-3xl font-medium">
                    {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
                  </span>
                  <span className="text-gray-500 mb-6">
                    {dropQuery.data?.project?.drop?.collection?.metadataJson?.symbol}
                  </span>
                  <span className="text-gray-400 text-xs font-medium mb-1">Description</span>
                  <span className="text-sm h-[90px] text-primary overflow-hidden">
                    {dropQuery.data?.project?.drop?.collection?.metadataJson?.description}
                  </span>
                  <div className="flex gap-2 mt-4">
                    <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                      <span className="text-gray-500 text-xs font-medium">Treasury wallet</span>
                      <span className="text-primary text-sm font-medium">0xA91...a2E9</span>
                    </div>
                    <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                      <span className="text-gray-500 text-xs font-medium">Blockchain</span>
                      <span className="text-primary text-sm font-medium">
                        {dropQuery.data?.project?.drop?.collection?.blockchain}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-xs font-medium mb-2">Price</span>
                    <span className="text-primary text-3xl font-medium">Free</span>
                  </div>
                  <div>
                    {dropQuery.data?.project?.drop?.collection?.creators?.map((creator, index) => (
                      <div
                        className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50 mt-3"
                        key={creator.address}
                      >
                        <span className="text-gray-500 text-xs font-medium">
                          Royalty wallet address #{index + 1}
                        </span>
                        <span className="text-primary text-sm font-medium">
                          {`${creator.address.slice(0, 6)}...${creator.address.slice(
                            creator.address.length - 4,
                            creator.address.length
                          )}`}{' '}
                          <span className="text-gray-400">- {creator.share}%</span>
                        </span>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-3">
                      <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                        <span className="text-gray-500 text-xs font-medium">Start date</span>
                        <span className="text-primary text-sm font-medium">
                          03/11/2022, 11:30 AM
                        </span>
                      </div>
                      <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                        <span className="text-gray-500 text-xs font-medium">End date</span>
                        <span className="text-primary text-sm font-medium">
                          03/12/2022, 11:30 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Tabs.Page className="mt-8">
        <Tabs.Panel loading={loading}>
          <Tabs.Tab
            name="Analytics"
            href={`/projects/${project}/drops/${drop}/analytics`}
            active={pathname === `/projects/${project}/drops/${drop}/analytics`}
          />
          <Tabs.Tab
            name="Purchase history"
            href={`/projects/${project}/drops/${drop}/purchases`}
            active={pathname === `/projects/${project}/drops/${drop}/purchases`}
          />
          <Tabs.Tab
            name="Current holders"
            href={`/projects/${project}/drops/${drop}/holders`}
            active={pathname === `/projects/${project}/drops/${drop}/holders`}
          />
        </Tabs.Panel>
        <Tabs.Content>{cloneElement(children as JSX.Element, { loading })}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
