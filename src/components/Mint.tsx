import { format } from 'date-fns';
import { CollectionMint } from '../graphql.types';
import { Icon } from './Icon';
import { Blockchain } from '../graphql.types';
import { convertLocalTime, DateFormat } from '../modules/time';
import Card from './Card';
import Link from 'next/link';

function Mint() {
  return <div />;
}

export default Mint;

interface MintCardProps {
  mint: CollectionMint;
  className?: string;
}

function MintCard({ mint, className }: MintCardProps) {
  const bullets = [
    {
      name: 'Name',
      value: mint?.collection?.metadataJson?.name,
    },
    {
      name: 'Minted on',
      value: format(convertLocalTime(mint.createdAt), DateFormat.DATE_2),
    },
  ];

  let icon: React.ReactNode;

  switch (mint.collection?.blockchain) {
    case Blockchain.Solana:
      icon = <Icon.Crypto.Sol />;
      break;
    case Blockchain.Polygon:
      icon = <Icon.Crypto.Polygon />;
      break;
  }

  return (
    <Card key={mint.id} className={className}>
      <img
        className="rounded-md w-full aspect-square object-cover"
        src={mint?.collection?.metadataJson?.image as string}
        alt={`${mint?.collection?.metadataJson?.name} image`}
      />

      <div className="flex justify-between mt-4">
        <ul className="flex flex-col gap-2">
          {bullets.map((bullet, index) => (
            <li className="flex flex-col gap-1" key={index}>
              <span className="text-gray-400">{bullet.name}</span>
              <span>{bullet.value}</span>
            </li>
          ))}
        </ul>
        <div>{icon}</div>
      </div>
    </Card>
  );
}

Mint.Card = MintCard;

function MintSkeleton() {
  return (
    <Card>
      <div className="w-full aspect-square rounded-md bg-stone-800 animate-pulse" />
      <div className="flex justify-between mt-4">
        <ul className="flex flex-col gap-2">
          {Array.from(Array(2)).map((_, index) => (
            <li className="flex flex-col gap-1" key={index}>
              <span className="rounded-full h-4 w-14 bg-stone-800 animate-pulse" />
              <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
Mint.Skeleton = MintSkeleton;
