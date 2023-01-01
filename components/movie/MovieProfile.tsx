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
                관련 동영상
              </Typography>
              <MovieVideoCarousel movieId={movie.id} />
            </div>

            <div>
              <Typography variant="h6" gutterBottom>
                영화 스틸컷
              </Typography>
              <MovieImageCarousel movie={movie} />
            </div>

            <div>
              <Typography variant="h6" gutterBottom>
                출연 배우
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
