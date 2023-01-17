# Holaplex Hub

Holaplex Hub console

## Getting Started

The hub development environment runs within a local Kubernetes cluster using [skaffold](https://skaffold.dev/). Skaffold will setup the complete Holaplex API and setup hot reloading for the Hub UI.

### Dependencies
- [Docker for Desktop](https://docs.docker.com/desktop/)
- [Skaffold](https://skaffold.dev/)

```bash
skaffold dev --port-forward
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
