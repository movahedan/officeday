/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Next Swagger API Example
 * OpenAPI spec version: 1.0
 */
import type { PutApiGroupEventId200InviteesItemPerson } from "./putApiGroupEventId200InviteesItemPerson";
import type { PutApiGroupEventId200InviteesItemPossibleOptionsItem } from "./putApiGroupEventId200InviteesItemPossibleOptionsItem";

export type PutApiGroupEventId200InviteesItem = {
  /** Identifier of the related group event */
  groupEventId: string;
  /** Identifier of the invitee */
  id: string;
  person: PutApiGroupEventId200InviteesItemPerson;
  /** Identifier of the person invited */
  personId: string;
  /** Array of IDs for the possible options for this invitee */
  possibleOptionIds: string[];
  possibleOptions: PutApiGroupEventId200InviteesItemPossibleOptionsItem[];
};