import { ActionCost, Action, Blockchain } from '../graphql.types';

export class CreditLookup {
  private costs: ActionCost[];
  private cache: Map<string, number> = new Map();

  constructor(costs: ActionCost[]) {
    this.costs = costs;
  }

  public cost(action: Action, blockchain: Blockchain): number {
    const key = `${action}_${blockchain}`;
    if (this.cache.has(key)) {
      return this.cache.get(key) as number;
    }

    const cost = this.costs
      .find((c) => c.action === action)
      ?.blockchains?.find((segment) => segment.blockchain === blockchain)?.credits;

    if (cost === undefined) {
      throw new Error(`No cost found for action ${action} on blockchain ${blockchain}`);
    }

    this.cache.set(key, cost);
    
    return cost;
  }
}
