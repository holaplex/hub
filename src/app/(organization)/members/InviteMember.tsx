'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { InviteMember as InviteMemberMutation } from './../../../mutations/invite.graphql';
import { useRouter } from 'next/navigation';
import { GetOrganizationMembers } from './../../../queries/organization.graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { Invite } from '../../../graphql.types';
import { useForm } from 'react-hook-form';
import { useOrganization } from '../../../hooks/useOrganization';
import { toast } from 'react-toastify';

interface InviteMemberForm {
  email: string;
}

export default function InviteMember() {
  const router = useRouter();
  const { organization } = useOrganization();
  const [inviteMember, { data, loading, error }] = useMutation<Invite>(InviteMemberMutation, {
    refetchQueries: [
      { query: GetOrganizationMembers, variables: { organization: organization?.id } },
    ],
  });
  const { register, handleSubmit } = useForm<InviteMemberForm>();

  const onClose = () => {
    if (loading) {
      return;
    }
    router.push('/members');
  };

  const onSubmit = ({ email }: InviteMemberForm) => {
    inviteMember({
      variables: {
        input: {
          email,
          organization: organization?.id,
        },
      },
      onError: (error: ApolloError) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        router.push('/members');
      },
    });
  };

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Invite new member to the organization</Typography.Header>
      <Typography.Header size={Size.H3}>Enter member email address to invite.</Typography.Header>

      <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label name="Member email address" className="text-xs text-white">
          <Form.Input autoFocus placeholder="name@example.com" {...register('email')} />
        </Form.Label>
        <Form.Error message="" />
        <Button htmlType="submit" className="w-full mt-5" loading={loading} disabled={loading}>
          Send invite
        </Button>
        <Button variant="secondary" className="w-full mt-4" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </Card>
  );
}
