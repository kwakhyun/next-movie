import { Box, MenuItem, TextField } from '@mui/material';

import { Maybe } from '../../shared/types/commonTypes';

const MOVIE_SORTING = {
  popularity: {
    id: 'popularity.desc',
    title: '인기순',
  },
  voteCount: {
    id: 'vote_count.desc',
    title: '투표순',
  },
  voteAverage: {
    id: 'vote_average.desc',
    title: '평점순',
  },
  newToOld: {
    id: 'release_date.desc',
    title: '개봉일(최신순)',
  },
  releaseDate: {
    id: 'release_date.asc',
    title: '개봉일(오래된순)',
  },
};

const sortings = Object.values(MOVIE_SORTING);

export function getSelectedSorting(sortBy: Maybe<string | string[]>) {
  const defaultSorting = MOVIE_SORTING.popularity;

  if (typeof sortBy !== 'string') {
    return defaultSorting;
  }

  const selectedSorting =
    sortings.find((sorting) => sorting.id === sortBy) ?? defaultSorting;

  return selectedSorting;
}

interface MovieSortingSelectProps {
  value: string;
  onChange: (value: string) => void;
}

function MovieSortingSelect({ value, onChange }: MovieSortingSelectProps) {
  return (
    <Box sx={{ minWidth: 220 }}>
      <TextField
        label="정렬 기준"
        select
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {sortings.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
}

export default MovieSortingSelect;
