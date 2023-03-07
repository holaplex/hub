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
import { GetOrganizationWebhook } from './../../../../../../queries/webhooks.graphql';
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
    DeleteWebhookMutation
  );

  const onDelete = () => {
    deleteWebhook({
      variables: {
        input: {
          webhook,
        },
      },
      onCompleted: async () => {
        router.push('/webhooks');
      },
    });
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Delete webhook?</Typography.Header>
        <Typography.Header size={Size.H3}>
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
          <Button variant="tertiary" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
