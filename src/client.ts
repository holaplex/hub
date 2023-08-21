import { ApolloClient, InMemoryCache, NormalizedCacheObject, Reference } from '@apollo/client';
import { ReadFieldFunction, ToReferenceFunction } from '@apollo/client/cache/core/types/common';
import typeDefs from './../local.graphql';
import { Blockchain, Collection } from './graphql.types';
import { shorten } from './modules/wallet';

function asShortAddress(field: string) {
  return function (obj: any, { readField }: { readField: ReadFieldFunction }): string | null {
    const address: string | undefined = readField(field);

    if (!address) {
      return null;
    }

    return shorten(address as string);
  };
}

function asShortCollectionAddress(
  _: any,
  { readField }: { readField: ReadFieldFunction }
): string | null {
  const address: string | undefined = readField('address');
  const blockchain: Blockchain | undefined = readField('blockchain');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return shorten(address as string);
    case Blockchain.Polygon:
      const [contractAddress, tokenId] = address.split(':');
      return `${shorten(contractAddress as string)}:${tokenId}`;
    default:
      return null;
  }
}

function asShortSignature(field: string = 'signature') {
  return function (_: any, { readField }: { readField: ReadFieldFunction }): string | null {
    const signature: string | undefined = readField(field);

    if (signature) {
      return shorten(signature as string);
    }

    return null;
  };
}

function asEditableCollectionMint(
  _: any,
  { readField }: { readField: ReadFieldFunction }
): boolean | null {
  const compressed: boolean | undefined = readField('compressed');
  const edition: number | undefined = readField('edition');

  return !compressed && edition === -1;
}

function asRoyalties(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const sellerFeeBasisPoints: number | undefined = readField('sellerFeeBasisPoints');

  return `${(sellerFeeBasisPoints as number) / 100}%`;
}

function asHolderExplorerLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const collectionIdentifier = cache.identify({
    __typename: 'Collection',
    id: readField('collectionId'),
  }) as string;
  const collectionRef = toReference(collectionIdentifier);
  const blockchain = readField('blockchain', collectionRef);

  const address: string | undefined = readField('address');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/address/${address}`;
    default:
      return null;
  }
}

function asOwnerExplorerLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const collectionIdentifier = cache.identify({
    __typename: 'Collection',
    id: readField('collectionId'),
  }) as string;
  const collectionRef = toReference(collectionIdentifier);
  const blockchain = readField('blockchain', collectionRef);

  const address: string | undefined = readField('owner');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/address/${address}`;
    default:
      return null;
  }
}

function asAddressExplorerLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const collectionIdentifier = cache.identify({
    __typename: 'Collection',
    id: readField('collectionId'),
  }) as string;
  const collectionRef = toReference(collectionIdentifier);
  const blockchain = readField('blockchain', collectionRef);

  const address: string | undefined = readField('address');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/address/${address}`;
    default:
      return null;
  }
}

function asCollectionExplorerLink(
  _: any,
  { readField }: { readField: ReadFieldFunction }
): string | null {
  const address: string | undefined = readField('address');
  const blockchain = readField('blockchain');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      const [contractAddress, tokenId] = address.split(':');

      return `https://polygonscan.com/token/${contractAddress}?a=${tokenId}`;
    default:
      return null;
  }
}

function asCollectionTransactionLink(
  _: any,
  { readField }: { readField: ReadFieldFunction }
): string | null {
  const blockchain = readField('blockchain');
  const tx: string | undefined = readField('signature');

  if (!tx) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/tx/${tx}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/tx/${tx}`;
    default:
      return null;
  }
}

function asPurchaseTransactionLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const collectionRef = toReference(
    cache.identify({ __typename: 'Collection', id: readField('collectionId') }) as string
  );
  const blockchain = readField('blockchain', collectionRef);

  const tx: string | undefined = readField('txSignature');

  if (!tx) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/tx/${tx}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/tx/${tx}`;
    default:
      return null;
  }
}

function asMintChildTransactionLink(mintField: string, signatureField: string) {
  return function (
    _: any,
    {
      readField,
      cache,
      toReference,
    }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
  ): string | null {
    const mintRef = toReference(
      cache.identify({ __typename: 'CollectionMint', id: readField(mintField) }) as string
    );
    const collectionId = readField('collectionId', mintRef);
    const collectionRef = toReference(
      cache.identify({ __typename: 'Collection', id: collectionId }) as string
    );
    const blockchain = readField('blockchain', collectionRef);

    const tx: string | undefined = readField(signatureField);

    if (!tx) {
      return null;
    }

    switch (blockchain) {
      case Blockchain.Solana:
        return `https://solscan.io/tx/${tx}`;
      case Blockchain.Polygon:
        return `https://polygonscan.com/tx/${tx}`;
      default:
        return null;
    }
  };
}

function asMintTransactionLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const collectionRef = toReference(
    cache.identify({ __typename: 'Collection', id: readField('collectionId') }) as string
  );
  const blockchain = readField('blockchain', collectionRef);

  const tx: string | undefined = readField('signature');

  if (!tx) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/tx/${tx}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/tx/${tx}`;
    default:
      return null;
  }
}

export function apollo(uri: string, session?: string): ApolloClient<NormalizedCacheObject> {
  let headers: Record<string, string> = {};

  if (session) {
    headers['Cookie'] = `hub_session=${session}`;
  }

  return new ApolloClient({
    uri,
    cache: new InMemoryCache({
      typePolicies: {
        MetadataJson: {
          keyFields: ['id'],
        },
        Wallet: {
          fields: {
            shortAddress: asShortAddress('address'),
          },
        },
        Collection: {
          fields: {
            royalties: asRoyalties,
            shortAddress: asShortCollectionAddress,
            exploreLink: asCollectionExplorerLink,
            transactionLink: asCollectionTransactionLink,
            shortTx: asShortSignature,
          },
        },
        CollectionCreator: {
          fields: {
            shortAddress: asShortAddress('address'),
          },
        },
        MintCreator: {
          fields: {
            shortAddress: asShortAddress('address'),
          },
        },
        Holder: {
          fields: {
            shortAddress: asShortAddress('address'),
            exploreLink: asHolderExplorerLink,
          },
        },
        MintHistory: {
          fields: {
            shortWallet: asShortAddress('wallet'),
            shortTx: asShortSignature(),
            transactionLink: asPurchaseTransactionLink,
          },
        },
        CollectionMint: {
          fields: {
            ownerShortAddress: asShortAddress('owner'),
            shortAddress: asShortAddress('address'),
            transactionLink: asMintTransactionLink,
            exploreLink: asAddressExplorerLink,
            royalties: asRoyalties,
            shortTx: asShortSignature(),
            ownerExplorerLink: asOwnerExplorerLink,
            editable: asEditableCollectionMint,
          },
        },
        NftTransfer: {
          fields: {
            shortSender: asShortAddress('sender'),
            shortRecipient: asShortAddress('recipient'),
            shortTx: asShortSignature('txSignature'),
            transactionLink: asMintChildTransactionLink('collectionMintId', 'txSignature'),
          },
        },
        UpdateHistory: {
          fields: {
            shortTx: asShortSignature('txnSignature'),
            transactionLink: asMintChildTransactionLink('mintId', 'txnSignature'),
          },
        },
      },
    }),
    credentials: 'include',
    headers,
    typeDefs,
  });
}
