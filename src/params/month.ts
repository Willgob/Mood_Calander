import type { ParamMatcher } from "@sveltejs/kit";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const match: ParamMatcher = (param) => {
  return MONTHS.includes(param);
};