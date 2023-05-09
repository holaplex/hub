'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import { Organization, Project as ProjectType } from '../graphql.types';
import { ProjectProvider } from '../providers/ProjectProvider';
import Link from '../components/Link';
import { PopoverBox } from '@holaplex/ui-library-react';
import Copy from '../components/Copy';
import { OrganizationProvider } from '../providers/OrganizationProvider';

export default function Project({
  children,
  project,
}: {
  children: React.ReactNode;
  project: ProjectType;
}): JSX.Element {
  const segments = useSelectedLayoutSegments();

  return (
    <OrganizationProvider hydrate={project.organization as Organization}>
      {({ organization }) => {
        return (
          <ProjectProvider project={project}>
            <Sidebar.Page>
              <Sidebar.Panel>
                <Sidebar.Header>
                  <div className="flex items-center gap-2 justify-between cursor-pointer">
                    <h1 className="flex items-center gap-2 grow text-sm text-white font-medium">
                      <Link
                        href="/projects"
                        className="w-6 h-6 rounded-md hover:bg-stone-800 transition flex justify-center items-center flex-0"
                      >
                        <Icon.ChevronLeft />
                      </Link>
                      <span className="flex grow items-center justify-between">
                        <div className="flex flex-row justify-between items-center gap-2">
                          {project.profileImageUrl ? (
                            <img
                              className="w-8 h-8 rounded-md"
                              src={project.profileImageUrl}
                              alt="logo"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-stone-800 rounded-md" />
                          )}
                          <span className="flex flex-row gap-2 items-center">
                            <span className="flex flex-col capitalize">
                              {project.name}
                              <span className="text-gray-400 text-xs">Project</span>
                            </span>
                            <PopoverBox
                              triggerButton={
                                <div className="px-2 py-1 hover:rounded-md hover:bg-stone-800 max-w-min">
                                  <Icon.More />
                                </div>
                              }
                              elements={[
                                <Copy key="copy_id" copyString={project?.id}>
                                  <span>Copy Project ID</span>
                                </Copy>,
                              ]}
                            />
                          </span>
                        </div>
                      </span>
                    </h1>
                  </div>
                </Sidebar.Header>
                <Sidebar.Menu>
                  <Sidebar.Menu.Link
                    name="Drops"
                    icon={<Icon.ManageNfts stroke="stroke-gray-400" />}
                    href={`/projects/${project.id}/drops`}
                    active={segments[0] === 'drops'}
                  />
                  <Sidebar.Menu.Link
                    name="Customers"
                    icon={<Icon.Customers stroke="stroke-gray-400" />}
                    href={`/projects/${project.id}/customers`}
                    active={segments[0] === 'customers'}
                  />
                  <Sidebar.Menu.Link
                    name="Treasury"
                    icon={<Icon.Treasury stroke="stroke-gray-400" />}
                    href={`/projects/${project.id}/treasury`}
                    active={segments[0] === 'treasury'}
                  />
                </Sidebar.Menu>
                <Sidebar.Footer organization={organization} />
              </Sidebar.Panel>
              <Sidebar.Content>{children}</Sidebar.Content>
            </Sidebar.Page>
          </ProjectProvider>
        );
      }}
    </OrganizationProvider>
  );
}
