import { FieldValues, UseFormRegister } from 'react-hook-form';
import InputError from '../atoms/InputError';
import InputLabel from '../atoms/InputLabel';

interface IProps {
  label: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  errorMessage?: string;
  className?: string;
}

const InputText = ({
  label,
  placeholder,
  register,
  fieldName,
  errorMessage,
  className,
}: IProps) => {
  return (
    <div className={className}>
      <InputLabel text={label} />
      <input
        {...register(fieldName, { required: true })}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2"
      />
      <InputError errorMessage={errorMessage} />
    </div>
  );
};

export default InputText;
