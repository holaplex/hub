import { Button } from '@holaplex/ui-library-react';
import clsx from 'clsx';

interface IProps {
  label: string;
  className?: string;
}
export const SubmitButton = ({ label, className }: IProps) => {
  return (
    <Button
      border="rounded"
      htmlType="submit"
      className={clsx(className, 'w-full bg-black text-white p-2')}
    >
      {label}
    </Button>
  );
};
