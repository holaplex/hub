# Holaplex Hub

Holaplex Hub console

## Getting Started

The Hub development environment runs within a local Kubernetes cluster using [skaffold](https://skaffold.dev/). Skaffold will setup the complete Holaplex API and setup hot reloading for the Hub UI.

### Dependencies

- [Docker for Desktop](https://docs.docker.com/desktop/)
- [Skaffold](https://skaffold.dev/)

There are some secrets required for the API. Reach out to a fellow engineer to to get the secrets files. They should be placed in the root of the project and follow the pattern of secret.{service}.yaml.

```
/src
skaffold.yaml
secrets.router.yaml
```

```bash
skaffold dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Skaffold will expose the UI and API on the following ports:

| Service | Endpoint                                       |
| ------- | ---------------------------------------------- |
| Hub UI  | [http://localhost:3000](http://localhost:3000) |
| Hub API | http://localhost:3001                          |
