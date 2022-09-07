import BigNumber from 'bignumber.js';

const formatNumber = (num: any, toFormat = false): string => {
  let value = num.toString();

  if (typeof num === 'string') {
    value = new BigNumber(value)
      .shiftedBy(-24)
      .toFormat(toFormat ? BigNumber.ROUND_FLOOR : undefined);
  }

  if (typeof num === 'object') {
    value = num.shiftedBy(-24).toFormat(BigNumber.ROUND_FLOOR);
  }

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default formatNumber;
