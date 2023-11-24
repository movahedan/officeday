"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { putApiGroupEventIdJoinPersonId } from "@/libs/data/default";
import { dateFormatter } from "@/libs/utilities/date";
import { classNames } from "@/libs/utilities/string";

import { Button } from "../client-side/Button";

import type { Option, Rsvp } from "@/libs/data/schema";
import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";

export type GroupEventSelectOptionsFormData = {
  rsvps: Rsvp[];
};

export type GroupEventSelectOptionsFormProps = {
  id: string;
  personId: string;
  options: Option[];
  currentRsvps?: Rsvp[];
  onSubmit: () => void | Promise<void | unknown>;
};

export const GroupEventSelectOptionsForm = ({
  id,
  personId,
  options,
  currentRsvps,
  onSubmit: onSubmitProps,
}: GroupEventSelectOptionsFormProps) => {
  const tGeneral = useTranslations("general");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEventSelectOptionsFormData>({
    defaultValues: {
      rsvps:
        currentRsvps ||
        options.map((option) => ({
          date: option.date,
          response: undefined,
        })),
    },
  });

  const onSubmit: SubmitHandler<GroupEventSelectOptionsFormData> = async ({
    rsvps,
  }) => {
    return putApiGroupEventIdJoinPersonId(id, personId, { rsvps }).then(() => {
      return onSubmitProps();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {options.map((option, index) => {
        const date = dateFormatter(new Date(option.date));

        return (
          <div key={option.id} className="mb-20">
            <h4 className="mb-8 text-sm font-medium">{date}</h4>
            <div className="flex items-center gap-8">
              <div>
                <input
                  {...register(`rsvps.${index}.response`)}
                  type="radio"
                  id={`${date}-POSSIBLE`}
                  value="POSSIBLE"
                  className="hidden peer"
                />
                <Label htmlFor={`${date}-POSSIBLE`}>POSSIBLE</Label>
              </div>

              <div>
                <input
                  {...register(`rsvps.${index}.response`)}
                  type="radio"
                  id={`${date}-NOT_POSSIBLE`}
                  value="NOT_POSSIBLE"
                  className="hidden peer"
                />
                <Label htmlFor={`${date}-NOT_POSSIBLE`}>NOT_POSSIBLE</Label>
              </div>

              <div>
                <input
                  {...register(`rsvps.${index}.response`)}
                  type="radio"
                  id={`${date}-TENTATIVE`}
                  value="TENTATIVE"
                  className="hidden peer"
                />
                <Label htmlFor={`${date}-TENTATIVE`}>TENTATIVE</Label>
              </div>
            </div>
          </div>
        );
      })}
      {errors.rsvps && (
        <p className="mt-2 text-sm italic text-red-500">
          {errors.rsvps?.message}
        </p>
      )}

      <Button type="submit" variant="green" className="px-16">
        {tGeneral("submit")}
      </Button>
    </form>
  );
};

const Label = ({
  htmlFor,
  className,
  children,
}: {
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className={classNames([
      "px-16 py-4 border cursor-pointer rounded-md dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-700 peer-checked:text-blue-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700",
      className,
    ])}
  >
    {children}
  </label>
);
