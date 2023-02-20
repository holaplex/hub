import Invite from './Invite';

interface InvitePageProps {
  params: { invite: string };
}

export default function InvitePage({ params: { invite } }: InvitePageProps) {
  return <Invite invite={invite} />;
}
