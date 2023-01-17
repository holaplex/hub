import type { NextPage } from 'next';
import Head from 'next/head';
import { useLogin } from '../../hooks/useLogin';
import InputText from '../../components/elements/InputText';
import SubmitButton from '../../components/elements/SubmitButton';
import InputBoxHeader from '../../components/elements/InputBoxHeader';
import Link from 'next/link';
import DragDropImage from '../../components/elements/DragDropImage';

const CreateOrganization: NextPage = () => {
  const { flow, submit, register, handleSubmit, formState } = useLogin();
  const handleDrop = (file: File) => {
    console.log(file);
  };
  return (
    <>
      <Head>
        <title>Create organization</title>
        <meta name="description" content="Hub - Sign in" />
      </Head>
      <div className="flex flex-col h-screen items-center mt-10">
        <div className="text-2xl font-bold text-primary">Holaplex</div>
        <div className="w-[400px] h-[460px] rounded-md bg-white border border-gray-100 mt-14 p-8">
          <InputBoxHeader
            heading="Create an organization"
            subHeading="Enter your organization information."
            className="mb-5"
          />
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            {/* <InputError errorMessage={flow?.ui.messages && flow.ui.messages[0]?.text} /> */}
            <InputText
              label="Organization name"
              placeholder="e.g Apple"
              register={register}
              fieldName="identifier"
              errorMessage={formState.errors.identifier?.message}
              className=""
            />
            <DragDropImage onDrop={handleDrop} className="mt-5" />
            <SubmitButton label="Complete" className="mt-5" />
          </form>
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
        </div>
      </div>
    </>
  );
};

export default CreateOrganization;
