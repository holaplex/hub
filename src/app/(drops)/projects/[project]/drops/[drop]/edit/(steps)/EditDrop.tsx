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
} from '../../../../../../../../graphql.types';
import { DropFormProvider } from '../../../../../../../../providers/DropFormProvider';
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
      treasuryAllRoyalties: false,
      royalties: drop?.collection.royalties as string,
    },
    timing: {
      startDate: drop?.startTime && formatDateString(drop?.startTime, DateFormat.DATE_3),
      endDate: drop?.endTime && formatDateString(drop?.endTime, DateFormat.DATE_3),
      startTime: drop?.startTime && formatDateString(drop?.startTime, DateFormat.TIME_2),
      endTime: drop?.endTime && formatDateString(drop?.endTime, DateFormat.TIME_2),
      noEndTime: isNil(drop?.endTime),
      startNow: isNil(drop?.startTime),
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
            className="flex items-center gap-4 px-5 cursor-pointer"
          >
            <Icon.Close />
            <span className="flex items-center gap-2 text-sm text-primary font-medium">Close</span>
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
            name="Payment and royalties"
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
                active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/timing`}
                count="3"
                filled={isComplete(timing)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/${drop?.id}/edit/timing`}
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
