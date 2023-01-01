import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { dehydrate, useQuery } from '@tanstack/react-query';
import { createQueryClient } from '../../shared/clients/queryClient';

import BaseSeo from '../../components/seo/BaseSeo';
import PersonProfile from '../../components/person/PersonProfile';

import useApiConfiguration from '../../hooks/useApiConfiguration';

import { personAPI } from '../../shared/apis/personAPI';
import { apiConfigurationAPI } from '../../shared/apis/apiConfigurationAPI';

function getPersonId(query: ParsedUrlQuery) {
  return Number(query.personId);
}

function PersonProfilePage() {
  const router = useRouter();
  const personId = getPersonId(router.query);
  const { data: person, isLoading } = useQuery(
    personAPI.personDetails(personId),
  );

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {person && (
        <BaseSeo
          title={person.name}
          description={person.biography || undefined}
          openGraph={{
            images: [
              {
                url: getImageUrl(person.profile_path),
                width: 500,
                height: 750,
              },
            ],
          }}
        />
      )}
      <PersonProfile person={person} loading={isLoading} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const personId = getPersonId(ctx.params ?? {});
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchQuery(personAPI.personDetails(personId)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PersonProfilePage;
