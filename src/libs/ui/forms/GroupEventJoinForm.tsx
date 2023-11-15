"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { postApiGroupEventIdJoin } from "@/libs/data/default";
import { routes, useRouter } from "@/libs/router";

import { Button } from "../client-side/Button";

import type { SubmitHandler } from "react-hook-form";

export type GroupEventJoinFormData = {
  name: string;
};

export type GroupEventJoinFormProps = {
  id: string;
};

export const GroupEventJoinForm = ({ id }: GroupEventJoinFormProps) => {
  const t = useTranslations("forms.group-event-join-form");
  const tGeneral = useTranslations("general");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEventJoinFormData>();

  const onSubmit: SubmitHandler<GroupEventJoinFormData> = async (data) => {
    const person = await postApiGroupEventIdJoin(id, {
      person: {
        name: data.name,
      },
    });

    router.push(routes.groupEvent.selectDate(id, person.id));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-20 py-24 bg-white rounded-lg"
    >
      <div className="mb-20">
        <label htmlFor="name" className="block mb-4 text-gray-700 text-md">
          {t("fields.name.label")}
        </label>
        <input
          id="name"
          {...register("name", { required: tGeneral("required-field") })}
          className="w-full px-4 py-2 text-lg text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
        />
        {!!errors.name && (
          <p className="mt-2 text-sm italic text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="green" className="w-full text-lg">
        {tGeneral("submit")}
      </Button>
    </form>
  );
};
