// The environment is picked up from this file. The contents of the file might change based on the environment (mockapi switch, apiurl etc)
// Right now the changes has to be done manually.

const defaults = {
  ENV: 'production',
  MOCKAPI: false,
  URL: 'https://www.banksinarmas.com/PersonalBanking/rest/v3/action',
  GA_TRACKER_ID: 'UA-90594021-2',
  GA_TRACKER_INTERVAL: 2,
  pushWooshAppConstants: {
    applicationID: 'BC66A-B9148',
    FCMID: '947013253200'
  }, // PUSHWOOSH_MAIL ID : it.ats.simas@gmail.com
  fixtures: {}
};

const setEnv = (envKey, value) => {
  defaults[envKey] = value;
  return defaults;
};

module.exports = {
  setEnv,
  get ENV () {
    return defaults.ENV;
  },
  get MOCKAPI () {
    return defaults.MOCKAPI;
  },
  URL: defaults.URL,
  URLEFORMCENTRAL: 'https://www.banksinarmas.com/EFormCentral/rest/formdata/action',
  URLCAPTCHA: 'https://www.banksinarmas.com/EForm',
  URLDIMO: 'https://my.dimo.co.id',
  // https://my.dimo.co.id
  GA_TRACKER_ID: defaults.GA_TRACKER_ID,
  GA_TRACKER_INTERVAL: defaults.GA_TRACKER_INTERVAL,
  fixtures: defaults.fixtures,
  pushWooshAppConstants: defaults.pushWooshAppConstants,
  URLV4: 'https://www.banksinarmas.com/PersonalBanking/rest/v4/action',
  URLV3: 'https://www.banksinarmas.com/PersonalBanking/rest/v3/action',
  URLQR: 'https://simaspoin.id/service_sipoin',
  URLCATALOG: 'https://www.banksinarmas.com/simascatalog',
};
