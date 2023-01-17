import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import InputError from '../atoms/InputError';
import InputLabel from '../atoms/InputLabel';
import ShowPassword from '../svgs/ShowPassword';

interface IProps {
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

const InputPassword = ({ register, fieldName, placeholder, errorMessage, className }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <InputLabel text="Password" />
        <Link href={'/recovery'}>
          <span className="text-sm text-primary font-semibold">Forgot password?</span>
        </Link>
      </div>
      <div className="relative">
        <input
          {...register(fieldName, { required: true })}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 p-2 pr-10"
        />
        <div
          className="p-2 bg-gray-50 rounded-md absolute right-1 top-[50%] translate-y-[-50%]"
          onClick={() => setShowPassword(!showPassword)}
        >
          <ShowPassword show={showPassword} />
        </div>
      </div>
      <InputError errorMessage={errorMessage} />
    </div>
  );
};

export default InputPassword;
