import { useInfiniteQuery } from '@tanstack/react-query';

import MovieCard from './MovieCard';
import InfiniteGridList from '../common/InfiniteGridList';

import { ID } from '../../shared/types/commonTypes';
import { getAllPageResults } from '../../shared/utils/commonUtils';
import { moviesAPI } from '../../shared/apis/moviesAPI';

interface RecommendationsProps {
  movieId: ID;
}

function Recommendations({ movieId }: RecommendationsProps) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    moviesAPI.movieRecommendations(movieId),
  );

  return (
    <InfiniteGridList
      loading={isFetching}
      listEmptyMessage="No recommendation has been found."
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
  );
}

export default Recommendations;
