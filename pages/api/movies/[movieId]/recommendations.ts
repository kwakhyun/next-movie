import { NextApiHandler } from 'next';

import { Movie } from '../../../../shared/types/moviesTypes';
import { PaginationResponse } from '../../../../shared/types/commonTypes';

import { createHandler } from '../../../../shared/utils/createHandler';
import { FIRST_PAGE, validateId } from '../../../../shared/utils/commonUtils';

import { moviesService } from '../../../../shared/services/moviesService';

const handler: NextApiHandler<PaginationResponse<Movie>> = async (req, res) => {
  const movieId = validateId(req.query.movieId);
  const page = Number(req.query.page) || FIRST_PAGE;
  const movieRecommendations = await moviesService.getMovieRecommendations(
    movieId,
    {
      page,
    },
  );
  res.status(200).json(movieRecommendations);
};

export default createHandler(handler);
