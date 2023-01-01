import { APIConfiguration } from '../types/apiConfigurationTypes';
import { tmdbClient } from '../clients/tmdbClient';

const getApiConfiguration = async () => {
  const apiConfiguration = await tmdbClient.get<APIConfiguration>(
    '/configuration',
  );
  return apiConfiguration;
};

export const apiConfigurationService = {
  getApiConfiguration,
};
