import { useTranslations } from "next-intl";

import { RSVPResponse } from "@/libs/data/schema";
import { dateFormatter } from "@/libs/utilities/date";
import { classNames } from "@/libs/utilities/string";

import { List } from "./List";

import type { Invitee, Option } from "@/libs/data/schema";

export type SuggestedOptionsStatusProps = {
  options: Option[];
  invitees: Invitee[];
  className?: string;
};

export const SuggestedOptionsStatus = ({
  options,
  invitees,
  className,
}: SuggestedOptionsStatusProps) => {
  const t = useTranslations("components.suggested-options-status");

  return (
    <ul className={classNames(["flex flex-col gap-16", className])}>
      {options.map((option) => {
        const statusList = Object.values(RSVPResponse)
          .map((response) => ({
            response,
            invitees: invitees
              .filter((invitee) =>
                invitee.rsvps.some(
                  (rsvp) =>
                    rsvp.date === option.date && rsvp.response === response,
                ),
              )
              .map((invitee) => invitee.name),
          }))
          .filter(({ response, invitees }) => !!invitees.length || !!response);

        return (
          <section key={option.date}>
            <h3 className="mb-4">{dateFormatter(new Date(option.date))}</h3>
            <List items={statusList} keys={(statusItem) => statusItem.response}>
              {({ response, invitees }) => (
                <>
                  <span className="mr-4">{t(response)}:</span>
                  <span>
                    {invitees.length === 0 ? "-" : invitees.join("-")}
                  </span>
                </>
              )}
            </List>
          </section>
        );
      })}
    </ul>
  );
};
