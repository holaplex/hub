'use client';

import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import DragDropImage from '../../../../components/DragDropImage';
import { Icon } from '../../../../components/Icon';
import Typography, { Size } from '../../../../components/Typography';

export default function CreateDropStep1() {
  return (
    <>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Drop details</Typography.Header>
        <Form className="flex flex-col mt-5">
          <Form.Label name="Artwork" className="text-xs" asideComponent={<Icon.Help />}>
            <DragDropImage onDrop={() => {}} />
          </Form.Label>

          <Form.Label name="Name" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Input placeholder="e.g. Bored Ape Yatch Club" />
            <Form.Error message="" />
          </Form.Label>
          <Form.Label name="Blockchain" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Input type="range" placeholder="Select blockchain" />
            <Form.Error message="" />
          </Form.Label>
          <Form.Label name="Description" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Input placeholder="Description should have atleast 40 symbols." />
            <Form.Error message="" />
          </Form.Label>
          <hr className="w-full bg-gray-500 my-5" color="#7b7b7b" />
          <Button htmlType="submit" className="self-end">
            Next
          </Button>
        </Form>
      </Card>
    </>
  );
}
