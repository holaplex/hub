import { Blockchain } from '../graphql.types';

export function labelBlockchain(blockchain: Blockchain): string {
  switch (blockchain) {
    case Blockchain.Solana:
      return 'Solana';
    case Blockchain.Polygon:
      return 'Polygon';
    case Blockchain.Ethereum:
      return 'Ethereum';
    default:
      return '';
  }
}
