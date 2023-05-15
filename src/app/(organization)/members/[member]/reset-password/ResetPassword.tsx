'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { useRouter } from 'next/navigation';
import { User } from '../../../../../graphql.types';
import { useQuery } from '@apollo/client';
import { useSession } from '../../../../../hooks/useSession';
import { GetUser } from '../../../../../queries/user.graphql';
import { useForm } from 'react-hook-form';

interface GetUserData {
  user: User;
}
interface GetUserVars {
  user: string;
}

interface UpdatePasswordForm {
  password: string;
}

export default function ResetPassword({ member }: { member: string }) {
  const router = useRouter();
  const { session } = useSession();

  const userQuery = useQuery<GetUserData, GetUserVars>(GetUser, {
    variables: { user: session?.identity.id! },
  });

  const { register, formState, handleSubmit } = useForm<UpdatePasswordForm>();

  const onClose = () => {
    router.back();
  };

  const submit = () => {};

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        {userQuery.loading ? (
          <>
            <div className="bg-stone-800 animate-pulse h-6 w-24 rounded-md" />
            <div className="bg-stone-800 animate-pulse h-4 w-56 rounded-md mt-5" />
            <div className="bg-stone-800 animate-pulse h-4 w-20 rounded-md mt-5" />
            <div className="bg-stone-800 animate-pulse h-10 w-full rounded-md mt-2" />
            <div className="bg-stone-800 animate-pulse h-4 w-full rounded-md mt-5" />
            <div className="bg-stone-800 animate-pulse h-4 w-full rounded-md mt-1" />
            <div className="flex gap-6 items-center mt-5">
              <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
              <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H2}>Reset password</Typography.Header>

            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
              <span className="text-sm text-gray-400 mt-5">
                Enter a new password for {userQuery.data?.user.email}
              </span>

              <Form.Label name="Password" className="text-xs basis-1/2">
                <Form.Input
                  {...register('password', {
                    required: 'Please enter a new password.',
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                      message:
                        'Password must include at least one capital letter, lowercase letter, number, special symbol and be at least 8 characters.',
                    },
                  })}
                  autoFocus
                  type="password"
                  placeholder="Enter a new password"
                />
                <Form.Error message={formState.errors.password?.message} />
              </Form.Label>

              <span className="text-xs text-gray-400 mt-5">
                Include at least one capital letter, lowercase letter, number, special symbol and be
                at least 8 characters.
              </span>

              <hr className="w-full bg-stone-800 border-0 h-px my-5" />

              <div className="flex items-center gap-6">
                <Button variant="secondary" className="w-full basis-1/2" onClick={onClose}>
                  Cancel
                </Button>
                <Button htmlType="submit" className="w-full basis-1/2">
                  Update password
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </Modal>
  );
}
