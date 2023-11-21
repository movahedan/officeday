"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";

import { putApiGroupEventId, useGetApiGroupEventId } from "@/libs/data/default";
import { routes, useRouter } from "@/libs/router";
import { dateFormatter } from "@/libs/utilities/date";

import { Button } from "../client-side/Button";
import { IconRemove } from "../icons";

import type { SubmitHandler } from "react-hook-form";

export type GroupEventEditFormData = {
  dates: { date: string }[];
};

export type GroupEventEditFormProps = {
  id: string;
};

export const GroupEventEditForm = ({ id }: GroupEventEditFormProps) => {
  const t = useTranslations("forms.group-event-edit-form");
  const tGeneral = useTranslations("general");

  const router = useRouter();

  const { data: groupEvent, mutate } = useGetApiGroupEventId(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GroupEventEditFormData>({
    defaultValues: {
      dates: groupEvent?.suggestedOptions.map((option) => ({
        id: option.id,
        date: dateFormatter(new Date(option.date)),
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dates",
  });

  const onSubmit: SubmitHandler<GroupEventEditFormData> = async (data) => {
    const response = await putApiGroupEventId(id, {
      id,
      suggestedOptions: data.dates,
    });

    mutate();
    router.push(routes.groupEvent.groupEvent(response.id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-8">
          <label
            htmlFor={`dates[${index}].date`}
            className="block mb-4 sr-only text-md"
          >
            {t("fields.date.label")}
          </label>
          <div className="flex">
            <input
              type="date"
              id={`dates[${index}].date`}
              {...register(`dates.${index}.date`, {
                required: tGeneral("required-field"),
                validate: (value) =>
                  new Date(value) >= new Date() ||
                  t("fields.date.errors.date-cannot-be-in-the-past"),
              })}
              className="w-full px-4 py-2 text-lg border rounded focus:border-blue-500 focus:outline-none"
            />
            {index !== 0 && (
              <Button
                variant="red"
                disabled={index === 0}
                onClick={() => remove(index)}
                className="p-8 ml-4"
              >
                <IconRemove width={16} height={16} />
              </Button>
            )}
          </div>
          {errors.dates?.[index]?.date && (
            <p className="mt-2 text-sm italic text-red-500">
              {errors.dates[index]?.date?.message}
            </p>
          )}
        </div>
      ))}

      <Button
        variant="blue"
        onClick={() => append({ date: "" })}
        className="w-full mb-8 text-lg"
      >
        {t("add-date")}
      </Button>

      <Button type="submit" variant="green" className="w-full text-lg">
        {tGeneral("submit")}
      </Button>
    </form>
  );
};
