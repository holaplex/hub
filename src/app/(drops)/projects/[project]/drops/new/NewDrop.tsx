'use client';
import { usePathname } from 'next/navigation';
import { Icon } from '../../../../../../components/Icon';
import Navbar from '../../../../../../layouts/Navbar';
import useCreateDropStore from '../../../../../../hooks/useCreateDropStore';
import Link from 'next/link';
import { pipe, isNil, not } from 'ramda';
import { ProjectProvider } from '../../../../../../providers/ProjectProvider';
import { Project } from '../../../../../../graphql.types';

interface CreateDropProps {
  children: React.ReactNode;
  project: Project;
}

const isComplete = pipe(isNil, not);

export default function NewDrop({ children, project }: CreateDropProps): JSX.Element {
  const pathname = usePathname();

  const { stepOne, stepTwo, stepThree } = useCreateDropStore();

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
                active={pathname === `/projects/${project.id}/drops/new/details`}
                count="1"
                filled={isComplete(stepOne)}
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
                filled={isComplete(stepTwo)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/new/royalties`}
          />
          <Navbar.Menu.Step
            name="Mint date"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project.id}/drops/new/timing`}
                count="3"
                filled={isComplete(stepThree)}
              />
            }
            active={pathname === `/projects/${project.id}/drops/new/timing`}
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
        <ProjectProvider project={project}>{children}</ProjectProvider>
      </Navbar.Content>
    </Navbar.Page>
  );
}
