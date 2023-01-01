import { useQuery } from '@tanstack/react-query';

import BaseGridList from '../common/BaseGridList';
import MovieCard from '../movie/MovieCard';

import { ID } from '../../shared/types/commonTypes';
import { personAPI } from '../../shared/apis/personAPI';
import { Movie } from '../../shared/types/moviesTypes';

interface PersonCastingGridListProps {
  personId: ID;
}

function PersonCastingGridList({ personId }: PersonCastingGridListProps) {
  const { data, isLoading } = useQuery(personAPI.personDetails(personId));
  const castings = data?.credits.cast ?? [];

  return (
    <BaseGridList
      loading={isLoading}
      listEmptyMessage="No casting has been found."
    >
      {castings.map((casting: Movie) => {
        return (
          <li key={casting.id}>
            <MovieCard movie={casting} subheader={casting.character} />
          </li>
        );
      })}
    </BaseGridList>
  );
}

export default PersonCastingGridList;
