import { errorHandlerApi } from "../utilities/error-handlers";

import type { ApiError } from "next/dist/server/api-utils";

export type FetcherInstanceProps = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  headers?: RequestInit["headers"];
  params?: string | Record<string, string> | URLSearchParams;
  data?: BodyType<unknown>;
  responseType?: string;
};

export async function fetcher<T>({
  url,
  method,
  params,
  headers,
  data,
}: FetcherInstanceProps): Promise<T> {
  return fetch(`${url}` + new URLSearchParams(params), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: data ? (JSON.stringify(data) as BodyInit) : undefined,
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
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<ErrorType> = ApiError | ErrorType;

// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData;
