'use client';
import { Button } from '@holaplex/ui-library-react';
import { useState } from 'react';
import CreateProject from '../../../../components/CreateProject';
import { Icon } from '../../../../components/Icon';

export default function ProjectsPage() {
  const [showCreateProject, setShowCreateProject] = useState<boolean>(false);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 text-2xl text-primary font-medium">Active Projects</div>
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
