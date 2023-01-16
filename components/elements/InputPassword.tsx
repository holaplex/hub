import clsx from 'clsx';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import InputError from '../atoms/InputError';

interface IProps {
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  errorMessage?: string;
  className?: string;
}

const InputPassword = ({ register, fieldName, errorMessage, className }: IProps) => {
  return (
    <div className={className}>
      <label className={clsx(className, 'block text-sm')}>Password</label>
      <input
        {...register(fieldName, { required: true })}
        type="password"
        placeholder="Enter your password"
        className="w-full rounded-md border border-gray-300 p-2"
      />
      <InputError errorMessage={errorMessage} />
    </div>
  );
};

export default InputPassword;
