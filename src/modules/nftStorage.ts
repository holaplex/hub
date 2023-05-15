import { NFTStorage } from 'nft.storage';

export const nftStorage = new NFTStorage({
  token: process.env.NFT_STORAGE_TOKEN as string,
});
