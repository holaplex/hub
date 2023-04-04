import clsx from 'clsx';
import { format } from 'date-fns';
import { convertLocalTime, DateFormat } from '../modules/time';

export type NftType = {
  address: string;
  name: string;
  image: string;
  received: Date;
};

interface NftProps {
  nft: NftType;
  className?: string;
}

export default function Nft({ nft, className }: NftProps) {
  return (
    <div
      className={clsx('flex flex-col rounded-md bg-white p-4 text-primary gap-2 w-56', className)}
    >
      <img className="rounded-md w-56 h-56 aspect-square" src={nft.image} />
      <div className="flex flex-col">
        <div className="text-xs text-gray-400">Name</div>
        <div className="text-xs">{nft.name}</div>
      </div>

      <div className="flex flex-col">
        <div className="text-xs text-gray-400">Received</div>
        <div className="text-xs"> {format(convertLocalTime(nft.received), DateFormat.DATE_2)}</div>
      </div>
    </div>
  );
}
