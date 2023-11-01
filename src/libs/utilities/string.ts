export const classNames = (
  classNamesArray:
    | (string | undefined | boolean)[]
    | string
    | undefined
    | boolean,
) =>
  typeof classNamesArray === "string" || classNamesArray === undefined
    ? classNamesArray
    : typeof classNamesArray === "boolean"
    ? undefined
    : classNamesArray.filter(Boolean).join(" ");
