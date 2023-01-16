import clsx from 'clsx';

interface IProps {
  errorMessage?: string;
  className?: string;
}
const InputError = ({ errorMessage, className }: IProps) => {
  return <span className={clsx(className, 'text-red-600 text-sm')}>{errorMessage}</span>;
};

export default InputError;
