import { errorHandlerApi } from "./error-handlers";

export const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
    .then(async (response) => {
      const json = await response.json();
      if (response.ok && response.status < 400 && response.status !== 204) {
        return json;
      } else {
        errorHandlerApi(response);
        errorHandlerApi(json);
        throw json;
      }
    })
    .catch((error) => {
      if (error.error) {
        throw error.error;
      } else {
        throw error;
      }
    });
