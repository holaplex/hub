'use client';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { MintEdition as MintEditionMutation } from '../../../../../mutations/mint.graphql';
import { MintDropInput } from '../../../../../graphql.types';

interface MintEditionVars {
  input: MintDropInput;
}

interface MintEditionData {
  mintEdition: MintEditionData;
}

interface MintEditionForm {
  recipient: string;
}

interface MintEditionProps {
  drop: string;
  project: string;
}

export default function MintEdition({ project, drop }: MintEditionProps) {
  const router = useRouter();

  const { control, register, handleSubmit, formState, setValue, reset } =
    useForm<MintEditionForm>();

  const [mintEdition, mintEditionResult] = useMutation<MintEditionData, MintEditionVars>(
    MintEditionMutation,
    {
      awaitRefetchQueries: true,
      // refetchQueries: [
      //   { query: GetOrganizationProjects, variables: { organization: organization?.id } },
      // ],
    }
  );

  const onClose = () => {
    router.push('/projects');
  };

  const loading = mintEditionResult.loading || formState.isSubmitting;

  const submit = async ({ recipient }: MintEditionForm) => {
    mintEdition({
      variables: {
        input: {
          drop,
          recipient,
        },
      },
      onError: (error: ApolloError) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success('Mint edition successfully minted to the wallet.');
        router.push(`/projects/${project}/drops/${drop}/holders`);
      },
    });
  };

  return (
    <div className="w-max mx-auto">
      <Card className="w-[400px]">
        {false ? (
          <>
            <div className="bg-stone-800 animate-pulse h-6 w-24 rounded-md" />
            <div className="bg-stone-800 animate-pulse h-4 w-40 rounded-md mt-2" />
            <div className="bg-stone-800 animate-pulse h-4 w-20 rounded-md mt-5" />
            <div className="bg-stone-800 animate-pulse h-10 w-full rounded-md mt-2" />
            <div className="flex gap-2 mt-6">
              <div className="bg-stone-800 animate-pulse h-10 w-36 rounded-md mt-5" />
              <div className="bg-stone-800 animate-pulse h-10 w-36 rounded-md mt-5" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H2} className="self-start">
              Mint edition to a wallet
            </Typography.Header>

            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
              <Form.Label name="Enter a Solana wallet address" className="text-sm text-gray-400">
                <Form.Input
                  autoFocus
                  {...register('recipient', { required: 'Please enter the wallet address.' })}
                />
                <Form.Error message={formState.errors.recipient?.message} />
              </Form.Label>
              <div className="flex gap-2 mt-6">
                <Button className="mt-4" variant="secondary" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button htmlType="submit" disabled={loading} loading={loading}>
                  Mint editions
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
}
