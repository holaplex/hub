'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import {
  DeleteCredentialInput,
  DeleteCredentialPayload,
  Organization,
} from '../../../../../graphql.types';
import { useOrganization } from '../../../../../hooks/useOrganization';
import {
  GetOrganizationCredential,
  GetOrganizationCredentials,
} from './../../../../../queries/credentials.graphql';
import { DeleteCredential } from './../../../../../mutations/credential.graphql';

interface DeleteCredentialData {
  deleteCredential: DeleteCredentialPayload;
}

interface DeleteCredentialVars {
  input: DeleteCredentialInput;
}
interface GetCredentialData {
  organization: Organization;
}

interface GetCredentialVars {
  credential: string;
  organization: string;
}
interface DeleteCredentialProps {
  params: { credential: string };
}

export default function DeleteCredentialPage({ params: { credential } }: DeleteCredentialProps) {
  const { organization } = useOrganization();
  const router = useRouter();

  const onClose = () => {
    router.push('/credentials');
  };

  const credentialQuery = useQuery<GetCredentialData, GetCredentialVars>(
    GetOrganizationCredential,
    {
      variables: { credential, organization: organization?.id },
    }
  );
  const [deleteCredential, { loading }] = useMutation<DeleteCredentialData, DeleteCredentialVars>(
    DeleteCredential,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GetOrganizationCredentials, variables: { organization: organization?.id } },
      ],
    }
  );

  const onDelete = () => {
    deleteCredential({
      variables: {
        input: {
          credential,
        },
      },
      onCompleted: () => {
        router.push('/credentials');
      },
    });
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Delete access token</Typography.Header>
        {credentialQuery.loading ? (
          <>
            <div className="mt-2 flex flex-col gap-1">
              <div className="w-full h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full h-4 rounded-md bg-stone-950 animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H3} className="mt-2">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">
                {credentialQuery.data?.organization.credential?.name}
              </span>{' '}
              access token and all its contents? You will not be able to recover this access token
              or its contents. This operation can not be undone.
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                htmlType="submit"
                className="w-full mt-5"
                variant="failure"
                onClick={onDelete}
                disabled={loading}
              >
                Delete
              </Button>
              <Button variant="tertiary" className="w-full" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Card>
    </Modal>
  );
}
