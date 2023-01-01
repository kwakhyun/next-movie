import queryString from 'query-string';

import { httpClient } from './httpClient';

export const tmdbClient = {
  get: async <T>(
    endpoint: string,
    params?: queryString.StringifiableRecord,
  ): Promise<T> => {
    const response = await httpClient.get<T>(
      `${process.env.API_URL}${endpoint}`,
      { ...params, api_key: process.env.API_KEY },
    );
    return response;
  },
};
