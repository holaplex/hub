'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import { Member, ReactivateMemberInput } from '../../../../../graphql.types';
import { useMutation } from '@apollo/client';
import { ReactivateMember } from '../../../../../mutations/member.graphql';
import { GetOrganizationMembers } from '../../../../../queries/organization.graphql';
import { useOrganization } from '../../../../../hooks/useOrganization';

interface ReactivateMemberData {
  reactivateMember: Member;
}

interface ReactivateMemberVars {
  input: ReactivateMemberInput;
}

interface ReactivateMemberProps {
  params: { member: string };
}

export default function ReactivateMemberPage({ params: { member } }: ReactivateMemberProps) {
  const { organization } = useOrganization();
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  const [reactivateMember, { loading }] = useMutation<ReactivateMemberData, ReactivateMemberVars>(
    ReactivateMember,
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
      onCompleted: () => {
        router.push('/members');
      },
    });
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>
          Do you really want to reactivate {member}?
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <div className="flex items-start gap-2 rounded-md bg-gray-50 p-3">
            <Icon.Info />
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
          <Button variant="tertiary" className="w-full mt-5" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
