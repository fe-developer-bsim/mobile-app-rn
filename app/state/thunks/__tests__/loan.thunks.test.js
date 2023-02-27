import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as loan from '../loan.thunks';
import moxios from 'moxios';
import {Toast} from '../../../utils/RNHelpers.util';

const toastSpy = jest.spyOn(Toast, 'show');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  moxios.install();
});

describe('saveLoanDataPgoAcceptOnly function', () => {
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
      {'type': 'SPINNER_SHOW'},
      {'params': {'data': 'test'},
        'routeName': 'LoanSummaryPage',
        'type': 'Navigation/NAVIGATE',
      },
      {'type': 'SPINNER_HIDE'}
    ];
    const store = mockStore();
    return store.dispatch(loan.saveLoanDataPgoAcceptOnly('')).then(() => {
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
    return store.dispatch(loan.saveLoanDataPgoAcceptOnly()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('sendTrackingFivePointThree function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}
    ];
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFivePointThree()).then(() => {
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
    return store.dispatch(loan.sendTrackingFivePointThree()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('sendTrackingFivePointTwo function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}
    ];
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFivePointTwo()).then(() => {
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
    return store.dispatch(loan.sendTrackingFivePointTwo()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('sendTrackingFivePointFive function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}
    ];
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFivePointFive()).then(() => {
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
    return store.dispatch(loan.sendTrackingFivePointFive()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('sendTrackingFivePointFour function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFivePointFour());
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
    return store.dispatch(loan.sendTrackingFivePointFour());
  });
});

describe('sendTrackingFourPointOne function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointOne());
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
    return store.dispatch(loan.sendTrackingFourPointOne());
  });
});

describe('sendTrackingFourPointTwo function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointTwo());
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
    return store.dispatch(loan.sendTrackingFourPointTwo());
  });
});

describe('sendTrackingFourPointThree function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointThree());
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
    return store.dispatch(loan.sendTrackingFourPointThree());
  });
});

describe('sendTrackingFourPointFour function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointFour());
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
    return store.dispatch(loan.sendTrackingFourPointFour());
  });
});

describe('sendTrackingFourPointFive function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointFive());
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
    return store.dispatch(loan.sendTrackingFourPointFive());
  });
});

describe('sendTrackingFourPointFiveReload function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointFiveReload());
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
    return store.dispatch(loan.sendTrackingFourPointFiveReload());
  });
});

describe('sendTrackingFourPointSix function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointSix());
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
    return store.dispatch(loan.sendTrackingFourPointSix());
  });
});

describe('sendTrackingFourPointSeven function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointSeven());
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
    return store.dispatch(loan.sendTrackingFourPointSeven());
  });
});

describe('sendTrackingFourPointEight function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.sendTrackingFourPointEight());
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
    return store.dispatch(loan.sendTrackingFourPointEight());
  });
});

describe('RetakeSelfieCamera function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.RetakeSelfieCamera());
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
    return store.dispatch(loan.RetakeSelfieCamera());
  });
});

describe('saveLoanDataPgo function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.saveLoanDataPgo());
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
    return store.dispatch(loan.saveLoanDataPgo());
  });
});

describe('checkingCustomerKYC function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const store = mockStore();
    return store.dispatch(loan.checkingCustomerKYC());
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
    return store.dispatch(loan.checkingCustomerKYC());
  });
});