interface ServerConfig {
  kratos: string;
}

export default {
  kratos: process.env.KRATOS_ENDPOINT,
} as ServerConfig