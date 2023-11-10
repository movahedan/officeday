/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Next Swagger API Example
 * OpenAPI spec version: 1.0
 */
import type { GetApiGroupEventId200InviteesItem } from "./getApiGroupEventId200InviteesItem";
import type { GetApiGroupEventId200Owner } from "./getApiGroupEventId200Owner";
import type { GetApiGroupEventId200SuggestedOptionsItem } from "./getApiGroupEventId200SuggestedOptionsItem";

export type GetApiGroupEventId200 = {
  /** Unique identifier of the group event */
  id: string;
  invitees: GetApiGroupEventId200InviteesItem[];
  owner: GetApiGroupEventId200Owner;
  /** Identifier of the owner of the group event */
  ownerId: string;
  suggestedOptions: GetApiGroupEventId200SuggestedOptionsItem[];
};
