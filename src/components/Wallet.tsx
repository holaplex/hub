import clsx from 'clsx';
import { AssetType, Wallet as WalletType } from '../graphql.types';
import useClipboard from '../hooks/useClipboard';
import { shorten } from '../modules/wallet';
import { Icon } from './Icon';

interface WalletProps {
  wallet: WalletType;
  className?: string;
}

export default function Wallet({ wallet, className }: WalletProps) {
  console.log('wallet', wallet);
  const { copied, copyText } = useClipboard(wallet.address);
  let currency;
  switch (wallet.assetId) {
    case AssetType.Sol:
    case AssetType.SolTest:
      currency = <Icon.Large.Solana />;
      break;
    case AssetType.Eth:
    case AssetType.EthTest:
      currency = <Icon.Large.Eth />;
      break;
  }
  return (
    <div
      className={clsx(
        'w-[260px] flex flex-col items-center rounded-md bg-white p-6 text-primary',
        className
      )}
    >
      <div className="rounded-full p-5 bg-gray-50 mt-2 flex items-center">{currency}</div>
      <div className="text-xs font-medium text-gray-400 mt-2">{wallet.assetId}</div>
      <div
        className="flex gap-2 text-xs font-medium items-center mt-2 cursor-pointer"
        onClick={copyText}
      >
        <div>{shorten(wallet.address)}</div>
        {copied ? <Icon.Check /> : <Icon.Copy />}
      </div>
      <div className="mt-4 w-full flex items-center justify-between text-xs font-medium">
        {wallet.assetId} <div>0</div>
      </div>
    </div>
  );
}
