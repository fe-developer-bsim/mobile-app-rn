// Fund Transfer Matrix Configuration
export const fundMatrix = {
  rtgs: {
    min: 100000001,
    max: 5000000000,
    fees: 25000,
    text: 'rtgs'
  },
  skn: {
    min: 1000,
    max: 500000000,
    fees: 5000,
    text: 'skn'
  },
  network: {
    min: 1000,
    max: 25000000,
    fees: 7500,
    text: 'network'
  },
  inbank: {
    min: 1000,
    max: 2000000000,
    fees: 0,
    text: 'inbank'
  }
};

export const fundTransferTimes = {
  today: 'Transfer today',
  tomorrow: 'Transfer tomorrow',
  instantly: 'Transfer instantly',
  nextWorking: 'Transfer next working day'
};
