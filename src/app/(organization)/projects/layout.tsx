'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetOrganizationProjects } from './../../../queries/organization.graphql';
import { Organization, Project } from '../../../graphql.types';
import { useOrganization } from '../../../hooks/useOrganization';
import { DateFormat, formatDateString } from '../../../modules/time';
import Copy from '../../../components/Copy';

interface GetProjectsData {
  organization: Organization;
}

interface GetProjectsVars {
  organization: string;
}

export default function OrganizationProjectsLayout({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();

  const projectsQuery = useQuery<GetProjectsData, GetProjectsVars>(GetOrganizationProjects, {
    variables: { organization: organization?.id },
  });

  const projects = projectsQuery.data?.organization.projects || [];
  const noProjects = projects.length === 0;
  const columnHelper = createColumnHelper<Project>();
  const loadingColumnHelper = createColumnHelper<any>();

  const loading = projectsQuery.loading;

  return (
    <>
      <div className="h-full flex flex-col p-4">
        {loading ? (
          <>
            <div className="w-36 h-8 rounded-md bg-loadingui animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-loadingui animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                    </div>
                  ),
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-md h-8 w-8 bg-loadingui animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-loadingui animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'options',
                  header: () => <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />,
                  cell: () => <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />,
                }),
              ]}
              data={new Array(4)}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium">Projects</h1>
            {noProjects ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <Icon.Large.CreateProject />
                <span className="mt-6 text-xl font-semibold">No projects created yet</span>
                <span className="mt-2 text-subtletext text-sm">
                  Click button below to get started.
                </span>
                <Link href="/projects/new">
                  <Button
                    icon={<Icon.CreateProject className="primary-button-icon" />}
                    className="mt-8"
                  >
                    Create new project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Link href="/projects/new" className="self-end">
                  <Button icon={<Icon.Add className="primary-button-icon" />} className="self-end">
                    Create Project
                  </Button>
                </Link>
                <Table
                  className="mt-4"
                  columns={[
                    // @ts-ignore
                    columnHelper.accessor('name', {
                      header: () => <span>Project Name</span>,
                      cell: (info) => {
                        const profileImage = info.row.original.profileImageUrl;
                        return (
                          <Link
                            href={`/projects/${info.row.original.id}/drops`}
                            className="flex gap-2 items-center"
                          >
                            {profileImage ? (
                              <img className="w-8 h-8 rounded-md" src={profileImage} alt="logo" />
                            ) : (
                              <div className="w-8 h-8 bg-gray-300 rounded-md" />
                            )}
                            <span>{info.getValue()}</span>
                          </Link>
                        );
                      },
                    }),
                    columnHelper.accessor('createdAt', {
                      header: () => <span>Created date</span>,
                      cell: (info) => {
                        return (
                          <div className="flex flex-col">
                            <span className="text-xs text-subtletext">
                              {formatDateString(info.getValue(), DateFormat.DATE_1)}
                            </span>
                            <span className="text-xs font-normal">
                              {formatDateString(info.getValue(), DateFormat.TIME_1)}
                            </span>
                          </div>
                        );
                      },
                    }),
                    columnHelper.display({
                      id: 'options',
                      header: () => <div />,
                      cell: (info) => {
                        const projectId = info.row.original.id;
                        return (
                          <PopoverBox
                            triggerButton={
                              <div className="px-2 py-1 hover:rounded-md hover:bg-highlightcell max-w-min">
                                <Icon.More />
                              </div>
                            }
                            elements={[
                              <Link
                                key="edit_project"
                                className="flex gap-2 items-center"
                                href={`/projects/${projectId}/edit`}
                              >
                                <Icon.Edit /> <span>Edit project</span>
                              </Link>,
                              // TODO: Check the project treasury, if it has funds ask to transfer funds.
                              <Copy key="copy_id" copyString={projectId}>
                                <span>Copy project ID</span>
                              </Copy>,
                              <Link
                                key="delete_project"
                                className="flex gap-2 items-center"
                                href={`/projects/${projectId}/delete`}
                              >
                                <Icon.Delete className="stroke-negative" />
                                <span className="text-negative">Delete project</span>
                              </Link>,
                            ]}
                          />
                        );
                      },
                    }),
                  ]}
                  data={projects}
                />
              </div>
            )}
          </>
        )}
      </div>

      {children}
    </>
  );
}
