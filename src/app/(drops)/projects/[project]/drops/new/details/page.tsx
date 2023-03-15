'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
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
  const { handleSubmit, register, control, setValue } = useForm<StepOneData>({
    defaultValues: stepOne || {},
  });
  const submit = (data: StepOneData) => {
    setData({ step: 1, data });
    router.push(`/projects/${project?.id}/drops/create/royalties`);
  };

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Drop details</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label name="Artwork" className="text-xs text-primary mt-5" asideComponent={<Icon.Help />}>
            <Controller
              name="image"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Dropzone
                  noClick
                  multiple={false}
                  onDrop={([file], _reject, e) => {
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
                        <input {...getInputProps({ onBlur, onChange })} />
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
          </Form.Label>

          <div className="flex items-center gap-4">
            <Form.Label
              name="Name"
              className="text-xs mt-5 basis-3/4"
              asideComponent={<Icon.Help />}
            >
              <Form.Input
                {...register('name', { required: true })}
                autoFocus
                placeholder="e.g. Bored Ape Yatch Club"
              />
              <Form.Error message="" />
            </Form.Label>
            <Form.Label
              name="Symbol"
              className="text-xs mt-5 basis-1/4"
              asideComponent={<Icon.Help />}
            >
              <Form.Input {...register('symbol', { required: true })} placeholder="e.g. BAYC" />
              <Form.Error message="" />
            </Form.Label>
          </div>

          <Form.Label name="Blockchain" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Controller
              name="blockchain"
              control={control}
              render={({ field: { value, onChange } }) => {
                const options = [
                  { label: 'Solana', id: Blockchain.Solana },
                  { label: 'Polygon (Coming Soon)', id: Blockchain.Polygon },
                ];
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
                  </Form.Select>
                );
              }}
            />
          </Form.Label>
          <Form.Label name="Description" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Input
              {...register('description', { required: true })}
              placeholder="Description should have atleast 40 symbols."
            />
            <Form.Error message="" />
          </Form.Label>
          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />
          <Button htmlType="submit" className="self-end">
            Next
          </Button>
        </Form>
      </Card>
    </>
  );
}
