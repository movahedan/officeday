/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Next Swagger API Example
 * OpenAPI spec version: 1.0
 */
import useSwr from "swr";

import { fetcher } from "./fetcher";

import type { ErrorType, BodyType } from "./fetcher";
import type {
  GetApiGroupEventId200,
  PostApiGroupEvent201,
  PostApiGroupEventBody,
  PostApiGroupEventIdJoin201,
  PostApiGroupEventIdJoinBody,
  PutApiGroupEventId200,
  PutApiGroupEventIdBody,
  PutApiGroupEventIdJoinPersonId201,
  PutApiGroupEventIdJoinPersonIdBody,
} from "./schema";
import type { Key, SWRConfiguration } from "swr";

/**
 * Retrieves a group event based on the provided ID.
 * @summary Get a specific group event
 */
export const getApiGroupEventId = (id: string) => {
  return fetcher<GetApiGroupEventId200>({
    url: `/api/group-event/${id}`,
    method: "get",
  });
};

export const getGetApiGroupEventIdKey = (id: string) =>
  [`/api/group-event/${id}`] as const;

export type GetApiGroupEventIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiGroupEventId>>
>;
export type GetApiGroupEventIdQueryError = ErrorType<void>;

/**
 * @summary Get a specific group event
 */
export const useGetApiGroupEventId = <TError = ErrorType<void>>(
  id: string,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getApiGroupEventId>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
  },
) => {
  const { swr: swrOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!id;
  const swrKey =
    swrOptions?.swrKey ??
    (() => (isEnabled ? getGetApiGroupEventIdKey(id) : null));
  const swrFn = () => getApiGroupEventId(id);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * Updates the suggested options for a group event based on the provided ID.
 * @summary Update a group event's suggested options
 */
export const putApiGroupEventId = (
  id: string,
  putApiGroupEventIdBody: BodyType<PutApiGroupEventIdBody>,
) => {
  return fetcher<PutApiGroupEventId200>({
    url: `/api/group-event/${id}`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    data: putApiGroupEventIdBody,
  });
};

/**
 * Updates the possible options for a person's participation in a specific group event.
 * @summary Update participation options for a person in a group event
 */
export const putApiGroupEventIdJoinPersonId = (
  id: string,
  personId: string,
  putApiGroupEventIdJoinPersonIdBody: BodyType<PutApiGroupEventIdJoinPersonIdBody>,
) => {
  return fetcher<PutApiGroupEventIdJoinPersonId201>({
    url: `/api/group-event/${id}/join/${personId}`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    data: putApiGroupEventIdJoinPersonIdBody,
  });
};

/**
 * Allows a person to join a group event using the event ID and person's name.
 * @summary Join a group event
 */
export const postApiGroupEventIdJoin = (
  id: string,
  postApiGroupEventIdJoinBody: BodyType<PostApiGroupEventIdJoinBody>,
) => {
  return fetcher<PostApiGroupEventIdJoin201>({
    url: `/api/group-event/${id}/join`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: postApiGroupEventIdJoinBody,
  });
};

/**
 * Creates a new group event with provided owner and suggested options.
 * @summary Create a new group event
 */
export const postApiGroupEvent = (
  postApiGroupEventBody: BodyType<PostApiGroupEventBody>,
) => {
  return fetcher<PostApiGroupEvent201>({
    url: `/api/group-event`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: postApiGroupEventBody,
  });
};
