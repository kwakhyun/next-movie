import { forwardRef, useState } from 'react';

import { AppBar, Toolbar, Box, IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';

import AppTitle from './AppTitle';
import HideOnScroll from './HideOnScroll';
import ExternalLink from '../link/ExternalLink';
import SearchAutocomplete from '../search/SearchAutocomplete';

import useIsMobile from '../../hooks/useIsMobile';
import { usePaletteMode } from '../../theme/BaseThemeProvider';

const AppHeader = forwardRef<HTMLDivElement, {}>(function AppHeader(
  props,
  ref,
) {
  const isMobile = useIsMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  if (!isMobile && isMobileSearch) {
    setIsMobileSearch(false);
  }

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  const { mode, toggleMode } = usePaletteMode();

  return (
    <HideOnScroll>
      <AppBar
        ref={ref}
        color="default"
        sx={{
          // To make the drawer clipped
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {!isMobileSearch && <AppTitle />}

          <Box sx={{ display: { xs: 'flex', md: 'none', flex: 1 } }}>
            {isMobileSearch && (
              <>
                <IconButton
                  aria-label="Hide search"
                  sx={{ marginRight: 2 }}
                  onClick={hideMobileSearch}
                >
                  <CloseIcon />
                </IconButton>
                <SearchAutocomplete autoFocus />
              </>
            )}
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flex: 1,
              mx: 2,
              justifyContent: 'center',
            }}
          >
            <SearchAutocomplete sx={{ maxWidth: 680 }} />
          </Box>

          {!isMobileSearch && (
            <Stack spacing={1} direction="row">
              <IconButton
                aria-label="Show search"
                onClick={showMobileSearch}
                sx={{ display: { md: 'none' } }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton aria-label="Toggle theme" onClick={toggleMode}>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton
                aria-label="Toggle theme"
                href="https://github.com/kwakhyun"
                LinkComponent={ExternalLink}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default AppHeader;
