'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { pipe, not, isNil } from 'ramda';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import { Pill } from '../../../../../components/Pill';
import Typography, { Size } from '../../../../../components/Typography';
import { GetOrganizationProjects } from './../../../../../queries/organization.graphql';
import { CreateCredential } from './../../../../../mutations/credential.graphql';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { DateFormat, formatDateString } from './../../../../../modules/time';
import { useRouter } from 'next/navigation';
import {
  CreateCredentialInput,
  CreateCredentialPayload,
  Organization,
  Project,
} from '../../../../../graphql.types';
import { useOrganization } from '../../../../../hooks/useOrganization';
import Link from 'next/link';
import useClipboard from './../../../../../hooks/useClipboard';

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

interface CreateCredentialData {
  createCredential: CreateCredentialPayload;
}

interface CreateCredentialVars {
  input: CreateCredentialInput;
}

export default function GenerateToken() {
  const { organization } = useOrganization();
  const router = useRouter();
  const projectsQuery = useQuery<GetOrganizationProjectsData, GetOrganizationProjectsVar>(
    GetOrganizationProjects,
    {
      variables: { organization: organization?.id },
    }
  );
  const [createCredential, { data }] = useMutation<CreateCredentialData, CreateCredentialVars>(
    CreateCredential
  );
  const { register, control, watch, handleSubmit } = useForm<CredentialForm>({
    defaultValues: { projects: [], projectsPick: 'all', scopes: [] },
  });
  const { copied, copyText } = useClipboard(
    data?.createCredential.accessToken.accessToken as string
  );

  const selectedProjects = watch('projects');
  const projectsPick = watch('projectsPick');

  const onSubmit = ({ name, scopes, projectsPick, projects }: CredentialForm) => {
    let pickedProjects = projects;

    if (projectsPick === 'all') {
      pickedProjects = projectsQuery.data?.organization.projects || [];
    }

    createCredential({
      variables: {
        input: {
          name,
          scopes,
          organization: organization?.id as string,
          projects: pickedProjects.map((project) => project.id),
        },
      },
    });
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl font-medium text-gray-500">
        API Credentials / <span className="text-primary">Generate token</span>
        <div className="w-full flex flex-col items-center">
          <Card className="w-[492px] mt-7">
            <Typography.Header size={Size.H2}>Generate token</Typography.Header>
            <Typography.Header size={Size.H3}>
              Fill required details to generate access token. Fill required details to generate
              access token.
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
                <Form.Label
                  name="Select project"
                  className="text-xs mt-5"
                  asideComponent={<Icon.Help />}
                >
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
                  <Button className="self-start" variant="secondary">
                    Cancel
                  </Button>
                </Link>
                <Button htmlType="submit" className="self-end">
                  Generate token
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      <Modal
        open={pipe(isNil, not)(data)}
        setOpen={() => {
          router.push('/credentials');
        }}
      >
        <Card className="w-[400px] p-8">
          <Typography.Header size={Size.H2} className="self-start">
            Token
          </Typography.Header>
          <Typography.Paragraph className="py-4 text-gray-600">
            Make sure to copy the token now as you will not be able to see it again
          </Typography.Paragraph>
          <div className="flex gap-2">
            <div className="shrink border bg-gray-50 px-4 py-3 border-gray-100 rounded-md truncate">
              {data?.createCredential.accessToken.accessToken}
            </div>
            <button
              onClick={copyText}
              className="flex-none aspect-square rounded-md w-12 flex items-center justify-center bg-gray-50 border-gray-100 border"
            >
              {copied ? <Icon.Check /> : <Icon.Copy />}
            </button>
          </div>
          <aside className="text-sm text-gray-500 mt-1">
            {`Expires at ${formatDateString(
              data?.createCredential.accessToken.expiresAt || '',
              DateFormat.TIME_1
            )}, ${formatDateString(
              data?.createCredential.accessToken.expiresAt || '',
              DateFormat.DATE_1
            )}`}
          </aside>
          <Button
            className="mt-2"
            variant="tertiary"
            size="large"
            block
            onClick={() => {
              router.push('/credentials');
            }}
          >
            Return to API credentials
          </Button>
        </Card>
      </Modal>
    </div>
  );
}
