import { Configuration, ConfigurationParameters, FrontendApi } from '@ory/client';
import { appConfig } from '../../app.config';

export function ory(config: ConfigurationParameters) {
  return new FrontendApi(new Configuration(config));
}

export const serverConfig: ConfigurationParameters = {
  basePath: 'http://hub.127.0.0.1.nip.io:9080',
  baseOptions: { withCredentials: true },
};
