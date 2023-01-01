import { NextApiHandler } from 'next';

import { Movie } from '../../../shared/types/moviesTypes';
import { Person } from '../../../shared/types/personTypes';
import { PaginationResponse } from '../../../shared/types/commonTypes';

import { queryParser } from '../../../shared/utils/queryParser';
import { createHandler } from '../../../shared/utils/createHandler';

import { searchService } from '../../../shared/services/searchService';

const handler: NextApiHandler<PaginationResponse<Movie | Person>> = async (
  req,
  res,
) => {
  const results = await searchService.searchMulti({
    page: queryParser.number(req.query.page),
    searchQuery: queryParser.string(req.query.searchQuery),
  });
  res.status(200).json(results);
};

export default createHandler(handler);
