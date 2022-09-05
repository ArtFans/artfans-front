import BigNumber from 'bignumber.js';

const formatNumber = (num: any): string => {
  let value = num.toString();

  if (typeof num === 'string') {
    value = new BigNumber(value).shiftedBy(-24).toFormat();
  }

  if (typeof num === 'object') {
    value = num.shiftedBy(-24).toFormat(BigNumber.ROUND_FLOOR);
  }

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default formatNumber;
