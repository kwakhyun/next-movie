import { Box } from '@mui/material';

import BaseImage from './BaseImage';
import { APP_DRAWER_WIDTH } from '../layout/AppDrawer';

type FullSizeBackgroundImageProps = {
  src: string;
  alt: string;
};

export default function FullSizeBackgroundImage({
  src,
  alt,
}: FullSizeBackgroundImageProps) {
  return (
    <Box
      // To prevent showing the image of previous movie/person until the next one's is loaded.
      key={src}
      sx={{
        position: 'fixed',
        inset: 0,
        left: { xs: 0, md: APP_DRAWER_WIDTH },
        zIndex: -1,
        opacity: 0.1,
      }}
    >
      <BaseImage src={src} alt={alt} layout="fill" objectFit="cover" />
    </Box>
  );
}
