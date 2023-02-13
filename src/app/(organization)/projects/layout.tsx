'use client';
import { Button, Form, Modal, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import React, { useState } from 'react';
import Card from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetOrganizationProjects } from './../../../queries/organization.graphql';
import Typography, { Size } from '../../../components/Typography';
import { Organization, Project } from '../../../graphql.types';
import { useOrganization } from '../../../hooks/useOrganization';

interface GetProjectsData {
  organization: Organization;
}

interface GetProjectsVars {
  organization: string;
}

export default function ProjectsPage({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();

  const projectsQuery = useQuery<GetProjectsData, GetProjectsVars>(GetOrganizationProjects, {
    variables: { organization: organization?.id },
  });
  const projects = projectsQuery.data?.organization.projects || [];

  const noProjects = projects.length === 0;
  const columnHelper = createColumnHelper<Project>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <h1 className="text-2xl text-primary font-medium">Active Projects</h1>
        {noProjects ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center">
            <Icon.Large.CreateProject />
            <span className="mt-6 text-xl font-semibold">No projects created yet</span>
            <span className="mt-2 text-gray-500 text-sm">Click button below to get started.</span>
            <Link href="/projects/new">
              <Button icon={<Icon.CreateProject stroke="#ffffff" />} className="mt-8">
                Create new project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Link href="/projects/new" className="self-end">
              <Button icon={<Icon.CreateProject stroke="#ffffff" />} className="self-end">
                Create project
              </Button>
            </Link>
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor(({ name, id }) => ({ name, id }), {
                  id: 'name',
                  header: () => (
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-600 font-medium">Project Name</span>
                    </div>
                  ),
                  cell: (info) => (
                    <Link href={`/projects/${info.getValue().id}/drops`} className="flex gap-2">
                      <span className="text-xs text-primary font-medium">{info.getValue().name}</span>
                    </Link>
                  ),
                }),
                columnHelper.display({
                  id: 'balance',
                  header: () => (
                    <span className="flex text-xs text-gray-600 font-medium">Total balance</span>
                  ),
                  cell: () => (
                    <div className="flex gap-1">
                      <span className="text-xs text-primary font-medium">99.99</span>
                      <span className="text-xs text-gray-600 font-medium">USD</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('createdAt', {
                  header: () => (
                    <span className="flex text-xs text-gray-600 font-medium self-start">
                      Created date
                    </span>
                  ),
                  cell: (info) => (
                    <div className="flex flex-col">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('id', {
                  header: () => <Icon.TableAction />,
                  cell: (info) => (
                    <PopoverBox
                      triggerButton={
                        <div className="px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min">
                          <Icon.More />
                        </div>
                      }
                      elements={[
                        <Link
                          key="transfer_tokens"
                          className="flex gap-2 items-center"
                          href={`/projects/${info.getValue()}/transfer`}
                        >
                          <Icon.TransferTokens /> <span>Transfer tokens</span>
                        </Link>,
                        <Link
                          key="edit_project"
                          className="flex gap-2 items-center"
                          href={`/projects/${info.getValue()}/edit`}
                        >
                          <Icon.Edit /> <span>Edit project</span>
                        </Link>,
                        // TODO: Check the project treasury, if it has funds ask to transfer funds.
                        <Link
                          key="delete_project"
                          className="flex gap-2 items-center"
                          href={`/projects/${info.getValue()}/delete`}
                        >
                          <Icon.Delete fill="#E52E2E" />
                          <span className="text-negative">Delete project</span>
                        </Link>,
                      ]}
                    />
                  ),
                }),
              ]}
              data={projects}
            />
          </div>
        )}
      </div>
      {children}
    </>
  );
}
