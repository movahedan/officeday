"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";

import { postApiGroupEvent } from "@/libs/data/default";
import { routes, useRouter } from "@/libs/router";

import { Button } from "../client-side/Button";
import { IconLoading, IconRemove } from "../icons";

import type { SubmitHandler } from "react-hook-form";

export type GroupEventCreateFormData = {
  name: string;
  dates: { date: string }[];
};

export const GroupEventCreateForm = () => {
  const t = useTranslations("forms.group-event-create-form");
  const tGeneral = useTranslations("general");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GroupEventCreateFormData>({
    defaultValues: {
      dates: [{ date: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dates",
  });

  const onSubmit: SubmitHandler<GroupEventCreateFormData> = async (data) => {
    const response = await postApiGroupEvent({
      owner: {
        name: data.name,
      },
      suggestedOptions: data.dates.map((dateObj) => ({
        date: dateObj.date,
      })),
    });

    router.push(routes.groupEvent.groupEvent(response.id));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-20 py-24 rounded-lg dark:bg-slate-700 bg-slate-200"
    >
      <div className="mb-20">
        <label htmlFor="name" className="block mb-4 text-md">
          {t("fields.name.label")}
        </label>
        <input
          id="name"
          {...register("name", { required: tGeneral("required-field") })}
          className="w-full px-4 py-2 text-lg border rounded focus:border-blue-500 focus:outline-none"
        />
        {errors.name && (
          <p className="mt-2 text-sm italic text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-8">
          <label
            htmlFor={`dates[${index}].date`}
            className="block mb-4 text-md"
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
                onClick={() => index !== 0 && remove(index)}
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
        className="w-full mt-20 mb-8 text-lg"
      >
        {t("add-date")}
      </Button>

      <Button
        type="submit"
        variant="green"
        disabled={isSubmitting}
        className="w-full text-lg"
      >
        {isSubmitting ? (
          <IconLoading width={28} height={28} />
        ) : (
          tGeneral("submit")
        )}
      </Button>
    </form>
  );
};
