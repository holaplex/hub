'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../components/Icon';
import { Controller, useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';

interface EditProfileForm {
  firstName: string;
  lastName: string;
  profileImage: string | File | undefined;
}

export default function EditProfile() {
  const router = useRouter();

  const { control, register, formState, handleSubmit, setValue } = useForm<EditProfileForm>();

  const updatePassword = () => {
    router.push(`/profile/reset-password`);
  };

  const onClose = () => {
    router.back();
  };
  const submit = () => {};

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Edit profile</Typography.Header>

        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label name="Profile picture" className="text-xs text-white">
            <Controller
              name="profileImage"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Dropzone
                  noClick
                  multiple={false}
                  onDrop={([file], _reject, e) => {
                    setValue('profileImage', file as unknown as File, { shouldValidate: true });
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
                              <span className="text-yellow-300">Browse files</span> to upload <br />{' '}
                              <br />
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
                {...register('firstName', {
                  required: 'Please enter your first name.',
                  maxLength: 36,
                })}
                autoFocus
              />
            </Form.Label>
            <Form.Error message={formState.errors.firstName?.message} />

            <Form.Label name="Last name" className="text-xs basis-1/2">
              <Form.Input
                {...register('lastName', {
                  required: 'Please enter your last name.',
                  maxLength: 36,
                })}
              />
            </Form.Label>
          </div>

          <Form.Error message={formState.errors.lastName?.message} />

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
        </Form>
      </Card>
    </Modal>
  );
}
