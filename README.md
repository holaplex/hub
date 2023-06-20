# Holaplex Hub

Holaplex Hub is an enterprise grade cross-chain NFT campaign management solution.

## Getting Started

The Hub development environment runs within a local Kubernetes cluster using [skaffold](https://skaffold.dev/). Skaffold will setup the complete Holaplex API and setup hot reloading for the Hub UI.

### Dependencies

- [Docker](https://docs.docker.com/desktop/) (Can be other container or VM Manager, like QEMU, VirtualBox or Podman)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Skaffold](https://skaffold.dev/)

### Instructions

There are some secrets required for the API. Reach out to a fellow engineer to to get the secrets files. They should be placed in the [.helm](./.helm) directory of the project and follow the pattern of secret.{service}.yaml.

```
/src
skaffold.yaml
/.helm/secrets.*.yaml
```

### Start the Kubernetes cluster

Change memory and CPU assignment

```bash
minikube start --network-plugin=cni --cni=calico --memory 7951 --cpus 6
```

### Deploy

```bash
skaffold dev
```

Open [http://hub.127.0.0.1.nip.io:9080](http://hub.127.0.0.1.nip.io:9080) with your browser to see the result.

Skaffold will expose the UI and API on the following endpoints:

| Service | Endpoint                                                                             |
| ------- | ------------------------------------------------------------------------------------ |
| Hub UI  | [http://hub.127.0.0.1.nip.io:9080](http://hub.127.0.0.1.nip.io:9080)                 |
| Hub API | [http://api.127.0.0.1.nip.io:9080/graphql](http://api.127.0.0.1.nip.io:9080/graphql) |

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
