import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as qrgpn from '../QRGpn.thunks';
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

describe('getQROnboard function', () => {
  it('valid response, should go to QROnboard', () => {
    const expectedActions = [
      {'routeName': 'QROnboard', 'type': 'Navigation/NAVIGATE'}
    ];

    const store = mockStore();
    store.dispatch(qrgpn.getQROnboard());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('getQRGpn function', () => {
  xit('valid response, should go to QRGpnScreen', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'params': ['test'], 'routeName': 'QRGpnScreen', 'type': 'Navigation/NAVIGATE'},
      {'payload': ['test'], 'type': 'QR_MERCHANT_UPDATE'},
      {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(qrgpn.getQRGpn()).then(() => {
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
    return store.dispatch(qrgpn.getQRGpn()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getQRGpnReopen function', () => {
  xit('valid response, should go to QRGpnScreen', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}], 'index': 0, 'type': 'Navigation/RESET'},
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'params': ['test'], 'routeName': 'QRGpnScreen', 'type': 'Navigation/NAVIGATE'},
      {'payload': ['test'], 'type': 'QR_MERCHANT_UPDATE'},
      {'type': 'SPINNER_HIDE'}
    ];
    const store = mockStore();
    return store.dispatch(qrgpn.getQRGpnReopen()).then(() => {
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
      {'type': 'SPINNER_HIDE'},
    ];
    return store.dispatch(qrgpn.getQRGpnReopen()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getMerchantTerminal function', () => {
  xit('valid response, should go to QRMerchantTerminal', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {result: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'params': {'merchantId': 'test', 'store_label': 'test', 'terminalList': ['test'], 'terminal_id': 'test'}, 'routeName': 'QRMerchantTerminal', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(qrgpn.getMerchantTerminal('test', 'test', 'test')).then(() => {
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
    return store.dispatch(qrgpn.getMerchantTerminal()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getMerchantDetail function', () => {
  it('valid response, should go to QRMerchantDetail', () => {
    const expectedActions = [
      {'params':
      {'detailData': [], 'merchantId': 'test'},
      'routeName': 'QRMerchantDetail', 'type': 'Navigation/NAVIGATE'}];

    const store = mockStore();
    store.dispatch(qrgpn.getMerchantDetail('test'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('deleteTerminal function', () => {
  xit('valid response, should go to QRTerminalDelStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
          {response_code: '00'}
      });
    });
    const expectedActions =  [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.deleteTerminal({})).then(() => {
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
    return store.dispatch(qrgpn.deleteTerminal()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getTerminalEdit function', () => {
  it('valid response, should go to QRTerminalEdit', () => {
    const expectedActions = [
      {'params':
      {'data': 'test'},
      'routeName': 'QRTerminalEdit', 'type': 'Navigation/NAVIGATE'}];

    const store = mockStore();
    store.dispatch(qrgpn.getTerminalEdit('test'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('getTerminalEditConfirm function', () => {
  it('valid response, should go to QRTerminalEditConfirm', () => {
    const expectedActions = [
      {'params':
      {'form': {}, 'detailData': 'test'},
      'routeName': 'QRTerminalEditConfirm', 'type': 'Navigation/NAVIGATE'}];

    const store = mockStore();
    store.dispatch(qrgpn.getTerminalEditConfirm('test'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('getTerminalEditResult function', () => {
  xit('valid response, should go to QRTerminalEditStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'routeName': 'QRTerminalEditStatus', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(qrgpn.getTerminalEditResult()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('valid response, should go to QRTerminalEditStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {response_code: '00'}
      });
    });
    const expectedActions =  [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'},
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'params': {'data': 'test'},
        'routeName': 'QRTerminalEditStatus', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.getTerminalEditResult('test')).then(() => {
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
      {'type': 'CLEAR_APP_TIMEOUT'},
      {
        'meta': {
          'form': [
            'QRTerminalEdit'
          ]
        },
        'type': '@@redux-form/DESTROY'
      }, {
        'meta': {
          'form': [
            'QRTerminalEditConfirm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },

    ];
    return store.dispatch(qrgpn.getTerminalEditResult()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('resetTerminal function', () => {
  xit('valid response, should go to QRTerminalResetStatus', () => {
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
      {'params': {'data': 'test'},
        'routeName': 'QRTerminalResetStatus', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(qrgpn.resetTerminal('test')).then(() => {
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
    return store.dispatch(qrgpn.resetTerminal()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('QRRegisterStatus function', () => {
  it('valid response, should go to QRRegisterStatus', () => {
    const expectedActions = [
      {'routeName': 'QRRegisterStatus', 'type': 'Navigation/NAVIGATE'}];

    const store = mockStore();
    store.dispatch(qrgpn.QRRegisterStatus());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRRegisterComplete function', () => {
  xit('valid response, should go to QRRegisterComplete function', () => {
    const expectedActions =  [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}], 'index': 0, 'type': 'Navigation/RESET'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRRegisterComplete());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRStatusComplete function', () => {
  it('valid response, should go to HomeScreen', () => {
    const expectedActions =  [
      {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}
    ];
    const store = mockStore();
    store.dispatch(qrgpn.QRStatusComplete());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRCustomer function', () => {
  it('valid response, should go to GPIssuer', () => {
    const expectedActions =  [
      {
        'meta': {
          'form': [
            'QRInvoiceForm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {
        'meta': {
          'form': [
            'QRconfirm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {'routeName': 'GPNIssuer', 'type': 'Navigation/NAVIGATE'}
    ];
    const store = mockStore();
    store.dispatch(qrgpn.QRCustomer());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRMerchantInquiry function', () => {
  xit('valid response, should go to QRTerminalResetStatus', () => {
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
      {'type': 'SPINNER_HIDE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.QRMerchantInquiry('REFF')).then(() => {
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
    return store.dispatch(qrgpn.QRMerchantInquiry('REFF')).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('goToRefundCreate function', () => {
  it('valid response, should go to QRRefundCreate', () => {
    const expectedActions = [
      {'params': {'merchantId': {}}, 'routeName': 'QRRefundCreate',
        'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.goToRefundCreate({}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('goToRefundCode function', () => {
  xit('valid response, should go to QRTerminalResetStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions =  [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'params': {'codeList': ['test'], 'merchantId': 'test'},
        'routeName': 'QRRefundCode', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.goToRefundCode('test')).then(() => {
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
    return store.dispatch(qrgpn.goToRefundCode('')).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('getRefundCode function', () => {
  xit('valid response, should go to QRRefundStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'meta': {'form': ['QRRefundCreate']}, 'type': '@@redux-form/DESTROY'},
      {'params': {'form': {}}, 'routeName': 'QRRefundStatus', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.getRefundCode()).then(() => {
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
    return store.dispatch(qrgpn.getRefundCode('')).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('goToRefundInfo function', () => {
  it('valid response, should go to QRRefundInfo', () => {
    const expectedActions = [
      {'params': {'data': {}}, 'routeName': 'QRRefundInfo',
        'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.goToRefundInfo({}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRInvoice function', () => {
  xit('valid response, should go to QRInvoice', () => {
    const expectedActions = [
      {'params': {'data': {}, 'transRefNum': ''}, 'routeName': 'QRInvoice',
        'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRInvoice({}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRInvoiceConfirm function', () => {
  xit('valid response, should go to HomeScreen then QRConfirm', () => {
    const expectedActions = [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'},
      {'params':
        {'data': {}, 'jsonDt': [], 'transRefNum': ''},
      'routeName': 'QRConfirm', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRInvoiceConfirm({}, []));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRPay function', () => {
  xit('valid response, should go to HomeScreen then QRConfirm', () => {
    const expectedActions = [];
    const store = mockStore();
    store.dispatch(qrgpn.QRPay({}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRTerminalRegister function', () => {
  it('valid response, should go to QRTerminalRegister', () => {
    const expectedActions = [
      {'params':
      {'merchantId': '', 'merchant_criteria': '', 'terminalList': ''},
      'routeName': 'QRTerminalRegister', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRTerminalRegister('', '', ''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRTerminalConfirmation function', () => {
  it('valid response, should go to QRTerminalConfirmation', () => {
    const expectedActions = [
      {'params':
      {'form': {}, 'merchantId': '', 'merchant_criteria': '', 'terminalList': ''},
      'routeName': 'QRTerminalConfirmation', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRTerminalConfirmation('', '', ''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRTerminalResult function', () => {
  xit('valid response, should go to QRTerminalResult', () => {
    const expectedActions = [];
    const store = mockStore();
    store.dispatch(qrgpn.QRTerminalResult());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRdynamicPage function', () => {
  xit('valid response, should go to QRdynamicPage', () => {
    const expectedActions = [
      {'params': '',
        'routeName': 'QRdynamicPage', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRdynamicPage(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRMerchantRegister function', () => {
  xit('valid response, should go to QRMerchantRegister', () => {
    const expectedActions = [
      {'routeName': 'QRMerchantRegister', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRMerchantRegister(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRRegisterConfirmation function', () => {
  xit('valid response, should go to QRRegisterConfirmation', () => {
    const expectedActions = [
      {'params': {'form': {}},
        'routeName': 'QRRegisterConfirmation', 'type': 'Navigation/NAVIGATE'},
      {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRRegisterConfirmation(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRRegisterResult function', () => {
  xit('valid response, should go to QRRegisterStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {responseCode: '99'},
      });
    });
    const expectedActions = [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'},
      {'type': 'SPINNER_SHOW'}, {'type': 'CLEAR_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}, {'params': {'merchantId': ''},
        'routeName': 'QRRegisterStatus', 'type': 'Navigation/NAVIGATE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.QRRegisterResult()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('valid response, should go to QRRegisterStatus', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
        {responseCode: '00'},
      });
    });
    const expectedActions = [
      {'actions': [
        {'routeName': 'HomeScreen', 'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'}, {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
      {'params': {'merchantId': ''},
        'routeName': 'QRRegisterStatus', 'type': 'Navigation/NAVIGATE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.QRRegisterResult()).then(() => {
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
      {'type': 'CLEAR_APP_TIMEOUT'},
      {
        'meta': {
          'form': [
            'QRMerchantRegister'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {
        'meta': {
          'form': [
            'QRRegisterConfirmation'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
    ];
    return store.dispatch(qrgpn.QRRegisterResult('')).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('showQRTrf function', () => {
  xit('valid response, should go to showQRTrf', () => {
    const expectedActions = [
      {
        'meta': {
          'form': [
            'QRTransfer'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {'routeName': 'showQRTrf', 'type': 'Navigation/NAVIGATE'},
    ];
    const store = mockStore();
    store.dispatch(qrgpn.showQRTrf(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRWithdrawalConfirm function', () => {
  xit('valid response, should go to QRWithdrawalConfirm', () => {
    const expectedActions = [
      {'form': {}, 'jsonDt': [],
        'params': '', 'routeName': 'QRWithdrawalConfirm',
        'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRWithdrawalConfirm('', []));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRChooseMenu function', () => {
  xit('valid response, should go to GPNIssuer', () => {
    const expectedActions = [
      {
        'meta': {
          'form': [
            'QRInvoiceForm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {'routeName': 'GPNIssuer', 'type': 'Navigation/NAVIGATE'},
    ];
    const store = mockStore();
    store.dispatch(qrgpn.QRChooseMenu(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('WithdrawalForOther function', () => {
  xit('valid response, should go to GPNIssuer', () => {
    const expectedActions = [
      {
        'meta': {
          'form': [
            'QRInvoiceForm'
          ]
        },
        'type': '@@redux-form/DESTROY'
      },
      {'routeName': 'CardLessWithdrawalIndex', 'type': 'Navigation/NAVIGATE'},
    ];
    const store = mockStore();
    store.dispatch(qrgpn.WithdrawalForOther(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('QRCustomerS function', () => {
  xit('valid response, should go to GPNIssuer', () => {
    const expectedActions = [
      {'meta':
      {'form': ['QRInvoiceForm']},
      'type': '@@redux-form/DESTROY'},
      {'choosenMenu': '', 'routeName': 'QRScanScreen',
        'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(qrgpn.QRCustomerS(''));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('checkValidityCouponQR function', () => {
  xit('valid response, should go to check Copun validity', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}];

    const store = mockStore();
    return store.dispatch(qrgpn.checkValidityCouponQR()).then(() => {
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
    return store.dispatch(qrgpn.checkValidityCouponQR('')).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});