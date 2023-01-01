import { Chip } from '@mui/material';

import NextLink from '../link/NextLink';

import { Genre } from '../../shared/types/moviesTypes';

interface MovieGenreChipProps {
  className?: string;
  genre: Genre;
}

function MovieGenreChip({ className, genre }: MovieGenreChipProps) {
  return (
    <Chip
      className={className}
      label={genre.name}
      href={{ pathname: '/movie/discover', query: { genreId: genre.id } }}
      component={NextLink}
      clickable
      color="secondary"
    />
  );
}

export default MovieGenreChip;
