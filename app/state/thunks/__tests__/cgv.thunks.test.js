import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as cgv from '../cgv.thunks';
import moxios from 'moxios';
import {Toast} from '../../../utils/RNHelpers.util';

const toastSpy = jest.spyOn(Toast, 'show');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  moxios.install();
});

describe('getSeatLayout function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'}, 
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, 
      {'type': 'SPINNER_HIDE'}, 
      {'params': 
      {'scheduleData': '', 'seatData': {'data': 'test'}
      }, 'routeName': 'SelectSeat', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    return store.dispatch(cgv.getSeatLayout('')).then(() => {
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
    const expectedActions = [{'type': 'CLEAR_APP_TIMEOUT'}];
    return store.dispatch(cgv.getSeatLayout()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});