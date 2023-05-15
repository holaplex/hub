import clsx from 'clsx';

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return <hr className={clsx('w-full text-stone-800', className)} />;
}

function OrDivider({ className }: DividerProps) {
  return (
    <div className={clsx('flex justify-center items-center', className)}>
      <hr className="w-1/2 mr-8 border-stone-800" />
      <span className="text-center text-gray-400 text-sm">Or</span>
      <hr className="w-1/2 ml-8 border-stone-800" />
    </div>
  );
}
Divider.Or = OrDivider;
