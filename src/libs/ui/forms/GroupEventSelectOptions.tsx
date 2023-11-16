"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
  putApiGroupEventIdJoinPersonId,
  useGetApiGroupEventId,
} from "@/libs/data/default";
import { dateFormatter } from "@/libs/utilities/date";

import { Button } from "../client-side/Button";

import type { GetApiGroupEventId200SuggestedOptionsItem } from "@/libs/data/schema";
import type { SubmitHandler } from "react-hook-form";

export type GroupEventSelectOptionsFormData = {
  options: string[];
};

export type GroupEventSelectOptionsFormProps = {
  id: string;
  personId: string;
  suggestedOptions: GetApiGroupEventId200SuggestedOptionsItem[];
  possibleOptionsIds: string[];
};

export const GroupEventSelectOptionsForm = ({
  id,
  personId,
  suggestedOptions,
  possibleOptionsIds,
}: GroupEventSelectOptionsFormProps) => {
  const tGeneral = useTranslations("general");

  const { mutate } = useGetApiGroupEventId(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEventSelectOptionsFormData>({
    defaultValues: {
      options: possibleOptionsIds,
    },
  });

  const onSubmit: SubmitHandler<GroupEventSelectOptionsFormData> = async (
    data,
  ) =>
    putApiGroupEventIdJoinPersonId(id, personId, {
      possibleOptions: data.options,
    }).then(() => mutate());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {suggestedOptions.map((option) => (
        <div key={option.id} className="mb-20">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={option.id}
              {...register("options")}
              value={option.id}
              className="px-4 py-2 text-lg border rounded focus:border-blue-500 focus:outline-none"
            />
            <label htmlFor={option.id} className="ml-8 text-sm font-medium">
              {dateFormatter(new Date(option.date))}
            </label>
          </div>
        </div>
      ))}
      {errors.options && (
        <p className="mt-2 text-sm italic text-red-500">
          {errors.options?.message}
        </p>
      )}

      <Button type="submit" variant="green" className="w-full">
        {tGeneral("submit")}
      </Button>
    </form>
  );
};
