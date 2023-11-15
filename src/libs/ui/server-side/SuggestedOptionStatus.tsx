import { useTranslations } from "next-intl";

import { dateFormatter } from "@/libs/utilities/date";

import { List } from "./List";

import type {
  GetApiGroupEventId200InviteesItem,
  GetApiGroupEventId200SuggestedOptionsItem,
} from "@/libs/data/schema";

export type SuggestedOptionsStatusProps = {
  suggestedOptions: GetApiGroupEventId200SuggestedOptionsItem[];
  invitees: GetApiGroupEventId200InviteesItem[];
  className?: string;
};

export const SuggestedOptionsStatus = ({
  suggestedOptions,
  invitees,
  className,
}: SuggestedOptionsStatusProps) => (
  <List
    items={suggestedOptions}
    keys={(option) => option.id || ""}
    className={className}
  >
    {(option) => <Item option={option} invitees={invitees} />}
  </List>
);

const Item = ({
  option,
  invitees,
}: {
  option: GetApiGroupEventId200SuggestedOptionsItem;
  invitees: GetApiGroupEventId200InviteesItem[];
}) => {
  const t = useTranslations("components.suggested-options-status");

  const votedPeople = invitees
    .filter(
      (invitee) =>
        invitee.possibleOptions?.map((option) => option.id).includes(option.id),
    )
    .map((invitee) => invitee.person?.name);

  return (
    <>
      <span className="mr-4">
        {dateFormatter(new Date(option.date || ""))}:
      </span>
      <span>
        {votedPeople.length === 0 ? t("not-possible") : votedPeople.join("-")}
      </span>
    </>
  );
};
