'use client';

import { Button } from '@holaplex/ui-library-react';
import Card from './../../../components/Card';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  AcceptInviteInput,
  AcceptInvitePayload,
  Invite as InviteType,
} from '../../../graphql.types';
import Typography, { Size } from '../../../components/Typography';
import { GetInvite } from './../../../queries/invite.graphql';
import { AcceptInvite } from './../../../mutations/invite.graphql';

interface AcceptInputData {
  acceptInvite: AcceptInvitePayload;
}

interface AcceptInviteVars {
  input: AcceptInviteInput;
}

interface InviteProps {
  invite: string;
}

interface GetInviteData {
  invite: InviteType;
}

interface GetInviteVars {
  invite: string;
}

export default function Invite({ invite }: InviteProps) {
  const router = useRouter();

  const inviteQuery = useQuery<GetInviteData, GetInviteVars>(GetInvite, {
    variables: { invite },
  });
  const [acceptInvite, { loading }] = useMutation<AcceptInputData, AcceptInviteVars>(AcceptInvite);
  const onClick = () => {
    acceptInvite({
      variables: {
        input: {
          invite,
        },
      },
      onCompleted: async () => {
        try {
          await fetch(
            `/browser/organizations/${inviteQuery.data?.invite.organization?.id}/select`,
            { method: 'POST' }
          );

          router.push('/projects');
        } catch {}
      },
    });
  };
  return (
    <Card className="w-[400px] flex flex-col gap-6">
      <Typography.Header size={Size.H1}>Accept your invite</Typography.Header>
      <Typography.Paragraph>
        Welcome to <span className="capitalize">{inviteQuery.data?.invite.organization?.name}</span>
        , {inviteQuery.data?.invite.email as string}! Please accept your invite to join the
        organization.
      </Typography.Paragraph>
      <Button onClick={onClick}>Accept invite</Button>
    </Card>
  );
}
