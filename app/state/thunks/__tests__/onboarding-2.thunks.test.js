import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as onboarding from '../onboarding.thunks';
import * as common from '../common.thunks';
import * as storage from '../../../utils/storage.util';
import moxios from 'moxios';
import tracker from '../../../utils/googleAnalytics.util';
import {Toast, Alert} from '../../../utils/RNHelpers.util';

const toastSpy = jest.spyOn(Toast, 'show');
const alertSpy = jest.spyOn(Alert, 'alert');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  moxios.install();
});
afterEach(() => {//eslint-disable-line
  moxios.uninstall();
});

describe('login function', () => {
  xit('should Login and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    storage.set = () => Promise.resolve();
    common.populateBanners = () => jest.fn();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': {'data': {}}, 'type': 'SAVE_CODE_ONBOARD'}, {'payload': {}, 'type': 'SAVE_GENERATE_CODE'}, {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'}, {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'}, {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'}, {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'}, {'payload': {'data': 'test'}, 'type': 'SAVE_CONFIG_TIME'}, {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}, {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'}, {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'}, {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'}, {'payload': [], 'type': 'SAVE_CC_LIST'}, {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({username: 'test', password: 'test', easyPin: 'test'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('should Login using mobile number and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ipassportData: {
            ipassDataClient: {
              profileScope: {
                userLogin: {mobileNumberMasking: '1234'}
              }
            }
          }
        }
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {'data': {}}, 'type': 'SAVE_CODE_ONBOARD'},
      {'payload': {}, 'type': 'SAVE_GENERATE_CODE'}, {'type': 'CLEAR_LOGIN'},
      {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'},
      {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'},
      {'payload': {'ipassportData': {'ipassDataClient': {'profileScope': {'userLogin': {'mobileNumberMasking': '1234'}}}}}, 'type': 'SAVE_CONFIG_TIME'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {'mobileNumberMasking': '1234'}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({username: 'test', password: 'test', easyPin: 'test'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('should Login ATM and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ipassportData: {
            ipassDataClient: {
              profileScope: {
                userLogin: {mobileNumberMasking: '1234'}
              }
            }
          }
        }
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': {'data': {}}, 'type': 'SAVE_CODE_ONBOARD'}, {'payload': {}, 'type': 'SAVE_GENERATE_CODE'}, {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'}, {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'}, {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'}, {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'}, {'payload': {'ipassportData': {'ipassDataClient': {'profileScope': {'userLogin': {'mobileNumberMasking': '1234'}}}}}, 'type': 'SAVE_CONFIG_TIME'}, {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}, {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'}, {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {'mobileNumberMasking': '1234'}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'}, {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'}, {'payload': [], 'type': 'SAVE_CC_LIST'}, {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({username: 'test', password: 'test', easyPin: 'test'}, false, false, false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('locked device and face already registered, should go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {isFaceRegister: true}
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': {'data': {}}, 'type': 'SAVE_CODE_ONBOARD'}, {'payload': {}, 'type': 'SAVE_GENERATE_CODE'}, {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'}, {'payload': {'isFaceRegistered': true}, 'type': 'IS_FACE_REGISTERED_UPDATE'}, {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'}, {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'}, {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'}, {'payload': {'isFaceRegister': true}, 'type': 'SAVE_CONFIG_TIME'}, {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}, {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'}, {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'}, {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'}, {'payload': [], 'type': 'SAVE_CC_LIST'}, {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({username: 'test', password: 'test', easyPin: 'test'}, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('Fingerprint login', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {attributeMap: {iPassport: '1234'}}
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': {'data': {}}, 'type': 'SAVE_CODE_ONBOARD'}, {'payload': {}, 'type': 'SAVE_GENERATE_CODE'}, {'payload': 'fingerprint', 'type': 'UPDATE_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'}, {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'}, {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'}, {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'}, {'payload': {'attributeMap': {'iPassport': '1234'}}, 'type': 'SAVE_CONFIG_TIME'}, {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}, {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'}, {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'}, {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'}, {'payload': [], 'type': 'SAVE_CC_LIST'}, {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('Fingerprint Login failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {attributeMap: {iPassport: '1234'}}
      });
    });
    tracker.trackEvent = jest.fn();
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({password: '', easyPin: '', username: ''})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(tracker.trackEvent).toBeCalled();
      expect(toastSpy).toBeCalled();
    });
  });

  xit('Dormant user and locked device', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: {responseCode: '05'}
      });
    });

    tracker.trackEvent = jest.fn();
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined,
        'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.login({password: 'a', easyPin: 'b', username: 'c'}, true)).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// ===========================================================================================

describe('loginToSimasPoinHistory function', () => {
  xit('should Login and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    storage.set = () => Promise.resolve();
    common.populateBanners = () => jest.fn();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'isFaceRegistered': false},
        'type': 'IS_FACE_REGISTERED_UPDATE'}, {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'}, {'payload': '', 'type': 'SAVE_USER_API_KEY'},
      {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'},
      {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null,
        'loginTime': null, 'profile': {}, 'referralCode': undefined, 'transRefNum': undefined},
      'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword',
        'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '',
      'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'},
      {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({username: 'test', password: 'test', easyPin: 'test'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('should Login using mobile number and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ipassportData: {
            ipassDataClient: {
              profileScope: {
                userLogin: {mobileNumberMasking: '1234'}
              }
            }
          }
        }
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'},
      {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null,
        'loginTime': null, 'profile': {'mobileNumberMasking': '1234'},
        'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword',
        'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '',
      'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'},
      {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({username: 'test', password: 'test', easyPin: 'test'})).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('should Login ATM and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ipassportData: {
            ipassDataClient: {
              profileScope: {
                userLogin: {mobileNumberMasking: '1234'}
              }
            }
          }
        }
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'},
      {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword',
        'persistentSubmitErrors': undefined, 'touch': undefined},
      'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'},
      {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({username: 'test', password: 'test', easyPin: 'test'}, false, false, false, true)).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('locked device and face already registered, should go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {isFaceRegister: true}
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'type': 'CLEAR_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'isFaceRegistered': true}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'},
      {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null,
        'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword',
        'persistentSubmitErrors': undefined, 'touch': undefined},
      'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined,
        'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({username: 'test', password: 'test', easyPin: 'test'}, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('Fingerprint login', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {attributeMap: {iPassport: '1234'}}
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'payload': 'fingerprint', 'type': 'UPDATE_LOGIN'}, {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'}, {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'}, {'payload': '', 'type': 'SAVE_USER_API_KEY'}, {'payload': 0, 'type': 'SET_GAP_TIME_SERVER'}, {'payload': '', 'type': 'SAVE_TRANS_REF_NUM'}, {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}, {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'}, {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'}, {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'}, {'payload': [], 'type': 'SAVE_CC_LIST'}, {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('Fingerprint Login failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {attributeMap: {iPassport: '1234'}}
      });
    });
    tracker.trackEvent = jest.fn();
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({password: '', easyPin: '', username: ''})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(tracker.trackEvent).toBeCalled();
      expect(toastSpy).toBeCalled();
    });
  });

  xit('Dormant user and locked device', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: {responseCode: '05'}
      });
    });

    tracker.trackEvent = jest.fn();
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined,
        'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginToSimasPoinHistory({password: 'a', easyPin: 'b', username: 'c'}, true)).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// ===========================================================================================

describe('loginActivation function', () => {
  xit('should Login and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    storage.set = () => Promise.resolve();
    common.populateBanners = () => jest.fn();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'type': 'CLEAR_LOGIN'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({username: 'test', password: 'test', easyPin: 'test'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('should Login using mobile number and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ipassportData: {
            ipassDataClient: {
              profileScope: {
                userLogin: {mobileNumberMasking: '1234'}
              }
            }
          }
        }
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'type': 'CLEAR_LOGIN'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({username: 'test', password: 'test', easyPin: 'test'})).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('should Login ATM and go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ipassportData: {
            ipassDataClient: {
              profileScope: {
                userLogin: {mobileNumberMasking: '1234'}
              }
            }
          }
        }
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},  {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'type': 'CLEAR_LOGIN'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({username: 'test', password: 'test', easyPin: 'test'}, false, false, false, true)).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('locked device and face already registered, should go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {isFaceRegister: true}
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'type': 'CLEAR_LOGIN'}, {'payload': {'isFaceRegistered': true}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined, 'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({username: 'test', password: 'test', easyPin: 'test'}, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('Fingerprint login', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {attributeMap: {iPassport: '1234'}}
      });
    });
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'type': 'CLEAR_LOGIN'}, {'payload': {'isFaceRegistered': false}, 'type': 'IS_FACE_REGISTERED_UPDATE'},
      {'type': 'SPINNER_HIDE'}, {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'}, {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('Fingerprint Login failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {attributeMap: {iPassport: '1234'}}
      });
    });
    tracker.trackEvent = jest.fn();
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'form': 'loginWithUsernamePassword'}, 'type': '@@redux-form/RESET'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({password: '', easyPin: '', username: ''})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(toastSpy).toBeCalled();
    });
  });

  xit('Dormant user and locked device', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: {responseCode: '05'}
      });
    });

    tracker.trackEvent = jest.fn();
    common.populateConfigData = () => () => Promise.resolve();
    common.checkHSMInit = () => () => Promise.resolve();
    common.registerPushId = () => jest.fn();
    common.populateBanners = () => jest.fn();
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'password', 'form': 'loginWithUsernamePassword', 'persistentSubmitErrors': undefined,
        'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'},
      {'meta': {'form': 'loginEasyPinForm'}, 'type': '@@redux-form/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.loginActivation({password: 'a', easyPin: 'b', username: 'c'}, true)).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
