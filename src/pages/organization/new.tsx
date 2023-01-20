import Link from 'next/link';
import DragDropImage from '../../components/DragDropImage';
import Card from '../../components/Card';
import Typography, { Size } from '../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';
import { ReactElement } from 'react';
import Splash from '../../layouts/Splash';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Hub: Create organization',
      description: '',
    },
  };
}

export default function CreateOrganization() {
  const handleDrop = (file: File) => {
    console.log(file);
  };
  return (
    <Card>
      <Typography.Header size={Size.ExtraLarge}>Create an organization</Typography.Header>
      <Typography.Header size={Size.Small}>Enter your organization information.</Typography.Header>

      <Form className="flex flex-col mt-5">
        <Form.Label name="Organization name" className="text-xs" />
        <Form.Input placeholder="e.g. Apple" />
        <Form.Error message="" />

        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-primary text-white p-2 mt-5"
        >
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

interface SplashProps {
  title: string;
  description: string;
  children: ReactElement;
}

CreateOrganization.getLayout = function SplashLayout({
  title,
  description,
  children,
}: SplashProps): JSX.Element {
  return (
    <Splash title={title} description={description}>
      {children}
    </Splash>
  );
};
