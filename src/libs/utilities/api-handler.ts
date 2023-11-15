import { errorHandlerApiRoute } from "./error-handlers";
import { createTranslator } from "../router/create-translator";

import type { NextApiRequest, NextApiResponse } from "next";

export type MethodNames = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type MethodHandler = () => Promise<void>;
export type Methods = Record<MethodNames, MethodHandler>;

export const apiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  methodHandlers: Partial<Methods>,
) => {
  if (!req.method) return null;

  const t = await createTranslator(req, "apis.general");

  const methodNames = Object.keys(methodHandlers);
  if (!methodNames.includes(req.method || "")) {
    res.setHeader("Allow", methodNames);
    res.status(405).end(t("method-not-allowed", { method: req.method }));
  } else {
    try {
      const handler = methodHandlers[req.method as MethodNames];
      if (handler === undefined) {
        throw Error(t("no-handler-passed"));
      }

      return handler();
    } catch (error) {
      errorHandlerApiRoute(error);

      return res.status(500).json({ error: t("internal-server-error") });
    }
  }
};
