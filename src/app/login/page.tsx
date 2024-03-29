'use client';
import { useLogin } from './../../hooks/useLogin';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from './../../components/Icon';
import Typography, { Size } from './../../components/Typography';
import Card from './../../components/Card';
import Divider from './../../components/Divider';
import Link from './../../components/Link';
import { useLoginFlow } from '../../hooks/useLoginFlow';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const { loading, flow } = useLoginFlow();
  const search = useSearchParams();
  const loginCredential = useLogin(flow);

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Sign in</Typography.Header>
      <Typography.Header size={Size.H3}>Use your email to sign in.</Typography.Header>
      {loading ? (
        <div className="flex flex-col gap-6 mt-3">
          <div>
            <div className="mb-1 w-20 h-4 rounded-md bg-stone-800 animate-pulse" />
            <div className="mb-1 w-full h-10 rounded-md bg-stone-800 animate-pulse" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <div className="w-14 h-4 rounded-md bg-stone-800 animate-pulse" />
              {/* <div className="w-28 h-4 rounded-md bg-stone-800 animate-pulse" /> */}
            </div>
            <div className="mb-1 w-full h-10 rounded-md bg-stone-800 animate-pulse" />
          </div>
          <div className="mt-3 w-full h-[44px] rounded-md bg-stone-800 animate-pulse" />
        </div>
      ) : (
        <Form
          onSubmit={loginCredential.handleSubmit(loginCredential.submit)}
          className="flex flex-col gap-6 mt-3"
        >
          <Form.Label name="Email address" className="text-xs">
            <Form.Input
              {...loginCredential.register('identifier', { required: true })}
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
              {...loginCredential.register('password', { required: true })}
              placeholder="Enter your password"
              showPasswordIcon={<Icon.ShowPassword stroke="stroke-gray-400" />}
              hidePasswordIcon={<Icon.HidePassword stroke="stroke-gray-400" />}
            />
          </Form.Label>
          <Button
            htmlType="submit"
            className="w-full mt-3"
            loading={loginCredential.formState.isSubmitting}
            disabled={loginCredential.formState.isSubmitting}
          >
            Sign in
          </Button>
        </Form>
      )}

      <span className="flex-wrap text-gray-400 text-xs mt-4">
        By signing in I have read and agreed to Holaplex HUB{' '}
        <Link styled={false} href="/terms-of-service" target="_blank" className="underline">
          Terms
        </Link>{' '}
        and{' '}
        <Link styled={false} href="/privacy-policy" target="_blank" className="underline">
          Privacy Policy
        </Link>
      </span>

      <Divider.Or className="my-4" />

      <Link
        href={`/registration${
          search?.has('return_to') ? `?return_to=${search.get('return_to')}` : ''
        }`}
        styled={false}
      >
        <Button
          icon={<Icon.LightBulb stroke="stroke-gray-400" />}
          block
          variant="secondary"
          className="group"
        >
          <div className="flex items-center my-1">
            <span className="text-gray-400 font-medium">Do not have an account?</span>
            <span className="flex items-center ml-1 font-semibold">
              Create account
              <Icon.ArrowRight
                stroke="stroke-yellow-300"
                className="group-hover:stroke-yellow-500"
              />
            </span>
          </div>
        </Button>
      </Link>
    </Card>
  );
}
