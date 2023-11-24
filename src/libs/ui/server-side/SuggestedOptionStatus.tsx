import { useTranslations } from "next-intl";

import { Status } from "@/libs/data/schema";
import { dateFormatter } from "@/libs/utilities/date";
import { classNames } from "@/libs/utilities/string";

import { List } from "./List";

import type { GroupEventInvitee, GroupEventOption } from "@/libs/data/schema";

export type SuggestedOptionsStatusProps = {
  suggestedOptions: GroupEventOption[];
  invitees: GroupEventInvitee[];
  className?: string;
};

export const SuggestedOptionsStatus = ({
  suggestedOptions,
  invitees,
  className,
}: SuggestedOptionsStatusProps) => {
  return (
    <ul className={classNames(["flex flex-col gap-16", className])}>
      {suggestedOptions.map((option) => {
        const statusList = Object.values(Status)
          .map((status) => ({
            status,
            invitees: invitees
              .filter((invitee) =>
                invitee.optionStatuses.some(
                  (optionStatus) =>
                    optionStatus.optionId === option.id &&
                    optionStatus.status === status,
                ),
              )
              .map((invitee) => invitee.person.name),
          }))
          .filter(({ invitees }) => !!invitees.length);

        return (
          <section key={option.date}>
            <h3 className="mb-4">{dateFormatter(new Date(option.date))}</h3>
            <List items={statusList} keys={(statusItem) => statusItem.status}>
              {({ status, invitees }) => (
                <Item status={status} invitees={invitees} />
              )}
            </List>
          </section>
        );
      })}
    </ul>
  );
};

type ItemProps = {
  status: Status;
  invitees: string[];
};

const Item = ({ status, invitees }: ItemProps) => {
  const t = useTranslations("components.suggested-options-status");

  return (
    <>
      <span className="mr-4">{status}:</span>
      <span>
        {invitees.length === 0 ? t("not-possible") : invitees.join("-")}
      </span>
    </>
  );
};
