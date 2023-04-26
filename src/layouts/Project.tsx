'use client';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import { Organization, Project as ProjectType } from '../graphql.types';
import { ProjectProvider } from '../providers/ProjectProvider';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GetOrganizationProjects } from './../queries/organization.graphql';
import Link from '../components/Link';
import { Button } from '@holaplex/ui-library-react';
import { OrganizationProvider } from '../providers/OrganizationProvider';

interface GetProjectsData {
  organization: Organization;
}
interface GetProjectsVars {
  organization: string;
}

export default function Project({
  children,
  project,
}: {
  children: React.ReactNode;
  project: ProjectType;
}): JSX.Element {
  console.log('project', project);
  const segments = useSelectedLayoutSegments();
  const [showProjects, setShowProjects] = useState<Boolean>(false);

  const [loadProjects, projectsQuery] = useLazyQuery<GetProjectsData, GetProjectsVars>(
    GetOrganizationProjects,
    {
      variables: { organization: project.organization?.id },
    }
  );

  return (
    <OrganizationProvider hydrate={project.organization as Organization}>
      {({ organization }) => {
        return (
          <ProjectProvider project={project}>
            <Sidebar.Page>
              <Sidebar.Panel>
                <Sidebar.Header>
                  <div
                    className="flex items-center gap-2 justify-between cursor-pointer"
                    onClick={() => {
                      if (!projectsQuery.called) {
                        loadProjects();
                      }
                      setShowProjects(!showProjects);
                    }}
                  >
                    <h1 className="flex items-center gap-2 text-sm text-white font-medium">
                      {project.profileImageUrl ? (
                        <img
                          className="w-8 h-8 rounded-md"
                          src={project.profileImageUrl}
                          alt="logo"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-md" />
                      )}
                      <span className="flex flex-col capitalize">
                        {project.name}
                        <span className="text-gray-400 text-xs">Project</span>
                      </span>
                    </h1>
                    <Icon.Dropdown />
                  </div>
                  {showProjects && (
                    <div className="w-full border-t border-gray-100 py-2 mt-4">
                      {projectsQuery.loading ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 bg-stone-800 rounded-md animate-pulse" />
                            <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 bg-stone-800 rounded-md animate-pulse" />
                            <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                            <>
                              {projectsQuery.data?.organization.projects.reduce<
                                (Element | JSX.Element)[]
                              >((memo: (Element | JSX.Element)[], pro: ProjectType) => {
                                if (pro.id === project.id) {
                                  return memo;
                                }
                                return [
                                  ...memo,
                                  <Link
                                    key={pro.id}
                                    href={`/projects/${pro.id}/drops`}
                                    className="flex gap-2 items-center"
                                  >
                                    <div className="w-8 h-8 bg-stone-800 rounded-md" />
                                    <span className="text-gray-400 font-medium text-sm">
                                      {pro.name}
                                    </span>
                                  </Link>,
                                ];
                              }, [])}
                            </>
                          </div>
                          <Link href="/projects/new">
                            <Button
                              icon={<Icon.Add stroke="stroke-stone-950" />}
                              className="w-full"
                            >
                              Add Project
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
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
