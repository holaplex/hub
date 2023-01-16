import clsx from 'clsx';

interface IProps {
  text: string;
  className?: string;
}

const InputLabel = ({ text, className }: IProps) => {
  return <label className={clsx(className, 'block text-sm')}>{text}</label>;
};

export default InputLabel;
