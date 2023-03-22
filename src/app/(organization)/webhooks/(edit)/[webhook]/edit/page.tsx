'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { isNil, not, pipe } from 'ramda';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Card from '../../../../../../components/Card';
import { Icon } from '../../../../../../components/Icon';
import { Pill } from '../../../../../../components/Pill';
import Typography, { Size } from '../../../../../../components/Typography';
import {
  CreateWebhookInput,
  CreateWebhookPayload,
  FilterType,
  Organization,
  Project,
} from '../../../../../../graphql.types';
import useClipboard from '../../../../../../hooks/useClipboard';
import { useOrganization } from '../../../../../../hooks/useOrganization';
import { toFilterTypes } from '../../../../../../modules/filterType';
import { CreateWebhook } from './../../../../../../mutations/webhook.graphql';
import { GetOrganizationProjects } from './../../../../../../queries/organization.graphql';
import { GetOrganizationWebhook } from './../../../../../../queries/webhooks.graphql';

interface GetOrganizationProjectsData {
  organization: Pick<Organization, 'projects'>;
}

interface GetOrganizationProjectsVar {
  organization: string;
}
interface CreateWebhookVars {
  input: CreateWebhookInput;
}

interface CreateWebhookData {
  createWebhook: CreateWebhookPayload;
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

export default function EditWebhook({ params: { webhook } }: EditWebhookProps) {
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
    defaultValues: { projects: [], events: [] },
  });

  const selectedProjects = watch('projects');

  const [createWebhook, createWebhookResult] = useMutation<CreateWebhookData, CreateWebhookVars>(
    CreateWebhook
  );

  const onSubmit = ({ projects, description, url, events }: WebhookForm) => {
    createWebhook({
      variables: {
        input: {
          description,
          endpoint: url,
          organization: organization?.id as string,
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
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl font-medium text-gray-500">
        Webhooks / <span className="text-primary">Edit Webhook</span>
        <div className="w-full flex flex-col items-center">
          <Card className="w-[492px] mt-7">
            <Typography.Header size={Size.H2}>Webhook details</Typography.Header>
            <Typography.Header size={Size.H3}>
              Select the projects to which you want to add the webhook
            </Typography.Header>
            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
              <Form.Label
                name="Select project"
                className="text-xs mt-5"
                asideComponent={<Icon.Help />}
              >
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
              <div className="flex gap-4 mt-5">
                <Form.Label name="Name" className="text-xs mt-5" asideComponent={<Icon.Help />}>
                  <Form.Input
                    {...register('description', { required: 'Name is required' })}
                    autoFocus
                    placeholder="e.g. Bored Ape Yatch Club"
                  />
                  <Form.Error message={errors.description?.message} />
                </Form.Label>

                <Form.Label
                  name="Target URL"
                  className="text-xs mt-5"
                  asideComponent={<Icon.Help />}
                >
                  <Form.Input {...register('url', { required: 'Target URL is required' })} />
                  <Form.Error message={errors.url?.message} />
                </Form.Label>
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <span className="text-sm text-primary font-medium">Events</span>
              <div className="grid grid-cols-2 mt-4 mx-2 gap-5">
                <Form.Checkbox
                  {...register('events')}
                  id="PROJECT_CREATED"
                  value="PROJECT_CREATED"
                  label={<span className="text-xs font-medium text-primary">Project created</span>}
                />
                <Form.Checkbox
                  {...register('events')}
                  id="PROJECT_WALLET_CREATED"
                  value="PROJECT_WALLET_CREATED"
                  label={
                    <span className="text-xs font-medium text-primary">Project wallet created</span>
                  }
                />
                <Form.Checkbox
                  {...register('events')}
                  id="CUSTOMER_CREATED"
                  value="CUSTOMER_CREATED"
                  label={<span className="text-xs font-medium text-primary">Customer created</span>}
                />
                <Form.Checkbox
                  {...register('events')}
                  id="CUSTOMER_TREASURY_CREATED"
                  value="CUSTOMER_TREASURY_CREATED"
                  label={
                    <span className="text-xs font-medium text-primary">
                      Customer treasury created
                    </span>
                  }
                />
                <Form.Checkbox
                  {...register('events')}
                  id="CUSTOMER_WALLET_CREATED"
                  value="CUSTOMER_WALLET_CREATED"
                  label={
                    <span className="text-xs font-medium text-primary">
                      Customer wallet created
                    </span>
                  }
                />
                <Form.Checkbox
                  {...register('events')}
                  id="DROP_CREATED"
                  value="DROP_CREATED"
                  label={<span className="text-xs font-medium text-primary">Drop created</span>}
                />
                <Form.Checkbox
                  {...register('events')}
                  id="DROP_MINTED"
                  value="DROP_MINTED"
                  label={<span className="text-xs font-medium text-primary">Drop minted</span>}
                />
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <div className="flex items-center justify-between">
                <Button className="self-start" variant="secondary">
                  Cancel
                </Button>
                <Button htmlType="submit" className="self-end">
                  Save chagnes
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
