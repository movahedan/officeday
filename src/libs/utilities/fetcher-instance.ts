import { fetcher } from "./fetcher";

import type { ApiError } from "next/dist/server/api-utils";

export const fetcherInstance = async <T>({
  url,
  method,
  params,
  headers,
  data,
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  headers?: RequestInit["headers"];
  params?: string | Record<string, string> | URLSearchParams;
  data?: BodyType<unknown>;
  responseType?: string;
}): Promise<T> =>
  fetcher(`${url}` + new URLSearchParams(params), {
    method,
    headers,
    body: data as BodyInit,
  });

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<ErrorType> = ApiError | ErrorType;

// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData;
