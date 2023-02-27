import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as navigation from '../navigation.thunks';
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

describe('reset to landing and navigate function', () => {
  xit('valid response, should go to login screen if lock down device', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'type': 'CLEAR_APP_TIMEOUT'}, 
      {'payload': {'data': 'test'}, 
        'type': 'SAVE_REGEX_PASSWORD_POLICY'}
    ];
    const store = mockStore();
    return store.dispatch(navigation.getRegexPasswordPolicy()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  
  xit('valid response, if not lockdown device will landing', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {message: 'test'},
      });
    });
    const store = mockStore();
    const expectedActions = [{'type': 'CLEAR_APP_TIMEOUT'}];
    return store.dispatch(navigation.getRegexPasswordPolicy()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});