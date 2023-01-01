import { Movie } from '../types/moviesTypes';
import { Person } from '../types/personTypes';
import { PaginationResponse } from '../types/commonTypes';

import { filterViewablePageResults } from '../utils/viewFilters';

import { tmdbClient } from '../clients/tmdbClient';

type SearchInput = { searchQuery?: string; page?: number };

const searchMulti = async ({ searchQuery, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<Movie | Person>>(
    `/search/multi`,
    { query: searchQuery, page },
  );
  return filterViewablePageResults(results);
};

const searchMovies = async ({ searchQuery, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<Movie>>(
    `/search/movie`,
    {
      query: searchQuery,
      page,
    },
  );
  return filterViewablePageResults(results);
};

const searchPeople = async ({ searchQuery, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<Person>>(
    `/search/person`,
    {
      query: searchQuery,
      page,
    },
  );
  return filterViewablePageResults(results);
};

export const searchService = {
  searchMulti,
  searchMovies,
  searchPeople,
};
