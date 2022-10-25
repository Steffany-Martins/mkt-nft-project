import cryptoRandomString from 'crypto-random-string';

export const makeId = (length) => {
  let result = '';
  result = cryptoRandomString({ length });
  return result;
};

// a8b asd 789

// 0x8ab...6ghj
