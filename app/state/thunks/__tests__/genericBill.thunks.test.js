import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as genericBill from '../genericBill.thunks';
import moxios from 'moxios';
import {Toast} from '../../../utils/RNHelpers.util';
import * as common from '../common.thunks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const toastSpy = jest.spyOn(Toast, 'show');

beforeEach(() => {
  moxios.install();
});
afterEach(() => {//eslint-disable-line
  moxios.uninstall();
});

// describe('getQROnboard function', () => {
//   it('valid response, should go to QROnboard', () => {
//     const expectedActions = [
//       {'routeName': 'QROnboard', 'type': 'Navigation/NAVIGATE'}
//     ];

//     const store = mockStore();
//     store.dispatch(qrgpn.getQROnboard());
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

describe('getAmountForGenericBillerTypeOne function', () => {
  xit('valid response, should go to getAmountForGenericBillerTypeOne', () => {
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
    return store.dispatch(genericBill.getAmountForGenericBillerTypeOne()).then(() => {
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
    return store.dispatch(genericBill.getAmountForGenericBillerTypeOne()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('confirmGenericBillTypeOne function', () => {
  xit('valid response, should go to confirmGenericBillTypeOne', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_COUPON'},
      {'payload': {'description': ''}, 'type': 'SAVE_BILLER_FAV'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'CLEAR_CONTROLLER_USINGCOUPON'},
      {'payload': {'billerCode': ''}, 'type': 'SAVE_BILLERCODE'}
    ];
    const store = mockStore();
    return store.dispatch(genericBill.confirmGenericBillTypeOne()).then(() => {
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
    return store.dispatch(genericBill.confirmGenericBillTypeOne()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('detailGenericBillTypeOne function', () => {
  xit('valid response, should go to detailGenericBillTypeOne', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_COUPON'},
      {'payload': {'description': ''}, 'type': 'SAVE_BILLER_FAV'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'CLEAR_CONTROLLER_USINGCOUPON'},
      {'payload': {'billerCode': ''}, 'type': 'SAVE_BILLERCODE'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore();
    return store.dispatch(genericBill.detailGenericBillTypeOne()).then(() => {
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
    return store.dispatch(genericBill.detailGenericBillTypeOne()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('payGenericBillTypeOne function', () => {
  xit('valid response, should go to payGenericBillTypeOne', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    common.getBillpayHistory = () => () => Promise.resolve();
    common.errorResponseResult = () => () => Promise.resolve();
    const expectedActions = [
      {'payload': '', 'type': 'SAVE_PAYMENT_STATUS_COUPON'},
      {'payload': {'accountFrom': '', 
        'amount': 'Rp --',
        'billerList': [],
        'custPoin': '',
        'custPoinCurrenncy': '',
        'generalCode': undefined,
        'heading': '',
        'isGenericBiller': 'yes',
        'isNewBiller': true,
        'isUseSimas': undefined,
        'resData': {},
        'subheading': 'undefined',
        'transactionId': undefined,
        'transactionType': 'Pembayaranundefined',
        'autoDebitDate': '',
        'autoDebitStartDate': 'Invalid date',
        'isAutodebitRegis': false,
        'type': 'LOADING'}, 'type': 'PAYMENT_MODAL_SHOW'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'actions': [{'routeName': 'Landing',
        'type': 'Navigation/NAVIGATE'}],     
      'index': 0,
      'type': 'Navigation/RESET'},
      {'routeName': 'PaymentStatusNewOnboarding', 'type': 'Navigation/NAVIGATE'},
      {'meta': {
        'form': [
          'BillerTypeOneIndexForm',
        ],
      },
      'type': '@@redux-form/DESTROY',
      },
      {'meta': {
        'form': [
          'BillerTypeOnePayment',
        ],
      },
      'type': '@@redux-form/DESTROY',
      },
      {'meta': {
        'form': [
          'BillerTypeOneConfirmationForm',
        ],
      },
      'type': '@@redux-form/DESTROY',
      },
      {'type': 'CLEAR_TRANS_REF_NUM'},
      {'type': 'CLEAR_COUPON'},
      {'type': 'CLEAR_BILLER_FAV'},
      {'type': 'CLEAR_PGO_VA_STATUS'}
    ];
    const store = mockStore();
    return store.dispatch(genericBill.payGenericBillTypeOne()).then(() => {
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
      {'payload': '', 'type': 'SAVE_PAYMENT_STATUS_COUPON'},
      {'payload': {'accountFrom': '', 
        'amount': 'Rp --',
        'billerList': [],
        'custPoin': '',
        'custPoinCurrenncy': '',
        'generalCode': undefined,
        'heading': '',
        'isGenericBiller': 'yes',
        'isUseSimas': undefined,
        'resData': {},
        'subheading': 'undefined',
        'transactionId': undefined,
        'transactionType': 'Pembayaranundefined',
        'type': 'LOADING'}, 'type': 'PAYMENT_MODAL_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}
    ];
    return store.dispatch(genericBill.payGenericBillTypeOne()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('confirmGenericBillTypeTwo function', () => {
  xit('valid response, should go to confirmGenericBillTypeTwo', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_COUPON'},
      {'payload': {'description': ''}, 'type': 'SAVE_BILLER_FAV'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'CLEAR_CONTROLLER_USINGCOUPON'},
      {'payload': {'billerCode': ''}, 'type': 'SAVE_BILLERCODE'}
    ];
    const store = mockStore();
    return store.dispatch(genericBill.confirmGenericBillTypeOne()).then(() => {
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
    return store.dispatch(genericBill.confirmGenericBillTypeTwo()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('detailGenericBillTypeTwo function', () => {
  xit('valid response, should go to detailGenericBillTypeTwo', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_COUPON'},
      {'payload': {'description': ''}, 'type': 'SAVE_BILLER_FAV'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'CLEAR_CONTROLLER_USINGCOUPON'},
      {'payload': {'billerCode': ''}, 'type': 'SAVE_BILLERCODE'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore();
    return store.dispatch(genericBill.detailGenericBillTypeOne()).then(() => {
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
    return store.dispatch(genericBill.detailGenericBillTypeTwo()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('payGenericBillTypeTwo function', () => {
  xit('valid response, should go to payGenericBillTypeTwo', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    common.getBillpayHistory = () => () => Promise.resolve();
    common.errorResponseResult = () => () => Promise.resolve();
    const expectedActions = [
      {'payload': '', 'type': 'SAVE_PAYMENT_STATUS_COUPON'},
      {'payload': {'accountFrom': '', 
        'amount': 'Rp --',
        'heading': '',
        'isGenericBiller': 'yes',
        'isUseSimas': undefined,
        'resData': {},
        'subheading': 'undefined',
        'transactionId': undefined,
        'transactionType': 'Pembayaranundefined',
        'autoDebitDate': '',
        'autoDebitStartDate': 'Invalid date',
        'isAutodebitRegis': false,
        'type': 'LOADING'}, 'type': 'PAYMENT_MODAL_SHOW'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'actions': [{'routeName': 'Landing',
        'type': 'Navigation/NAVIGATE'}],     
      'index': 0,
      'type': 'Navigation/RESET'},
      {'routeName': 'PaymentStatusNewOnboarding', 'type': 'Navigation/NAVIGATE'},
      {'meta': {
        'form': [
          'BillerTypeTwoIndexForm',
        ],
      },
      'type': '@@redux-form/DESTROY',
      },
      {'meta': {
        'form': [
          'BillerTypeTwoPayment',
        ],
      },
      'type': '@@redux-form/DESTROY',
      },
      {'meta': {
        'form': [
          'BillerTypeTwoConfirmationForm',
        ],
      },
      'type': '@@redux-form/DESTROY',
      },
      {'type': 'CLEAR_TRANS_REF_NUM'},
      {'type': 'CLEAR_COUPON'},
      {'type': 'CLEAR_BILLER_FAV'}
    ];
    const store = mockStore();
    return store.dispatch(genericBill.payGenericBillTypeTwo()).then(() => {
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
      {'payload': '', 'type': 'SAVE_PAYMENT_STATUS_COUPON'},
      {'payload': {'accountFrom': '', 
        'amount': 'Rp --',
        'billerList': [],
        'custPoin': '',
        'custPoinCurrenncy': '',
        'generalCode': undefined,
        'heading': '',
        'isGenericBiller': 'yes',
        'isUseSimas': undefined,
        'resData': {},
        'subheading': 'undefined',
        'transactionId': undefined,
        'transactionType': 'Pembayaranundefined',
        'type': 'LOADING'}, 'type': 'PAYMENT_MODAL_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}
    ];
    return store.dispatch(genericBill.payGenericBillTypeTwo()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});


describe('confirmGenericBillTypeThree function', () => {
  xit('valid response, should go to confirmGenericBillTypeThree', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {merchantList: ['test']},
      });
    });
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': {'description': ''}, 'type': 'SAVE_BILLER_FAV'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {'billerCode': ''}, 'type': 'SAVE_BILLERCODE'},
      {'type': 'CLEAR_CONTROLLER_USINGCOUPON'}
    ];
    const store = mockStore();
    return store.dispatch(genericBill.confirmGenericBillTypeThree()).then(() => {
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
    return store.dispatch(genericBill.confirmGenericBillTypeThree()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
