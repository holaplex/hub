'use client';
import Link from 'next/link';
import DragDropImage from './../../../components/DragDropImage';
import Card from './../../../components/Card';
import Typography, { Size } from './../../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';

export default function CreateOrganization() {
  const handleDrop = (file: File) => {
    console.log(file);
  };
  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Create an organization</Typography.Header>
      <Typography.Header size={Size.H3}>Enter your organization information.</Typography.Header>

      <Form className="flex flex-col mt-5">
        <Form.Label name="Organization name" className="text-xs" />
        <Form.Input placeholder="e.g. Apple" />
        <Form.Error message="" />
        <Button htmlType="submit" className="w-full mt-5">
          Create
        </Button>
        <DragDropImage onDrop={handleDrop} className="mt-5" />
      </Form>
      <span className="flex-wrap text-gray-500 text-xs mt-2">
        By pressing &quot;Create an aсcount&quot;, I agree to Holaplex{' '}
        <Link href="" className="text-primary">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href="" className="text-primary">
          Privacy Policy.
        </Link>
      </span>
    </Card>
  );
}
