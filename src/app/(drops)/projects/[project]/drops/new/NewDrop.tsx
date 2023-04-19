'use client';
import { usePathname } from 'next/navigation';
import { Icon } from '../../../../../../components/Icon';
import Navbar from '../../../../../../layouts/Navbar';
import { useStore } from 'zustand';
import Link from 'next/link';
import { pipe, isNil, not } from 'ramda';
import { ProjectProvider } from '../../../../../../providers/ProjectProvider';
import { Blockchain, Project } from '../../../../../../graphql.types';
import { DropFormProvider } from '../../../../../../providers/DropFormProvider';
import { useDropFormState } from '../../../../../../hooks/useDropFormState';

interface CreateDropProps {
  children: React.ReactNode;
  project: Project;
}

const isComplete = pipe(isNil, not);

export default function NewDrop({ children, project }: CreateDropProps): JSX.Element {
  const pathname = usePathname();

  const store = useDropFormState();

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
            <Icon.Close className="stroke-maintext" />
            <span className="flex items-center gap-2 text-sm font-medium">Close</span>
          </Link>
        </Navbar.Header>
        <Navbar.Menu>
          <Navbar.Menu.Step
            name="Drop details"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/new/details`}
                count="1"
                filled={isComplete(detail)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/new/details`}
          />
          <Navbar.Menu.Step
            name="Payment and royalties"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/new/royalties`}
                count="2"
                filled={isComplete(payment)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/new/royalties`}
          />
          <Navbar.Menu.Step
            name="Schedule"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/new/schedule`}
                count="3"
                filled={isComplete(timing)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/new/schedule`}
          />
          <Navbar.Menu.Step
            name="Final preview"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/new/preview`}
                count="4"
                filled={false}
              />
            }
            active={pathname === `/projects/${project.id}/drops/new/preview`}
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
