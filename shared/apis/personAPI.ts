import { Person, PersonDetails } from '../types/personTypes';
import { ID, PaginationResponse } from '../types/commonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '../utils/commonUtils';

import { personService } from '../services/personService';
import { httpClient } from '../clients/httpClient';

export const personAPI = {
  personDetails: (personId: ID) => ({
    queryKey: ['personDetails', personId],
    queryFn: async () =>
      IS_SERVER
        ? personService.getPersonDetails(personId)
        : httpClient.get<PersonDetails>(`/api/person/${personId}`),
  }),
  popularPeople: () => ({
    queryKey: ['popularPeople'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? personService.getPopularPerson(pageParam)
        : httpClient.get<PaginationResponse<Person>>('/api/people/popular', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
};
