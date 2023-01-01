import { NextApiHandler } from 'next';

import { Genre } from '../../../shared/types/moviesTypes';
import { createHandler } from '../../../shared/utils/createHandler';
import { moviesService } from '../../../shared/services/moviesService';

const handler: NextApiHandler<Genre[]> = async (req, res) => {
  const genres = await moviesService.getMovieGenres();
  res.status(200).json(genres);
};

export default createHandler(handler);
