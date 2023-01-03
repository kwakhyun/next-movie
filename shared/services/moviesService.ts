import queryString from 'query-string';

import { MovieDetails, Genre, Movie } from '../types/moviesTypes';
import { ID, PaginationResponse } from '../types/commonTypes';

import {
  filterViewablePageResults,
  filterViewablePeople,
  shouldViewMovie,
  VIEW_FILTER_LIMIT,
} from '../utils/viewFilters';

import { CustomError } from '../errors/customError';
import { tmdbClient } from '../clients/tmdbClient';

const getMovie = async <T extends Movie>(
  movieId: ID,
  args: {
    appendToResponse?: string[];
    params?: queryString.StringifiableRecord;
  },
) => {
  const movie = await tmdbClient.get<T>(`/movie/${movieId}`, {
    ...args.params,
    append_to_response: args.appendToResponse?.join(),
  });
  if (!shouldViewMovie(movie)) {
    throw new CustomError(404, '요청하신 리소스를 찾을 수 없습니다.');
  }
  return movie;
};

const getMovieGenres = async () => {
  const { genres } = await tmdbClient.get<{ genres: Genre[] }>(
    '/genre/movie/list',
  );
  return genres;
};

const getDiscoverMovies = async (
  page: number,
  params: { genreId?: ID; sortBy?: string },
) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/discover/movie',
    {
      with_genres: params.genreId,
      sort_by: params.sortBy,
      page,
      'vote_count.gte': VIEW_FILTER_LIMIT.minVoteCount,
    },
  );

  return filterViewablePageResults(movies);
};

const getPopularMovies = async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/movie/popular',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
};

const getUpcomingMovies = async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/movie/upcoming',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
};

const getTopRatedMovies = async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/movie/top_rated',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
};

const getMovieDetails = async (movieId: ID): Promise<MovieDetails> => {
  const movie = await getMovie<MovieDetails>(movieId, {
    appendToResponse: ['images,videos,credits'],
  });

  movie.credits.cast = filterViewablePeople(movie.credits.cast);
  movie.credits.crew = filterViewablePeople(movie.credits.crew);

  return movie;
};

const getMovieRecommendations = async (
  movieId: ID,
  params: { page: number },
) => {
  const movie = await getMovie<
    Movie & { recommendations: PaginationResponse<Movie> }
  >(movieId, {
    appendToResponse: ['recommendations'],
    params,
  });

  return filterViewablePageResults(movie.recommendations);
};

export const moviesService = {
  getMovie,
  getMovieGenres,
  getDiscoverMovies,
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieDetails,
  getMovieRecommendations,
};
