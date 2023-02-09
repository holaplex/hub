# Holaplex Hub

Holaplex Hub is an enterprise grade cross-chain NFT campaign management solution.

## Getting Started

The Hub development environment runs within a local Kubernetes cluster using [skaffold](https://skaffold.dev/). Skaffold will setup the complete Holaplex API and setup hot reloading for the Hub UI.

### Dependencies

- [Docker for Desktop](https://docs.docker.com/desktop/)
- [Skaffold](https://skaffold.dev/)

### Instructions

There are some secrets required for the API. Reach out to a fellow engineer to to get the secrets files. They should be placed in the root of the project and follow the pattern of secret.{service}.yaml.

```
/src
skaffold.yaml
secrets.router.yaml
secrets.gateway.yaml
secrets.orgs.yaml
```

### Deploy

```bash
skaffold dev
```

Open [http://hub.127.0.0.1.nip.io:9080](http://hub.127.0.0.1.nip.io:9080) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Skaffold will expose the UI and API on the following endpoints:

| Service | Endpoint                                                                             |
| ------- | ------------------------------------------------------------------------------------ |
| Hub UI  | [http://hub.127.0.0.1.nip.io:9080](http://hub.127.0.0.1.nip.io:9080)                 |
| Hub API | [http://api.127.0.0.1.nip.io:9080](http://api.127.0.0.1.nip.io:9080) |

To use the Hub API endpoint, you need to provide either a header or cookie named `hub_session` with Kratos session token (provided after authenticating)

### GraphQL Codegen

Run graphql codegen whenever a new query or version of the schema is available.

```
npm run codegen
```

## Environment

| Name                         | Description                       |
| ---------------------------- | --------------------------------- |
| NEXT_PUBLIC_GRAPHQL_ENDPOINT | Holaplex Hub graphql API endpoint |
| KRATOS_ENDPOINT              | Ory Kratos public API endpoint    |
