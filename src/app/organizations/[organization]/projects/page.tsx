'use client';
import { Button } from '@holaplex/ui-library-react';
import { useState } from 'react';
import CreateProject from '../../../../components/CreateProject';
import { Icon } from '../../../../components/Icon';
import ProjectsTable from '../../../../components/ProjectsTable';

export default function ProjectsPage() {
  const [showCreateProject, setShowCreateProject] = useState<boolean>(false);
  // TODO: Replace this with actual projects data.
  const hasProjects = false;
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
              icon={<Icon.CreateProject color="#ffffff" className="mr-2" />}
              border="rounded"
              className="bg-primary p-3 mt-8 text-white"
              onClick={() => setShowCreateProject(true)}
            >
              Create new project
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button
              icon={<Icon.CreateProject color="#ffffff" className="mr-2" />}
              border="rounded"
              className="bg-primary p-3 text-white min-w-min self-end"
              onClick={() => setShowCreateProject(true)}
            >
              Create project
            </Button>
            <ProjectsTable className="mt-4" />
          </div>
        )}
      </div>

      <CreateProject
        open={showCreateProject}
        setOpen={(open: boolean) => {
          setShowCreateProject(open);
        }}
      />
    </>
  );
}
