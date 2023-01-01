import { Typography, Stack } from '@mui/material';

import PersonInfo from './PersonInfo';
import Introduction from '../intro/Introduction';

import { Person } from '../../shared/types/personTypes';

interface PersonIntroductionProps {
  person: Person;
}

function PersonIntroduction({ person }: PersonIntroductionProps) {
  return (
    <Introduction
      imageSrc={person.profile_path}
      imageAlt={person.name}
      title={person.name}
      content={
        <Stack spacing={2}>
          {person.biography && (
            <div>
              <Typography variant="h6" gutterBottom>
                인물 소개
              </Typography>
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                }}
              >
                {person.biography}
              </Typography>
            </div>
          )}
          <div>
            <Typography variant="h6" gutterBottom>
              인물 정보
            </Typography>
            <PersonInfo person={person} />
          </div>
        </Stack>
      }
    />
  );
}

export default PersonIntroduction;
