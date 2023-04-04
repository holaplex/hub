'use client';
import { useRouter } from 'next/navigation';
import Nft, { NftType } from '../../../../../../../components/Nft';

interface NftsProps {
  children: React.ReactNode;
  project: string;
  customer: string;
}

export default function Nfts({ children, project, customer }: NftsProps) {
  const router = useRouter();

  const loading = false;
  const nfts: NftType[] = [
    {
      address: '1',
      image:
        'https://global-uploads.webflow.com/6241bcd9e666c1514401461d/6381252415e37a8c091e8eda_claynosaurz%20upcomingnftdrop%20nftmintradar.png',
      name: 'Hola Nft #1',
      received: new Date(),
    },
    {
      address: '2',
      image: 'https://pbs.twimg.com/media/FULxDwQXsAQY50h.jpg',
      name: 'Hola Nft #2',
      received: new Date(),
    },
  ];
  const noNfts = nfts.length === 0;

  return (
    <>
      <div className="h-full flex flex-col">
        {loading ? (
          <div>Loading..</div>
        ) : (
          <>
            {noNfts ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center"></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                  <Nft key={nft.address} nft={nft} />
                ))}
              </div>
            )}
            {children}
          </>
        )}
        ;
      </div>
    </>
  );
}
