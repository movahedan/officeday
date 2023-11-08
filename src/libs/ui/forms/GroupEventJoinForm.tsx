"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { routes } from "@/libs/constants/routes";
import { errorHandlerApi } from "@/libs/utilities/error-handlers";

import type { Person } from "@/libs/prisma/types";
import type { SubmitHandler } from "react-hook-form";

export type GroupEventJoinFormData = {
  name: string;
};

export type GroupEventJoinFormProps = {
  id: string;
};

export const GroupEventJoinForm = ({ id }: GroupEventJoinFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEventJoinFormData>();

  const onSubmit: SubmitHandler<GroupEventJoinFormData> = async (data) => {
    const body = {
      person: {
        name: data.name,
      },
    };

    const response = await fetch(routes.backend.groupEvent.join.post(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseBody = (await response.json()) as Person;
    if (response.ok) {
      router.push(routes.frontend.groupEvent.selectDate(id, responseBody.name));
    } else {
      errorHandlerApi(body);
    }
  };

  return (
    <div className="m-auto max-w-400">
      <h1 className="text-xl text-center">Join the office day</h1>
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
