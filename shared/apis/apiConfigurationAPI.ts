import { APIConfiguration } from '../types/apiConfigurationTypes';
import { IS_SERVER } from '../utils/commonUtils';

import { apiConfigurationService } from '../services/apiConfigurationService';
import { httpClient } from '../clients/httpClient';

export const apiConfigurationAPI = {
  configuration: () => ({
    queryKey: ['configuration'],
    queryFn: () =>
      IS_SERVER
        ? apiConfigurationService.getApiConfiguration()
        : httpClient.get<APIConfiguration>('/api/api-configuration'),
  }),
};
