import { NextApiHandler } from 'next';

import { Movie } from '../../../shared/types/moviesTypes';
import { PaginationResponse } from '../../../shared/types/commonTypes';

import { createHandler } from '../../../shared/utils/createHandler';
import { FIRST_PAGE } from '../../../shared/utils/commonUtils';

import { moviesService } from '../../../shared/services/moviesService';

const handler: NextApiHandler<PaginationResponse<Movie>> = async (req, res) => {
  const page = Number(req.query.page) || FIRST_PAGE;
  const movies = await moviesService.getUpcomingMovies(page);
  res.status(200).json(movies);
};

export default createHandler(handler);
