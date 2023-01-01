import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import { Tabs, Tab, Box } from '@mui/material';
import { ParsedUrlQuery } from 'querystring';

import SearchResultsHeader from '../components/search/SearchResultsHeader';
import MovieCard from '../components/movie/MovieCard';
import PersonCard from '../components/person/PersonCard';
import BaseSeo from '../components/seo/BaseSeo';
import InfiniteGridList from '../components/common/InfiniteGridList';
import LoadingIndicator from '../components/common/LoadingIndicator';

import { searchAPI } from '../shared/apis/searchAPI';
import { apiConfigurationAPI } from '../shared/apis/apiConfigurationAPI';

import { MediaType } from '../shared/types/commonEnums';
import { getAllPageResults } from '../shared/utils/commonUtils';
import { createQueryClient } from '../shared/clients/queryClient';

function getSearchQuery(query: ParsedUrlQuery) {
  const { searchQuery } = query;
  return typeof searchQuery === 'string' ? searchQuery : '';
}

function SearchResultsPage() {
  const router = useRouter();
  const searchQuery = getSearchQuery(router.query);

  const {
    data: movies,
    isFetching: isFetchingMovies,
    hasNextPage: hasNextPageMovies,
    fetchNextPage: fetchNextPageMovies,
    isFetched: isFetchedMovies,
  } = useInfiniteQuery(searchAPI.searchMovies(searchQuery));

  const {
    data: people,
    isFetching: isFetchingPeople,
    hasNextPage: hasNextPagePeople,
    fetchNextPage: fetchNextPagePeople,
    isFetched: isFetchedPeople,
  } = useInfiniteQuery(searchAPI.searchPeople(searchQuery));

  function handleTabChange(
    event: React.ChangeEvent<unknown>,
    mediaType: string,
  ) {
    router.replace({ query: { ...router.query, mediaType } }, undefined, {
      shallow: true,
    });
  }

  const allMovies = getAllPageResults(movies);
  const allPeople = getAllPageResults(people);

  let { mediaType } = router.query;
  if (!mediaType && isFetchedMovies && isFetchedPeople) {
    if (allMovies.length) {
      mediaType = MediaType.MOVIE;
    } else if (allPeople.length) {
      mediaType = MediaType.PERSON;
    }
  }

  return (
    <>
      <BaseSeo
        title="Search"
        description="영화, 감독, 배우를 검색할 수 있습니다."
      />
      <SearchResultsHeader
        searchQuery={typeof searchQuery === 'string' ? searchQuery : ''}
      />
      <LoadingIndicator loading={!mediaType}>
        <Tabs value={mediaType} onChange={handleTabChange}>
          {!!allMovies.length && (
            <Tab value={MediaType.MOVIE} label={'Movies'} />
          )}
          {!!allPeople.length && (
            <Tab value={MediaType.PERSON} label={'People'} />
          )}
        </Tabs>
      </LoadingIndicator>
      <Box marginTop={2}>
        {mediaType === MediaType.MOVIE && (
          <InfiniteGridList
            loading={isFetchingMovies}
            hasNextPage={!!hasNextPageMovies}
            onLoadMore={fetchNextPageMovies}
          >
            {allMovies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </InfiniteGridList>
        )}
        {mediaType === MediaType.PERSON && (
          <InfiniteGridList
            loading={isFetchingPeople}
            hasNextPage={!!hasNextPagePeople}
            onLoadMore={fetchNextPagePeople}
          >
            {allPeople.map((person) => {
              return <PersonCard key={person.id} person={person} />;
            })}
          </InfiniteGridList>
        )}
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const searchQuery = getSearchQuery(ctx.query);
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchInfiniteQuery(searchAPI.searchMovies(searchQuery)),
    queryClient.fetchInfiniteQuery(searchAPI.searchPeople(searchQuery)),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/@tanstack/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default SearchResultsPage;
