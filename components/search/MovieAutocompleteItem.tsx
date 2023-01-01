import AutocompleteItem from './AutocompleteItem';

import { Movie } from '../../shared/types/moviesTypes';
import { getMovieReleaseYear } from '../../shared/utils/movieUtils';

interface MovieAutocompleteItemProps {
  movie: Movie;
}

function MovieAutocompleteItem({ movie, ...rest }: MovieAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={getMovieReleaseYear(movie)?.toString()}
      // Required for SearchAutocomplete
      {...rest}
    />
  );
}

export default MovieAutocompleteItem;
