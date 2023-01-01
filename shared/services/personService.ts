import { Person, PersonDetails } from '../types/personTypes';
import { ID, PaginationResponse } from '../types/commonTypes';

import {
  filterViewablePageResults,
  filterViewableMovies,
  shouldViewPerson,
} from '../utils/viewFilters';

import { CustomError } from '../errors/customError';
import { tmdbClient } from '../clients/tmdbClient';

const getPopularPerson = async (page: number) => {
  const people = await tmdbClient.get<PaginationResponse<Person>>(
    '/person/popular',
    {
      page,
    },
  );

  return filterViewablePageResults(people);
};

const getPersonDetails = async (personId: ID): Promise<PersonDetails> => {
  const person = await tmdbClient.get<PersonDetails>(`/person/${personId}`, {
    append_to_response: 'images,credits',
  });

  if (!shouldViewPerson(person)) {
    throw new CustomError(404, '요청하신 리소스를 찾을 수 없습니다.');
  }

  person.credits.cast = filterViewableMovies(person.credits.cast);
  person.credits.crew = filterViewableMovies(person.credits.crew);

  return person;
};

export const personService = {
  getPopularPerson,
  getPersonDetails,
};
