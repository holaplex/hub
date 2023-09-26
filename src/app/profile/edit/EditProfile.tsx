'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import { User } from '../../../graphql.types';
import { useProfileUpdate } from '../../../hooks/useProfileUpdate';
import { useQuery } from '@apollo/client';
import { useSession } from '../../../hooks/useSession';
import { GetUser } from './../../../queries/user.graphql';
import { useEffect } from 'react';
import Link from 'next/link';
import { useProfileUnlink2fa } from '../../../hooks/useProfileUnlink2fa';
import { use2faRecovery } from '../../../hooks/use2faRecovery';
import { useConfirmRecoveryCodes } from '../../../hooks/useConfirmRecoveryCodes';
import Divider from '../../../components/Divider';
import { UiNodeTextAttributes, UiNodeInputAttributes } from '@ory/client';
import { pipe, not, isNil } from 'ramda';
import { extractFlowNode, extractFlowNodeAttribute } from '../../../modules/ory';
import { useProfileUpdateFlow } from '../../../hooks/useProfileUpdateFlow';
import { useDisableRecoveryCodes } from '../../../hooks/useDisableRecoveryCodes';

interface GetUserData {
  user: User;
}
interface GetUserVars {
  user: string;
}

const isNotNil = pipe(isNil, not);
const extractLookupSecretCodes = extractFlowNodeAttribute('lookup_secret_codes');
const extractTotpUnlink = extractFlowNode('totp_unlink');
const extractConfirmCodes = extractFlowNode('lookup_secret_confirm');
const extractSecretDisables = extractFlowNode('lookup_secret_disable');

export default function EditProfile() {
  const { session } = useSession();
  const router = useRouter();
  const flowContext = useProfileUpdateFlow();
  const unlink2fa = useProfileUnlink2fa(flowContext);
  const regenerate2fa = use2faRecovery(flowContext);
  const confirm2faCodes = useConfirmRecoveryCodes(flowContext);
  const disable2faCodes = useDisableRecoveryCodes(flowContext);

  const profileUpdate = useProfileUpdate(flowContext);

  const userQuery = useQuery<GetUserData, GetUserVars>(GetUser, {
    variables: { user: session?.identity.id! },
  });
  const lookupSecretsCodes = extractLookupSecretCodes(flowContext?.flow?.ui.nodes || [])
    ?.attributes as UiNodeTextAttributes;
  const totpUnlink = extractTotpUnlink(flowContext?.flow?.ui.nodes || [])
    ?.attributes as UiNodeInputAttributes;
  const lookupSecretsConfirm = extractConfirmCodes(flowContext?.flow?.ui.nodes || [])
    ?.attributes as UiNodeInputAttributes;
  const lookupSecretsDisabled = extractSecretDisables(flowContext?.flow?.ui.nodes || [])
    ?.attributes as UiNodeInputAttributes;

  const userData = userQuery.data?.user;

  const onClose = () => {
    router.push('/projects');
  };

  const loading = userQuery.loading || flowContext.loading;
  const resetProfileUpdate = profileUpdate.reset;

  useEffect(() => {
    if (userData) {
      resetProfileUpdate({
        name: { first: userData.firstName, last: userData.lastName },
        file: userData?.profileImage as string | undefined,
      });
    }
  }, [resetProfileUpdate, userData]);

  const isSubmitting =
    profileUpdate.formState.isSubmitting ||
    unlink2fa.formState.isSubmitting ||
    regenerate2fa.formState.isSubmitting ||
    confirm2faCodes.formState.isSubmitting ||
    disable2faCodes.formState.isSubmitting;

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
          <Form
            className="flex flex-col mt-5 gap-6"
            onSubmit={profileUpdate.handleSubmit(profileUpdate.submit)}
          >
            <Form.Label name="Profile picture" className="text-xs text-white">
              <Controller
                name="file"
                control={profileUpdate.control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Dropzone
                    noClick
                    multiple={false}
                    onDrop={([file], _reject, e) => {
                      profileUpdate.setValue('file', file as unknown as File, {
                        shouldValidate: true,
                      });
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
                  {...profileUpdate.register('name.first', {
                    required: 'Please enter your first name.',
                    maxLength: 36,
                  })}
                  autoFocus
                />
                <Form.Error message={profileUpdate.formState.errors.name?.first?.message} />
              </Form.Label>

              <Form.Label name="Last name" className="text-xs basis-1/2">
                <Form.Input
                  {...profileUpdate.register('name.last', {
                    required: 'Please enter your last name.',
                    maxLength: 36,
                  })}
                />
                <Form.Error message={profileUpdate.formState.errors.name?.last?.message} />
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="w-full basis-1/2"
                loading={profileUpdate.formState.isSubmitting}
                disabled={isSubmitting}
              >
                Save changes
              </Button>
            </div>
          </Form>
          <Divider.Or className="my-6" />
          {totpUnlink ? (
            <>
              <Form onSubmit={regenerate2fa.handleSubmit(regenerate2fa.submit)}>
                <Form.Label name="2FA backup codes" className="text-xs">
                  {lookupSecretsCodes?.text?.text ? (
                    <div className="bg-gray-800 rounded-lg flex flex-col justify-center align-middle w-full py-8 px-2 mb-2">
                      <span className="grid grid-cols-3 gap-6 text-gray-400 text-xs text-center">
                        {lookupSecretsCodes.text.text.split(', ').map((code) => {
                          return <pre key={code}>{code}</pre>;
                        })}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={clsx(
                        'bg-gray-800 rounded-lg flex flex-row justify-center align-middle text-yellow-300 text-sm w-full py-8 hover:opacity-80 transition cursor-pointer',
                        isNotNil(lookupSecretsDisabled) || isNotNil(lookupSecretsConfirm)
                          ? 'mb-2'
                          : 'mb-6'
                      )}
                    >
                      Generate new backup recovery codes
                    </button>
                  )}
                </Form.Label>
              </Form>
              {isNotNil(lookupSecretsConfirm) ? (
                <Form onSubmit={confirm2faCodes.handleSubmit(confirm2faCodes.submit)}>
                  <Button
                    variant="primary"
                    className="w-full mb-6"
                    htmlType="submit"
                    loading={confirm2faCodes.formState.isSubmitting}
                    disabled={isSubmitting}
                  >
                    Confirm backup codes
                  </Button>
                </Form>
              ) : undefined}
              {isNotNil(lookupSecretsDisabled) ? (
                <Form onSubmit={disable2faCodes.handleSubmit(disable2faCodes.submit)}>
                  <Button
                    variant="primary"
                    className="w-full mb-6"
                    htmlType="submit"
                    loading={disable2faCodes.formState.isSubmitting}
                    disabled={isSubmitting}
                  >
                    Disable backup codes
                  </Button>
                </Form>
              ) : undefined}
              <Form onSubmit={unlink2fa.handleSubmit(unlink2fa.submit)}>
                <Button
                  variant="failure"
                  className="w-full"
                  htmlType="submit"
                  loading={unlink2fa.formState.isSubmitting}
                  disabled={isSubmitting}
                >
                  Unlink 2FA
                </Button>
              </Form>
            </>
          ) : (
            <Link href="/profile/2fa">
              <Button variant="secondary" className="w-full" disabled={isSubmitting}>
                Setup 2FA
              </Button>
            </Link>
          )}
        </>
      )}
    </Card>
  );
}
