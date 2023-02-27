import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as digitalStore from '../digitalStore.thunks';
import moxios from 'moxios';
import {Toast} from '../../../utils/RNHelpers.util';

jest.mock('@react-native-community/geolocation');

const toastSpy = jest.spyOn(Toast, 'show');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  moxios.install();
});

describe('listCategoryProduct function', () => {
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
      {
        'payload': [],
        'type': 'SAVE_ALL_PRODUCT_MERCHANT_CATEGORY'
      },
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.listCategoryProduct('')).then(() => {
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
    return store.dispatch(digitalStore.listCategoryProduct()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// describe('seeAllCategory function', () => {
//   xit('valid response, should dispatch to reducer', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {data: 'test'},
//       });
//     });
//     const expectedActions = [
//       {
//         'routeName': 'CategoryAlfacart',
//         'type': 'Navigation/NAVIGATE',
//       },
//     ];
//     const store = mockStore();
//     return store.dispatch(digitalStore.seeAllCategory('')).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it('invalid response, should show toast', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.reject({
//         status: 400,
//         response: {message: 'test'},
//       });
//     });
//     const store = mockStore();
//     const expectedActions = [{'type': 'CLEAR_APP_TIMEOUT'}];
//     return store.dispatch(digitalStore.seeAllCategory()).catch(() => {
//       expect(toastSpy).toBeCalled();
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

describe('detailProduct function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'params': {'productDetail': []}, 'routeName': 'DetailProductMerchant', 'type': 'Navigation/NAVIGATE'},
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.detailProduct('')).then(() => {
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
    return store.dispatch(digitalStore.detailProduct()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('detailCategory function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': {
        'status': 'loading'
      },
      'type': 'EMONEY_UPDATE'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'EMONEY_UPDATE'},
      {'type': 'ACCOUNTS_UPDATE_BALANCE_EMONEY'}

    ];
    const store = mockStore();
    return store.dispatch(digitalStore.detailCategory('')).then(() => {
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
    return store.dispatch(digitalStore.detailCategory()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('listAllProduct function', () => {
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
      {'type': 'SPINNER_HIDE'},

    ];
    const store = mockStore();
    return store.dispatch(digitalStore.listAllProduct('')).then(() => {
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
    return store.dispatch(digitalStore.listAllProduct()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('filterCartProduct function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': [],
        'type': 'SAVE_ALL_PRODUCT_MERCHANT',
      },
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.filterCartProduct('')).then(() => {
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
    return store.dispatch(digitalStore.filterCartProduct()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('checkoutPurchaseOrder function', () => {
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
      {'type': 'SPINNER_HIDE'},
      {'meta': {
        'form': ['loginEasyPinForm']},
      'type': '@@redux-form/DESTROY'
      }
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.checkoutPurchaseOrder('')).then(() => {
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
    return store.dispatch(digitalStore.checkoutPurchaseOrder()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('listaddress function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': [],
        'type': 'SAVE_SHIPMENT_MERCHANT',
      },
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.listaddress('')).then(() => {
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
    return store.dispatch(digitalStore.listaddress()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('couponCustomerMerchant function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': {'billerCode': undefined}, 'type': 'SAVE_BILLERCODE'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'params': {
        'billerCode': undefined,
        'privateVoucher': [],
        'publicVoucher': [],
        'transactionAmount': '',
      },
      'routeName': 'CouponList',
      'type': 'Navigation/NAVIGATE',
      }
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.couponCustomerMerchant('')).then(() => {
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
    return store.dispatch(digitalStore.couponCustomerMerchant()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Purchaseorderalfa function', () => {
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
    return store.dispatch(digitalStore.getPurchaseOrderAlfa('')).then(() => {
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
    return store.dispatch(digitalStore.getPurchaseOrderAlfa()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('listaddressalfa function', () => {
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
      {'params': {
        'isNew': true,
      },
      'routeName': 'FormFillAlfaAddress',
      'type': 'Navigation/NAVIGATE',
      },
      {'type': 'SPINNER_HIDE'},
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.listaddressAlfa('')).then(() => {
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
    return store.dispatch(digitalStore.listaddressAlfa()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('listPickupAlfa function', () => {
  xit('valid response, should dispatch to reducer', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {
        'addressList': '',
        'storeList': [],
      }
      },
      {'type': 'SAVE_ALL_SHIPMENT_ADDRESS_ALFA'},
      {
        'routeName': 'AlfacartShippingMethodReal',
        'type': 'Navigation/NAVIGATE',
      },
      {'type': 'SPINNER_HIDE'},
    ];
    const store = mockStore();
    return store.dispatch(digitalStore.listPickupAlfa('')).then(() => {
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
    return store.dispatch(digitalStore.listPickupAlfa()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
