// Fund Transfer Matrix Configuration
import {language} from './language';
import result from 'lodash/result';

const transferConfig = {
  rtgs: {
    min: 100000001,
    max: 5000000000,
    fees: 25000,
    get text () {
      return language.FTM__RTGS;
    }
  },
  skn: {
    min: 1000,
    max: 25000000,
    fees: 5000,
    get text () {
      return language.FTM__SKN;
    }
  },
  network: {
    min: 1000,
    max: 25000000,
    fees: 7500,
    get text () {
      return language.FTM__NETWORK;
    }
  },
  inbank: {
    min: 1000,
    max: 25000000,
    fees: 0,
    get text () {
      return language.FTM__INBANK;
    }
  },
  own: {
    min: 1000,
    max: 25000000,
    fees: 0,
    get text () {
      return language.FTM__OWN;
    }
  },
  bifast: {
    min: 1000,
    max: 25000000,
    fees: 2500,
    get text () {
      return language.FTM__BIFAST;
    }
  }
};

export const updateFundTransferFees = (chargeConfig = {}) => {
  const transferConfigFromServer = result(chargeConfig, 'transfer', []);
  transferConfigFromServer.forEach((eachTransferMode) => {
    if (transferConfig[eachTransferMode.mode]) {
      transferConfig[eachTransferMode.mode].fees = eachTransferMode.charge;
    }
  });
  return transferConfig;
};

export const fundMatrix = transferConfig;

export const fundTransferTimes = {
  get today () {
    return language.FTM__TRANSFER_TODAY;
  },
  get tomorrow () {
    return language.FTM__TRANSFER_TOMORROW;
  },
  get instantly () {
    return language.FTM__TRANSFER_INSTANTLY;
  },
  get nextWorking () {
    return language.FTM__NEXT_WORKING_DAY;
  }
};
