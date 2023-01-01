import { NextApiHandler } from 'next';

import { MovieDetails } from '../../../../shared/types/moviesTypes';

import { createHandler } from '../../../../shared/utils/createHandler';
import { validateId } from '../../../../shared/utils/commonUtils';

import { moviesService } from '../../../../shared/services/moviesService';

const handler: NextApiHandler<MovieDetails> = async (req, res) => {
  const movieId = validateId(req.query.movieId);
  const movieDetails = await moviesService.getMovieDetails(movieId);
  res.status(200).json(movieDetails);
};

export default createHandler(handler);
