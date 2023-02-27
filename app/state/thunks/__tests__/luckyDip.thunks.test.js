import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as luckyDip from '../luckyDip.thunks';
import moxios from 'moxios';
import {Toast} from '../../../utils/RNHelpers.util';

const toastSpy = jest.spyOn(Toast, 'show');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  moxios.install();
});

describe('luckyDipSendDataAddress function', () => {
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
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.luckyDipSendDataAddress('')).then(() => {
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
    return store.dispatch(luckyDip.luckyDipSendDataAddress()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('luckyDipGetHistory function', () => {
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
      {'params': {
        'listPrize': [],
        'pathRoute': undefined},
      'routeName': 'LuckyDipHistoryPage',
      'type': 'Navigation/NAVIGATE',
      }
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.luckyDipGetHistory()).then(() => {
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
    return store.dispatch(luckyDip.luckyDipGetHistory()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('trackingHistory function', () => {
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
      {'params': {
        'buttonOff': true,
        'reward': undefined,
        'trackingNumber': '',
        'values': undefined},
      'routeName': 'LuckyDipInformationDetailPage',
      'type': 'Navigation/NAVIGATE',
      }
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.trackingHistory()).then(() => {
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
    return store.dispatch(luckyDip.trackingHistory()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getLuckyDipTicket function', () => {
  const mockedDate = new Date(1989, 7, 18);
  global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: {
          'userToken': {
            'redeemCounter': '20',
            'id': '112'
          }
        }
        }
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {
        'currentToken': '0',
        'formatTimeserver': '1989/08/18 0:00',
        'gapTimeEndedServer': 0,
        'gaptimeServeLocal': 0,
        'localTime': '1989/08/18 0:00',
        'timeServerCurrent': 0,
        'tokenId': '0',
        'totalGapLocalServer': 0
      },
      'type': 'SAVE_TICKET_LD_CACHE'},
      {'payload': {
        'currentToken': '0',
        'tokenId': '0'
      },
      'type': 'SAVE_LUCKY_DIP'}
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.getLuckyDipTicket()).then(() => {
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
    return store.dispatch(luckyDip.getLuckyDipTicket()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getProvinceList function', () => {
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
      {'payload': [],
        'type': 'SAVE_PROVINCE_LIST'},
      {'type': 'SPINNER_HIDE'},
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.getProvinceList()).then(() => {
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
    return store.dispatch(luckyDip.getProvinceList()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getCityList function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: []},
      });
    });
    const expectedActions = [
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.getCityList()).then(() => {
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
    return store.dispatch(luckyDip.getCityList()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getDistrictList function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.getDistrictList()).then(() => {
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
    return store.dispatch(luckyDip.getDistrictList()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getSubDistrictList function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
    ];
    const store = mockStore();
    return store.dispatch(luckyDip.getSubDistrictList()).then(() => {
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
    return store.dispatch(luckyDip.getSubDistrictList()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getLocalDataAddress function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(luckyDip.getLocalDataAddress());
  });
});