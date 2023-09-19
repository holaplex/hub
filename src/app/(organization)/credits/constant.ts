import { Action } from './../../../graphql.types';

export const ACTION_LABEL = {
  [Action.CreateDrop]: 'Create Drop',
  [Action.MintEdition]: 'Mint Edition',
  [Action.Mint]: 'Mint',
  [Action.RetryMint]: 'Retry Mint',
  [Action.TransferAsset]: 'Transfer Asset',
  [Action.CreateWallet]: 'Create Wallet',
  [Action.RetryDrop]: 'Retry Drop',
  [Action.CreateCollection]: 'Create Collection',
  [Action.MintCompressed]: 'Mint Compressed',
  [Action.RetryCollection]: 'Retry Collection',
  [Action.UpdateMint]: 'Update Mint',
  [Action.SwitchCollection]: 'Switch Collection',
};
