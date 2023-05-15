'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Card from '../../../../../../components/Card';
import { Icon } from '../../../../../../components/Icon';
import { Pill } from '../../../../../../components/Pill';
import Typography, { Size } from '../../../../../../components/Typography';
import {
  EditWebhookInput,
  EditWebhookPayload,
  FilterType,
  Organization,
  Project,
} from '../../../../../../graphql.types';
import { useOrganization } from '../../../../../../hooks/useOrganization';
import { toFilterTypes } from '../../../../../../modules/filterType';
import { EditWebhook } from './../../../../../../mutations/webhook.graphql';
import { GetOrganizationProjects } from './../../../../../../queries/organization.graphql';
import { GetOrganizationWebhook } from './../../../../../../queries/webhooks.graphql';

interface GetOrganizationProjectsData {
  organization: Pick<Organization, 'projects'>;
}

interface GetOrganizationProjectsVar {
  organization: string;
}
interface EditWebhookVars {
  input: EditWebhookInput;
}

interface EditWebhookData {
  editWebhook: EditWebhookPayload;
}

interface WebhookForm {
  projects: Project[];
  description: string;
  url: string;
  events: FilterType[];
}

interface GetWebhookData {
  organization: Organization;
}

interface GetWebhookVars {
  webhook: string;
  organization: string;
}

interface EditWebhookProps {
  params: { webhook: string };
}

export default function EditWebhookPage({ params: { webhook } }: EditWebhookProps) {
  const { organization } = useOrganization();
  const router = useRouter();

  const webhookQuery = useQuery<GetWebhookData, GetWebhookVars>(GetOrganizationWebhook, {
    variables: { webhook, organization: organization?.id },
  });

  const webhookData = webhookQuery.data?.organization.webhook;

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WebhookForm>({
    defaultValues: {
      projects: [],
      events: [],
    },
  });

  const selectedProjects = watch('projects');

  const [editWebhook, editWebhookResult] = useMutation<EditWebhookData, EditWebhookVars>(
    EditWebhook
  );

  const onSubmit = ({ projects, description, url, events }: WebhookForm) => {
    editWebhook({
      variables: {
        input: {
          webhook,
          description,
          url,
          projects: projects.map((project) => project.id),
          filterTypes: events,
        },
      },
      onCompleted: () => {
        router.push('/webhooks');
      },
    });
  };

  const projectsQuery = useQuery<GetOrganizationProjectsData, GetOrganizationProjectsVar>(
    GetOrganizationProjects,
    {
      variables: { organization: organization?.id },
    }
  );

  const loading = projectsQuery.loading || webhookQuery.loading;

  useEffect(() => {
    if (webhookData) {
      reset({
        description: webhookData.description,
        url: webhookData.url,
        events: toFilterTypes(webhookData.events),
        projects: webhookData.projects,
      });
    }
  }, [reset, webhookData]);

  return (
    <div className="h-full flex flex-col p-6">
      <div className="text-2xl font-medium text-gray-400">
        Webhooks / <span className="text-white">Edit Webhook</span>
      </div>
      <div className="w-full flex flex-col items-center">
        <Card className="w-[492px] mt-7">
          <Typography.Header size={Size.H2}>Webhook details</Typography.Header>
          <Typography.Header size={Size.H3}>
            Select the projects to which you want to add the webhook
          </Typography.Header>
          {loading ? (
            <div className="flex flex-col gap-5 mt-5">
              <div>
                <div className="mb-1 w-20 h-4 rounded-md bg-stone-800 animate-pulse" />
                <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <div className="mb-1 w-20 h-4 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
                </div>
                <div className="w-full">
                  <div className="mb-1 w-20 h-4 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="mb-1 mt-4 w-20 h-4 rounded-md bg-stone-800 animate-pulse" />
                <div className="grid grid-cols-2 gap-5 my-2">
                  <div className="w-full h-5 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-5 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-5 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-5 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-5 rounded-md bg-stone-800 animate-pulse" />
                  <div className="w-full h-5 rounded-md bg-stone-800 animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-24 h-10 rounded-md bg-stone-800 animate-pulse" />
                <div className="w-24 h-10 rounded-md bg-stone-800 animate-pulse" />
              </div>
            </div>
          ) : (
            <Form className="flex flex-col mt-5 " onSubmit={handleSubmit(onSubmit)}>
              <Form.Label name="Select project" className="text-xs mt-5">
                <Controller
                  name="projects"
                  control={control}
                  rules={{ required: 'Please select atleast one project' }}
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
                <Form.Error message={errors.projects?.message} />
              </Form.Label>
              <div className="flex gap-6 mt-5">
                <Form.Label name="Name" className="text-xs mt-5">
                  <Form.Input
                    {...register('description', { required: 'Name is required' })}
                    autoFocus
                    placeholder="e.g. Bored Ape Yatch Club"
                  />
                  <Form.Error message={errors.description?.message} />
                </Form.Label>

                <Form.Label name="Target URL" className="text-xs mt-5">
                  <Form.Input {...register('url', { required: 'Target URL is required' })} />
                  <Form.Error message={errors.url?.message} />
                </Form.Label>
              </div>

              <hr className="w-full bg-divider my-4 h-px border-0" />

              <span className="text-sm text-white font-medium">Events</span>
              <div className="grid grid-cols-2 mt-4 mx-2 gap-5 text-xs">
                <Form.Label name="Project wallet created" placement={Placement.Right}>
                  <Form.Checkbox
                    {...register('events')}
                    id="PROJECT_WALLET_CREATED"
                    value="PROJECT_WALLET_CREATED"
                  />
                </Form.Label>
                <Form.Label name="Customer created" placement={Placement.Right}>
                  <Form.Checkbox
                    {...register('events')}
                    id="CUSTOMER_CREATED"
                    value="CUSTOMER_CREATED"
                  />
                </Form.Label>
                <Form.Label name="Customer treasury created" placement={Placement.Right}>
                  <Form.Checkbox
                    {...register('events')}
                    id="CUSTOMER_TREASURY_CREATED"
                    value="CUSTOMER_TREASURY_CREATED"
                  />
                </Form.Label>
                <Form.Label name="Customer wallet created" placement={Placement.Right}>
                  <Form.Checkbox
                    {...register('events')}
                    id="CUSTOMER_WALLET_CREATED"
                    value="CUSTOMER_WALLET_CREATED"
                  />
                </Form.Label>
                <Form.Label name="Drop created" placement={Placement.Right}>
                  <Form.Checkbox {...register('events')} id="DROP_CREATED" value="DROP_CREATED" />
                </Form.Label>

                <Form.Label name="Drop minted" placement={Placement.Right}>
                  <Form.Checkbox {...register('events')} id="DROP_MINTED" value="DROP_MINTED" />
                </Form.Label>
              </div>

              <hr className="w-full bg-divider my-4 h-px border-0" />

              <div className="flex items-center justify-between">
                <Button
                  className="self-start"
                  variant="secondary"
                  disabled={editWebhookResult.loading}
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="self-end"
                  loading={editWebhookResult.loading}
                  disabled={editWebhookResult.loading}
                >
                  Update webhook
                </Button>
              </div>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
}
