"use client";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

import { routes } from "@/libs/constants";
import { putApiGroupEventId, useGetApiGroupEventId } from "@/libs/data/default";
import { dateFormatter } from "@/libs/utilities/date";
import { classNames } from "@/libs/utilities/string";

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
      suggestedOptions: data.dates.map((dateObj) => ({
        date: dateObj.date,
      })),
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
            className="block mb-4 text-gray-700 sr-only text-md"
          >
            Date
          </label>
          <div className="flex">
            <input
              type="date"
              id={`dates[${index}].date`}
              {...register(`dates.${index}.date`, {
                required: "This field is required",
                validate: (value) =>
                  new Date(value) >= new Date() || "Date cannot be in the past",
              })}
              className="w-full px-4 py-2 text-lg text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
            />
            <Button
              variant="red"
              disabled={index === 0}
              onClick={() => remove(index)}
              className={classNames(["p-8 ml-4", index === 0 && "opacity-0"])}
            >
              <IconRemove width={16} height={16} />
            </Button>
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
        Add Date
      </Button>

      <Button type="submit" variant="green" className="w-full text-lg">
        Submit
      </Button>
    </form>
  );
};
