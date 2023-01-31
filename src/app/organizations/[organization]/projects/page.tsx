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

enum ShowModal {
  NONE,
  CREATE_PROJECT,
  TRANSFER_TOKENS,
  EDIT_PROJECT,
  DELETE_PROJECT_TRANSFER_FUNDS,
  DELETE_PROJECT,
}

export default function ProjectsPage() {
  const [showModal, setShowModal] = useState<ShowModal>(ShowModal.NONE);

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
              onClick={() => setShowModal(ShowModal.CREATE_PROJECT)}
            >
              Create new project
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button
              icon={<Icon.CreateProject stroke="#ffffff" />}
              className="self-end"
              onClick={() => setShowModal(ShowModal.CREATE_PROJECT)}
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
                        <div
                          key="transfer_tokens"
                          className="flex gap-2 items-center"
                          onClick={() => setShowModal(ShowModal.TRANSFER_TOKENS)}
                        >
                          <Icon.TransferTokens /> <span>Transfer tokens</span>
                        </div>,
                        <div
                          key="edit_project"
                          className="flex gap-2 items-center"
                          onClick={() => setShowModal(ShowModal.EDIT_PROJECT)}
                        >
                          <Icon.Edit /> <span>Edit project</span>
                        </div>,
                        // TODO: Check the project treasury, if it has funds ask to transfer funds.
                        <div
                          key="delete_project"
                          className="flex gap-2 items-center"
                          onClick={() => setShowModal(ShowModal.DELETE_PROJECT)}
                        >
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
        open={showModal === ShowModal.CREATE_PROJECT}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.CREATE_PROJECT) : setShowModal(ShowModal.NONE);
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
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
            {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
          </Form>
        </Card>
      </Modal>
      <Modal
        open={showModal === ShowModal.EDIT_PROJECT}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.EDIT_PROJECT) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Edit project
          </Typography.Header>
          <Typography.Header size={Size.H3} className="self-start">
            Enter project name and logo.
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Project name" className="text-xs text-primary">
              <Form.Input placeholder="e.g. Apple events" />
            </Form.Label>

            <Form.Error message="" />

            <Button htmlType="submit" className="w-full mt-5">
              Save changes
            </Button>
            <Button
              className="w-full mt-5"
              variant="tertiary"
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
            {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
          </Form>
        </Card>
      </Modal>
      <Modal
        open={showModal === ShowModal.TRANSFER_TOKENS}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.TRANSFER_TOKENS) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Transfer tokens
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label
              name="Amount"
              className="text-xs text-primary"
              asideComponent={
                <div
                  className="text-primary font-semibold text-xs cursor-pointer"
                  onClick={() => {
                    console.log('Max clicked');
                  }}
                >
                  MAX
                </div>
              }
            >
              <Form.Input />
            </Form.Label>
            <div className="flex items-center gap-1 text-xs font-medium">
              <span className="text-gray-500">Balance:</span>
              <span className="text-primary">0.456 SOL</span>
            </div>
            <Form.Error message="" />
            <Form.Label name="To wallet address" className="text-xs text-primary mt-5">
              <Form.Input />
            </Form.Label>
            <Form.Error message="" />

            <Button htmlType="submit" className="w-full mt-5">
              Transfer
            </Button>
            <Button
              className="w-full mt-5"
              variant="tertiary"
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={showModal === ShowModal.DELETE_PROJECT_TRANSFER_FUNDS}
        setOpen={(open: boolean) => {
          open
            ? setShowModal(ShowModal.DELETE_PROJECT_TRANSFER_FUNDS)
            : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Delete project
          </Typography.Header>
          <Typography.Header size={Size.H3} className="self-start">
            You are deleting a project which has funds in a treasury wallet. First need to transfer
            funds to delete this project.
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Button htmlType="submit" className="w-full mt-5">
              Transfer funds
            </Button>
            <Button
              variant="tertiary"
              className="w-full mt-5 "
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={showModal === ShowModal.DELETE_PROJECT}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.DELETE_PROJECT) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Delete project</Typography.Header>
          <Typography.Header size={Size.H3}>
            Are you sure you want to delete [Name] project and all its contents?
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <div className="flex items-start gap-2 rounded-md bg-gray-50 p-3">
              <Icon.CheckBox />
              <span className="text-xs text-gray-500 font-medium">
                I want to delete the project permanently
              </span>
            </div>
            <Button htmlType="submit" className="w-full mt-5" variant="failure">
              Delete
            </Button>
            <Button
              variant="tertiary"
              className="w-full mt-5 "
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
    </>
  );
}
