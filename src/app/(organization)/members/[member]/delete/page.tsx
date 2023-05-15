'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import { Member, DeactivateMemberInput } from '../../../../../graphql.types';
import { useMutation } from '@apollo/client';
import { DeactivateMember } from '../../../../../mutations/member.graphql';
import { GetOrganizationMembers } from '../../../../../queries/organization.graphql';
import { useOrganization } from '../../../../../hooks/useOrganization';

interface DeleteMemberData {
  deleteMember: Member;
}

interface DeleteMemberVars {
  input: DeactivateMemberInput;
}

interface DeleteMemberProps {
  params: { member: string };
}

export default function MemberDeletePage({ params: { member } }: DeleteMemberProps) {
  const { organization } = useOrganization();
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  const [deleteMember, { loading }] = useMutation<DeleteMemberData, DeleteMemberVars>(
    DeactivateMember,
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
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Do you really want to delete {member}?</Typography.Header>
        <Typography.Header size={Size.H3}>This action cannot be reversed.</Typography.Header>

        <Form className="flex flex-col mt-5">
          <div className="flex items-start gap-2 rounded-md bg-stone-800 p-3">
            <Icon.Info />
            <span className="text-xs text-gray-400 font-medium">
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
            Delete member
          </Button>
          <Button variant="tertiary" className="w-full mt-5" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
