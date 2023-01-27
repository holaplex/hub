'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
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
              icon={<Icon.CreateProject color="#ffffff" className="mr-2" />}
              border="rounded"
              className="bg-primary p-3 mt-8 text-white"
              onClick={() => setShowCreateProject(true)}
            >
              Create new project
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button
              icon={<Icon.CreateProject color="#ffffff" className="mr-2" />}
              border="rounded"
              className="bg-primary p-3 text-white min-w-min self-end"
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
                  cell: () => <Icon.More />,
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

            <Button
              border="rounded"
              htmlType="submit"
              className="w-full bg-primary text-white p-3 mt-5 text-xs font-semibold "
            >
              Create
            </Button>
            <Button
              border="rounded"
              className="w-full bg-white text-black p-3 mt-5 text-xs font-semibold"
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
