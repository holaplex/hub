'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Modal, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { isNil, not, pipe } from 'ramda';
import { Controller, useForm } from 'react-hook-form';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import { Pill } from '../../../../../components/Pill';
import Typography, { Size } from '../../../../../components/Typography';
import {
  CreateWebhookInput,
  CreateWebhookPayload,
  FilterType,
  Organization,
  Project,
} from '../../../../../graphql.types';
import useClipboard from '../../../../../hooks/useClipboard';
import { useOrganization } from '../../../../../hooks/useOrganization';
import { CreateWebhook } from './../../../../../mutations/webhook.graphql';
import { GetOrganizationProjects } from './../../../../../queries/organization.graphql';

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

export default function NewWebhook() {
  const { organization } = useOrganization();
  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<WebhookForm>({
    defaultValues: { projects: [], events: [] },
  });
  const selectedProjects = watch('projects');

  const [createWebhook, createWebhookResult] = useMutation<CreateWebhookData, CreateWebhookVars>(
    CreateWebhook
  );

  const { copied, copyText } = useClipboard(
    createWebhookResult.data?.createWebhook.secret as string
  );

  const onSubmit = ({ projects, description, url, events }: WebhookForm) => {
    createWebhook({
      variables: {
        input: {
          description,
          url,
          organization: organization?.id as string,
          projects: projects.map((project) => project.id),
          filterTypes: events,
        },
      },
    });
  };

  const projectsQuery = useQuery<GetOrganizationProjectsData, GetOrganizationProjectsVar>(
    GetOrganizationProjects,
    {
      variables: { organization: organization?.id },
    }
  );

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl font-medium">
        <span className="text-gray-400">Webhooks / </span>
        <span>Add Webhook</span>
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
                <Form.Label
                  name="Name"
                  className="text-xs mt-5"
                >
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
                >
                  <Form.Input {...register('url', { required: 'Target URL is required' })} />
                  <Form.Error message={errors.url?.message} />
                </Form.Label>
              </div>

              <hr className="w-full bg-divider my-4 h-px border-0" />

              <span className="text-sm text-white font-medium">Events</span>
              <div className="grid grid-cols-2 mt-4 mx-2 gap-5 text-xs">
                <Form.Label name="Project created" placement={Placement.Right}>
                  <Form.Checkbox
                    {...register('events')}
                    id="PROJECT_CREATED"
                    value="PROJECT_CREATED"
                  />
                </Form.Label>
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
                  disabled={createWebhookResult.loading}
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="self-end"
                  loading={createWebhookResult.loading}
                  disabled={createWebhookResult.loading}
                >
                  Add webhook
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      <Modal
        open={pipe(isNil, not)(createWebhookResult.data)}
        setOpen={() => {
          router.push('/webhooks');
        }}
      >
        <Card className="w-[400px] p-8 text-left">
          <Typography.Header size={Size.H2} className="self-start">
            Secret key
          </Typography.Header>
          <Typography.Paragraph className="py-4 text-gray-400">
            Its your secret access key, copy it. If necessary, you can always find it in the table.
          </Typography.Paragraph>
          <div className="flex gap-2">
            <div className="shrink px-4 py-3 bg-stone-900 rounded-md truncate">
              {createWebhookResult.data?.createWebhook.secret}
            </div>
            <button
              onClick={copyText}
              className="flex-none aspect-square rounded-md w-12 flex items-center justify-center bg-stone-900"
            >
              {copied ? <Icon.Check /> : <Icon.Copy />}
            </button>
          </div>

          <Button
            className="mt-2"
            variant="secondary"
            size="large"
            block
            onClick={() => {
              router.push('/webhooks');
            }}
          >
            Cancel
          </Button>
        </Card>
      </Modal>
    </div>
  );
}
