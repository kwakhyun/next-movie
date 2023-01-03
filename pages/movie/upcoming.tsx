import { GetServerSideProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '../../shared/clients/queryClient';

import MoviesListTemplate from '../../components/movie/MoviesListTemplate';

import { moviesAPI } from '../../shared/apis/moviesAPI';
import { apiConfigurationAPI } from '../../shared/apis/apiConfigurationAPI';

function UpcomingMoviesPage() {
  return (
    <MoviesListTemplate
      title="개봉 예정 영화"
      description="개봉 예정 영화 목록입니다."
      apiQuery={moviesAPI.upcomingMovies()}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchInfiniteQuery(moviesAPI.upcomingMovies()),
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

export default UpcomingMoviesPage;
