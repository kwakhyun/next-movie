import { Stack, Typography } from '@mui/material';

import PersonIntroduction from './PersonIntroduction';
import PersonImageCarousel from './PersonImageCarousel';
import PersonCrewGridList from './PersonCrewGridList';

import PersonCastingGridList from '../person/PersonCastingGridList';
import LoadingIndicator from '../common/LoadingIndicator';
import FullSizeBackgroundImage from '../common/FullSizeBackgroundImage';

import useApiConfiguration from '../../hooks/useApiConfiguration';

import { Maybe } from '../../shared/types/commonTypes';
import { Person } from '../../shared/types/personTypes';

interface PersonProfileProps {
  person: Maybe<Person>;
  loading: boolean;
}

function PersonProfile({ person, loading }: PersonProfileProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <LoadingIndicator loading={loading}>
      {person && (
        <>
          <FullSizeBackgroundImage
            src={getImageUrl(person.profile_path, { quality: 'original' })}
            alt={person.name}
          />
          <Stack spacing={2}>
            <PersonIntroduction person={person} />
            <div>
              <Typography variant="h6" gutterBottom>
                Images
              </Typography>
              <PersonImageCarousel person={person} />
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                Castings
              </Typography>
              <PersonCastingGridList personId={person.id} />
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                Crew
              </Typography>
              <PersonCrewGridList personId={person.id} />
            </div>
          </Stack>
        </>
      )}
    </LoadingIndicator>
  );
}

export default PersonProfile;
