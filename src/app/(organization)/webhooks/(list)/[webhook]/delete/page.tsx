import DeleteWebhook from './DeleteWebhook';

interface DeleteWebhookProps {
  params: { webhook: string };
}

export default function DeleteWebhookPage({ params: { webhook } }: DeleteWebhookProps) {
  return <DeleteWebhook webhook={webhook} />;
}
