import { Configuration, ConfigurationParameters, FrontendApi } from '@ory/kratos-client';

export function ory(config: ConfigurationParameters) {
  return new FrontendApi(new Configuration(config));
}

export const serverConfig: ConfigurationParameters = {
  basePath: process.env.KRATOS_ENDPOINT as string,
  baseOptions: { withCredentials: true },
};
