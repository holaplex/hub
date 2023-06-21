import clsx from 'clsx';
import { AssetType, Wallet as WalletType } from '../graphql.types';
import useClipboard from '../hooks/useClipboard';
import { shorten } from '../modules/wallet';
import Card from './Card';
import { Icon } from './Icon';

export default function Wallet() {
  return <div />;
}

interface WalletCardProps {
  wallet: WalletType;
  className?: string;
}

function WalletCard({ wallet, className }: WalletCardProps) {
  const { copied, copyText } = useClipboard(wallet.address as string);

  let icon: React.ReactNode;

  switch (wallet.assetId) {
    case AssetType.Sol:
    case AssetType.SolTest:
      icon = <Icon.Large.Solana />;
      break;

    case AssetType.Matic:
    case AssetType.MaticTest:
      icon = <Icon.Large.PolygonLarge />;
      break;
  }
  return (
    <Card className={clsx('p-6 items-center', className)}>
      <div className="rounded-full p-5 bg-stone-800 mt-2 flex items-center">{icon}</div>
      <div className="text-xs font-medium text-gray-400 mt-2">{wallet.assetId}</div>
      <div
        className="flex gap-2 text-xs font-medium items-center mt-2 cursor-pointer"
        onClick={copyText}
      >
        {wallet.address && <div>{shorten(wallet.address)}</div>}
        {copied ? <Icon.Check /> : <Icon.Copy />}
      </div>
    </Card>
  );
}

Wallet.Card = WalletCard;

function WalletSkeleton() {
  return (
    <Card className="p-6 items-center">
      <div className="rounded-full w-20 aspect-square bg-stone-800 mt-2 animate-pulse" />
      <span className="rounded-full h-4 w-14 bg-stone-800 animate-pulse mt-2" />
      <div className="flex gap-2 mt-2">
        <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
        <span className="rounded-md h-4 w-4 bg-stone-800 animate-pulse" />
      </div>
    </Card>
  );
}
Wallet.Skeleton = WalletSkeleton;
