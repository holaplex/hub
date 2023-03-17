'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import Card from '../../../../../../../components/Card';
import { Icon } from '../../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../../components/Typography';
import { Blockchain } from '../../../../../../../graphql.types';
import { useProject } from '../../../../../../../hooks/useProject';
import Divider from '../../../../../../../components/Divider';
import clsx from 'clsx';
import useCreateDropStore, { StepOneData } from '../../../../../../../hooks/useCreateDropStore';

export default function NewDropDetailsPage() {
  const router = useRouter();
  const { project } = useProject();
  const { stepOne, setData } = useCreateDropStore();
  const { handleSubmit, register, control, setValue, formState } = useForm<StepOneData>({
    defaultValues: stepOne || {},
  });
  const submit = (data: StepOneData) => {
    setData({ step: 1, data });
    router.push(`/projects/${project?.id}/drops/new/royalties`);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const options = [{ label: 'Solana', id: Blockchain.Solana }];

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Drop details</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label name="Artwork" className="text-xs text-primary mt-5">
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
                    setValue('image', file as unknown as File, { shouldValidate: true });
                  }}
                >
                  {({ getRootProps, getInputProps, isDragActive, open }) => {
                    return (
                      <div
                        {...getRootProps()}
                        className={clsx(
                          'flex items-center justify-center border border-dashed border-gray-200 cursor-pointer rounded-md',
                          {
                            'bg-gray-100': isDragActive,
                            'p-6 text-center text-gray-500': !value,
                          }
                        )}
                      >
                        <input {...getInputProps({ onBlur })} />
                        {value ? (
                          <div className="bg-white rounded-lg p-3 overflow-hidden">
                            <Form.DragDrop.Preview file={value} />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <p>
                              Drag & drop photo here <br />
                              Required jpeg, png or svg. Max 2mb.
                            </p>
                            <Divider.Or />
                            <Button onClick={open} variant="secondary" size="small">
                              Upload Logo
                            </Button>
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

          <div className="flex items-center gap-4">
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
                      {value?.label}
                    </Form.Select.Button>
                    <Form.Select.Options>
                      {options.map((i) => (
                        <Form.Select.Option value={i} key={i.id}>
                          <>{i.label}</>
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
          <Form.Label name="Attribute" className="text-xs mt-5">
            {fields.map((field, index) => (
              <div className="flex gap-4" key={field.id}>
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
                  className="rounded-md border border-gray-100 bg-gray-50 p-3 self-end cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <Icon.Close />
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
          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />
          <Button htmlType="submit" className="self-end">
            Next
          </Button>
        </Form>
      </Card>
    </>
  );
}
