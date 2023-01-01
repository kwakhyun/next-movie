/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import MovieVideoCarouselItem from './MovieVideoCarouselItem';
import VideoGalleryModal from '../media/VideoGalleryModal';
import BaseCarousel from '../common/BaseCarousel';

import { ID } from '../../shared/types/commonTypes';
import { moviesAPI } from '../../shared/apis/moviesAPI';
import { MovieVideo } from '../../shared/types/moviesTypes';

interface MovieVideoCarouselProps {
  movieId: ID;
}

function MovieVideoCarousel({ movieId }: MovieVideoCarouselProps) {
  const { data, isLoading } = useQuery(moviesAPI.movieDetails(movieId));
  const videos = data?.videos.results || [];
  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from movie to another movie
        key={movieId}
        loading={isLoading}
        slidesPerView={{ default: 2, md: 4, lg: 5 }}
        listEmptyMessage="No video has been found."
      >
        {videos.map((video: MovieVideo) => {
          return <MovieVideoCarouselItem key={video.id} video={video} />;
        })}
      </BaseCarousel>
      <VideoGalleryModal videos={videos} />
    </>
  );
}

export default MovieVideoCarousel;
