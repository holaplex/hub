'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../components/Card';
import Typography, { Size } from '../../../../../../components/Typography';
import {
  DeleteWebhookInput,
  DeleteWebhookPayload,
  Organization,
} from '../../../../../../graphql.types';
import { useOrganization } from '../../../../../../hooks/useOrganization';
import {
  GetOrganizationWebhook,
  GetOrganizationWebhooks,
} from './../../../../../../queries/webhooks.graphql';
import { DeleteWebhook as DeleteWebhookMutation } from './../../../../../../mutations/webhook.graphql';

interface DeleteWebhookData {
  deleteWebhook: DeleteWebhookPayload;
}

interface DeleteWebhookVars {
  input: DeleteWebhookInput;
}

interface GetWebhookData {
  organization: Organization;
}

interface GetWebhookVars {
  webhook: string;
  organization: string;
}

interface DeleteWebhookProps {
  webhook: string;
}

export default function DeleteWebhook({ webhook }: DeleteWebhookProps) {
  const router = useRouter();
  const { organization } = useOrganization();

  const onClose = () => {
    router.push('/webhooks');
  };

  const webhookQuery = useQuery<GetWebhookData, GetWebhookVars>(GetOrganizationWebhook, {
    variables: { webhook, organization: organization?.id },
  });
  const [deleteWebhook, { loading }] = useMutation<DeleteWebhookData, DeleteWebhookVars>(
    DeleteWebhookMutation,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GetOrganizationWebhooks, variables: { organization: organization?.id } },
      ],
    }
  );

  const onDelete = () => {
    deleteWebhook({
      variables: {
        input: {
          webhook,
        },
      },
      onCompleted: () => {
        router.push('/webhooks');
      },
    });
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Delete webhook?</Typography.Header>
        {webhookQuery.loading ? (
          <>
            <div className="mt-2 flex flex-col gap-1">
              <div className="w-full h-4 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-4 rounded-md bg-gray-100 animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H3} className="mt-2">
              Are you sure you want to delete{' '}
              <span className="text-primary font-medium">
                {webhookQuery.data?.organization.webhook?.description}
              </span>{' '}
              webhook and all its contents?
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                htmlType="submit"
                className="w-full"
                variant="failure"
                onClick={onDelete}
                disabled={loading}
              >
                Delete
              </Button>
              <Button variant="tertiary" className="w-full" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Card>
    </Modal>
  );
}
