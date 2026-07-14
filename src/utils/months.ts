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

export function monthNameToNumber(name: string ): number {
    return MONTHS.indexOf(name);
}

export function monthNumberToName(index: number): string {
    return MONTHS[index];
}