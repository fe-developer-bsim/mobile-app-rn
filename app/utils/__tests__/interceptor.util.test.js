import {setEnv} from '../../config/env.config';
import {createStore} from 'redux';
import {post, initializeHTTPInterceptors} from '../http.util';
import {demoAccountInterceptor, getNoNetWorkInterceptor, getStatusValidatorInterceptor, addDefaultPayloadInterceptor, removeFalsyValues} from '../interceptors.util';
import replaceObject from 'replace-object-content';

jest.mock('../../config/api.config');
jest.mock('../../config/env.config.js');

describe('Interceptor utility', () => {
  const functionSpy = jest.fn();
  beforeEach(() => {
    setEnv('MOCKAPI', false);
  });

  let store = createStore(() => ({}));
  initializeHTTPInterceptors(store);

  it('mock interceptors: sets mock data on env:mock', () => {
    setEnv('MOCKAPI', true);
    return post('MOCKTEST', {}, {}, functionSpy).then((res) => {
      expect(res.statusText).toEqual('OK - Mocked request');
    });
  });

  it('defaultPayload interceptor: adds defaultPayload', () => {
    replaceObject(store.getState(), {additionalApiPayload: {a: 1, b: 2}});
    const interceptor = addDefaultPayloadInterceptor(store);
    const getConfig = {
      method: 'get',
      test: 1
    };
    expect(interceptor(getConfig)).toEqual({'method': 'get', 'test': 1});
    const postConfig = {
      method: 'post',
      data: {test: 1},
      additional: ['a']
    };
    expect(interceptor(postConfig).data).toEqual({'a': 1, 'test': 1});
  });

  it('getNoNetWorkInterceptor: rejects any api request if there is no network present', () => {
    const API = 'TEST';
    replaceObject(store.getState(), {networkStatus: {isConnected: false}});
    return post(API, {}, {}, functionSpy).catch((err) => {
      const expectedError =  {'data': {'notConnected': true}};
      expect(err).toEqual(expectedError);
    });
  });

  it('getNoNetWorkInterceptor: resolves api request if there is network present', () => {
    const config = {test: 'TEST'};
    store = createStore(() => ({networkStatus: {isConnected: true}}));
    const noNetworkInterceptor = getNoNetWorkInterceptor(store);
    expect(noNetworkInterceptor(config)).toEqual(config);
  });

  it('demoAccountInterceptor: if demo account reject all except balance , get and login', () => {
    const config = {
      data: {ipassport: 'DEMO-123456'}
    };
    expect(demoAccountInterceptor(config)).toEqual(null);
    expect(demoAccountInterceptor({data: {ipassport: 'TEST12345'}})).toEqual({'data': {'ipassport': 'TEST12345'}});
  });

  it('getStatusValidatorInterceptor: it should reject if status is not 200 to 300', () => {
    const response = {
      status: 200,
      data: {test: 1}
    };
    const failedResponse = {
      status: 401,
      data: {err: 'test'}
    };
    store.dispatch = jest.fn(store.dispatch);

    const error = new Error({status: 400, failedResponse});
    expect(getStatusValidatorInterceptor(store)(response)).toEqual({'data': {'test': 1}, 'status': 200});
    expect(() => getStatusValidatorInterceptor(store)(failedResponse)).toThrow(error);
    expect(store.dispatch).toHaveBeenCalledWith({'type': 'CLEAN_APP_STATE'});
  });

  it('removeFalsyValues:  should remove falsy values from the payload', () => {
    const passedConfig = {data: {a: '', b: 'undefined', c: null, d: 3, e: ' ', f: false}, test: 'TEST'};
    const expectedConfig = {data: {d: 3, e: ' ', f: false}, test: 'TEST'};
    expect(removeFalsyValues(passedConfig)).toEqual(expectedConfig);
    expect(removeFalsyValues(undefined)).toEqual({data: {}});
  });
  it('removeFalsyValues: should work only for post requests', () => {
    expect(removeFalsyValues({method: 'get'})).toEqual({method: 'get'});
  });
});
