import type { Pathnames } from "next-intl/navigation";

export const routes = {
  index: () => "/",
  groupEvent: {
    create: () => "/group-event",
    groupEvent: (id: string) => `/group-event/${id}`,
    join: (id: string) => `/group-event/${id}/join`,
    selectDate: (id: string, personId: string) =>
      `/group-event/${id}/join/${personId}`,
  },
};

// next-intl related, please fill this section up
// when you change the structure of the pages or
// you add a new page to the application
export type Locales = "en" | "nl";
export const locales = ["en", "nl"] as const;
export const defaultLocale = "en";
export const pathnames = {
  "/": "/",
  "/group-event": {
    en: "/group-event",
    nl: "/groepsevenement",
  },
  "/group-event/[id]": {
    en: "/group-event/[id]",
    nl: "/groepsevenement/[id]",
  },
  "/group-event/[id]/join": {
    en: "/group-event/[id]/join",
    nl: "/groepsevenement/[id]/aansluiten",
  },
  "/group-event/[id]/join/[personId]": {
    en: "/group-event/[id]/join/[personId]",
    nl: "/groepsevenement/[id]/aansluiten/[personId]",
  },
} satisfies Pathnames<typeof locales>;
export type AppPathnames = keyof typeof pathnames;
