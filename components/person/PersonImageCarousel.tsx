import { useQuery } from '@tanstack/react-query';

import ImageGalleryModal from '../media/ImageGalleryModal';
import BaseCarousel from '../common/BaseCarousel';
import ImageCarouselItem from '../common/ImageCarouselItem';

import { Person } from '../../shared/types/personTypes';
import { personAPI } from '../../shared/apis/personAPI';

interface PersonImageCarouselProps {
  person: Person;
}

function PersonImageCarousel({ person }: PersonImageCarouselProps) {
  const { data, isLoading } = useQuery(personAPI.personDetails(person.id));
  const filePaths =
    data?.images.profiles.map(
      (profile: { file_path: string }) => profile.file_path,
    ) || [];

  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from person to another person
        key={person.id}
        loading={isLoading}
        slidesPerView={{ default: 2, md: 5, lg: 7 }}
        listEmptyMessage="No image has been found."
      >
        {filePaths.map((filePath: string, i: number) => {
          return (
            <ImageCarouselItem
              key={filePath}
              filePath={filePath}
              imageAlt={`Person Carousel Image ${i + 1}`}
              width={2}
              height={3}
            />
          );
        })}
      </BaseCarousel>
      <ImageGalleryModal title={person.name} filePaths={filePaths} />
    </>
  );
}

export default PersonImageCarousel;
