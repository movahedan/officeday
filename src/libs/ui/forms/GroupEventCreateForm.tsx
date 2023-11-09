"use client";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

import { routes } from "@/libs/constants";
import { fetcher } from "@/libs/utilities/fetcher";

import { Button } from "../client-side/Button";
import { IconRemove } from "../icons";

import type { NewGroupEvent } from "@/libs/prisma/types";
import type { SubmitHandler } from "react-hook-form";

export type GroupEventCreateFormData = {
  name: string;
  dates: { date: string }[];
};

export const GroupEventCreateForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
    const body: NewGroupEvent = {
      owner: {
        name: data.name,
      },
      suggestedOptions: data.dates.map((dateObj) => ({
        date: new Date(dateObj.date),
      })),
    };

    const response = await fetcher(routes.backend.groupEvent.post(), {
      method: "POST",
      body: JSON.stringify(body),
    });

    router.push(routes.frontend.groupEvent.groupEvent(response.id));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-20 py-24 bg-white rounded-lg"
    >
      <div className="mb-20">
        <label htmlFor="name" className="block mb-4 text-gray-700 text-md">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: "This field is required" })}
          className="w-full px-4 py-2 text-lg text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
        />
        {errors.name && (
          <p className="mt-2 text-sm italic text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-20">
          <label
            htmlFor={`dates[${index}].date`}
            className="block mb-4 text-gray-700 text-md"
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
            <Button variant="red" onClick={() => remove(index)} className="p-4">
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
        className="w-full mb-16 text-lg"
      >
        Add Date
      </Button>

      <Button type="submit" variant="green" className="w-full text-lg">
        Submit
      </Button>
    </form>
  );
};
