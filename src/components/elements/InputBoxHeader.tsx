import clsx from 'clsx';

interface IProps {
  heading: string;
  subHeading?: string;
  className?: string;
}

const InputBoxHeader = ({ heading, subHeading, className }: IProps) => {
  return (
    <div className={clsx(className, 'flex flex-col gap-2')}>
      <div className="font-semibold text-xl text-primary">{heading}</div>
      <div className="text-sm text-gray-600">{subHeading}</div>
    </div>
  );
};

export default InputBoxHeader;
