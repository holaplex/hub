'use client';
import { useLogin } from './../../hooks/useLogin';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from './../../components/Icon';
import Typography, { Size } from './../../components/Typography';
import Card from './../../components/Card';
import Divider from './../../components/Divider';
import Link from './../../components/Link';
import { useLoginFlow } from '../../hooks/useLoginFlow';

export default function Login() {
  const { loading, flow } = useLoginFlow();
  const { submit, register, handleSubmit, formState } = useLogin(flow);

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Sign in</Typography.Header>
      <Typography.Header size={Size.H3}>Use your email or socials to sign in.</Typography.Header>
      {loading ? (
        <div className="flex flex-col gap-4 mt-3">
          <div>
            <div className="mb-1 w-20 h-4 rounded-md bg-gray-100 animate-pulse" />
            <div className="mb-1 w-full h-10 rounded-md bg-gray-100 animate-pulse" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <div className="w-14 h-4 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-28 h-4 rounded-md bg-gray-100 animate-pulse" />
            </div>
            <div className="mb-1 w-full h-10 rounded-md bg-gray-100 animate-pulse" />
          </div>
          <div className="mt-3 w-full h-[44px] rounded-md bg-gray-100 animate-pulse" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 mt-3">
          <Form.Label name="Email address" className="text-xs">
            <Form.Input
              {...register('email', { required: true })}
              autoFocus
              placeholder="e.g. name@example.com"
              className=""
            />
          </Form.Label>
          <Form.Label
            name="Password"
            className="text-xs"
            asideComponent={<Link href="/recovery">Forgot password?</Link>}
          >
            <Form.Password
              {...register('password', { required: true })}
              placeholder="Enter your password"
              showPasswordIcon={<Icon.ShowPassword />}
              hidePasswordIcon={<Icon.HidePassword />}
            />
          </Form.Label>
          <Button
            border="rounded"
            htmlType="submit"
            className="w-full bg-primary text-white p-2 mt-3"
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
          >
            Sign in
          </Button>
        </Form>
      )}

      <Divider.Or className="my-4" />

      <Link href="/registration" className="mt-4">
        <Button
          icon={<Icon.LightBulb className="mr-1" />}
          border="rounded"
          className="w-full bg-gray-50 py-4"
        >
          <div className="flex items-center text-gray-500 text-sm">
            Dont have an account?
            <span className="flex items-center ml-1 font-medium text-sm text-primary cursor-pointer">
              Create account
              <Icon.ArrowRight className="ml-1" />
            </span>
          </div>
        </Button>
      </Link>
    </Card>
  );
}
