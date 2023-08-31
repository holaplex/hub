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
import Link from 'next/link';
import { useProfileUnlink2fa } from '../../../hooks/useProfileUnlink2fa';
import { use2faRecovery } from '../../../hooks/use2faRecovery';
import Divider from '../../../components/Divider';
import { AuthenticatorAssuranceLevel, UiNodeTextAttributes } from '@ory/client';
import { extractFlowNodeAttribute } from '../../../modules/ory';

interface GetUserData {
  user: User;
}
interface GetUserVars {
  user: string;
}

const extractLookupSecretCodes = extractFlowNodeAttribute('lookup_secret_codes');

export default function EditProfile() {
  const { session } = useSession();
  const router = useRouter();
  const unlink2fa = useProfileUnlink2fa();
  const regenerate2fa = use2faRecovery();
  const { submit, register, handleSubmit, formState, setValue, control, reset, flowContext } =
    useProfileUpdate();

  const userQuery = useQuery<GetUserData, GetUserVars>(GetUser, {
    variables: { user: session?.identity.id! },
  });
  const lookupSecretsCodes = extractLookupSecretCodes(
    regenerate2fa.flowContext?.flow?.ui.nodes || []
  )?.attributes as UiNodeTextAttributes;

  const userData = userQuery.data?.user;

  const onClose = () => {
    router.back();
  };

  const loading =
    userQuery.loading ||
    flowContext.loading ||
    unlink2fa.flowContext.loading ||
    regenerate2fa.flowContext.loading;

  useEffect(() => {
    if (userData) {
      reset({
        name: { first: userData.firstName, last: userData.lastName },
        file: userData?.profileImage as string | undefined,
      });
    }
  }, [reset, userData]);

  return (
    <Card className="w-[400px] m-auto">
      {loading ? (
        <>
          <div className="bg-stone-950 animate-pulse h-6 w-28 rounded-md" />
          <div className="flex flex-col gap-6 mt-3">
            <div>
              <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full h-20 mt-1 rounded-md bg-stone-950 animate-pulse" />
            </div>
            <div className="flex gap-6 w-full">
              <div className="w-full">
                <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
              </div>
              <div className="w-full">
                <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
              </div>
            </div>
            {/* <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" /> */}
            <div className="flex gap-6 justify-between mt-2">
              <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
            </div>
          </div>
        </>
      ) : (
        <>
          <Typography.Header size={Size.H2}>Edit profile</Typography.Header>
          <Form className="flex flex-col mt-5 gap-6" onSubmit={handleSubmit(submit)}>
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
                            <div className="flex flex-col gap-2">
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

            <div className="flex items-center gap-6">
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
            </div>

            {/* <Link href="/profile/password/edit">
          <Button variant="secondary" className="w-full mt-5" onClick={updatePassword} disabled={formState.isSubmitting}>
              Update password
            </Button>
          </Link> */}

            <div className="flex items-center gap-6">
              <Button
                variant="secondary"
                className="w-full basis-1/2"
                onClick={onClose}
                disabled={
                  formState.isSubmitting ||
                  unlink2fa.formState.isSubmitting ||
                  regenerate2fa.formState.isSubmitting
                }
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="w-full basis-1/2"
                loading={formState.isSubmitting}
                disabled={
                  formState.isSubmitting ||
                  unlink2fa.formState.isSubmitting ||
                  regenerate2fa.formState.isSubmitting
                }
              >
                Save changes
              </Button>
            </div>
          </Form>
          <Divider.Or className="my-6" />

          {session?.authenticator_assurance_level === AuthenticatorAssuranceLevel.Aal2 ? (
            <>
              <Form onSubmit={regenerate2fa.handleSubmit(regenerate2fa.submit)}>
                <Form.Label
                  name="2FA backup code"
                  className="text-xs"
                  asideComponent={
                    lookupSecretsCodes?.text?.text ? (
                      <Link
                        href="/projects"
                        className="text-yellow-300 transition hover:underline hover:text-yellow-500 cursor-pointer"
                      >
                        Exit
                      </Link>
                    ) : (
                      <></>
                    )
                  }
                >
                  {lookupSecretsCodes?.text?.text ? (
                    <div className="bg-gray-800 rounded-lg flex flex-col justify-center align-middle w-full py-8 px-2 mb-6">
                      <span className="grid grid-cols-3 gap-6 text-gray-400 text-xs text-center">
                        {lookupSecretsCodes.text.text.split(', ').map((code) => {
                          return <pre key={code}>{code}</pre>;
                        })}
                      </span>
                      <button
                        type="submit"
                        className="text-yellow-300 text-sm w-full mt-4 hover:underline hover:text-yellow-500 cursor-pointer transition"
                      >
                        Regenerate new code
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-gray-800 rounded-lg flex flex-row justify-center align-middle text-yellow-300 text-sm w-full py-8 mb-6 hover:opacity-80 transition cursor-pointer"
                    >
                      View backup code
                    </button>
                  )}
                </Form.Label>
              </Form>
              <Form onSubmit={unlink2fa.handleSubmit(unlink2fa.submit)}>
                <Button
                  variant="failure"
                  className="w-full"
                  htmlType="submit"
                  loading={unlink2fa.formState.isSubmitting}
                  disabled={
                    formState.isSubmitting ||
                    unlink2fa.formState.isSubmitting ||
                    regenerate2fa.formState.isSubmitting
                  }
                >
                  Unlink 2FA
                </Button>
              </Form>
            </>
          ) : (
            <Link href="/profile/2fa">
              <Button
                variant="secondary"
                className="w-full"
                disabled={
                  formState.isSubmitting ||
                  regenerate2fa.formState.isSubmitting ||
                  unlink2fa.formState.isSubmitting
                }
              >
                Setup 2FA
              </Button>
            </Link>
          )}
        </>
      )}
    </Card>
  );
}
