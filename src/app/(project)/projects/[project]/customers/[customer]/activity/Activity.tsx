'use client';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../../../../components/Table';
import { Project, Drop } from '../../../../../../../graphql.types';

interface ActivityPageProps {
  project: string;
  customer: string;
}

interface GetActivityData {
  project: Pick<Project, 'id'>;
}

interface GetActivityVars {
  project: string;
  customer: string;
}

export default function Activity({ project, customer }: ActivityPageProps) {
  const activityQuery: any = [];
  // useQuery<GetActivityData, GetActivityVars>(GetActivity, {
  //   variables: { project, customer },
  // });

  const activity: any = []; //activityQuery.data?.project. || [];
  const noActivity = activity.length === 0;
  const loadingColumnHelper = createColumnHelper<any>();
  const columnHelper = createColumnHelper<Drop>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        {activityQuery.loading ? (
          <>
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <span className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-md h-8 w-8 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'from',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'to',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'amount',
                  header: () => <div className="rounded-full h-3 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <span className="rounded-full h-3 w-4 bg-gray-50 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'chain',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <span className="rounded-full h-3 w-12 bg-gray-50 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'type',
                  header: () => <div className="rounded-full h-3 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <span className="rounded-full h-6 w-20 bg-gray-50 animate-pulse" />,
                }),
              ]}
              data={new Array(4)}
            />
          </>
        ) : (
          <>
            {noActivity ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <span className="mt-2 text-gray-500 text-sm">No activity</span>
              </div>
            ) : (
              <div className="mt-4 flex flex-col"></div>
            )}
          </>
        )}
      </div>
    </>
  );
}
