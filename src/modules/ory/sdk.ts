import { Configuration, ConfigurationParameters, FrontendApi } from '@ory/client';
import { appConfig } from '../../app.config';

export function ory(config: ConfigurationParameters) {
  return new FrontendApi(new Configuration(config));
}

export const serverConfig: ConfigurationParameters = {
  basePath: appConfig.server('kratos'),
  baseOptions: { withCredentials: true },
};
