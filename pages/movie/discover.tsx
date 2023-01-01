import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { dehydrate, useQuery } from '@tanstack/react-query';
import { createQueryClient } from '../../shared/clients/queryClient';

import MoviesListTemplate from '../../components/movie/MoviesListTemplate';
import MovieSortingSelect, {
  getSelectedSorting,
} from '../../components/movie/MovieSortingSelect';

import { moviesAPI } from '../../shared/apis/moviesAPI';
import { apiConfigurationAPI } from '../../shared/apis/apiConfigurationAPI';

function getFilterValues(query: ParsedUrlQuery) {
  const sorting = getSelectedSorting(query.sortBy);
  const genreId = Number(query.genreId) || undefined;
  return { sorting, genreId };
}

function DiscoverMoviesPage() {
  const router = useRouter();

  const { data: genres } = useQuery(moviesAPI.genres());
  const { genreId, sorting } = getFilterValues(router.query);
  const genre = genres?.find((genre) => genre.id === genreId);

  return (
    <MoviesListTemplate
      title={genre ? genre.name : 'Movies'}
      titleExtra={
        <MovieSortingSelect
          value={sorting.id}
          onChange={(sortBy) =>
            router.push({ query: { ...router.query, sortBy } }, undefined, {
              shallow: true,
            })
          }
        />
      }
      description={genre ? genre.name : 'Movies list'}
      apiQuery={moviesAPI.discoverMovies({
        genreId,
        sortBy: sorting.id,
      })}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { genreId, sorting } = getFilterValues(ctx.query);
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchQuery(moviesAPI.genres()),
    queryClient.fetchInfiniteQuery(
      moviesAPI.discoverMovies({
        genreId,
        sortBy: sorting.id,
      }),
    ),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/@tanstack/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default DiscoverMoviesPage;
