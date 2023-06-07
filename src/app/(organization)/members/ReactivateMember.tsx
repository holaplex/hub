'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../components/Icon';
import { Member, ReactivateMemberInput } from '../../../graphql.types';
import { ApolloError, useMutation } from '@apollo/client';
import { ReactivateMember as ReactivateMemberMutation } from '../../../mutations/member.graphql';
import { GetOrganizationMembers } from '../../../queries/organization.graphql';
import { useOrganization } from '../../../hooks/useOrganization';
import { toast } from 'react-toastify';

interface ReactivateMemberData {
  reactivateMember: Member;
}

interface ReactivateMemberVars {
  input: ReactivateMemberInput;
}

interface ReactivateMemberProps {
  member: string;
}

export default function ReactivateMember({ member }: ReactivateMemberProps) {
  const { organization } = useOrganization();
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  const [reactivateMember, { loading }] = useMutation<ReactivateMemberData, ReactivateMemberVars>(
    ReactivateMemberMutation,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GetOrganizationMembers, variables: { organization: organization?.id } },
      ],
    }
  );

  const onReactivate = () => {
    reactivateMember({
      variables: {
        input: {
          id: member,
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
      <Typography.Header size={Size.H2}>
        Do you really want to reactivate the member?
      </Typography.Header>

      <Form className="flex flex-col mt-5">
        <div className="flex items-start gap-2 rounded-md bg-stone-800 p-3">
          <Icon.Info stroke="stroke-gray-400" />
          <span className="text-xs text-gray-500 font-medium">
            The member will regain access to the project
          </span>
        </div>
        <Button
          htmlType="submit"
          className="w-full mt-5"
          onClick={onReactivate}
          disabled={loading}
          loading={loading}
        >
          Reactivate member
        </Button>
        <Button variant="secondary" className="w-full mt-5" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </Card>
  );
}
