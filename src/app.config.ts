interface ServerConfig {
  kratos: string;
  graphql: string;
  nftStorageToken: string;
  ipfsGateway: string;
}

interface ClientConfig {
  graphql: string;
  fqdn: string;
}

interface AppConfig {
  server: ServerConfig;
  client: ClientConfig;
}

class Config {
  config: AppConfig;

  constructor() {
    this.config = {
      server: {
        graphql: process.env.GRAPHQL_ENDPOINT as string,
        kratos: process.env.KRATOS_ENDPOINT as string,
        nftStorageToken: process.env.NFT_STORAGE_TOKEN as string,
        ipfsGateway: process.env.IPFS_GATEWAY as string,
      },
      client: {
        graphql: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
        fqdn: process.env.NEXT_PUBLIC_APP_FQDN as string,
      },
    };
  }

  server(name: string): string {
    return this.config.server[name as keyof ServerConfig];
  }

  client(name: string): string {
    return this.config.client[name as keyof ClientConfig];
  }
}

export const appConfig = new Config();
