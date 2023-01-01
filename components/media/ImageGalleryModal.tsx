import { IconButton, styled } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import MediaGalleryModal from './MediaGalleryModal';
import BaseImage from '../common/BaseImage';

import useApiConfiguration from '../../hooks/useApiConfiguration';
import { Maybe } from '../../shared/types/commonTypes';

const FullScreenButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

interface ImageGalleryModalProps {
  title: string;
  filePaths: Maybe<string[]>;
}

function ImageGalleryModal({ title, filePaths }: ImageGalleryModalProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <MediaGalleryModal
      title={title}
      dataSource={filePaths}
      queryParamName="view"
      renderMedia={({ mediaSrc, isFullScreen, toggleFullScreen }) => {
        return (
          <>
            <BaseImage
              src={getImageUrl(mediaSrc, {
                quality: 'original',
              })}
              alt={title}
              width={16}
              height={9}
              layout="responsive"
              objectFit="contain"
            />
            <FullScreenButton
              aria-label={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              onClick={toggleFullScreen}
            >
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </FullScreenButton>
          </>
        );
      }}
    />
  );
}

export default ImageGalleryModal;
