import { Configuration, ConfigurationParameters, FrontendApi } from '@ory/client';

export function ory(config: ConfigurationParameters) {
  return new FrontendApi(new Configuration(config));
}

export const serverConfig: ConfigurationParameters = {
  basePath: process.env.KRATOS_ENDPOINT as string,
  baseOptions: { withCredentials: true },
};
