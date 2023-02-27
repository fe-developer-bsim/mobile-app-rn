import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as profile from '../profile.thunks';
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

describe('verifyPassword function', () => {
  xit('valid response, should go to nextRouteName', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'type': 'CLEAR_APP_TIMEOUT'},
      {'params': {'password': 'test'}, 'routeName': 'test', 'type': 'Navigation/NAVIGATE'},
    ];
    const store = mockStore();
    return store.dispatch(profile.verifyPassword('test', 'test')).then(() => {
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
    const expectedActions = [{'type': 'CLEAR_APP_TIMEOUT'},
      {
        'meta': {
          'form': [
            'validatePasswordForm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
    ];
    return store.dispatch(profile.verifyPassword()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('changePassword function', () => {
  xit('valid response, should show alert', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {
        'meta': {
          'form': [
            'validatePasswordForm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {
        'meta': {
          'form': [
            'CreateNewPassword'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
    ];
    const store = mockStore();
    return store.dispatch(profile.changePassword('test')).then(() => {
      window.alert = jest.fn();
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
    const expectedActions = [
      {'type': 'SPINER_SHOW'},
      {'type': 'CLEAR_APP_TIMEOUT'},
      {'type': 'HIDE_SPINNER'}
    ];
    return store.dispatch(profile.changePassword('')).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('changeEasyPin function', () => {
  xit('valid response, should show alert', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(profile.changeEasyPin({})).then(() => {
      window.alert = jest.fn();
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
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}
    ];
    return store.dispatch(profile.changeEasyPin()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('offerClickHandler function', () => {
  xit('valid response, should go to', () => {
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    store.dispatch(profile.offerClickHandler());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('changeFaceRecognition function', () => {
  xit('valid response, should go to', () => {
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}];
    const store = mockStore();
    store.dispatch(profile.changeFaceRecognition());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('changeFingerprint function', () => {
  xit('valid response, should go to', () => {
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}];
    const store = mockStore();
    store.dispatch(profile.changeFingerprint());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('changeFaceRecognitionOff function', () => {
  xit('valid response, should go to', () => {
    const expectedActions =  [{'type': 'IS_USING_FACE_RECOG_UPDATE'}];
    const store = mockStore();
    store.dispatch(profile.changeFaceRecognitionOff());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('changeFingerprintOff function', () => {
  xit('valid response, should go to', () => {
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}];
    const store = mockStore();
    store.dispatch(profile.changeFingerprintOff());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('movieClick function', () => {
  it('valid response, should go to CgvMovieDetail', () => {
    const expectedActions =  [
      {'params':
        {'movieData': 'test', 'tipe': 'test'}, 'routeName': 'CgvMovieDetail',
      'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(profile.movieClick('test', 'test'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('CgvSchedule function', () => {
  xit('valid response, should go to', () => {
    const expectedActions =  [];
    const store = mockStore();
    store.dispatch(profile.CgvSchedule('test', 'test'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
