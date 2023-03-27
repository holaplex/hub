import { NFTStorage } from 'nft.storage';
import { appConfig } from '../app.config';

export const nftStorage = new NFTStorage({
  token: appConfig.server('nftStorageToken'),
});
