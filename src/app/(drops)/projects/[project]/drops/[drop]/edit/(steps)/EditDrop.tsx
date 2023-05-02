'use client';
import { usePathname } from 'next/navigation';
import { Icon } from '../../../../../../../../components/Icon';
import Navbar from '../../../../../../../../layouts/Navbar';
import Link from 'next/link';
import { useStore } from 'zustand';
import { pipe, isNil, not } from 'ramda';
import { ProjectProvider } from '../../../../../../../../providers/ProjectProvider';
import {
  CollectionCreatorInput,
  Project,
  Blockchain,
  MetadataJsonAttribute,
  AssetType,
} from '../../../../../../../../graphql.types';
import {
  DropFormProvider,
  RoyaltiesDestination,
  RoyaltiesShortcut,
} from '../../../../../../../../providers/DropFormProvider';
import { useDropFormState } from '../../../../../../../../hooks/useDropFormState';
import { DateFormat, formatDateString } from '../../../../../../../../modules/time';

interface CreateDropProps {
  children: React.ReactNode;
  project: Project;
}

const isComplete = pipe(isNil, not);

export default function EditDrop({ children, project }: CreateDropProps): JSX.Element {
  const pathname = usePathname();
  const drop = project.drop;
  const royalties = drop?.collection.royalties as string;

  const wallet = project?.treasury?.wallets?.find((wallet) => {
    switch (drop?.collection.blockchain) {
      case Blockchain.Solana:
        return wallet.assetId === AssetType.SolTest || wallet.assetId === AssetType.Sol;
      case Blockchain.Polygon:
        return wallet.assetId === AssetType.MaticTest || wallet.assetId === AssetType.Matic;
      case Blockchain.Ethereum:
        return wallet.assetId === AssetType.EthTest || wallet.assetId === AssetType.Eth;
    }
  });

  const creators = drop?.collection.creators || [];
  const defaultRoyaltiesDestination =
    wallet?.address === creators[0]?.address && creators[0]?.share === 100
      ? RoyaltiesDestination.ProjectTreasury
      : RoyaltiesDestination.Creators;
  let defaultRoyaltiesShortcut = RoyaltiesShortcut.Custom;

  switch (royalties) {
    case RoyaltiesShortcut.Zero:
      defaultRoyaltiesShortcut = RoyaltiesShortcut.Zero;
      break;
    case RoyaltiesShortcut.TwoPointFive:
      defaultRoyaltiesShortcut = RoyaltiesShortcut.TwoPointFive;
      break;
    case RoyaltiesShortcut.Five:
      defaultRoyaltiesShortcut = RoyaltiesShortcut.Five;
      break;
    case RoyaltiesShortcut.Ten:
      defaultRoyaltiesShortcut = RoyaltiesShortcut.Ten;
      break;
  }

  const store = useDropFormState({
    detail: {
      name: drop?.collection.metadataJson?.name as string,
      description: drop?.collection.metadataJson?.description as string,
      blockchain: drop?.collection.blockchain as Blockchain,
      symbol: drop?.collection.metadataJson?.symbol as string,
      image: drop?.collection.metadataJson?.image as string,
      attributes: drop?.collection.metadataJson?.attributes as MetadataJsonAttribute[],
      externalUrl: drop?.collection.metadataJson?.externalUrl as string,
    },
    payment: {
      supply: drop?.collection.supply?.toString() as string,
      creators: drop?.collection.creators as CollectionCreatorInput[],
      royaltiesDestination: defaultRoyaltiesDestination,
      royaltiesShortcut: defaultRoyaltiesShortcut,
      royalties,
    },
    timing: {
      startDate: drop?.startTime && formatDateString(drop?.startTime, DateFormat.DATE_3),
      endDate: drop?.endTime && formatDateString(drop?.endTime, DateFormat.DATE_3),
      startTime: drop?.startTime && formatDateString(drop?.startTime, DateFormat.TIME_2),
      endTime: drop?.endTime && formatDateString(drop?.endTime, DateFormat.TIME_2),
      selectEndDate: isNil(drop?.endTime) ? 'neverEnd' : 'specifyEndDate',
      selectStartDate: isNil(drop?.startTime) ? 'mintImmediately' : 'specifyStartDate',
    },
  });

  const detail = useStore(store, (store) => store.detail);
  const payment = useStore(store, (store) => store.payment);
  const timing = useStore(store, (store) => store.timing);

  return (
    <Navbar.Page>
      <Navbar.Panel>
        <Navbar.Header>
          <Link
            href={`/projects/${project.id}/drops`}
            className="flex items-center gap-6 px-5 cursor-pointer"
          >
            <Icon.Close stroke="stroke-white" />
            <span className="flex items-center gap-2 text-sm font-medium">Close</span>
          </Link>
        </Navbar.Header>
        <Navbar.Menu>
          <Navbar.Menu.Step
            name="Drop details"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/details`}
                count="1"
                filled={isComplete(detail)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/details`}
          />
          <Navbar.Menu.Step
            name="Supply and royalties"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/royalties`}
                count="2"
                filled={isComplete(payment)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/royalties`}
          />
          <Navbar.Menu.Step
            name="Mint date"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/schedule`}
                count="3"
                filled={isComplete(timing)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/schedule`}
          />
          <Navbar.Menu.Step
            name="Final preview"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/preview`}
                count="4"
                filled={false}
              />
            }
            active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/preview`}
          />
        </Navbar.Menu>
      </Navbar.Panel>
      <Navbar.Content>
        <ProjectProvider project={project}>
          <DropFormProvider store={store}>{children}</DropFormProvider>
        </ProjectProvider>
      </Navbar.Content>
    </Navbar.Page>
  );
}
