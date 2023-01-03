import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import {
  Divider,
  Drawer,
  List,
  ListSubheader,
  styled,
  Toolbar,
  Box,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieIcon from '@mui/icons-material/Movie';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import StarIcon from '@mui/icons-material/StarRate';

import AppTitle from './AppTitle';
import AppDrawerItem from './AppDrawerItem';
import TmdbAttribution from './TmdbAttribution';
import LoadingIndicator from '../common/LoadingIndicator';

import { useAppDrawer } from '../../contexts/AppDrawerContext';
import { moviesAPI } from '../../shared/apis/moviesAPI';
import { Genre } from '../../shared/types/moviesTypes';

export const APP_DRAWER_WIDTH = 260;

const StyledDrawer = styled(Drawer)({
  '.MuiDrawer-paper': {
    width: APP_DRAWER_WIDTH,
    overflow: 'hidden',
  },
});

function AppDrawer() {
  const { isOpen, close } = useAppDrawer();
  const router = useRouter();
  const { data: genres, isLoading } = useQuery(moviesAPI.genres());

  const drawerContent = (
    <>
      <Toolbar>
        <AppTitle />
      </Toolbar>
      <Box
        sx={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <List subheader={<ListSubheader>메인 카테고리</ListSubheader>}>
          <AppDrawerItem
            href="/movie/popular"
            selected={router.pathname === '/movie/popular'}
            icon={<TrendingUpIcon />}
            title="인기 영화"
          />
          <AppDrawerItem
            href="/movie/now-playing"
            selected={router.pathname === '/movie/now-playing'}
            icon={<MovieIcon />}
            title="현재 상영 영화"
          />
          <AppDrawerItem
            href="/movie/upcoming"
            selected={router.pathname === '/movie/upcoming'}
            icon={<UpcomingIcon />}
            title="개봉 예정 영화"
          />
          <AppDrawerItem
            href="/movie/top-rated"
            selected={router.pathname === '/movie/top-rated'}
            icon={<StarIcon />}
            title="최고 평점 영화"
          />
        </List>
        <Divider />
        <LoadingIndicator loading={isLoading}>
          <List subheader={<ListSubheader>장르 카테고리</ListSubheader>}>
            {genres?.map((genre: Genre) => {
              return (
                <AppDrawerItem
                  key={genre.id}
                  href={{
                    pathname: '/movie/discover',
                    query: { genreId: genre.id },
                  }}
                  title={genre.name}
                  selected={
                    router.pathname === '/movie/discover' &&
                    Number(router.query.genreId) === genre.id
                  }
                />
              );
            })}
          </List>
        </LoadingIndicator>
      </Box>
      <TmdbAttribution />
    </>
  );

  const drawerProps = { open: isOpen, onClose: close };

  // If we use `useIsMobile` hook to render components responsively, it flickers especially on low-end mobile devices.
  // So, instead of relying on JS, we rely on CSS to prevent this flickering.
  return (
    <>
      <StyledDrawer
        {...drawerProps}
        variant={'permanent'}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </StyledDrawer>
      <StyledDrawer
        {...drawerProps}
        variant={'temporary'}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerContent}
      </StyledDrawer>
    </>
  );
}

export default AppDrawer;
