/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Next Swagger API Example
 * OpenAPI spec version: 1.0
 */
import type { Rsvp } from "./rsvp";

export interface Invitee {
  /** Identifier of the invitee */
  id: string;
  /** Name of the invitee */
  name: string;
  rsvps: Rsvp[];
}