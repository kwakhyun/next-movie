import { NextApiHandler } from 'next';

import { Movie } from '../../../shared/types/moviesTypes';
import { PaginationResponse } from '../../../shared/types/commonTypes';

import { queryParser } from '../../../shared/utils/queryParser';
import { createHandler } from '../../../shared/utils/createHandler';
import { FIRST_PAGE } from '../../../shared/utils/commonUtils';

import { moviesService } from '../../../shared/services/moviesService';

const handler: NextApiHandler<PaginationResponse<Movie>> = async (req, res) => {
  const page = Number(req.query.page) || FIRST_PAGE;
  const movies = await moviesService.getDiscoverMovies(page, {
    genreId: queryParser.number(req.query.genreId),
    sortBy: queryParser.string(req.query.sortBy),
  });
  res.status(200).json(movies);
};

export default createHandler(handler);
