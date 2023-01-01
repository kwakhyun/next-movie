import { NextApiHandler } from 'next';

import { PersonDetails } from '../../../shared/types/personTypes';

import { createHandler } from '../../../shared/utils/createHandler';
import { validateId } from '../../../shared/utils/commonUtils';

import { personService } from '../../../shared/services/personService';

const handler: NextApiHandler<PersonDetails> = async (req, res) => {
  const personId = validateId(req.query.personId);
  const personDetails = await personService.getPersonDetails(personId);
  res.status(200).json(personDetails);
};

export default createHandler(handler);
