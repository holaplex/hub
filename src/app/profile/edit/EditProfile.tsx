'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import { useProfileUpdate } from '../../../hooks/useProfileUpdate';
import { useProfileUpdateFlow } from '../../../hooks/useProfileUpdateFlow';
import { User } from '../../../graphql.types';
import { useQuery } from '@apollo/client';
import { useSession } from '../../../hooks/useSession';
import { GetUser } from './../../../queries/user.graphql';
import { useEffect } from 'react';

interface GetUserData {
  user: User;
}
interface GetUserVars {
  user: string;
}

export default function EditProfile() {
  const { session } = useSession();
  const router = useRouter();
  const { flow, loading: flowLoading } = useProfileUpdateFlow();
  const { submit, register, handleSubmit, formState, setValue, control, reset } =
    useProfileUpdate(flow);

  const userQuery = useQuery<GetUserData, GetUserVars>(GetUser, {
    variables: { user: session?.identity.id! },
  });

  const userData = userQuery.data?.user;

  const updatePassword = () => {
    router.push(`/recovery`);
  };

  const onClose = () => {
    router.back();
  };

  const loading = userQuery.loading || flowLoading;

  useEffect(() => {
    if (userData) {
      reset({
        name: { first: userData.firstName, last: userData.lastName },
        file: userData?.profileImage as string | undefined,
        email: userData.email,
      });
    }
  }, [reset, userData]);

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Edit profile</Typography.Header>

        {loading ? (
          <div className="flex flex-col gap-6 mt-3">
            <div>
              <div className="mb-1 w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="mb-1 w-full h-16 rounded-md bg-stone-950 animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div>
                <div className="mb-1 w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
              </div>
              <div>
                <div className="mb-1 w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
              <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
            </div>
          </div>
        ) : (
          <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
            <Form.Label name="Profile picture" className="text-xs text-white">
              <Controller
                name="file"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Dropzone
                    noClick
                    multiple={false}
                    onDrop={([file], _reject, e) => {
                      setValue('file', file as unknown as File, { shouldValidate: true });
                    }}
                  >
                    {({ getRootProps, getInputProps, isDragActive, open }) => {
                      return (
                        <div
                          {...getRootProps()}
                          className={clsx(
                            'flex items-center justify-center border border-dashed border-stone-800 cursor-pointer rounded-md p-6 text-center text-gray-400 text-sm',
                            {
                              'bg-stone-950': isDragActive,
                            }
                          )}
                        >
                          <input {...getInputProps({ onBlur })} />
                          {value ? (
                            <Form.DragDrop.Preview value={value} />
                          ) : (
                            <div className="flex flex-col gap-2" onClick={open}>
                              <p>
                                Drag & drop file or{' '}
                                <span className="text-yellow-300">Browse files</span> to upload{' '}
                                <br /> <br />
                                JPEG, PNG supported. Must be under 10 MB.
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </Dropzone>
                )}
              />
            </Form.Label>

            <div className="flex items-center gap-6 mt-5">
              <Form.Label name="First name" className="text-xs basis-1/2">
                <Form.Input
                  {...register('name.first', {
                    required: 'Please enter your first name.',
                    maxLength: 36,
                  })}
                  autoFocus
                />
                <Form.Error message={formState.errors.name?.first?.message} />
              </Form.Label>

              <Form.Label name="Last name" className="text-xs basis-1/2">
                <Form.Input
                  {...register('name.last', {
                    required: 'Please enter your last name.',
                    maxLength: 36,
                  })}
                />
                <Form.Error message={formState.errors.name?.last?.message} />
              </Form.Label>

              <Button variant="secondary" className="w-full mt-5" onClick={updatePassword}>
                Update password
              </Button>

              <hr className="w-full bg-stone-800 border-0 h-px my-5" />

              <div className="flex items-center gap-6">
                <Button variant="secondary" className="w-full basis-1/2" onClick={onClose}>
                  Cancel
                </Button>
                <Button htmlType="submit" className="w-full basis-1/2">
                  Save changes
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Card>
    </Modal>
  );
}
