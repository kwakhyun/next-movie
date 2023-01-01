import { useQuery } from '@tanstack/react-query';
import lodash from 'lodash';

import BaseGridList from '../common/BaseGridList';
import MovieCard from '../movie/MovieCard';

import { ID } from '../../shared/types/commonTypes';
import { personAPI } from '../../shared/apis/personAPI';
import { MovieCrew, MovieDetails } from '../../shared/types/moviesTypes';

interface PersonCrewGridListProps {
  personId: ID;
}

function PersonCrewGridList({ personId }: PersonCrewGridListProps) {
  const { data, isLoading } = useQuery(personAPI.personDetails(personId));
  const crewList = lodash.uniqBy(
    data?.credits.crew ?? [],
    (crew: MovieDetails) => crew.id,
  );

  return (
    <BaseGridList
      loading={isLoading}
      listEmptyMessage="No crew info has been found."
    >
      {crewList.map((personCrew) => {
        const allJobs = data?.credits.crew
          .filter((crew: { id: number }) => crew.id === personCrew.id)
          .map((crew: MovieCrew) => crew.job);
        return (
          <li key={personCrew.id}>
            <MovieCard movie={personCrew} subheader={allJobs?.join(', ')} />
          </li>
        );
      })}
    </BaseGridList>
  );
}

export default PersonCrewGridList;
