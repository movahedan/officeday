// Use type safe message keys with `next-intl`
import type en from "./public/dictionaries/en.json";

type Messages = typeof en;
declare interface IntlMessages extends Messages {}
