export const getDeadlineString = (month: number, day: number) => {
  const monthNames = [
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
    "December",
  ];
  return `${monthNames[month - 1]} ${day}`;
};

export const getYearSuffix = (year: number) => {
  if (year === 1) return "1st Year";
  if (year === 2) return "2nd Year";
  if (year === 3) return "3rd Year";
  return `${year}th Year`;
};

export const isDeadlinePassed = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};
