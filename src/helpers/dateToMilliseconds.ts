const dateToMilliseconds = (date: string | number): number => {
  // is date string?
  if (new Date(date).getTime()) {
    return new Date(date).getTime();
  }

  // is nanoseconds?
  if (date && date.toString().length > 13) {
    return Number(date) / 1000000;
  }

  return Number(date);
};

export default dateToMilliseconds;
