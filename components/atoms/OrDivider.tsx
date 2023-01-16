import clsx from 'clsx';

interface IProps {
  className?: string;
}
export const OrDivider = ({ className }: IProps) => {
  return (
    <div className={clsx(className, 'flex justify-center items-center')}>
      <hr className="w-1/2 mr-8" />
      <span className="text-center text-gray-600 text-sm">Or</span>
      <hr className="w-1/2 ml-8" />
    </div>
  );
};
