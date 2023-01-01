import { Movie } from '../types/moviesTypes';
import { Person } from '../types/personTypes';
import { PaginationResponse } from '../types/commonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '../utils/commonUtils';

import { searchService } from '../services/searchService';
import { httpClient } from '../clients/httpClient';

export const searchAPI = {
  searchMulti: (searchQuery: string) => ({
    queryKey: ['searchMulti', searchQuery],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? searchService.searchMulti({ searchQuery, page: pageParam })
        : httpClient.get<PaginationResponse<Movie | Person>>(
            `/api/search/multi`,
            {
              searchQuery,
              page: pageParam,
            },
          ),
    getNextPageParam,
  }),
  searchMovies: (searchQuery: string) => ({
    queryKey: ['searchMovies', searchQuery],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? searchService.searchMovies({ searchQuery, page: pageParam })
        : httpClient.get<PaginationResponse<Movie>>(`/api/search/movies`, {
            searchQuery,
            page: pageParam,
          }),
    getNextPageParam,
  }),
  searchPeople: (searchQuery: string) => ({
    queryKey: ['searchPeople', searchQuery],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? searchService.searchPeople({ searchQuery, page: pageParam })
        : httpClient.get<PaginationResponse<Person>>(`/api/search/people`, {
            searchQuery,
            page: pageParam,
          }),
    getNextPageParam,
  }),
};
