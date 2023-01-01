import { NextApiHandler } from 'next';

import { APIConfiguration } from '../../../shared/types/apiConfigurationTypes';
import { createHandler } from '../../../shared/utils/createHandler';
import { apiConfigurationService } from '../../../shared/services/apiConfigurationService';

const handler: NextApiHandler<APIConfiguration> = async (req, res) => {
  const apiConfiguration = await apiConfigurationService.getApiConfiguration();
  res.status(200).json(apiConfiguration);
};

export default createHandler(handler);
