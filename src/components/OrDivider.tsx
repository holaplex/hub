import clsx from 'clsx';

interface IProps {
  className?: string;
}
const OrDivider = ({ className }: IProps) => {
  return (
    <div className={clsx('flex justify-center items-center', className)}>
      <hr className="w-1/2 mr-8 text-gray-100" />
      <span className="text-center text-gray-500 text-sm">Or</span>
      <hr className="w-1/2 ml-8 text-gray-100" />
    </div>
  );
};

export default OrDivider;
