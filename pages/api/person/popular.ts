import { NextApiHandler } from 'next';

import { Person } from '../../../shared/types/personTypes';
import { PaginationResponse } from '../../../shared/types/commonTypes';

import { createHandler } from '../../../shared/utils/createHandler';
import { FIRST_PAGE } from '../../../shared/utils/commonUtils';

import { personService } from '../../../shared/services/personService';

const handler: NextApiHandler<PaginationResponse<Person>> = async (
  req,
  res,
) => {
  const page = Number(req.query.page) || FIRST_PAGE;
  const people = await personService.getPopularPerson(page);
  res.status(200).json(people);
};

export default createHandler(handler);
