'use client';
import { Button, Form, Modal, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
import Typography, { Size } from '../../../../../components/Typography';

type Treasury = {
  name: string;
  blockchain: string;
  address: string;
  totalBalance: number;
  createDate: string;
};

enum ShowModal {
  NONE,
  ADD_WALLET,
  TRANSFER_TOKENS,
  RECEIVE_TOKENS,
  EDIT_TREASURY,
}

export default function TreasuryPage() {
  const [showModal, setShowModal] = useState<ShowModal>(ShowModal.NONE);

  // TODO: Replace this with actual treasury data.
  const hasTreasury = true;
  const columnHelper = createColumnHelper<Treasury>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Treasury</div>
        {!hasTreasury ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center">
            <Icon.Large.Treasury />
            <span className="mt-6 text-xl font-semibold">No wallets created yet</span>
            <span className="mt-2 text-gray-500 text-sm">Click button below to add wallet</span>
            <Button
              icon={<Icon.AddWallet stroke="#ffffff" />}
              className="mt-8"
              onClick={() => setShowModal(ShowModal.ADD_WALLET)}
            >
              Add wallet
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button
              icon={<Icon.AddWallet stroke="#ffffff" />}
              className="self-end"
              onClick={() => setShowModal(ShowModal.ADD_WALLET)}
            >
              Add wallet
            </Button>
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor('name', {
                  header: () => <span className="text-xs text-gray-600 font-medium">Name</span>,
                  cell: (info) => (
                    <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                  ),
                }),
                columnHelper.accessor('blockchain', {
                  header: () => (
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-600 font-medium">Wallet</span>
                    </div>
                  ),
                  cell: (info) => {
                    return (
                      <div className="flex gap-2">
                        <Icon.Crypto.Sol />
                        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      </div>
                    );
                  },
                }),
                columnHelper.accessor((row) => row.totalBalance.toString(), {
                  id: 'totalBalance',
                  header: () => (
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-600 font-medium">Total balance</span>
                    </div>
                  ),
                  cell: (info) => {
                    return (
                      <div className="flex gap-2 text-xs font-medium">
                        <span className="text-primary">{info.getValue()}</span>
                        <span className="text-gray-600">SOL</span>
                      </div>
                    );
                  },
                }),
                columnHelper.accessor('createDate', {
                  header: () => (
                    <span className="text-xs text-gray-600 font-medium">Create date</span>
                  ),
                  cell: (info) => {
                    return (
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-primary font-medium">{info.getValue()}</span>
                        <span className="text-gray-500">9:56 AM</span>
                      </div>
                    );
                  },
                }),
                columnHelper.accessor('address', {
                  header: () => (
                    <span className="flex text-xs text-gray-600 font-medium">Address</span>
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
                          onClick={() => setShowModal(ShowModal.RECEIVE_TOKENS)}
                        >
                          <Icon.ReceiveTokens /> <span>Receive tokens</span>
                        </div>,
                        <div
                          key="edit_treasury"
                          className="flex gap-2 items-center"
                          onClick={() => setShowModal(ShowModal.EDIT_TREASURY)}
                        >
                          <Icon.Edit />
                          <span>Edit treasury</span>
                        </div>,
                      ]}
                    />
                  ),
                }),
              ]}
              data={[
                {
                  name: 'Main wallet',
                  blockchain: 'Solana',
                  address: '0xA91...a2E9',
                  createDate: '11/28/2022',
                  totalBalance: 23.39,
                },
                {
                  name: 'Test wallet',
                  blockchain: 'Solana',
                  address: '0xA91...a2E9',
                  createDate: '11/28/2022',
                  totalBalance: 23.39,
                },
              ]}
            />
          </div>
        )}
      </div>

      <Modal
        open={showModal === ShowModal.ADD_WALLET}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.ADD_WALLET) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Add wallet
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Wallet name" className="text-xs mt-5 text-primary">
              <Form.Select
                placeholder="Select wallet"
                options={[
                  { option: 'Main wallet', value: 'main_wallet' },
                  { option: 'Test wallet', value: 'text_wallet' },
                ]}
              />
            </Form.Label>
            <Form.Label name="Blockchain" className="text-xs mt-5 text-primary">
              <Form.Select
                placeholder="Select blockchain"
                options={[
                  { option: 'Solana', value: 'solana' },
                  { option: 'Polygon', value: 'polygon' },
                ]}
              />
            </Form.Label>
            <Button className="w-full mt-4" onClick={() => {}}>
              Add wallet
            </Button>
            <Button
              className="w-full mt-4"
              variant="tertiary"
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>

      <Modal
        open={showModal === ShowModal.RECEIVE_TOKENS}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.RECEIVE_TOKENS) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Receive tokens
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Wallet" className="text-xs mt-5 text-primary">
              <Form.Select
                placeholder="Select wallet"
                options={[
                  { option: 'Main wallet', value: 'main_wallet' },
                  { option: 'Test wallet', value: 'text_wallet' },
                ]}
              />
            </Form.Label>

            <Form.Error message="" />
            <div className="flex bg-gray-50 rounded-md p-3 mt-5">
              <Icon.EmptyAvatar className="w-32 aspect-square" />
              <div className="w-full flex flex-col justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-600">Wallet address</span>
                  <span className="text-sm text-primary">0xA91...a2#9</span>
                </div>
                <Button icon={<Icon.Copy stroke="#ffffff" />} className="w-full mt-4">
                  Copy address
                </Button>
              </div>
            </div>

            <Button
              className="w-full mt-5"
              variant="tertiary"
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Close
            </Button>
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
            <Form.Label name="Wallet name" className="text-xs text-primary">
              <Form.Input />
            </Form.Label>
            <Form.Label
              name="Amount"
              className="text-xs text-primary mt-5"
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
        open={showModal === ShowModal.EDIT_TREASURY}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.EDIT_TREASURY) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Edit wallet
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Wallet name" className="text-xs text-primary">
              <Form.Input />
            </Form.Label>
            <Button htmlType="submit" className="w-full mt-4">
              Update
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
