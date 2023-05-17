'use client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import Card from '../../../../../../../../../components/Card';
import { Icon } from '../../../../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { Blockchain } from '../../../../../../../../../graphql.types';
import { useProject } from '../../../../../../../../../hooks/useProject';
import clsx from 'clsx';
import { useDropForm } from '../../../../../../../../../hooks/useDropForm';
import { StoreApi, useStore } from 'zustand';
import {
  DetailSettings,
  DropFormState,
} from '../../../../../../../../../providers/DropFormProvider';

interface EditDropDetailsPageProps {}

const BLOCKCHAIN_LABELS = {
  [Blockchain.Solana]: 'Solana',
  [Blockchain.Ethereum]: 'Ethereum',
  [Blockchain.Polygon]: 'Polygon',
};

export default function EditDropDetailsPage({}: EditDropDetailsPageProps) {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;
  const detail = useStore(store, (store) => store.detail);
  const setDetail = useStore(store, (store) => store.setDetail);

  const { handleSubmit, register, control, setValue, formState, watch, setError, clearErrors } =
    useForm<DetailSettings>({
      defaultValues: detail || {},
    });

  const includeAnimationUrl = watch('includeAnimationUrl');

  const submit = (data: DetailSettings) => {
    setDetail(data);
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/royalties`);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const BLOCKCHAIN_OPTIONS = [Blockchain.Solana];

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Drop details</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label
            name={includeAnimationUrl ? 'Cover image' : 'Main artwork'}
            className="text-xs text-yellow-300 mt-5"
          >
            <Controller
              name="image"
              control={control}
              rules={{ required: 'Please upload an image.' }}
              render={({ field: { value, onBlur } }) => (
                <Dropzone
                  noClick
                  multiple={false}
                  onDrop={([file], _reject, e) => {
                    e.preventDefault();
                    clearErrors('image');
                    if (file['type'].split('/')[0] !== 'image') {
                      setError('image', {
                        message:
                          'Uploading video files is not currently supported. You can add a link to a hosted video by checking the "Include a video" checkbox below.',
                      });
                    } else {
                      setValue('image', file as unknown as File, { shouldValidate: true });
                    }
                  }}
                >
                  {({ getRootProps, getInputProps, isDragActive, open }) => {
                    return (
                      <div
                        {...getRootProps()}
                        className={clsx(
                          'flex items-center justify-center border border-dashed border-gray-800 cursor-pointer rounded-md p-6 text-center text-gray-500',
                          {
                            'bg-stone-800': isDragActive,
                          }
                        )}
                      >
                        <input {...getInputProps({ onBlur })} />
                        {value ? (
                          <Form.DragDrop.Preview value={value} />
                        ) : (
                          <div className="flex flex-col gap-2 text-gray-400">
                            <p className="text-center">
                              Drag & drop file or{' '}
                              <span className="text-yellow-300 cursor-pointer">Browse files</span>{' '}
                              to upload.
                              <br />
                              <br />
                              JPEG, GIF and PNG supported. Must be under 10 MB.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Dropzone>
              )}
            />
            <Form.Error message={formState.errors.image?.message} />
          </Form.Label>

          <Form.Label name="Include a video" placement={Placement.Right} className="mt-5">
            <Form.Checkbox {...register('includeAnimationUrl')} />
          </Form.Label>

          {includeAnimationUrl && (
            <>
              <Form.Label name="Video URL" className="text-xs mt-5 basis-3/4">
                <Form.Input
                  {...register('animationUrl')}
                  autoFocus
                  placeholder="URL to hosted video"
                />
              </Form.Label>
            </>
          )}

          <div className="flex items-center gap-6">
            <Form.Label name="Name" className="text-xs mt-5 basis-3/4">
              <Form.Input
                {...register('name', {
                  required: 'Please enter a name.',
                  maxLength: 32,
                })}
                autoFocus
                placeholder="e.g. Bored Ape Yatch Club"
              />
              <Form.Error message={formState.errors.name?.message} />
            </Form.Label>
            <Form.Label name="Symbol" className="text-xs mt-5 basis-1/4">
              <Form.Input
                {...register('symbol', {
                  required: 'Symbol required.',
                  maxLength: 10,
                })}
                placeholder="e.g. BAYC"
              />
              <Form.Error message={formState.errors.symbol?.message} />
            </Form.Label>
          </div>

          <Form.Label name="Blockchain" className="text-xs mt-5">
            <Controller
              name="blockchain"
              control={control}
              rules={{ required: 'Please select a blockchain.' }}
              render={({ field: { value, onChange } }) => {
                return (
                  <Form.Select value={value} onChange={onChange}>
                    <Form.Select.Button placeholder="Select blockchain">
                      {BLOCKCHAIN_LABELS[value]}
                    </Form.Select.Button>
                    <Form.Select.Options>
                      {BLOCKCHAIN_OPTIONS.map((i) => (
                        <Form.Select.Option value={i} key={i}>
                          <>{BLOCKCHAIN_LABELS[i]}</>
                        </Form.Select.Option>
                      ))}
                    </Form.Select.Options>
                    <Form.Error message={formState.errors.blockchain?.message} />
                  </Form.Select>
                );
              }}
            />
          </Form.Label>
          <Form.Label name="Description" className="text-xs mt-5">
            <Form.Input
              {...register('description')}
              placeholder="Enter a description for the drop."
            />
            <Form.Error message="" />
          </Form.Label>
          <Form.Label name="External URL" className="text-xs mt-5">
            <Form.Input
              {...register('externalUrl')}
              placeholder="Set an external url for the drop."
            />
            <Form.Error message="" />
          </Form.Label>
          <Form.Label name="Attribute" className="text-xs mt-5">
            {fields.map((field, index) => (
              <div className="flex gap-6" key={field.id}>
                <Form.Label name="Trait" className="text-xs basis-1/2">
                  <Form.Input
                    {...register(`attributes.${index}.traitType`, { required: true, minLength: 1 })}
                  />
                </Form.Label>

                <Form.Label name="Value" className="text-xs basis-1/2">
                  <Form.Input
                    {...register(`attributes.${index}.value`, { required: true, minLength: 1 })}
                  />
                </Form.Label>

                <div
                  className="rounded-md bg-stone-800 hover:bg-stone-950 p-3 self-end cursor-pointer transition"
                  onClick={() => remove(index)}
                >
                  <Icon.Close stroke="stroke-white" />
                </div>
              </div>
            ))}
          </Form.Label>

          <Button
            className="mt-4 self-start"
            variant="secondary"
            onClick={() => append({ traitType: '', value: '' })}
          >
            Add attribute
          </Button>
          <hr className="w-full bg-stone-800 border-0 h-px my-5" />
          <Button htmlType="submit" className="self-end">
            Next
          </Button>
        </Form>
      </Card>
    </>
  );
}
