import clsx from 'clsx';

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return <hr className={clsx('w-full text-gray-100', className)} />;
}

function OrDivider({ className }: DividerProps) {
  return (
    <div className={clsx('flex justify-center items-center', className)}>
      <hr className="w-1/2 mr-8 text-subtletext" />
      <span className="text-center text-subtletext text-sm">Or</span>
      <hr className="w-1/2 ml-8 text-subtletext" />
    </div>
  );
}
Divider.Or = OrDivider;
