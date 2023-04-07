import { format } from 'date-fns';
import { CollectionMint } from '../graphql.types';
import { Icon } from './Icon';
import { Blockchain } from '../graphql.types';
import { convertLocalTime, DateFormat } from '../modules/time';
import Card from './Card';

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
  }

  return (
    <Card key={mint.id} className={className}>
      <img
        className="rounded-md w-full aspect-square object-cover"
        src={mint?.collection?.metadataJson?.image}
        alt={`${mint?.collection?.metadataJson?.name} image`}
      />

      <div className="flex justify-between mt-4">
        <ul className="flex flex-col gap-2">
          {bullets.map((bullet, index) => (
            <li className="flex flex-col gap-1" key={index}>
              <span className="text-gray-500">{bullet.name}</span>
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
