import {mockResponses, endpoints} from '../config/api.config';
import env from '../config/env.config';
import * as actionCreators from '../state/actions/index.actions';
import uuidV4 from 'uuid/v4';
import {result, isEmpty} from 'lodash';
import {filterObjectProperties, getInterceptorTrackerLabel} from './transformer.util';
import {highlightNetworkBar} from '../state/actions/index.actions';
import tracker from '../utils/googleAnalytics.util';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword} from './vendor/pinEncryption.util';
import VersionNumber from 'react-native-version-number';

// ssl pinning function set
export const addDefaultPayloadInterceptorFetch = (reduxState, config) => {
  
  const version = VersionNumber.appVersion;
  const versionScope = version.replace(/[.]+/g, ',');
  const uniqueCode = result(reduxState, 'uniqueCode', '');
  let easyPin = result(reduxState, 'form.AuthenticateForm.values.easypin', '');
  const randomNumber = randomString(16);
  const isBeforeLogin = true;
  const isLogin = !isEmpty(result(reduxState, 'user', {}));
  const transferMethodType = isLogin ? '' : '1';
  OBM_EncryptPassword(easyPin, randomNumber);
  const additionalApiPayload = result(reduxState, 'additionalApiPayload', {});
  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  else null;
  const completeExtraPayload = {
    ...additionalApiPayload,
    lang: result(reduxState, 'currentLanguage.id', 'id'),
    language: result(reduxState, 'currentLanguage.id', 'id'),
    TXID: uuidV4(),
    E2EE_RANDOM: randomNumber,
    versionScope,
    randomNumber,
    easyPin,
    uniqueCode,
    isBeforeLogin,
    transferMethodType
  };
  const additionalPayload = Object.assign({}, filterObjectProperties(completeExtraPayload, result(config, 'additional', [])), config.data);
  return additionalPayload;
};

// Interceptor that sets the defaultPayload lama
export const addDefaultPayloadInterceptor = (store) => (config) => {
  if (config.method === 'get') {
    return config;
  }
  const reduxState = store.getState();
  const version = VersionNumber.appVersion;
  const versionScope = version.replace(/[.]+/g, ',');
  const uniqueCode = result(reduxState, 'uniqueCode', '');
  let easyPin = result(reduxState, 'form.AuthenticateForm.values.easypin', '');
  const randomNumber = randomString(16);
  const isBeforeLogin = true;
  const isLogin = !isEmpty(result(reduxState, 'user', {}));
  const transferMethodType = isLogin ? '' : '1';
  OBM_EncryptPassword(easyPin, randomNumber);

  if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
  else null;
  const completeExtraPayload = {
    ...(result(reduxState, 'additionalApiPayload', {})),
    lang: result(reduxState, 'currentLanguage.id', 'id'),
    language: result(reduxState, 'currentLanguage.id', 'id'),
    TXID: uuidV4(),
    E2EE_RANDOM: randomNumber,
    versionScope,
    randomNumber,
    easyPin,
    uniqueCode,
    isBeforeLogin,
    transferMethodType
  };
  config.data = Object.assign({}, filterObjectProperties(completeExtraPayload, result(config, 'additional', [])), config.data);
  return config;
};


// Interceptor that checks the status of the response
export const getStatusValidatorInterceptor = (store) => (response) => {
  const {status} = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  if (status === 401) {
    store.dispatch(actionCreators.cleanAppState());
  }
  const userId = result(store.getState(), 'user.profile.customer.id', 0);
  const trackerLabel = getInterceptorTrackerLabel(response, userId);
  const endpoint = result(response, 'config.endpoint', 'NOT FOUND');
  tracker.trackEvent('API_FAILED: STATUS_CODE_' + status, `ENDPOINT: ${endpoint} ${endpoints[endpoint]}`, null, {label: trackerLabel});
  throw response;
};

// Interceptor that sets mock response
export const mockInterceptor = (config) => {
  if (env.MOCKAPI) {
    console.log('SETTING MOCK for endpoint', config.endpoint); // eslint-disable-line no-console
    config.adapter = mockAdapter;
  }
  return config;
};

const mockAdapter = (config) => new Promise((resolve) => {
  const mockData = result(mockResponses, config.endpoint, {});
  const response = {
    data: mockData.response,
    status: 200,
    statusText: 'OK - Mocked request',
    headers: {mock: true},
    config: config,
  };
  setTimeout(() => resolve(response), 5);
});

const noNetworkAdaptor = () => Promise.reject({'data': {'notConnected': true}});

export const getNoNetWorkInterceptor =  (store) => (config) => {
  const isConnected = result(store.getState(), 'networkStatus.isConnected', true);
  if (!isConnected) {
    store.dispatch(highlightNetworkBar({routeName: config.endpoint}));
    return {...config, adapter: noNetworkAdaptor};
  }
  return config;
};

export const demoAccountInterceptor = (config) => {
  if (/^DEMO-/.test(result(config, 'data.ipassport', ''))) {
    if (config.endpoint !== 'BALANCES') {
      return null;
    }
  }
  return config;
};

export const removeFalsyValues = (config = {}) => {
  if (config.method === 'get') {
    return config;
  }
  const transformedPayload = {};
  const payload = result(config, 'data', {});
  Object.keys(payload).map((key) => {
    if ((payload[key] && payload[key] !== 'undefined') || payload[key] === false) { // Do not remove key if its false or it has some value
      transformedPayload[key] = payload[key];
    }
  });
  config.data = transformedPayload;
  return config;
};

export const removeNull = (obj = {}) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  });
  return obj;
};
