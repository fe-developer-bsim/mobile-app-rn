import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as passwordpolicy from '../passwordPolicyRegex.thunks';
import moxios from 'moxios';
import {Toast} from '../../../utils/RNHelpers.util'; 

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const toastSpy = jest.spyOn(Toast, 'show');

beforeEach(() => {
  moxios.install();
});
afterEach(() => {//eslint-disable-line
  moxios.uninstall();
});

describe('getRegexPasswordPolicy function', () => {
  xit('valid response, should go to QRGpnScreen', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, 
      {'payload': {'data': 'test'}, 
        'type': 'SAVE_REGEX_PASSWORD_POLICY'}
    ];
    const store = mockStore();
    return store.dispatch(passwordpolicy.getRegexPasswordPolicy()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  
  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {message: 'test'},
      });
    });
    const store = mockStore();
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    return store.dispatch(passwordpolicy.getRegexPasswordPolicy()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});