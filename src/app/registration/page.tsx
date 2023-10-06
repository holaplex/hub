'use client';
import { useRegister } from '../../hooks/useRegister';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from '../../components/Icon';
import Typography, { Size } from '../../components/Typography';
import Card from '../../components/Card';
import Divider from '../../components/Divider';
import { useRegistrationFlow } from './../../hooks/useRegistrationFlow';
import Link from 'next/link';

export default function Registration() {
  const { loading, flow } = useRegistrationFlow();
  const { submit, handleSubmit, register, formState, control, setValue } = useRegister(flow);

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Create an account</Typography.Header>
      <Typography.Header size={Size.H3}>Sign up using your email address.</Typography.Header>
      {loading ? (
        <div className="flex flex-col gap-6 mt-3">
          <div>
            <div className="mb-1 w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
            <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
          </div>
          <div>
            <div className="mb-1 w-20 h-4 rounded-md bg-stone-950 animate-pulse" />
            <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <div className="w-14 h-4 rounded-md bg-stone-950 animate-pulse" />
            </div>
            <div className="mb-1 w-full h-10 rounded-md bg-stone-950 animate-pulse" />
          </div>
          <div className="mt-3 w-full h-[44px] rounded-md bg-stone-950 animate-pulse" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 mt-3">
          <Form.Label name="First name" className="text-xs">
            <Form.Input
              {...register('name.first', { required: true })}
              autoFocus
              placeholder="e.g. John"
              className=""
            />
            <Form.Error message={formState.errors.name?.first?.message} />
          </Form.Label>
          <Form.Label name="Last name" className="text-xs">
            <Form.Input
              {...register('name.last', { required: true })}
              placeholder="e.g. Doe"
              className=""
            />
            <Form.Error message={formState.errors.name?.last?.message} />
          </Form.Label>
          <Form.Label name="Email address" className="text-xs">
            <Form.Input
              {...register('email', { required: true })}
              placeholder="e.g. name@example.com"
              className=""
            />
            <Form.Error message={formState.errors.email?.message} />
          </Form.Label>
          <Form.Label name="Password" className="text-xs">
            <Form.Password
              {...register('password', { required: true })}
              placeholder="Create your password"
              showPasswordIcon={<Icon.ShowPassword />}
              hidePasswordIcon={<Icon.HidePassword />}
            />
            <Form.Error message={formState.errors.password?.message} />
          </Form.Label>
          <Button
            htmlType="submit"
            className="w-full"
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
          >
            Register
          </Button>
        </Form>
      )}

      <span className="flex-wrap text-gray-400 text-xs mt-4">
        By signing up I have read and agreed to Holaplex HUB{' '}
        <Link href="/terms-of-service" target="_blank" className="underline">
          Terms
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" target="_blank" className="underline">
          Privacy Policy
        </Link>
      </span>

      <Divider.Or className="my-4" />

      <Link href="/login">
        <Button
          icon={<Icon.LightBulb stroke="stroke-gray-400" />}
          block
          variant="secondary"
          className="group"
        >
          <div className="flex items-center my-1">
            <span className="text-gray-400 font-medium">Already have an account?</span>
            <span className="flex items-center ml-1 font-semibold justify-center">
              Sign in
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
