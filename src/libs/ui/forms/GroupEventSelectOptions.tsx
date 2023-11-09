"use client";
import { useForm } from "react-hook-form";

import { routes } from "@/libs/constants/routes";
import { dateFormatter } from "@/libs/utilities/date";
import { fetcher } from "@/libs/utilities/fetcher";

import type {
  GroupEventOption,
  GroupEventSelectOptions,
} from "@/libs/prisma/types";
import type { SubmitHandler } from "react-hook-form";

export type GroupEventSelectOptionsFormData = {
  options: string[];
};

export type GroupEventSelectOptionsFormProps = {
  id: string;
  personId: string;
  suggestedOptions: GroupEventOption[];
  possibleOptionsIds: string[];
};

export const GroupEventSelectOptionsForm = ({
  id,
  personId,
  suggestedOptions,
  possibleOptionsIds,
}: GroupEventSelectOptionsFormProps) => {
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
  ) => {
    const body: GroupEventSelectOptions = {
      id,
      possibleOptions: data.options,
    };

    await fetcher(routes.backend.groupEvent.join.put(id, personId), {
      method: "PUT",
      body: JSON.stringify(body),
    });
  };

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
              className="px-4 py-2 text-lg text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor={option.id}
              className="ml-8 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
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

      <button
        type="submit"
        className="px-12 py-6 text-base text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
      >
        Submit
      </button>
    </form>
  );
};
