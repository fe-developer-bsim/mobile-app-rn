
const defaults = {
  ENV: 'dev',
  MOCKAPI: false,
  URL: 'http://simigi.banksinarmas.com/PersonalBanking/rest/v3/action'
};

export const setEnv = (envKey, value) => {
  defaults[envKey] = value;
  return defaults;
};

export default {
  get ENV () {
    return defaults.ENV;
  },
  get MOCKAPI () {
    return defaults.MOCKAPI;
  },
  URL: defaults.URL
};
