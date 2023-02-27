// The environment is picked up from this file. The contents of the file might change based on the environment (mockapi switch, apiurl etc)
// Right now the changes has to be done manually.

const defaults = {
  ENV: 'dev',
  MOCKAPI: false,
  URL: 'http://10.32.1.83/PersonalBanking/rest/v3/action',
  GA_TRACKER_ID: 'UA-90594021-2',
  GA_TRACKER_INTERVAL: 2,
  pushWooshAppConstants: {applicationID: 'BC66A-B9148', FCMID: '947013253200'}, // PUSHWOOSH_MAIL ID : it.ats.simas@gmail.com
  fixtures: require('./fixtures.config')
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
  URLEFORMCENTRAL: 'http://10.32.1.77:8080/EFormCentral/rest/formdata/action',
  URLCAPTCHA: 'http://10.32.1.77:8080/EForm',
  URLDIMO: 'https://sandbox.dimo.co.id',
  URLESTORE: 'http://10.32.1.3:8080/EStoreManager/rest/v1',
  URLCATALOG: 'http://10.32.1.3:3000',

  GA_TRACKER_ID: defaults.GA_TRACKER_ID,
  GA_TRACKER_INTERVAL: defaults.GA_TRACKER_INTERVAL,
  fixtures: defaults.fixtures,
  pushWooshAppConstants: defaults.pushWooshAppConstants,
  // URLV4: 'http://10.26.6.72:8080/IBORCL/rest/v4/action',
  // URLV3: 'http://10.26.6.72:8080/IBORCL/rest/v3/action',
  URLV4: 'http://10.32.1.83/PersonalBanking/rest/v4/action',
  URLV3: 'http://10.32.1.83/PersonalBanking/rest/v3/action',
  URLV1: 'http://10.32.1.83/ibank/rest/v1/action',
  URLQR: 'http://simaspoin.id/service_sipoin',
};
