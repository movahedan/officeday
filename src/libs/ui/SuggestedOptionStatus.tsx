import { classNames, dateFormatter } from "../utilities";

import type { GroupEventOption, Invitee } from "../prisma/types";

export type SuggestedOptionsStatusProps = {
  suggestedOptions: GroupEventOption[];
  invitees: Invitee[];
  className?: string;
};

export const SuggestedOptionsStatus = ({
  suggestedOptions,
  invitees,
  className,
}: SuggestedOptionsStatusProps) => {
  return (
    <ul
      className={classNames([
        "w-full overflow-hidden [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-slate-100 rounded-md",
        className,
      ])}
    >
      {suggestedOptions.map((option) => {
        const votedPeople = invitees
          .filter((invitee) =>
            invitee.possibleOptions
              .map((option) => option.id)
              .includes(option.id),
          )
          .map((invitee) => invitee.person.name);

        return (
          <li key={option.id} className="w-full p-8 last:mb-0">
            <span className="mr-4">
              {dateFormatter(new Date(option.date))}:
            </span>
            <span>
              {votedPeople.length === 0
                ? "Not possible"
                : votedPeople.join("-")}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
