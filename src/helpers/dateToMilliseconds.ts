const dateToMilliseconds = (date: string | number): number => {
  if (!date) return 0;

  // is date string?
  if (new Date(date).getTime()) {
    return new Date(date).getTime();
  }

  // is nanoseconds?
  if (date.toString().length > 13) {
    return Number(date) / 1000000;
  }

  // is seconds?
  if (date.toString().length === 10) {
    return Number(date) * 1000;
  }

  return Number(date);
};

export default dateToMilliseconds;
