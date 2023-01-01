import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import MovieCard from './MovieCard';
import BaseSeo from '../seo/BaseSeo';
import PageTitle from '../common/PageTitle';
import InfiniteGridList from '../common/InfiniteGridList';

import { Movie } from '../../shared/types/moviesTypes';
import { PaginationResponse } from '../../shared/types/commonTypes';
import { getAllPageResults } from '../../shared/utils/commonUtils';

interface MoviesListTemplateProps {
  title: string;
  titleExtra?: React.ReactNode;
  description: string;
  apiQuery: UseInfiniteQueryOptions<PaginationResponse<Movie>>;
}

function MoviesListTemplate({
  title,
  titleExtra,
  description,
  apiQuery,
}: MoviesListTemplateProps) {
  const { data, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery<PaginationResponse<Movie>>(apiQuery);

  return (
    <>
      <BaseSeo title={title} description={description} />
      <PageTitle title={title} extra={titleExtra} />
      <InfiniteGridList
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
      >
        {getAllPageResults(data).map((movie) => {
          return (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          );
        })}
      </InfiniteGridList>
    </>
  );
}

export default MoviesListTemplate;
