"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
  putApiGroupEventIdJoinPersonId,
  useGetApiGroupEventId,
} from "@/libs/data/default";
import { dateFormatter } from "@/libs/utilities/date";

import { Button } from "../client-side/Button";

import type {
  GroupEventOption,
  PutApiGroupEventIdJoinPersonIdBody,
} from "@/libs/data/schema";
import type { SubmitHandler } from "react-hook-form";

export type GroupEventSelectOptionsFormData = {
  optionStatuses: PutApiGroupEventIdJoinPersonIdBody["optionStatuses"];
};

export type GroupEventSelectOptionsFormProps = {
  id: string;
  personId: string;
  suggestedOptions: GroupEventOption[];

  onSubmit: () => void | Promise<void | unknown>;
};

export const GroupEventSelectOptionsForm = ({
  id,
  personId,
  suggestedOptions,

  onSubmit: onSubmitProps,
}: GroupEventSelectOptionsFormProps) => {
  const tGeneral = useTranslations("general");
  const tStatus = useTranslations("components.suggested-options-status");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEventSelectOptionsFormData>({
    defaultValues: {
      optionStatuses: suggestedOptions.map((option) => ({
        optionId: option.id,
        status: "Not possible",
      })),
    },
  });

  const onSubmit: SubmitHandler<GroupEventSelectOptionsFormData> = async (
    data,
  ) => {
    return putApiGroupEventIdJoinPersonId(id, personId, {
      optionStatuses: data.optionStatuses.map((optionStatus) => ({
        optionId: optionStatus.optionId,
        status: optionStatus.status
          ? tStatus("possible")
          : tStatus("not-possible"),
      })),
    }).then(() => onSubmitProps());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {suggestedOptions.map((option, index) => (
        <div key={option.id} className="mb-20">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={option.id}
              {...register(`optionStatuses.${index}.status`)}
              value={option.id}
              className="px-4 py-2 text-lg border rounded focus:border-blue-500 focus:outline-none"
            />
            <label htmlFor={option.id} className="ml-8 text-sm font-medium">
              {dateFormatter(new Date(option.date))}
            </label>
          </div>
        </div>
      ))}
      {errors.optionStatuses && (
        <p className="mt-2 text-sm italic text-red-500">
          {errors.optionStatuses?.message}
        </p>
      )}

      <Button type="submit" variant="green" className="w-full">
        {tGeneral("submit")}
      </Button>
    </form>
  );
};
