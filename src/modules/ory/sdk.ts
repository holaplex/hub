import { Configuration, ConfigurationParameters, FrontendApi } from '@ory/client';
import { config } from '../../app.config';

export function ory(config: ConfigurationParameters) {
  return new FrontendApi(new Configuration(config));
}

export const serverConfig: ConfigurationParameters = {
  basePath: config.server('kratos'),
  baseOptions: { withCredentials: true },
};
