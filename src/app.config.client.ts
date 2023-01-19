interface ClientConfig {
  graphql: string;
}

export default {
  graphql: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
} as ClientConfig