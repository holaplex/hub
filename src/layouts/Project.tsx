'use client';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import Link from 'next/link';
import { Project as ProjectType } from '../graphql.types';

export default function Project({
  children,
  project,
}: {
  children: JSX.Element;
  project: ProjectType;
}): JSX.Element {
  const segments = useSelectedLayoutSegments();

  return (
    <Sidebar.Page>
      <Sidebar.Panel>
        <Sidebar.Header>
          <Link href="/projects" className="flex items-center gap-4">
            <Icon.ChevronLeft />
            <h1 className="flex items-center gap-2 text-sm text-primary font-medium">
              <div className="w-8 h-8 bg-gray-300 rounded-md" />
              <span className="flex flex-col capitalize">
                {project.name}
                <span className="text-gray-400 text-xs">Project</span>
              </span>
            </h1>
          </Link>
        </Sidebar.Header>
        <Sidebar.Menu>
          <Sidebar.Menu.Link
            name="Manage drops"
            icon={<Icon.ManageNfts />}
            href={`/projects/${project.id}/drops`}
            active={segments[0] === 'drops'}
          />
          <Sidebar.Menu.Link
            name="Customers"
            icon={<Icon.Customers />}
            href={`/projects/${project.id}/customers`}
            active={segments[0] === 'customers'}
          />
          <Sidebar.Menu.Link
            name="Treasury"
            icon={<Icon.Treasury />}
            href={`/projects/${project.id}/treasury`}
            active={segments[0] === 'treasury'}
          />
        </Sidebar.Menu>
        <Sidebar.Footer>
          <div className="flex justify-center">
            <Image src="/holaplex-small.svg" alt="Holaplex" width="64" height="6" />
          </div>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.Content>{children}</Sidebar.Content>
    </Sidebar.Page>
  );
}
