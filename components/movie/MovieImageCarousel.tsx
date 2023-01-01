import { useQuery } from '@tanstack/react-query';

import ImageGalleryModal from '../media/ImageGalleryModal';
import BaseCarousel from '../common/BaseCarousel';
import ImageCarouselItem from '../common/ImageCarouselItem';

import { Movie } from '../../shared/types/moviesTypes';
import { moviesAPI } from '../../shared/apis/moviesAPI';

interface MovieImageCarouselProps {
  movie: Movie;
}

function MovieImageCarousel({ movie }: MovieImageCarouselProps) {
  const movieId = movie.id;
  const { data, isLoading } = useQuery(moviesAPI.movieDetails(movieId));

  const filePaths = data?.images.backdrops.map(
    (backdrop: { file_path: string }) => backdrop.file_path,
  );

  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from movie to another movie
        key={movieId}
        loading={isLoading}
        slidesPerView={{ default: 2, md: 3, lg: 4 }}
        listEmptyMessage="No image has been found."
      >
        {filePaths?.map((filePath: string, i: number) => {
          return (
            <ImageCarouselItem
              key={filePath}
              filePath={filePath}
              imageAlt={`Movie Carousel Image ${i + 1}`}
              width={16}
              height={9}
            />
          );
        })}
      </BaseCarousel>
      <ImageGalleryModal title={movie.title} filePaths={filePaths} />
    </>
  );
}

export default MovieImageCarousel;
