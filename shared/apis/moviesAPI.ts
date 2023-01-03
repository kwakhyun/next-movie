import { MovieDetails, Genre, Movie } from '../types/moviesTypes';
import { ID, PaginationResponse } from '../types/commonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '../utils/commonUtils';

import { moviesService } from '../services/moviesService';
import { httpClient } from '../clients/httpClient';

export const moviesAPI = {
  movieDetails: (movieId: ID) => ({
    queryKey: ['movieDetails', movieId],
    queryFn: () =>
      IS_SERVER
        ? moviesService.getMovieDetails(movieId)
        : httpClient.get<MovieDetails>(`/api/movies/${movieId}`),
  }),
  movieRecommendations: (movieId: ID) => ({
    queryKey: ['movieRecommendations', movieId],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getMovieRecommendations(movieId, { page: pageParam })
        : httpClient.get<PaginationResponse<Movie>>(
            `/api/movies/${movieId}/recommendations`,
            {
              page: pageParam,
            },
          ),
    getNextPageParam,
  }),
  discoverMovies: (args: { genreId?: ID; sortBy: string }) => ({
    queryKey: ['discoverMovies', args],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getDiscoverMovies(pageParam, args)
        : httpClient.get<PaginationResponse<Movie>>(`/api/movies/discover`, {
            ...args,
            page: pageParam,
          }),
    getNextPageParam,
  }),
  popularMovies: () => ({
    queryKey: ['popularMovies'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getPopularMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/popular', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  upcomingMovies: () => ({
    queryKey: ['upcomingMovies'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getUpcomingMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/upcoming', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  topRatedMovies: () => ({
    queryKey: ['topRatedMovies'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getTopRatedMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/top-rated', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  genres: () => ({
    queryKey: ['genres'],
    queryFn: () =>
      IS_SERVER
        ? moviesService.getMovieGenres()
        : httpClient.get<Genre[]>('/api/movies/genres'),
  }),
};
