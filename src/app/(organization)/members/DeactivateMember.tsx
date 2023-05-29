'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../components/Icon';
import { Member, DeactivateMemberInput } from '../../../graphql.types';
import { useMutation } from '@apollo/client';
import { DeactivateMember as DeactivateMemberMutation } from '../../../mutations/member.graphql';
import { GetOrganizationMembers } from '../../../queries/organization.graphql';
import { useOrganization } from '../../../hooks/useOrganization';

interface DeactivateMemberData {
  deleteMember: Member;
}

interface DeactivateMemberVars {
  input: DeactivateMemberInput;
}

interface DeactivateMemberProps {
  member: string;
}

export default function DeactivateMember({ member }: DeactivateMemberProps) {
  const { organization } = useOrganization();
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  const [deleteMember, { loading }] = useMutation<DeactivateMemberData, DeactivateMemberVars>(
    DeactivateMemberMutation,
    {
      variables: {
        input: {
          id: member,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GetOrganizationMembers, variables: { organization: organization?.id } },
      ],
    }
  );

  const onDelete = () => {
    deleteMember({
      variables: {
        input: {
          id: member,
        },
      },
      onCompleted: () => {
        router.push('/members');
      },
    });
  };

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>
        Do you really want to deactivate the member?
      </Typography.Header>
      <Typography.Header size={Size.H3}>This action can be reversed.</Typography.Header>

      <Form className="flex flex-col mt-5">
        <div className="flex gap-2 rounded-md bg-stone-800 p-3">
          <Icon.Info stroke="stroke-gray-400" />
          <span className="text-xs text-gray-400 font-medium text-left">
            The member will be deprived of access to the project
          </span>
        </div>
        <Button
          htmlType="submit"
          className="w-full mt-5"
          variant="failure"
          onClick={onDelete}
          disabled={loading}
          loading={loading}
        >
          Deactivate member
        </Button>
        <Button variant="secondary" className="w-full mt-5" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </Card>
  );
}
