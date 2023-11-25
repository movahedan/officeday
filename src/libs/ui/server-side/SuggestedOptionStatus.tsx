import { useTranslations } from "next-intl";

import { dateFormatter } from "@/libs/utilities/date";
import {
  getDateRsvpEntries,
  sortDateRsvpEntries,
} from "@/libs/utilities/rsvps";
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

  const dates = options.map((o) => o.date);
  const rsvpsEntries = sortDateRsvpEntries(getDateRsvpEntries(dates, invitees));

  return (
    <ul className={classNames(["flex flex-col gap-16", className])}>
      {rsvpsEntries.map(([date, statuses]) => {
        return (
          <section key={date}>
            <h3 className="mb-4">{dateFormatter(new Date(date))}</h3>
            <List items={Object.entries(statuses)} keys={(item) => item[0]}>
              {([response, invitees]) => (
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
