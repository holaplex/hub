'use client';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import { Organization, Project as ProjectType, User } from '../graphql.types';
import { ProjectProvider } from '../providers/ProjectProvider';
import { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GetOrganizationProjects } from './../queries/organization.graphql';
import { GetUserAffiliations, GetUser } from './../queries/user.graphql';
import Link from '../components/Link';
import { Button } from '@holaplex/ui-library-react';
import { useSession } from '../hooks/useSession';
import clsx from 'clsx';

interface GetProjectsData {
  organization: Organization;
}
interface GetProjectsVars {
  organization: string;
}

interface GetUserAffiliationsData {
  user: User;
}
interface GetUserAffiliationsVars {
  user: string;
}

interface GetUserData {
  user: User;
}
interface GetUserVars {
  user: string;
}

export default function Project({
  children,
  project,
}: {
  children: React.ReactNode;
  project: ProjectType;
}): JSX.Element {
  const segments = useSelectedLayoutSegments();
  const { session, logout } = useSession();
  const [showProjects, setShowProjects] = useState<Boolean>(false);
  const [expandFooter, setExpandFooter] = useState<Boolean>(false);

  const [loadProjects, projectsQuery] = useLazyQuery<GetProjectsData, GetProjectsVars>(
    GetOrganizationProjects,
    {
      variables: { organization: project.organization?.id },
    }
  );

  const [loadUserAffiliations, userAffiliationsQuery] = useLazyQuery<
    GetUserAffiliationsData,
    GetUserAffiliationsVars
  >(GetUserAffiliations, {
    variables: { user: session?.identity.id! },
  });

  const userQuery = useQuery<GetUserData, GetUserVars>(GetUser, {
    variables: { user: session?.identity.id! },
  });

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
              <h1 className="flex items-center gap-2 text-sm text-primary font-medium">
                <div className="w-8 h-8 bg-gray-300 rounded-md" />
                <span className="flex flex-col capitalize">
                  {project.name}
                  <span className="text-gray-400 text-xs">Project</span>
                </span>
              </h1>
              <Icon.Expand />
            </div>
            {showProjects && (
              <div className="w-full border-t border-gray-100 py-2 mt-4">
                {projectsQuery.loading ? (
                  <div> Loading...</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                      {projectsQuery.data?.organization.projects
                        .filter((pro) => pro.id !== project.id)
                        .map((pro) => {
                          return (
                            <Link
                              key={pro.id}
                              href={`/projects/${pro.id}/drops`}
                              className="flex gap-2 items-center"
                            >
                              <div className="w-8 h-8 bg-gray-300 rounded-md" />
                              <span className="text-gray-600 font-medium text-sm">{pro.name}</span>
                            </Link>
                          );
                        })}
                    </div>
                    <Link href="/projects/new">
                      <Button icon={<Icon.Add stroke="#ffffff" />} className="w-full">
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
              name="Treasuries"
              icon={<Icon.Treasury />}
              href={`/projects/${project.id}/treasuries`}
              active={segments[0] === 'treasuries'}
            />
          </Sidebar.Menu>
          <Sidebar.Footer>
            <div
              className="flex items-center gap-2 justify-between cursor-pointer border-t border-gray-100 pt-2"
              onClick={() => {
                if (!userAffiliationsQuery.called) {
                  loadUserAffiliations();
                }
                setExpandFooter(!expandFooter);
              }}
            >
              <h1 className="flex items-center gap-2 text-sm text-primary font-medium">
                <div className="w-8 h-8 bg-gray-300 rounded-md" />
                <span className="flex flex-col capitalize">
                  {userQuery.data &&
                    `${userQuery.data?.user.firstName} ${userQuery.data?.user.lastName}`}
                  <span className="text-gray-400 text-xs">{project.organization?.name}</span>
                </span>
              </h1>
              <Icon.Expand />
            </div>
            {expandFooter && (
              <div className="w-full border-t border-gray-100 py-2">
                {userAffiliationsQuery.loading ? (
                  <div> Loading...</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col border-b border-gray-100 py-2">
                      <Sidebar.Menu.Link
                        name="Settings"
                        icon={<Icon.Settings />}
                        href=""
                        active={false}
                      />
                      <Sidebar.Menu.Link
                        name="Help"
                        icon={<Icon.HelpHeadphones />}
                        href=""
                        active={false}
                      />

                      <div
                        className="flex gap-4 w-full px-4 py-3 items-center text-gray-600"
                        onClick={() => logout()}
                      >
                        <Icon.Logout />
                        <span className="text-sm">Logout</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                      {userAffiliationsQuery.data?.user.affiliations.map((affiliation) => {
                        return (
                          <Link
                            href={`/browser/organizations/${affiliation.organization?.id}/select`}
                            key={affiliation.id}
                            className={clsx('flex items-center justify-between p-2', {
                              'border rounded-md border-gray-100 ':
                                affiliation.organization?.id === project.organization?.id,
                            })}
                          >
                            <div className="flex gap-2 items-center">
                              <div className="w-8 h-8 bg-gray-300 rounded-md" />
                              <span className="text-gray-600 font-medium text-sm">
                                {affiliation.organization?.name}
                              </span>
                            </div>
                            <Icon.Settings />
                          </Link>
                        );
                      })}
                    </div>
                    <Link href="/organizations/new">
                      <Button icon={<Icon.Add stroke="#ffffff" />} className="w-full">
                        Add organization
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </Sidebar.Footer>
        </Sidebar.Panel>
        <Sidebar.Content>{children}</Sidebar.Content>
      </Sidebar.Page>
    </ProjectProvider>
  );
}
