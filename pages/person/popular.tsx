import { GetServerSideProps } from 'next';

import { dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import { createQueryClient } from '../../shared/clients/queryClient';

import PersonCard from '../../components/person/PersonCard';
import BaseSeo from '../../components/seo/BaseSeo';
import PageTitle from '../../components/common/PageTitle';
import InfiniteGridList from '../../components/common/InfiniteGridList';

import { personAPI } from '../../shared/apis/personAPI';
import { apiConfigurationAPI } from '../../shared/apis/apiConfigurationAPI';

import { Person } from '../../shared/types/personTypes';
import { PaginationResponse } from '../../shared/types/commonTypes';

import { getAllPageResults } from '../../shared/utils/commonUtils';

function PopularPeoplePage() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    PaginationResponse<Person>
  >(personAPI.popularPeople());

  return (
    <>
      <BaseSeo title="Popular People" description="Popular people list" />
      <PageTitle title="Popular People" />
      <InfiniteGridList
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
      >
        {getAllPageResults(data).map((person) => {
          return (
            <li key={person.id}>
              <PersonCard person={person} />
            </li>
          );
        })}
      </InfiniteGridList>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchInfiniteQuery(personAPI.popularPeople()),
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

export default PopularPeoplePage;
