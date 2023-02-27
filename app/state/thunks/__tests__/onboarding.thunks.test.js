import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as onboarding from '../onboarding.thunks';
import * as common from '../common.thunks';
import * as digitalAccountOpening from '../digitalAccountOpening.thunks';
import * as appSetup from '../appSetup.thunks';
import moxios from 'moxios';
import tracker from '../../../utils/googleAnalytics.util';
import {Toast, Alert} from '../../../utils/RNHelpers.util';
import * as storage from '../../../utils/storage.util';
import * as transformers from '../../../utils/transformer.util';
import md5 from 'md5';

jest.mock('pushwoosh-react-native-plugin');

jest.unmock('lodash');
const lodash = require.requireActual('lodash');
lodash.random = jest.fn(() => 1);

const toastSpy = jest.spyOn(Toast, 'show');
const alertSpy = jest.spyOn(Alert, 'alert');
common.registerPushId = () => jest.fn();
common.checkCameraPermissionAndNavigate = () => jest.fn();
common.checkHSMInit = () => () => Promise.resolve();
common.clearReducer = () => () => Promise.resolve();
common.smsEmailRegisterEmoney = () => () => Promise.resolve();
common.updateBalances = () => () => Promise.resolve();
common.populateOffersPrivate = () => () => Promise.resolve();
appSetup.tokenInit = () => () => Promise.resolve();
appSetup.getLoginPreference = () => jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  moxios.install();
});
afterEach(() => {//eslint-disable-line
  moxios.uninstall();
});

common.populateBanners = () => () => Promise.resolve();

describe('onboardingOtpResend function', () => {
  xit('valid response, should send tracker', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    tracker.trackEvent = jest.fn();
    const store = mockStore();
    common.populateConfigData = () => () => Promise.resolve();
    return store.dispatch(onboarding.onboardingOtpResend()).then(() => {
      expect(tracker.trackEvent).toBeCalled();
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
    }, 20);
    const store = mockStore();
    common.populateConfigData = () => () => Promise.resolve();
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    return store.dispatch(onboarding.onboardingOtpResend()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('prepareGoDashboard function', () => {
  it('should go to main route', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    onboarding.initStoreWithTransactionDetails = jest.fn();
    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should go to emoney route', () => {
    const expectedActions =  [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'},
    ];
    const store = mockStore({user: {
      profile: {
        customer: {
          cifCode: 'NK123'
        }
      }
    }});
    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should go to main emoney', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore({accounts: [
      {accountType: 'emoneyAccount'}
    ]
    });

    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('should go to navigatekey route', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'},
      {'routeName': {'navigateKey': 'test'}, 'type': 'Navigation/NAVIGATE'},
      {'payload': [], 'type': 'PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE'}];

    const store = mockStore({promos: {
      navigateOnPushClicked: [
        {navigateKey: 'test'}
      ]
    }});
    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });
});


describe('prepareGoDashboardCgv function', () => {
  it('Does not have emoney account, should go to main/shops route', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    onboarding.initStoreWithTransactionDetails = jest.fn();
    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('CIF not NK, should go to MainEmoney/Shops route', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'},
    ];

    const store = mockStore({user: {
      profile: {
        customer: {
          cifCode: 'NK123'
        }
      }
    }});
    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('CIF not NK, but have emoney account, should go to MainEmoney/Shops emoney', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'}];

    const store = mockStore({accounts: [
      {accountType: 'emoneyAccount'}
    ]
    });

    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('should go to navigatekey route', () => {
    const expectedActions = [
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['ActivationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginEasyPinFormSearch']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}, {'routeName': 'homeRoutes', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'},
      {'routeName': {'navigateKey': 'test'}, 'type': 'Navigation/NAVIGATE'},
      {'payload': [], 'type': 'PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE'}];

    const store = mockStore({promos: {
      navigateOnPushClicked: [
        {navigateKey: 'test'}
      ]
    }});
    store.dispatch(onboarding.prepareGoDashboard());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('logout function', () => {
  xit('valid response, should hide spinner & clearappstate', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions =  [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'meta': {'form': ['LoginWithEasyPinAccount']}, 'type': '@@redux-form/DESTROY'}, {'type': 'SPINNER_HIDE'}, {'type': 'CLEAN_APP_STATE'}, {'payload': 'yes', 'type': 'SHARE_DEEPLINK_FLAG'}, {'type': 'DRAWER_HIDE'}, {'params': undefined, 'routeName': 'Main', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    common.populateOffersPrivate = () => () => Promise.resolve();
    return store.dispatch(onboarding.logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, hide spinner & clearappstate', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {message: 'test'},
      });
    }, 20);
    const store = mockStore();
    common.populateOffersPrivate = () => () => Promise.resolve();
    const expectedActions =  [{'type': 'SPINNER_SHOW'}, {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}, {'type': 'CLEAN_APP_STATE'}];
    return store.dispatch(onboarding.logout()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('registerATMCard function', () => {
  common.populateConfigData = () => () => Promise.resolve();
  xit('valid response, should save iPassport and go to OTP page', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {attributeMap: {iPassport: '1234'}, transRefNum: 'wasd'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'CLEAR_CAPTCHA'},
      {'payload': {'ipassport': '1234'}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'type': 'SPINNER_HIDE'}, {'payload': 'wasd', 'type': 'SAVE_TRANS_REF_NUM'},
      {'actions': [{'routeName': 'Login', 'type': 'Navigation/NAVIGATE'},
        {'params': {'TXID': undefined, 'goToPin': false, 'isForgetPassword': false, 'newUserMobile': false,
          'panNumber': undefined}, 'routeName': 'OTP', 'type': 'Navigation/NAVIGATE'}],
      'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.registerATMCard({}, false, 'simasCaptcha', false)).then(() => {
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
    }, 20);
    const store = mockStore();
    const expectedActions =  [
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'meta': {'field': 'captchaInput', 'form': 'registerATMCardForm', 'persistentSubmitErrors': undefined,
        'touch': undefined}, 'payload': '', 'type': '@@redux-form/CHANGE'},
      {'payload': {'captchaId': 1000,
        'captchaImg': 'http://10.32.1.83/PersonalBanking/rest/v3/action/captcha?id=1000'},
      'type': 'SET_CAPTCHA'}];
    return store.dispatch(onboarding.registerATMCard({}, false, 'simasCaptcha', false)).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response with errorCode 05, should show alert', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: {responseCode: '05'}
      });
    }, 20);
    const store = mockStore();
    const expectedActions =  [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    return store.dispatch(onboarding.registerATMCard({}, false, 'simasCaptcha', false)).then(() => {
      expect(alertSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('verifyOTPWhenEasyPinSet function', () => {
  xit('valid response, should disptach to resetToLandingAndNavigate', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions =  [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'actions': [
        {'routeName': 'Login', 'type': 'Navigation/NAVIGATE'},
        {'params': {'maskedUsername': 'test'},
          'routeName': 'EasyPinVerify', 'type': 'Navigation/NAVIGATE'}
      ], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOTPWhenEasyPinSet('123456', 'test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, show Toast error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {message: 'test'},
      });
    }, 20);
    const store = mockStore();
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}];
    return store.dispatch(onboarding.verifyOTPWhenEasyPinSet()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('verifyOTPWhenEasyPinNotSet function', () => {
  xit('valid response, should disptach to resetToLandingAndNavigate', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions =  [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {'ipassport': '', 'token': ''}, 'type': 'SAVE_TOKEN_REGISTER'},
      {'actions': [
        {'routeName': 'Login', 'type': 'Navigation/NAVIGATE'},
        {'params':
          {'ipassport': '', 'isResetEasypin': true, 'maskedUsername': 'test', 'token': '', 'typeActivationDeeplink': ''},
        'routeName': 'EasyPin', 'type': 'Navigation/NAVIGATE'}
      ], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOTPWhenEasyPinNotSet('123456', 'test', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, show Toast error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {message: 'test'},
      });
    }, 20);
    const store = mockStore();
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}];
    return store.dispatch(onboarding.verifyOTPWhenEasyPinNotSet()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('verifyOTP function', () => {
  xit('valid response, should disptach to resetToLandingAndNavigate', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'CLEAR_APP_TIMEOUT'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOTP('', '', '', '', '', false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('valid response, should disptach to resetToLandingAndNavigate', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'CLEAR_APP_TIMEOUT'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOTP('', '', '', '', '', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, show Toast error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {message: 'test'},
      });
    }, 20);
    const store = mockStore();
    const expectedActions =  [{'type': 'CLEAR_APP_TIMEOUT'}];
    return store.dispatch(onboarding.verifyOTPWhenEasyPinNotSet()).catch(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('setLoginAccount function', () => {
  xit('valid response, should go to easypin page', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    // const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'CLEAR_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'}, {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}, {'type': 'SPINNER_HIDE'}, {'payload': [], 'type': 'PAYEE_UPDATE_PAYEE_LIST'}, {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'}, {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null, 'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'}, {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'}, {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(onboarding.setLoginAccount({username: 'a', password: 'b'}, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('isResetEasypin, valid response, should go to camera page', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = JSON.stringify([
      {'type': 'SPINNER_SHOW'},
      {'type': 'SET_APP_TIMEOUT', 'payload': 300}, {'type': 'SAVE_USER_MEMBER_DATA', 'payload': ''},
      {'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER', 'payload': {}},
      {'type': 'SPINNER_HIDE'}, {'type': 'SINARMAS_ALERT_SHOW',
        'payload': {'heading1': 'Password Anda', 'heading2': 'telah berubah', 'text': 'Tinggal satu langkah lagi',
          'button1': 'OK', 'closeOnTouchOutside': false}}]);
    const store = mockStore();
    return store.dispatch(onboarding.setLoginAccount({username: 'a', password: 'b'}, true)).then(() => {
      expect(JSON.stringify(store.getActions())).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'}, {'actions': [{'routeName': 'Introduction',
        'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.setLoginAccount({username: 'a', password: 'b'}, true)).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('prepareCompletedOnboarding function', () => {
  it('set username Success, should go to CompletedOnboarding', () => {
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'actions': [{'routeName': 'CompletedOnboarding', 'type': 'Navigation/NAVIGATE'}], 'index': 0,
        'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.prepareCompletedOnboarding('wasd', false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('set username Success, should go to ActivationSuccess', () => {
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'actions': [{'routeName': 'ActivationSuccess', 'type': 'Navigation/NAVIGATE'}],
        'index': 0, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.prepareCompletedOnboarding('wasd', false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('set username Success, should go to dashboard', () => {
    storage.set = () => Promise.resolve();
    const expectedActions = [
      {'meta': {'form': ['MigrateLandingPage']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['MigrateEnded']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'}];
    const store = mockStore();
    return store.dispatch(onboarding.prepareCompletedOnboarding('wasd', true, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('setEasyPin function', () => {
  xit('valid response, should go to camera page', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'CLEAR_TOKEN_REGISTER'}];
    const store = mockStore();
    return store.dispatch(onboarding.setEasyPin({}, 'wasd', false, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('valid response, should go to dashboard', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'type': 'CLEAR_APP_TIMEOUT'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'ActivationSuccess', 'type': 'Navigation/NAVIGATE'}],
        'index': 0, 'type': 'Navigation/RESET'}];
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.setEasyPin({}, 'wasd', false, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, send tracker and show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'type': 'CLEAR_APP_TIMEOUT'}];
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.setEasyPin({}, 'wasd', false, true)).then(() => {
      expect(tracker.trackEvent).toBeCalled();
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('clearAndResetEasyPin function', () => {
  it('should show alert', () => {
    const expectedActions = [
      {'type': 'SINARMAS_ALERT_SHOW', 'payload':
      {'heading1': 'Bersihkan data SimobiPlus',
        'text': 'Ini akan membersihkan data SimobiPlus di perangkat Anda, apakah Anda yakin?',
        'button1': 'BATAL', 'button2': 'YA, BERSIHKAN SEKARANG', 'image': 'REFRESH'}}];
    const store = mockStore();
    store.dispatch(onboarding.clearAndResetEasyPin());
    expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions));
  });
});

describe('clearAndResetPassword function', () => {
  it('should show alert', () => {
    const expectedActions = [
      {'type': 'SINARMAS_ALERT_SHOW', 'payload':
      {'heading1': 'Bersihkan data SimobiPlus',
        'text': 'Ini akan membersihkan data SimobiPlus di perangkat Anda, apakah Anda yakin?',
        'button1': 'BATAL', 'button2': 'YA, BERSIHKAN SEKARANG', 'image': 'REFRESH'}}];
    const store = mockStore();
    store.dispatch(onboarding.clearAndResetPassword());
    expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions));
  });
});

describe('refreshDevice function', () => {
  it('should show alert', () => {
    const expectedActions = [
      {'type': 'SINARMAS_ALERT_SHOW', 'payload':
      {'heading1': 'Bersihkan data SimobiPlus',
        'text': 'Ini akan membersihkan data SimobiPlus di perangkat Anda, apakah Anda yakin?',
        'button1': 'BATAL', 'button2': 'YA, BERSIHKAN SEKARANG', 'image': 'REFRESH'}}];
    const store = mockStore();
    store.dispatch(onboarding.refreshDevice());
    expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions));
  });
});

describe('resetEasyPinFromVerify function', () => {
  it('should show alert', () => {
    const expectedActions = [
      {'actions': [{'routeName': 'Login', 'type': 'Navigation/NAVIGATE'},
        {'params': {'isResetEasypin': true, 'maskedUsername': undefined}, 'routeName': 'EasyPin', 'type':
      'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    store.dispatch(onboarding.resetEasyPinFromVerify());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('getFormDataNTB function', () => {
  xit('valid response, should generate and save captcha', () => {
    const res = {captchaId: 1234, captchaImg: 'http://10.32.1.77:8080/EForm/captcha.do?mode=simple&id=1234'};
    transformers.generateCaptchaForNTB = jest.fn(() => res);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {'captchaId': 1234, 'captchaImg': 'http://10.32.1.77:8080/EForm/captcha.do?mode=simple&id=1234'},
        'type': 'SET_CAPTCHA'}];
    const store = mockStore();
    return store.dispatch(onboarding.getFormDataNTB('1234', {}, '1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('valid response, should go to IdentityFourthForm', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {responseCode: '00'},
      });
    }, 20);
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'actions': [{'params': {'smartfrenAmount': '1', 'vaName': undefined, 'vaNumber': undefined},
        'routeName': 'IdentityFourthForm', 'type': 'Navigation/NAVIGATE'}],
      'index': 0, 'type': 'Navigation/RESET'}];
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.getFormDataNTB('1234', {}, '1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast and re-generate captcha', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {'captchaId': 1234, 'captchaImg': 'http://10.32.1.77:8080/EForm/captcha.do?mode=simple&id=1234'}, 'type': 'SET_CAPTCHA'}];
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.getFormDataNTB('1234', {}, '1234')).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('sendingTokenMigrate function', () => {
  xit('valid response, but rc not 00 should go to MigrateError', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'payload': {'encryptedToken': '1234'}, 'type': 'SIMOBI_MIGRATION_CODE'},
      {'payload': {'ipassport': ''}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'}];
    const store = mockStore();
    return store.dispatch(onboarding.sendingTokenMigrate('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('valid response, should go to OTP', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {responseCode: '00'},
      });
    }, 20);
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.sendingTokenMigrate('1234')).then((res) => {
      const expected = [
        {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
        {'payload': {'encryptedToken': '1234'}, 'type': 'SIMOBI_MIGRATION_CODE'},
        {'payload': {'ipassport': ''}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
        {'params': {'encryptedToken': '1234', 'isMigrate': true, 'maskedUsername': '', 'userData': res},
          'routeName': 'OTP', 'type': 'Navigation/NAVIGATE'}];
      expect(store.getActions()).toEqual(expected);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.sendingTokenMigrate('1234')).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('verifyOTPMigrate function', () => {
  xit('valid response, should go to LoginAccount', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'params': {'encryptedToken': '1234****', 'isMigrate': false, 'maskedUsername': 'testUser'},
        'routeName': 'LoginAccount', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOTPMigrate('1234', 'testUser', false, '1234****')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore({isFaceRegistered: {
      isFaceRegistered: true,
      skipped: true
    }});
    return store.dispatch(onboarding.verifyOTPMigrate('1234', 'testUser', false, '1234****')).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('setEasyPinMigrate function', () => {
  xit('valid response, should destroy forms', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'actions': [{'routeName': 'MigrateEnded', 'type': 'Navigation/NAVIGATE'}], 'index': 0,
        'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.setEasyPinMigrate('1234', 'testUser', false, '1234****')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore();
    return store.dispatch(onboarding.setEasyPinMigrate({easyPinData: '1234'}, '1234****')).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('prepareCompletedOnboardingMigrate function', () => {
  it('set username Success, should go to MigrateEnded', () => {
    storage.set = () => Promise.resolve();
    common.setupAppInitKeys = () => () => jest.fn();
    const expectedActions = [
      {'actions': [{'routeName': 'MigrateEnded', 'type': 'Navigation/NAVIGATE'}],
        'index': 0, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.prepareCompletedOnboardingMigrate('wasd****')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('set username fail, should show toast', () => {
    jest.unmock('../../../utils/storage.util');
    const storage = require.requireActual('../../../utils/storage.util');
    storage.set = jest.fn(() => Promise.reject());
    const expectedActions = [{'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'}];
    const store = mockStore();
    return store.dispatch(onboarding.prepareCompletedOnboardingMigrate('wasd****')).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('setLoginAccountMigrate function', () => {
  xit('create user success, should go to Easypin page', () => {
    tracker.setUser = jest.fn();
    const token = md5('asdfas123123');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {ipassport: 'ipass12345'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'type': 'CLEAR_APP_TIMEOUT'},
      {'payload': {'ipassport': 'ipass12345'}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'type': 'SPINNER_HIDE'}, {'payload': [], 'type': 'PAYEE_UPDATE_PAYEE_LIST'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': 'ipass12345', 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null,
        'profile': {}, 'referralCode': undefined, 'transRefNum': undefined, 'token': token}, 'type': 'USER_UPDATE_METADATA'},
      {'actions': [{'routeName': 'Login', 'type': 'Navigation/NAVIGATE'},
        {'params': {'encryptedToken': 1234, 'isMigrate': false, 'maskedUsername': 'wasd'},
          'routeName': 'EasyPin', 'type': 'Navigation/NAVIGATE'}], 'index': 1, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    const account = {username: 'wasd', password: 12345};
    return store.dispatch(onboarding.setLoginAccountMigrate(account, false, 1234)).then(() => {
      expect(tracker.setUser).toBeCalled();
      expect(md5).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('create user failed, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: {errorMessage: 'Register failed'},
      });
    }, 20);
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    const account = {username: 'wasd', password: 12345};
    return store.dispatch(onboarding.setLoginAccountMigrate(account, false, 1234)).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('prepareGoDashboardFromMigrate function', () => {
  xit('should go to Routes inside array', () => {
    const expectedActions = [
      {'meta': {'form': ['MigrateLandingPage']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
      {'meta': {'form': ['MigrateEnded']}, 'type': '@@redux-form/DESTROY'},
      {'type': 'CLEAR_APP_TIMEOUT'},
      {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
      {'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'},
      {'routeName': 'Easypin', 'type': 'Navigation/NAVIGATE'},
      {'payload': [], 'type': 'PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE'}];
    const store = mockStore({promos: {navigateOnPushClicked: ['Landing', 'Easypin']}});
    onboarding.initStoreWithTransactionDetails = jest.fn();
    store.dispatch(onboarding.prepareGoDashboardFromMigrate());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('goBackToLanding function', () => {
  it('should go back to landing', () => {
    const expectedActions = [
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}], 'index': 0,
        'type': 'Navigation/RESET'}];
    const store = mockStore();
    store.dispatch(onboarding.goBackToLanding());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('popUp function', () => {
  it('should go back to landing', () => {
    storage.getPopUpLanding = () => Promise.resolve({date: '18 Aug 1989', urlId: 'wasd.com', dontShow: false});
    const expectedActions = JSON.stringify([
      {'type': 'SINARMAS_ALERT_SHOW', 'payload': {'button1': 'OK', 'checkboxLabel':
      'Jangan Tampilkan Lagi', 'image': 'WARNING', 'uriImage': ''}}]);
    const store = mockStore({config: {serverTime: '18 Aug 1989'}});
    return store.dispatch(onboarding.popUp()).then(() => {
      expect(JSON.stringify(store.getActions())).toEqual(expectedActions);
    });
  });
});

describe('resetDevice function', () => {
  it('success, should go to landing', () => {
    storage.clearLocalStorage = () => Promise.resolve();
    common.hsmInit = () => () => Promise.resolve();
    const expectedActions = [
      {'type': 'SPINNER_SHOW'},
      {'actions': [{'params': {'id': '1234'}, 'routeName': 'MigrateLandingPage',
        'type': 'Navigation/NAVIGATE'}], 'index': 0, 'type': 'Navigation/RESET'}];
    const store = mockStore();
    return store.dispatch(onboarding.resetDevice('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed, should show spinner', () => {
    storage.clearLocalStorage = () => Promise.resolve();
    common.hsmInit = () => () => Promise.reject('error');
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'type': 'SPINNER_HIDE'}, {'payload': 'yes', 'type': 'SHARE_DEEPLINK_FLAG'}];
    const store = mockStore();
    return store.dispatch(onboarding.resetDevice('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('verifyLoginFaceRecognition function', () => {
  transformers.generateOrientation = () => '90';
  transformers.checkFlipImage = () => false;
  common.populateConfigData = () => () => Promise.resolve();
  xit('valid response, not emoney account', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'payload': 'face', 'type': 'UPDATE_LOGIN'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'type': 'SPINNER_HIDE'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null,
        'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}], 'index': 0, 'type':
      'Navigation/RESET'}, {'params': {'isOBM': undefined, 'isOBMAll': true, 'nextRouteName': 'Dashboard', 'profileScope': ''}, 'routeName': 'ValidatePassword', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore({
      user: {profile: {customer: {cifCode: '1234567'}}},
      accounts: [{accountType: 'notEmoney'}]
    });
    return store.dispatch(onboarding.verifyLoginFaceRecognition('base64string', '1', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('valid response, emoney account with NK cif', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'payload': 'face', 'type': 'UPDATE_LOGIN'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'type': 'SPINNER_HIDE'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null,
        'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}], 'index': 0, 'type':
      'Navigation/RESET'}, {'params': {'isOBM': undefined, 'isOBMAll': true, 'nextRouteName': 'Dashboard', 'profileScope': ''}, 'routeName': 'ValidatePassword', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore({
      user: {profile: {customer: {cifCode: 'NK34567'}}},
      accounts: [{accountType: 'emoneyAccount'}]
    });
    return store.dispatch(onboarding.verifyLoginFaceRecognition('base64string', '1', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('valid response, activated emoney account', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'payload': '', 'type': 'SAVE_USER_MEMBER_DATA'},
      {'payload': 'face', 'type': 'UPDATE_LOGIN'},
      {'payload': {'ipassport': undefined}, 'type': 'SET_ADDITIONAL_API_PAYLOAD_PARAMETER'},
      {'payload': [], 'type': 'SAVE_PRIVATE_OFFERS'},
      {'payload': {'DigitalStore': false, 'QR': false, 'billPay': false, 'isSaving': false, 'transfer': false}, 'type': 'SAVE_AUTO_SAVE'},
      {'type': 'SPINNER_HIDE'},
      {'payload': [], 'type': 'ACCOUNTS_SET_ACCOUNTS'},
      {'payload': {'ipassport': null, 'ipassportMetaCode': null, 'lastAccess': null, 'loginTime': null,
        'profile': {}, 'referralCode': undefined, 'transRefNum': undefined}, 'type': 'USER_UPDATE_METADATA'},
      {'payload': {}, 'type': 'SAVE_DEFAULT_ACCOUNT'},
      {'payload': [], 'type': 'SAVE_CC_LIST'},
      {'actions': [{'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'}], 'index': 0, 'type':
      'Navigation/RESET'}, {'params': {'isOBM': undefined, 'isOBMAll': true, 'nextRouteName': 'Dashboard', 'profileScope': ''}, 'routeName': 'ValidatePassword', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore({
      user: {profile: {customer: {cifCode: '1234567'}}},
      accounts: [{accountType: 'emoneyAccount'}]
    });
    return store.dispatch(onboarding.verifyLoginFaceRecognition('base64string', '1', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyLoginFaceRecognition('base64string', '1', true)).then(() => {
      expect(toastSpy).toBeCalled();
      tracker.trackEvent = jest.fn();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('goSignature function', () => {
  it('should reset and go to signature page', () => {
    const expectedActions = [{'payload': {'data': 'mockData'}, 'type': 'SAVE_DATA_SELFIE'},
      {'actions': [{'routeName': 'Login', 'type': 'Navigation/NAVIGATE'}], 'index': 0,
        'type': 'Navigation/RESET'},
      {'params': {}, 'routeName': 'SignaturePage', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(onboarding.goSignature({}, {data: 'mockData'}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('goToCaptcha function', () => {
  it('should reset and go to captcha page', () => {
    const expectedActions = [{'payload': {'data': 'mockData'}, 'type': 'SAVE_DATA_KTP'},
      {'actions': [{'routeName': 'Login', 'type': 'Navigation/NAVIGATE'}], 'index': 0,
        'type': 'Navigation/RESET'},
      {'params': {}, 'routeName': 'IdentitySecondForm', 'type': 'Navigation/NAVIGATE'}];
    const store = mockStore();
    store.dispatch(onboarding.goToCaptcha({}, {data: 'mockData'}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('registerEmoney function', () => {
  xit('valid response, responseCode 00', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {responseCode: '00'},
      });
    }, 20);
    const eMoneyData = {phone: '0812123123123', fullName: 'Yoake', typeActivation: '001', captchaInput: 'SKY'};
    const simasCaptcha = {captchaId: '1234'};
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_SHOW'}];
    const store = mockStore();
    return store.dispatch(onboarding.registerEmoney(eMoneyData, simasCaptcha)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('valid response, responseCode not 00', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {responseCode: '99'},
      });
    }, 20);
    const eMoneyData = {phone: '0812123123123', fullName: 'Yoake', email: 'wa@a.com', captchaInput: 'SKY'};
    const simasCaptcha = {captchaId: '1234'};
    const expectedActions = JSON.stringify([
      {'type': 'SPINNER_SHOW'}, {'type': 'SET_APP_TIMEOUT', 'payload': 300},
      {'type': 'SINARMAS_ALERT_SHOW', 'payload': {'heading1': 'Nomor telepon sudah terdaftar',
        'text': 'Coba log in dengan nomor telepon yang terdaftar', 'button1': 'TUTUP', 'button2': 'LOG IN'}}]);
    const store = mockStore();
    return store.dispatch(onboarding.registerEmoney(eMoneyData, simasCaptcha)).then(() => {
      expect(JSON.stringify(store.getActions())).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const eMoneyData = {phone: '0812123123123', fullName: 'Yoake', email: 'wa@a.com', captchaInput: 'SKY'};
    const simasCaptcha = {captchaId: '1234'};
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}];
    const store = mockStore();
    return store.dispatch(onboarding.registerEmoney(eMoneyData, simasCaptcha)).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('resendOtpActivation function', () => {
  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        data: {responseCode: '12'},
      });
    }, 20);
    const store = mockStore();
    return store.dispatch(onboarding.resendOtpActivation()).then(() => {
      expect(toastSpy).toBeCalled();
    });
  });
});

describe('verifyOtpActivation function', () => {
  xit('valid response, should go to ActivationForm', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {responseCode: '00'},
      });
    }, 20);
    const expectedActions = [{'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'},
      {'type': 'SPINNER_HIDE'},
      {'params': {'emailToken': 'Token1234', 'firebaseEmoney': undefined, 'isFromEmoney': true, 'res': {'responseCode': '00'}, 'token': '', 'transRefNum': '', 'typeActivation': undefined},
        'routeName': 'ActivationForm', 'type': 'Navigation/NAVIGATE'},
      {'payload': {'isFromEmoney': true, 'token': '', 'transRefNum': ''}, 'type': 'SAVE_TOKEN_REGISTER'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOtpActivation('Token1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'type': 'SPINNER_SHOW'},
      {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(onboarding.verifyOtpActivation('Token1234')).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('activationRegistration function', () => {
  xit('invalid response, should show toast', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {data: 'test'},
      });
    }, 20);
    const expectedActions = [{'payload': 1234, 'type': 'SAVE_REGIST_NAME'},
      {'type': 'SPINNER_SHOW'}, {'payload': 300, 'type': 'SET_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'}];
    const store = mockStore();
    return store.dispatch(onboarding.activationRegistration({}, {fullName: 1234})).then(() => {
      expect(toastSpy).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('deeplinkPromo function', () => {
  it('should show alert', () => {
    const expectedActions = [{'type': 'SPINNER_SHOW'}];
    const store = mockStore();
    store.dispatch(onboarding.deeplinkPromo());
    expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions));
  });
});

describe('deeplinkPromoETB function', () => {
  it('should show alert', () => {
    digitalAccountOpening.getCreditCardProductsItemsForDeeplink = () => () => Promise.resolve();
    const expectedActions = [
      {'type': 'Navigation/RESET', 'index': 0, 'actions': [{'type': 'Navigation/NAVIGATE', 'routeName': 'Landing'}]}];
    const store = mockStore();
    store.dispatch(onboarding.deeplinkPromoETB());
    expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions));
  });
});

// describe('prepareGoSimasPoinHistory function', () => {
//   onboarding.initStoreWithTransactionDetails = jest.fn();
//   it('should go to Routes inside array', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {accountStatementSimasPoin: {nama: 'test', others: 'test2'}},
//       });
//     }, 20);
//     const expectedActions =  [
//       {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
//       {'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'},
//       {'routeName': 'Easypin', 'type': 'Navigation/NAVIGATE'},
//       {'payload': [], 'type': 'PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE'},
//       {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
//       {'payload': {'nama': 'test', 'others': 'test2', 'status': 'success'}, 'type': 'SAVE_SIMASPOIN_HISTORY'},
//       {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
//       {'routeName': 'SimasPoinHistory', 'type': 'Navigation/NAVIGATE'}];
//     const store = mockStore({promos: {navigateOnPushClicked: ['Landing', 'Easypin']},
//       user: {
//         profile: {
//           customer: {
//             cifCode: 'NK123'
//           }
//         }
//       }});
//     onboarding.initStoreWithTransactionDetails = jest.fn();
//     return store.dispatch(onboarding.prepareGoSimasPoinHistory()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('CIF not NK, should go to MainEmoney/Shops route', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {accountStatementSimasPoin: {nama: 'test', others: 'test2'}},
//       });
//     }, 20);
//     const expectedActions = [
//       {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
//       {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
//       {'payload': {'nama': 'test', 'others': 'test2', 'status': 'success'},
//         'type': 'SAVE_SIMASPOIN_HISTORY'}, {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
//         {'routeName': 'SimasPoinHistory', 'type': 'Navigation/NAVIGATE'}];
//     const store = mockStore({user: {
//       profile: {
//         customer: {
//           cifCode: 'NK123'
//         }
//       }
//     }});
//     onboarding.initStoreWithTransactionDetails = jest.fn();
//     return store.dispatch(onboarding.prepareGoSimasPoinHistory()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('CIF not NK, but have emoney account, should go to MainEmoney/Shops emoney', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {accountStatementSimasPoin: {nama: 'test', others: 'test2'}},
//       });
//     }, 20);
//     const expectedActions = [
//       {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
//       {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
//       {'payload': {'nama': 'test', 'others': 'test2', 'status': 'success'},
//         'type': 'SAVE_SIMASPOIN_HISTORY'}, {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
//         {'routeName': 'SimasPoinHistory', 'type': 'Navigation/NAVIGATE'}];
//     const store = mockStore({accounts: [
//       {accountType: 'emoneyAccount'}],
//       user: {profile: {
//         customer: {
//           cifCode: 'NK123'
//         }
//       }}
//     });
//     onboarding.initStoreWithTransactionDetails = jest.fn();
//     return store.dispatch(onboarding.prepareGoSimasPoinHistory()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('invalid response, should go to Routes inside array', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.reject({
//         status: 400,
//         response: {accountStatementSimasPoin: {nama: 'test', others: 'test2'}},
//       });
//     }, 20);
//     const expectedActions = [
//       {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
//       {'routeName': 'Landing', 'type': 'Navigation/NAVIGATE'},
//       {'routeName': 'Easypin', 'type': 'Navigation/NAVIGATE'},
//       {'payload': [], 'type': 'PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE'},
//       {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
//       {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
//       {'routeName': 'SimasPoinHistory', 'type': 'Navigation/NAVIGATE'}];
//     const store = mockStore({promos: {navigateOnPushClicked: ['Landing', 'Easypin']},
//       user: {
//         profile: {
//           customer: {
//             cifCode: 'NK123'
//           }
//         }
//       }});
//     onboarding.initStoreWithTransactionDetails = jest.fn();
//     return store.dispatch(onboarding.prepareGoSimasPoinHistory()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('invalid response, CIF not NK, should go to MainEmoney/Shops route', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.reject({
//         status: 400,
//         response: {accountStatementSimasPoin: {nama: 'test', others: 'test2'}},
//       });
//     }, 20);
//     const expectedActions = [
//       {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
//       {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
//       {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
//       {'routeName': 'SimasPoinHistory', 'type': 'Navigation/NAVIGATE'}];
//     const store = mockStore({user: {
//       profile: {
//         customer: {
//           cifCode: 'NK123'
//         }
//       }
//     }});
//     onboarding.initStoreWithTransactionDetails = jest.fn();
//     return store.dispatch(onboarding.prepareGoSimasPoinHistory()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('invalid response, CIF not NK, but have emoney account, should go to MainEmoney/Shops emoney', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.reject({
//         status: 400,
//         response: {accountStatementSimasPoin: {nama: 'test', others: 'test2'}},
//       });
//     }, 20);
//     const expectedActions = [
//       {'meta': {'form': ['loginWithUsernamePassword']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['loginAccountForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationForm']}, 'type': '@@redux-form/DESTROY'},
//       {'meta': {'form': ['easyPinCreationConfirmForm']}, 'type': '@@redux-form/DESTROY'},
//       {'type': 'CLEAR_APP_TIMEOUT'}, {'type': 'SPINNER_HIDE'},
//       {'routeName': 'Main', 'type': 'Navigation/NAVIGATE'},
//       {'routeName': 'SimasPoinHistory', 'type': 'Navigation/NAVIGATE'}];
//     const store = mockStore({accounts: [
//       {accountType: 'emoneyAccount'}],
//       user: {profile: {
//         customer: {
//           cifCode: 'NK123'
//         }
//       }}
//     });
//     onboarding.initStoreWithTransactionDetails = jest.fn();
//     return store.dispatch(onboarding.prepareGoSimasPoinHistory()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });
