import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { apiConfigurationAPI } from '../shared/apis/apiConfigurationAPI';

function useApiConfiguration() {
  const { data: configuration } = useQuery({
    ...apiConfigurationAPI.configuration(),
    staleTime: Infinity,
  });

  const getImageUrl = useCallback(
    (path: string, config?: { quality: 'w500' | 'original' }) => {
      if (!path || !configuration) {
        return '/placeholder.png';
      }

      const { images } = configuration;
      const { secure_base_url } = images;

      return `${secure_base_url}${config?.quality ?? 'w500'}${path}`;
    },
    [configuration],
  );

  return { getImageUrl };
}

export default useApiConfiguration;
