'use client';

import { Button } from '@holaplex/ui-library-react';
import Card from './../../../components/Card';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  AcceptInviteInput,
  AcceptInvitePayload,
  Invite as InviteType,
} from '../../../graphql.types';
import Typography, { Size } from '../../../components/Typography';
import { GetInvite } from './../../../queries/invite.graphql';
import { AcceptInvite } from './../../../mutations/invite.graphql';
import { toast } from 'react-toastify';

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
      onError: (error: ApolloError) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <Card className="w-[400px] flex flex-col">
      {inviteQuery.loading ? (
        <>
          <div className="mb-1 w-48 h-10 rounded-md bg-stone-800 animate-pulse" />
          <div className="mb-1 w-full h-4 mt-5 rounded-md bg-stone-800 animate-pulse" />
          <div className="mb-1 w-full h-4 rounded-md bg-stone-800 animate-pulse" />
          <div className="mb-1 w-full h-10 mt-5 rounded-md bg-stone-800 animate-pulse" />
        </>
      ) : (
        <>
          <Typography.Header size={Size.H1}>Accept your invite</Typography.Header>
          <Typography.Paragraph className="mt-5">
            Welcome to{' '}
            <span className="capitalize">{inviteQuery.data?.invite.organization?.name}</span>,{' '}
            {inviteQuery.data?.invite.email as string}! Please accept your invite to join the
            organization.
          </Typography.Paragraph>
          <Button className="mt-5" onClick={onClick} loading={loading} disabled={loading}>
            Accept invite
          </Button>
        </>
      )}
    </Card>
  );
}
