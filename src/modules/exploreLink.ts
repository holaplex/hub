import { Blockchain } from '../graphql.types';

export class ExploreLink {
  private blockchain: Blockchain;

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
  }

  public getAccountLink(address: string): string | null | undefined {
    switch (this.blockchain) {
      case Blockchain.Solana:
        return `https://solscan.io/account/${address}`;
      case Blockchain.Polygon:
        return `https://polygonscan.com/address/${address}`;
      default:
        return null;
    }
  }

  public getTxLink(tx: string): string | null | undefined {
    switch (this.blockchain) {
      case Blockchain.Solana:
        return `https://solscan.io/tx/${tx}`;
      case Blockchain.Polygon:
        return `https://polygonscan.com/tx/${tx}`;
      default:
        return null;
    }
  }
}
