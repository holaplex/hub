'use client';
import { Button, Form, Modal, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import Card from '../../../../components/Card';
import { Icon } from '../../../../components/Icon';
import Table from '../../../../components/Table';
import Typography, { Size } from '../../../../components/Typography';

type Project = {
  projectName: string;
  totalBalance: string;
  createdDate: string;
};

export default function ProjectsPage() {
  const [showCreateProject, setShowCreateProject] = useState<boolean>(false);
  // TODO: Replace this with actual projects data.
  const hasProjects = true;
  const columnHelper = createColumnHelper<Project>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Active Projects</div>
        {!hasProjects ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center">
            <Icon.Large.CreateProject />
            <span className="mt-6 text-xl font-semibold">No projects created yet</span>
            <span className="mt-2 text-gray-500 text-sm">Click button below to get started.</span>
            <Button
              icon={<Icon.CreateProject fill="#ffffff" />}
              className="mt-8"
              onClick={() => setShowCreateProject(true)}
            >
              Create new project
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button
              icon={<Icon.CreateProject stroke="#ffffff" />}
              className="self-end"
              onClick={() => setShowCreateProject(true)}
            >
              Create project
            </Button>
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor('projectName', {
                  header: () => (
                    <div className="flex gap-2">
                      <Icon.CheckBox />
                      <span className="text-xs text-gray-600 font-medium">Project Name</span>
                    </div>
                  ),
                  cell: (info) => (
                    <div className="flex gap-2">
                      <Icon.CheckBox />
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('totalBalance', {
                  header: () => (
                    <span className="flex text-xs text-gray-600 font-medium">Total balance</span>
                  ),
                  cell: (info) => (
                    <div className="flex gap-1">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      <span className="text-xs text-gray-600 font-medium">USD</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('createdDate', {
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
                columnHelper.display({
                  id: 'moreOptions',
                  header: () => <Icon.TableAction />,
                  cell: () => (
                    <PopoverBox
                      triggerButton={
                        <div
                          className={clsx('px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min')}
                        >
                          <Icon.More />
                        </div>
                      }
                      elements={[
                        <div key="transfer_tokens" className="flex gap-2 items-center">
                          <Icon.TransferTokens /> <span>Transfer tokens</span>
                        </div>,
                        <div key="edit_project" className="flex gap-2 items-center">
                          <Icon.Edit /> <span>Edit project</span>
                        </div>,
                        <div key="delete_project" className="flex gap-2 items-center">
                          <Icon.Delete fill="#E52E2E" />
                          <span className="text-negative">Delete project</span>
                        </div>,
                      ]}
                    />
                  ),
                }),
              ]}
              data={[
                {
                  projectName: 'Space Fox',
                  totalBalance: '843.27',
                  createdDate: '20.11.22, 9:54am',
                },
                {
                  projectName: 'Green Fox',
                  totalBalance: '5000.27',
                  createdDate: '20.11.19, 9:54am',
                },
                {
                  projectName: 'Blue Fox',
                  totalBalance: '0.00',
                  createdDate: '20.11.22, 9:54am',
                },
              ]}
            />
          </div>
        )}
      </div>
      {/* TODO: Fix Modal to show as overlay instead of in footer. */}
      <Modal
        open={showCreateProject}
        setOpen={(open: boolean) => {
          setShowCreateProject(open);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Create new project
          </Typography.Header>
          <Typography.Header size={Size.H3} className="self-start">
            Enter project name and upload a logo.
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Project name" className="text-xs text-primary">
              <Form.Input placeholder="e.g. Apple events" />
            </Form.Label>

            <Form.Error message="" />

            <Button htmlType="submit" className="w-full mt-5">
              Create
            </Button>
            <Button
              className="w-full mt-5"
              variant="tertiary"
              onClick={() => setShowCreateProject(false)}
            >
              Cancel
            </Button>
            {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
          </Form>
        </Card>
      </Modal>
    </>
  );
}
