'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../../../../components/Card';
import { Icon } from '../../../../../../components/Icon';
import { Pill } from '../../../../../../components/Pill';
import Typography, { Size } from '../../../../../../components/Typography';
import { GetOrganizationProjects } from './../../../../../../queries/organization.graphql';
import { GetOrganizationCredential } from './../../../../../../queries/credentials.graphql';

import { EditCredential } from './../../../../../../mutations/credential.graphql';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  EditCredentialInput,
  EditCredentialPayload,
  Organization,
  Project,
} from '../../../../../../graphql.types';
import { useOrganization } from '../../../../../../hooks/useOrganization';
import Link from 'next/link';
import { useEffect } from 'react';

interface CredentialForm {
  name: string;
  projects: Project[];
  scopes: string[];
  projectsPick: 'all' | 'select';
}

interface GetOrganizationProjectsData {
  organization: Pick<Organization, 'projects'>;
}

interface GetOrganizationProjectsVar {
  organization: string;
}

interface EditCredentialData {
  editCredential: EditCredentialPayload;
}

interface EditCredentialVars {
  input: EditCredentialInput;
}

interface GetCredentialData {
  organization: Organization;
}

interface GetCredentialVars {
  credential: string;
  organization: string;
}

interface EditCredentialProps {
  params: { credential: string };
}

export default function EditCredentialPage({ params: { credential } }: EditCredentialProps) {
  const { organization } = useOrganization();
  const router = useRouter();
  const projectsQuery = useQuery<GetOrganizationProjectsData, GetOrganizationProjectsVar>(
    GetOrganizationProjects,
    {
      variables: { organization: organization?.id },
    }
  );

  const credentialQuery = useQuery<GetCredentialData, GetCredentialVars>(
    GetOrganizationCredential,
    {
      variables: { credential, organization: organization?.id },
    }
  );

  const credentialData = credentialQuery.data?.organization.credential;

  const [editCredential, { data, loading }] = useMutation<EditCredentialData, EditCredentialVars>(
    EditCredential
  );

  const { register, control, watch, handleSubmit, reset } = useForm<CredentialForm>({
    defaultValues: { projects: [], projectsPick: 'all', scopes: [] },
  });

  const selectedProjects = watch('projects');
  const projectsPick = watch('projectsPick');

  const onSubmit = ({ name, scopes, projectsPick, projects }: CredentialForm) => {
    let pickedProjects = projects;

    if (projectsPick === 'all') {
      pickedProjects = projectsQuery.data?.organization.projects || [];
    }

    editCredential({
      variables: {
        input: {
          name,
          scopes,
          projects: pickedProjects.map((project) => project.id),
          clientId: credential,
        },
      },
      onCompleted: () => {
        router.push('/credentials');
      },
    });
  };

  useEffect(() => {
    if (credentialData) {
      reset({
        name: credentialData.name,
        projects: credentialData.projects,
        scopes: credentialData.scopes,
      });
    }
  }, [reset, credentialData]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl font-medium text-gray-500">
        Credentials / <span className="text-primary">Edit access token</span>
        <div className="w-full flex flex-col items-center">
          <Card className="w-[492px] mt-7">
            <Typography.Header size={Size.H2}>Edit token</Typography.Header>
            <Typography.Header size={Size.H3}>
              Fill required details to re-generate access token.
            </Typography.Header>
            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
              <Form.Label name="Name" className="text-xs mt-4" asideComponent={<Icon.Help />}>
                <Form.Input
                  {...register('name')}
                  autoFocus
                  placeholder="e.g. Bored Ape Yatch Club"
                />
                <Form.Error message="" />
              </Form.Label>
              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />
              <span className="text-sm text-primary font-medium">Project access</span>
              <div className="flex flex-col gap-4 mt-4 mx-2">
                <div className="flex items-center gap-1">
                  <input
                    {...register('projectsPick')}
                    type="radio"
                    id="all_projects"
                    name="projectsPick"
                    value="all"
                  />
                  <label htmlFor="all_projects" className="text-primary font-medium text-xs">
                    All projects
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    {...register('projectsPick')}
                    id="selected_projects"
                    name="projectsPick"
                    value="select"
                  />
                  <label htmlFor="selected_projects" className="text-primary font-medium text-xs">
                    Only selected projects
                  </label>
                </div>
              </div>
              {projectsPick === 'select' && (
                <Form.Label name="Pick projects" className="text-xs mt-5">
                  <Controller
                    name="projects"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Form.Select value={value} onChange={onChange} multiple>
                        <Form.Select.Button>
                          <Pill.List>
                            {selectedProjects.map((project) => (
                              <Pill
                                key={project.id}
                                onClear={(e) => {
                                  e.preventDefault();
                                  onChange(value.filter((p) => p.id !== project.id));
                                }}
                              >
                                {project.name}
                              </Pill>
                            ))}
                          </Pill.List>
                        </Form.Select.Button>
                        <Form.Select.Options>
                          {(projectsQuery.data?.organization.projects || []).map((project) => {
                            return (
                              <Form.Select.Option key={project.id} value={project}>
                                <>{project.name}</>
                              </Form.Select.Option>
                            );
                          })}
                        </Form.Select.Options>
                      </Form.Select>
                    )}
                  />
                </Form.Label>
              )}

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <span className="text-sm text-primary font-medium">Permissions</span>
              <div className="grid grid-cols-2 mt-4 mx-2 gap-5">
                <Form.Checkbox
                  {...register('scopes')}
                  value="project:created"
                  id="project_created"
                  label="Project created"
                />
                <Form.Checkbox
                  {...register('scopes')}
                  value="drop:created"
                  id="drop_created"
                  label="Drop created"
                />
                <Form.Checkbox
                  {...register('scopes')}
                  value="drop:minted"
                  id="drop_minted"
                  label="Drop minted"
                />
                <Form.Checkbox
                  {...register('scopes')}
                  value="customer:created"
                  id="customer_created"
                  label="Customer created"
                />
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <div className="flex items-center justify-between">
                <Link href="/credentials">
                  <Button className="self-start" variant="secondary" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
                <Button htmlType="submit" className="self-end" loading={loading} disabled={loading}>
                  Save changes
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
