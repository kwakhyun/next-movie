import queryString from 'query-string';

import { CustomError } from '../errors/customError';

async function handleResponse(response: Response) {
  if (response.ok) {
    return await response.json();
  } else {
    let message = response.statusText;

    try {
      const errorJson = await response.json();
      message = errorJson.status_message;
    } catch {
      // do nothing
    }

    throw new CustomError(response.status, message);
  }
}

export const httpClient = {
  get: <Data>(
    url: string,
    params?: queryString.StringifiableRecord,
  ): Promise<Data> =>
    fetch(
      queryString.stringifyUrl({
        url,
        query: {
          ...params,
          // language: 'ko-KR',
        },
      }),
    ).then(handleResponse),
};
