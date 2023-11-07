"use client";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

import { routes } from "@/libs/constants/routes";
import { errorHandlerApi } from "@/libs/utilities/error-handlers";

import type { NewGroupEvent, GroupEvent } from "@/libs/prisma/types";
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
    console.log({ data });
    const body: NewGroupEvent = {
      owner: {
        name: data.name,
      },
      suggestedOptions: data.dates.map((dateObj) => ({
        date: new Date(dateObj.date),
      })),
    };

    const response = await fetch(routes.backend.groupEvent.create(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseBody = (await response.json()) as GroupEvent;
    if (response.ok) {
      router.push(routes.frontend.event.groupEvent(responseBody.id));
    } else {
      errorHandlerApi(body);
    }
  };

  return (
    <div className="m-auto max-w-400">
      <h1 className="text-xl text-center">Create a new office day</h1>
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
                    new Date(value) >= new Date() ||
                    "Date cannot be in the past",
                })}
                className="w-full px-4 py-2 text-lg text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center justify-center ml-4 text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 30 30"
                  fill="currentColor"
                >
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                </svg>
              </button>
            </div>
            {errors.dates?.[index]?.date && (
              <p className="mt-2 text-sm italic text-red-500">
                {errors.dates[index]?.date?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ date: "" })}
          className="w-full px-4 py-2 mb-16 text-lg text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-500"
        >
          Add Date
        </button>

        <button
          type="submit"
          className="w-full px-4 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
