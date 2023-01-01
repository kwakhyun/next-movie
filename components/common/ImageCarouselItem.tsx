import { useRouter } from 'next/router';

import { styled } from '@mui/material';

import BaseImage from './BaseImage';
import NextLink from '../link/NextLink';

import useApiConfiguration from '../../hooks/useApiConfiguration';

const Thumbnail = styled(BaseImage)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

interface ImageCarouselItemProps {
  filePath: string;
  imageAlt: string;
  width: number;
  height: number;
}

function ImageCarouselItem({
  filePath,
  imageAlt,
  width,
  height,
}: ImageCarouselItemProps) {
  const { getImageUrl } = useApiConfiguration();
  const router = useRouter();

  return (
    <NextLink
      href={{ query: { ...router.query, view: filePath } }}
      scroll={false}
    >
      <Thumbnail
        src={getImageUrl(filePath)}
        alt={imageAlt}
        width={width}
        height={height}
        layout="responsive"
        objectFit="contain"
      />
    </NextLink>
  );
}

export default ImageCarouselItem;
