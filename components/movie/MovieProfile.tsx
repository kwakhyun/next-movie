import { Stack, Typography } from '@mui/material';

import MovieIntroduction from './MovieIntroduction';
import MovieImageCarousel from './MovieImageCarousel';
import MovieVideoCarousel from './MovieVideoCarousel';
import MovieCastCarousel from './MovieCastCarousel';
import MovieRecommendations from './MovieRecommendations';

import LoadingIndicator from '../common/LoadingIndicator';
import FullSizeBackgroundImage from '../common/FullSizeBackgroundImage';

import useApiConfiguration from '../../hooks/useApiConfiguration';

import { Maybe } from '../../shared/types/commonTypes';
import { MovieDetails } from '../../shared/types/moviesTypes';

interface MovieProfileProps {
  movie: Maybe<MovieDetails>;
  loading: boolean;
}

function MovieProfile({ movie, loading }: MovieProfileProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <LoadingIndicator loading={loading}>
      {movie && (
        <>
          <FullSizeBackgroundImage
            src={getImageUrl(movie.backdrop_path, { quality: 'original' })}
            alt={movie.title}
          />
          <Stack spacing={2}>
            <MovieIntroduction movie={movie} />

            <div>
              <Typography variant="h6" gutterBottom>
                영상/포토
              </Typography>
              <MovieVideoCarousel movieId={movie.id} />
            </div>

            <div>
              <MovieImageCarousel movie={movie} />
            </div>

            <div>
              <Typography variant="h6" gutterBottom>
                주요 출연진
              </Typography>
              <MovieCastCarousel movieId={movie.id} />
            </div>

            <div>
              <Typography variant="h6" gutterBottom>
                추천 영화
              </Typography>
              <MovieRecommendations movieId={movie.id} />
            </div>
          </Stack>
        </>
      )}
    </LoadingIndicator>
  );
}

export default MovieProfile;
