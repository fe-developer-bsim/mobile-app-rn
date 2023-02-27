import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {getErrorMessage, formatMobileNumberEmoneyRegistration, generateCaptchaOpenProduct as generateCaptcha,
  currencyFormatter, getEmoneyKyc} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {change, destroy} from 'redux-form';
import {result, find, sortBy, forEach, split, isEmpty, map, startsWith, filter, remove, sortedUniq} from 'lodash';
import moment from 'moment';
import {Platform, NativeModules} from 'react-native';
import Permissions from 'react-native-permissions';
import {fields as eFormFields} from '../../components/DigitalAccountOpening/RenderDigitalEForm.component.js';
import {sendOtpActivation, logout} from '../../state/thunks/onboarding.thunks';
import {getExistingData} from '../../state/thunks/ccEform.thunks';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {NetworkInfo} from 'react-native-network-info';
import Contacts from 'react-native-contacts';
import * as middlewareUtils from '../../utils/middleware.util';
// import firebase from 'react-native-firebase';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {randomString, OBM_EncryptPassword, OBM_GetEncodingParameter, OBM_GetEncryptedPassword} from '../../utils/vendor/pinEncryption.util';
import VersionNumber from 'react-native-version-number';
import {openLoanAccount} from '../../state/thunks/EForm.thunks';
// let Analytics = firebase.analytics();


let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

let GetAppList;

if (Platform.OS === 'android') {
  GetAppList = require('react-native-android-installed-apps');
}

let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

export const clearData = (onClearChange) => (dispatch, getState) => {
  const state = getState();
  forEach(split(onClearChange, ','), (value) => {
    const keyValue = state.form.DigitalEForm.values[`${value}`];
    if (!isEmpty(keyValue) || keyValue !== '') {
      dispatch(change('DigitalEForm', `${value}`, {}));
    }
  });
};

export function getProvinceList () {
  return (dispatch, getState) => {
    const state = getState();
    const provinceListReducer = result(state, 'provinceList', []);
    if (isEmpty(provinceListReducer)) {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'province'};
      return api.getProvinceList(payload, dispatch).then((res) => {
        const provinceList = sortBy(result(res, 'data.data.provinsi', []), 'name');
        dispatch(actionCreators.saveProvinceList(provinceList));
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    } else {
      return Promise.resolve();
    }
  };
}

export const getCityList = (fieldName, onClearChange) => (dispatch, getState) => {
  const state = getState();
  const formName = 'DigitalEForm';
  const formValues = state.form[`${formName}`].values;
  const code = result(formValues[`${fieldName}`], 'code', '');
  if (code === '') {
    return Promise.resolve();
  } else {
    dispatch(actionCreators.showSpinner());
    const payload = {mode: 'city', code};
    return api.getCityList(payload, dispatch).then((res) => {
      const cityList = sortBy(result(res, 'data.data.city', []), 'name');
      dispatch(actionCreators.saveCityList(cityList));
      dispatch(clearData(onClearChange));
      dispatch(actionCreators.hideSpinner());
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  }
};

export const getDistrictList = (fieldName, onClearChange) => (dispatch, getState) => {
  const state = getState();
  const formName = 'DigitalEForm';
  const formValues = state.form[`${formName}`].values;
  const code = result(formValues[`${fieldName}`], 'code', '');
  if (code === '') {
    return Promise.resolve();
  } else {
    dispatch(actionCreators.showSpinner());
    const payload = {mode: 'district', code};
    return api.getSubDistrictList(payload, dispatch).then((res) => {
      const districtList = sortBy(result(res, 'data.data.district', []), 'name');
      dispatch(actionCreators.saveDistrictList(districtList));
      dispatch(clearData(onClearChange));
      dispatch(actionCreators.hideSpinner());
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  }
};

export const getSubDistrictList = (fieldName, onClearChange) => (dispatch, getState) => {
  const state = getState();
  const formName = 'DigitalEForm';
  const formValues = state.form[`${formName}`].values;
  const code = result(formValues[`${fieldName}`], 'code', '');
  if (code === '') {
    return Promise.resolve();
  } else {
    dispatch(actionCreators.showSpinner());
    const payload = {mode: 'subDistrict', code};
    return api.getSubDistrictList(payload, dispatch).then((res) => {
      const subDistrictList = sortBy(result(res, 'data.data.subDistrict', []), 'name');
      dispatch(actionCreators.saveSubDistrictList(subDistrictList));
      dispatch(clearData(onClearChange));
      dispatch(actionCreators.hideSpinner());
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  }
};

export function checkCameraPermission () {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).
        then((res) => {
          if (!res) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
              if ('granted' !== result) {
                dispatch(actionCreators.hideSpinner());
                return Promise.resolve();
              } else {
                dispatch(actionCreators.hideSpinner());
              }
            });
          }
        });
    } else {
      Permissions.check('ios.permission.CAMERA').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.CAMERA').then((response) => {
            if (response !== 'granted') {
              dispatch(actionCreators.hideSpinner());
              Toast.show('Go to settings, allow SimobiPlus to access device camera', Toast.LONG);
              return Promise.resolve();
            } else {
              dispatch(actionCreators.hideSpinner());
            }
          });
        }
      });
    }
  };
}

export function getSavingProductsItems () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    return api.getSavingProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'SAVING__CHOOSE_PRODUCTS';
      dispatch(actionCreators.saveProductsItem({config, configTitle}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getCreditCardProductsItems () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api.getCreditCardProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'CREDITCARD__CHOOSE_PRODUCTS';
      const isCreditCard = true;
      dispatch(actionCreators.saveProductsItem({config, configTitle, isCreditCard}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function goToNextPage (nav) {
  return (dispatch, getState) => {
    const state = getState();
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(result(state, 'user', {})) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const productCode = result(state, 'productCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    const isSecure = result(state, 'productData.creditCardType', '') === 'secured';
    const newSavingNTB = result(state, 'config.flag.flagNewSavingNTB', 'INACTIVE') === 'ACTIVE';
    let adjustEvent;
    if (productCode.includes('SA')) { // event adjust tracking TnC
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-1');
        adjustEvent.addCallbackParameter('cif', cifCode);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-1');
        adjustEvent.addCallbackParameter('cif', cifCode);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }

    if (isLogin) {
      if (productCode.includes('SA')) {
        if (startsWith(cifCode, 'NK')) {
          if (newSavingNTB) {
            dispatch(getCurrentSection());
          } else {
            dispatch(NavigationActions.navigate({routeName: 'SavingKTPCamera'}));
          }
        } else {
          if (emoneyKycOnly) {
            if (newSavingNTB) {
              dispatch(getCurrentSection());
            } else {
              dispatch(NavigationActions.navigate({routeName: 'SavingKTPCamera'}));
            }
          } else {
            dispatch(NavigationActions.navigate({routeName: 'SavingEmailForm'}));
          }
        }
      } else { 
        if (isSecure) {
          if (startsWith(cifCode, 'NK')) {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
          } else {
            if (emoneyKycOnly) {
              dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
            } else {
              dispatch(getExistingData());
            }
          }
        } else {
          dispatch(getCurrentSection());
        }
      }
    } else {
      const firebaseEmoney = true;
      // Analytics.logEvent('REGIST_EMONEY', {device: Platform.OS, step_route: '3'});
      dispatch(NavigationActions.navigate({routeName: 'EmoneyRegistration', params: {firebaseEmoney}}));
    }
  };
}

export function getCurrentSection (isOnboard = false) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const code = result(state, 'productCode', '');

    const targetUrl = 'getCurrentSection';
    const type = 'post';
    const requestData = {cifCode, mobileNumber, code};
    const payload = {requestData, targetUrl, type};

    dispatch(actionCreators.showSpinner());
    return api.digitalEForm(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      const isCheckLimit = result(res, 'data.isCheckLimit', false);

      if (responseCode === '00') {
        if (isCheckLimit) {
          const pageData = result(res.data, 'nextPage.pageData', {});
          const value = result(res.data, 'value', {});
          const storedData = {page: pageData, value};
          const pageName = result(pageData, 'type', 'form').toLowerCase();
          const pageCode = result(pageData, 'code', '');
          const routeName = 'DigitalEForm';
          const params = {pageName, pageCode};
          dispatch(actionCreators.saveEForm(storedData));
          dispatch(NavigationActions.navigate({routeName, params}));
        } else {
          if (isOnboard) {
            dispatch(actionCreators.saveCurrentSection(result(res, 'data.config', [])));
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'CurrentSection'})
              ]
            }));
          } else {
            dispatch(actionCreators.saveCurrentSection(result(res, 'data.config', [])));
            dispatch(NavigationActions.navigate({routeName: 'CurrentSection'}));
          }
        }
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkLiveness (params) {
  return (dispatch, getState) => {
    const state = getState();
    const pageName = result(params, 'pageName', '');
    const pageCode = result(params, 'pageCode', '');
    const productCode =  result(state, 'productCode', '');
    const cif = result(state, 'user.profile.customer.cifCode', '');
    let adjustEvent;
    if (productCode.includes('SA')) { // event adjust tracking selfie for liveness
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-6');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-6');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }


    if (Platform.OS === 'ios') {
      dispatch(NavigationActions.navigate({routeName: 'LivenessSection', params: {pageCode}}));
    } else {
      NativeModules.LivenessModule.startLiveness(
        (livenessId, base64Image, transactionId) => {
        // This callback indicates Liveness Detection success (base64Image)
          if (pageName === 'camera') {
            dispatch(checkCameraPermission());
          } else {
            const EForm = result(state, 'EForm', {});
            const page = result(EForm, 'page', {});
            const fields = result(page, 'fields', []);
            const field = filter(fields, (obj) => obj.component === 'selfieCamera')[0] || fields[0]; // fields that uses camera or the first field if none specified
            const {code: fieldName} = field;
            dispatch(change(eFormFields.formName, fieldName, livenessId)); // 0~1~3
            dispatch(actionCreators.saveLvTrxID(transactionId));
            const formValues = result(getState(), `form.${eFormFields.formName}.values`, {});
            dispatch(handleSubmit(formValues, {pageName: pageCode, livenessId, base64Image}));
          }
        },
        (err, errorMessage) => {
          // cancel, errorMessage, errorCode
          // FACE_MISSINNG
          // ACTION_TIMEOUT
          const isCancel = !err;
          if (isCancel) {
            if (errorMessage !== null) {
              Toast.show(errorMessage, Toast.LONG);
            }
          }
          return Promise.resolve();
        }
      );
    }
  };
}

export function getChoosenPage (item = {}, flagBack = false, pageNameBack = '') {
  return (dispatch, getState) => {
    const state = getState();
    const isRecalculate = result(item, 'isRecalculate', false);
    if (isRecalculate) {
      dispatch(destroy('DigitalEForm'));
    }
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const sectionCode = result(item, 'sectionCode', '');
    const isOnePage = result(item, 'isOnePage', false);
    const productCode = result(state, 'productCode', '');

    const targetUrl = 'getChoosenPage';
    const type = 'post';
    const isDukcapilNew = 'YES';
    const version = VersionNumber.appVersion;
    const requestData = {cifCode, mobileNumber, sectionCode, productCode, isOnePage, flagBack, pageNameBack, isDukcapilNew, version};
    const payload = {requestData, targetUrl, type};
    dispatch(actionCreators.showSpinner());
    return api.digitalEForm(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const data = result(res.data, 'data', {});
      const isGoToSection = result(res.data, 'isGoToSection', false);
      if (isGoToSection) {
        dispatch(destroy('DigitalEForm'));
        dispatch(actionCreators.saveCurrentSection(result(res.data, 'config', [])));
        if (productCode === 'PD') {
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({routeName: 'AccountEditProfile'})
            ]
          }));
        } else if (productCode === 'EMONEY') {
          dispatch(NavigationActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}),
              NavigationActions.navigate({routeName: 'CurrentSection'})
            ]
          }));
        } else {
          dispatch(NavigationActions.reset({
            index: 2,	
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),	
              NavigationActions.navigate({routeName: 'ChooseProductsItem'}),	
              NavigationActions.navigate({routeName: 'CurrentSection'})
            ]
          }));
        }
      } else {
        if (flagBack) {
          dispatch(destroy('DigitalEForm'));
          dispatch(NavigationActions.back());
        }
        const pageData = result(res.data, 'nextPage.pageData', {});
        const value = result(res.data, 'value', {});
        const {id, referenceCode} = data;
        const storedData = {id, referenceCode, page: pageData, value};
        const pageName = result(pageData, 'type', 'form').toLowerCase();
        const pageCode = result(pageData, 'code', '');
        const isLiveness = result(pageData, 'isLiveness', false);
        const params = {item, pageName, pageCode};
        dispatch(actionCreators.saveEForm(storedData));

        if (isLiveness) {
          dispatch(checkLiveness(params));
        } else {
          if (pageName === 'camera') {
            dispatch(checkCameraPermission());
          }
          const routeName = 'DigitalEForm';
          dispatch(NavigationActions.navigate({routeName, params}));
        }
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkKtpDukcapil (fieldName, pageName, data, isKtp = false) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ktpId = result(state, 'form.DigitalEForm.values.0~1~5', '');
    const dob = moment(result(state, 'form.DigitalEForm.values.0~1~6', '')).format('YYYY-MM-DD');
    const maritalStatus = result(state, 'form.DigitalEForm.values.0~1~7', {});
    const mothersMaiden = result(state, 'form.DigitalEForm.values.0~1~8', '');
    const payload = {ktpId, dob, maritalStatus, mothersMaiden};
    if (isKtp) {
      return api.dukcapilKTP(payload, dispatch).then((res) => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        const token = result(res, 'data.token', '');
        if (responseCode === '00') {
          dispatch(checkUserEdw(fieldName, pageName, data, token));
        } else {
          Toast.show(responseMessage, Toast.LONG);
        }
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
    } else {
      dispatch(generatePhoto(fieldName, pageName, data));
    }
  };
}

export function checkUserEdw (fieldName, pageName, data, token) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ID = result(state, 'form.DigitalEForm.values.0~1~5', '');
    const payload = {ID, token};
    return api.getCustomerProfile(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      const responseMessage = result(res, 'data.responseMessage', '');
      const resCustProfile = result(res, 'data.responseGetCustomerProfileForUpgradeMap', {});
      const isExist = result(resCustProfile, 'isExist', 'false');

      if (responseCode === '00') {
        if (isExist === 'false') {
          dispatch(generatePhoto(fieldName, pageName, data));
        } else {
          dispatch(userAccountExisted());
        }
      } else {
        Toast.show(responseMessage, Toast.LONG);
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function userAccountExisted () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToAtmRegister = () => {
      Promise.all([
        dispatch(logout())
      ]).then(() => {
        dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'}));
      });
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.ACCOUNT__REGISTERED,
      text: language.ACCOUNT__REGISTERED2,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERATE_CODE_FORM_BUTTON_NEXT,
      onButton2Press: goToAtmRegister,
      onClose: hideAlert,
      button1Color: 'black'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function generatePhoto (fieldName, pageName, data) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const base64 = result(data, 'base64', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const first10Char = base64.substring(0, 10);
    const last10Char = base64.substring(base64.length - 10);
    const newChar = first10Char + '|' + last10Char;
    
    const targetUrl = 'generatePhoto';
    const type = 'post';
    const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';
    const requestData = {cifCode, mobileNumber, photoBase64: base64, namePhoto: fieldName};
    const payload = {requestData, targetUrl, type, auth, newChar};

    return api.eformGeneralNew(payload, dispatch).then((res) => {
      const data = result(res, 'data.pathLocationPhoto');
      dispatch(change(eFormFields.formName, fieldName, data));
      dispatch(actionCreators.hideSpinner());
      return Promise.resolve();
    }).then(() => {
      const formValues = result(getState(), `form.${eFormFields.formName}.values`, {});
      return dispatch(handleSubmit(formValues, {pageName}));
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function generateStatementPhoto (fieldName, base64) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const first10Char = base64.substring(0, 10);
    const last10Char = base64.substring(base64.length - 10);
    const newChar = first10Char + '|' + last10Char;

    const targetUrl = 'generatePhoto';
    const type = 'post';
    const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';
    const requestData = {cifCode, mobileNumber, photoBase64: base64, namePhoto: fieldName};
    const payload = {requestData, targetUrl, type, auth, newChar};

    return api.eformGeneralNew(payload, dispatch).then((res) => {
      const data = result(res, 'data.pathLocationPhoto');
      dispatch(change(eFormFields.formName, fieldName, data));
      dispatch(actionCreators.hideSpinner());
      return Promise.resolve();
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export const handleSubmit = (values, {pageName, livenessId = ''}) => (dispatch, getState) => {
  dispatch(actionCreators.showSpinner());
  const {EForm = {}, user = {}, accounts = [], productCode = '', utmCode = {}, livenessTrxID = ''} = getState();
  const {id, code} = EForm;
  const requestValue = map(values, (obj, key) => ({code: key, value: obj}));
  const cifCode = result(user, 'profile.customer.cifCode', '');
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'});
  const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
  const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
  const ktpId = id !== null ? split(id, '-')[0] : null; 
  const targetUrl = 'submitRegistration';
  const type = 'post';
  const isDukcapilNew = 'YES';
  const dataUTM = result(utmCode, 'utm', '');
  const version = VersionNumber.appVersion;
  const requestData = {ktpId, cifCode, mobileNumber, id, code, productCode, isDukcapilNew, dataUTM, version, livenessTrxID, dataSubmit: {
    code: pageName,
    value: requestValue
  }};
  const payload = {requestData, targetUrl, type};
  let adjustEvent;
  if (productCode.includes('SA')) { // event adjust tracking Eform
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('csndco');
      if (pageName === '0~1') {
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-5');
        adjustEvent.addCallbackParameter('cif', cifCode);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      } else if (pageName === '2~2') {
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-8');
        adjustEvent.addCallbackParameter('cif', cifCode);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } 
  } else if (productCode.includes('CC')) {
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
      if (pageName === '0~1') {
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-5');
        adjustEvent.addCallbackParameter('cif', cifCode);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      } else if (pageName === '2~2') {
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-8');
        adjustEvent.addCallbackParameter('cif', cifCode);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }
  }

  return api.digitalEForm(payload, dispatch).then((res) => {	
    dispatch(actionCreators.hideSpinner());	
    
    const {data} = res;
    const {id = '', nextForm = {}, isGoToSection = false} = data;
    const {isPopUp = false, isCommit = false} = nextForm;

    const responseCode = result(data, 'responseCode', '');
    // Pengkinian Data => 03 kondisi kalo submit data tanpa ganti data apapun
    if (responseCode !== '03') {
      dispatch(destroy(eFormFields.formName));      
    }
    dispatch(actionCreators.clearProvinceList());
    dispatch(actionCreators.clearCityList());
    dispatch(actionCreators.clearDistrictList());
    dispatch(actionCreators.clearSubDistrictList());

    if (isCommit) {
      dispatch(commitRegistrationData());	
    } else if (isGoToSection) {
      dispatch(actionCreators.saveCurrentSection(result(nextForm, 'config', [])));
      if (productCode === 'PD') {
        const id = result(data, 'id', {});
        const storedData = {id};
        dispatch(actionCreators.saveEForm(storedData));
        dispatch(NavigationActions.reset({
          index: 1,	
          actions: [
            NavigationActions.navigate({routeName: 'AccountMenu'}),	
            NavigationActions.navigate({routeName: 'AccountEditProfile'})
          ]
        }));
      } else {
        if (livenessId !== '') {
          if (Platform.OS === 'android') {
            dispatch(successLiveness());
          } else {
            dispatch(NavigationActions.reset({
              index: 2,	
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),	
                NavigationActions.navigate({routeName: 'ChooseProductsItem'}),	
                NavigationActions.navigate({routeName: 'CurrentSection'})
              ]
            }));
            dispatch(successLiveness());
          }
        } else {
          if (productCode === 'EMONEY') {
            dispatch(NavigationActions.reset({
              index: 2,	
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),	
                NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}),	
                NavigationActions.navigate({routeName: 'CurrentSection'})
              ]
            }));
          } else {
            dispatch(NavigationActions.reset({
              index: 2,	
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),	
                NavigationActions.navigate({routeName: 'ProductsTnC'}),	
                NavigationActions.navigate({routeName: 'CurrentSection'})
              ]
            }));
          }
        }
      }
    } else if (isPopUp) {
      dispatch(showRoughLimitModal(res));
    } else if (responseCode === '03') {
      dispatch(actionCreators.hideSpinner());	
      Toast.show(language.PD__TOAST_CHANGE, Toast.LONG);	
    } else {
      const {pageData, value} = nextForm;
      const storedData = {id, page: pageData, value};	
      dispatch(actionCreators.saveEForm(storedData));
      const pageName = result(pageData, 'type', 'form').toLowerCase();
      const pageCode = result(pageData, 'code', '');
      const routeName = 'DigitalEForm';	
      const params = {pageName, pageCode};
      dispatch(NavigationActions.navigate({routeName, params}));
    }
  }).catch((err) => {	
    dispatch(actionCreators.hideSpinner());	
    Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);	
  });
};

const set = ({fieldName, formValues, dependentOn, dependentOnKeyword = 'option'}) => (dispatch) => {
  const value = result(formValues, `${dependentOn}.${dependentOnKeyword}`, '');
  value && formValues[fieldName] !== value && dispatch(change(eFormFields.formName, fieldName, value));
};

const setZipcode = ({fieldName, formValues, dependentOn, dependentOnKeywordZipcode = 'option'}) => (dispatch) => {
  const value = result(formValues, `${dependentOn}.${dependentOnKeywordZipcode}`, '');
  value && formValues[fieldName] !== value && dispatch(change(eFormFields.formName, fieldName, value));
};

export const dependentFunctions = {
  set,
};

export const dependentFunctionZipcode = {
  setZipcode
};

export function checkPhoneNumber (firebaseEmoney) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const name = result(state, 'form.EmoneyRegistrationForm.values.name', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, 'form.EmoneyRegistrationForm.values.phone', ''));
    const captchaInput = result(state, 'form.EmoneyRegistrationForm.values.captchaInput', '');
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    // const referralCode = result(state, 'form.EmoneyRegistrationForm.values.referralCode', '');
    const productCode =  result(state, 'productCode', '');
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const payload = {mobileNumber, captchaInput, captchaId, name};
    let adjustEvent;
    if (productCode.includes('SA')) { // event adjust tracking registration
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-2');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-2');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('v035jg');
        adjustEvent.addCallbackParameter('page_id', 'ak-emnkyc-2');
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }

    return api.sendEmailOtpEmoneyRegister(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        const emailToken = result(res, 'data.emailToken', '');
        const isLockedDevice = Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer);
        const typeActivation = '001';
        if (responseCode === '00') {
          dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, captchaInput}));
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
          dispatch(change('EmoneyRegistrationForm', 'captchaInput', ''));
          dispatch(actionCreators.hideSpinner());
          dispatch(sendOtpActivation(emailToken, typeActivation, isLockedDevice, firebaseEmoney));
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(change('EmoneyRegistrationForm', 'captchaInput', ''));
          dispatch(phoneRegisteredModal());
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        dispatch(change('EmoneyRegistrationForm', 'captchaInput', ''));
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM), Toast.LONG);
      });
  };
}

export function phoneRegisteredModal () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToLanding = () => {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Login'}),
        ]
      }));
      dispatch(actionCreators.clearCaptcha());
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      heading1: language.CREDITCARD__ALREADY_REGISTERED,
      text: language.CREDITCARD__ALREADY_REGISTERED_LOGIN,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.MODAL_ALREADY_HAVE_REGISTERED_EMONEY_LOG_IN,
      onButton2Press: goToLanding,
      onClose: hideAlert,
      button1Color: 'black'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function requestEmailOtp (pageName) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const email = result(state, 'form.DigitalEForm.values.email', '');
    const typeEmailToken = '001'; // have ipassport
    const payload = {email, typeEmailToken};
    return api.sendEmailToken(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'DigitalEFormEmailVerification', params: {pageName}}));
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function resendEmailToken () {
  return (dispatch, getState) => {
    const state = getState();
    const email = result(state, 'form.DigitalEForm.values.email', '');
    const typeEmailToken = '001'; // have ipassport
    const payload = {email, typeEmailToken};
    return api.sendEmailToken(payload, dispatch).
      catch((error) => {
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function validateEmailToken (pageName) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const otpCode = result(state, 'form.OTPEmail.values.emailToken', '');
    const typeEmailToken = '001'; // have ipassport
    const productCode =  result(state, 'productCode', '');
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const payload = {otpCode, typeEmailToken};
    let adjustEvent;
    if (productCode.includes('SA')) { // event adjust tracking email
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-7');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-7');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('EMONEY')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('eb9ysx');
        adjustEvent.addCallbackParameter('page_id', 'ak-emkyc-3');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }

    return api.validateEmailToken(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '00') {
        const formValues = result(getState(), `form.${eFormFields.formName}.values`, {});
        return dispatch(handleSubmit(formValues, {pageName}));
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function commitRegistrationData () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const productCode = result(state, 'productCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const ipAddress = result(state, 'ipAddress', '');
    const phoneList = result(state, 'phoneBook', []);
    const appList = result(state, 'listAPPuser', []);
    const device = result(state, 'deviceData', {});

    const deviceDataTemp = {
      'deviceId': result(device, 'deviceId', ''),
      'deviceType': result(device, 'deviceType', ''),
      'phoneBrand': result(device, 'phoneBrand', ''),
      'sim1Phone': result(device, 'sim1Phone', ''),
      'systemVersion': result(device, 'systemVersion', ''),
      'lon': result(state, 'geoLocation.lon', ''),
      'lat': result(state, 'geoLocation.lat', ''),
      'ipAddress': ipAddress
    };

    const deviceData = productCode.includes('SA') ? {} : deviceDataTemp;
    const targetUrl = 'commitRegistration';
    const type = 'post';
    const requestData = {cifCode, productCode, mobileNumber, deviceData, appList, phoneList};
    const payload = {requestData, targetUrl, type};
    
    return api.digitalEForm(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const data = result(res, 'data', {});
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'DigitalEFormSuccessScreen', params: {data}}));
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getPermissionAndroidandGetContact () {
  return (dispatch) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).
      then((status) => {
        if (status === 'granted') {
          Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              Toast.show(language.PERMISSION_ERROR__CONTACTS, Toast.LONG);
            } else {
              const allContactRaw = middlewareUtils.getListPhoneNew(contacts);
              let idContacts = [];
              const customContacts = filter(allContactRaw, (obj) => {
                filter(obj, (obj2) => {
                  idContacts.push(obj2);
                });
              });
              const content = [...idContacts, ...customContacts];
              dispatch(actionCreators.savePhoneBook(content));
            }
          });
        } else {
          dispatch(showPopupContactDeny());
          return Promise.resolve();
        }
      });
  };
}

export function getPermissionIosandGetContact () { // aka 2.10
  return (dispatch) => {
    if (Platform.OS === 'android') { 
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).
        then((response) => { 
          if (response === 'granted') {
            Contacts.getAll((err, contacts) => {
              if (err) {
                throw err;
              } else {
                const allContactRaw = middlewareUtils.getListPhoneNew(contacts);
                let idContacts = [];
                const customContacts = filter(allContactRaw, (obj) => {
                  filter(obj, (obj2) => {
                    idContacts.push(obj2);
                  });
                });
                const content = [...idContacts, ...customContacts];
                dispatch(actionCreators.savePhoneBook(content));
              }
            });
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then((response) => {
              if (response !== 'granted') {
                dispatch(showPopupContactDeny());
                return Promise.resolve();
              }
            });
          }
        });
    } else {
      Permissions.check('ios.permission.CONTACTS').then((response) => {
        if (response === 'granted') {
          Contacts.getAll((err, contacts) => {
            if (err) {
              throw err;
            } else {
              const allContactRaw = middlewareUtils.getListPhoneNew(contacts);
              let idContacts = [];
              const customContacts = filter(allContactRaw, (obj) => {
                filter(obj, (obj2) => {
                  idContacts.push(obj2);
                });
              });
              const content = [...idContacts, ...customContacts];
              dispatch(actionCreators.savePhoneBook(content));
            }
          });
        } else {
          Permissions.request('ios.permission.CONTACTS').then((response) => {
            if (response !== 'granted') {
              dispatch(showPopupContactDeny());
              return Promise.resolve();
            }
          });
        }
      });
    }
  }; 
}

export function getAndroidAppList () {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      GetAppList.getNonSystemApps().
        then((apps) => {
          const data = middlewareUtils.getInstalledAppNew(apps, Platform.OS);
          dispatch(actionCreators.saveAppList(data));
        }).
        catch(() => Promise.resolve());
    }
  };
}

export function getAllowContactsandApps () {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      dispatch(getAndroidAppList());
      dispatch(getPermissionAndroidandGetContact());
    } else {
      dispatch(getPermissionIosandGetContact());
    }
  };
}

export function getAdditionalData () {
  return (dispatch) => {
    const deviceId = DeviceInfo.getUniqueID();
    const deviceType = Platform.OS;
    const phoneBrand = DeviceInfo.getModel();
    const sim1Phone = DeviceInfo.getPhoneNumber() === undefined || DeviceInfo.getPhoneNumber() === '' ? 'not have sim card' : DeviceInfo.getPhoneNumber();
    const systemVersion = result(Platform, 'Version', '').toString();

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).
        then((status) => {
          if (status === 'granted') {
            Geolocation.getCurrentPosition(
              (info) => {
                const lat = result(info, 'coords.latitude', '0').toString();
                const lon = result(info, 'coords.longitude', '0').toString();
                dispatch(actionCreators.saveGeoLocation({lat, lon}));
              },
              () => {
                dispatch(actionCreators.hideSpinner());
              },
              {enableHighAccuracy: false, timeout: 3000, maximumAge: 1000},
            );
          } else {
            dispatch(showPopupLocationDeny());
            return Promise.resolve();
          }
        }).catch(() => Promise.resolve());
    } else {
      Permissions.request('ios.permission.LOCATION_ALWAYS').then((response) => {
        if (response === 'granted') {
          Geolocation.getCurrentPosition(
            (info) => {
              const lat = result(info, 'coords.latitude', '0').toString();
              const lon = result(info, 'coords.longitude', '0').toString();
              dispatch(actionCreators.saveGeoLocation({lat, lon}));
            },
            () => {
              dispatch(actionCreators.hideSpinner());
            },
            {enableHighAccuracy: false, timeout: 3000, maximumAge: 1000},
          );
        } else {
          dispatch(showPopupLocationDeny());
          return Promise.resolve();
        }
      });
    }

    dispatch(actionCreators.saveDeviceData({deviceId, deviceType, phoneBrand, sim1Phone, systemVersion}));

    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      dispatch(actionCreators.saveIpAddress(String(ipv4Address)));
    });

  };
}

export function showRoughLimitModal (res) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToNextForm = () => {
      const {data} = res;
      const {id, nextForm} = data;
      const {pageData, value} = nextForm;
      const storedData = {id, page: pageData, value};	
      dispatch(actionCreators.saveEForm(storedData));
      const pageName = result(pageData, 'type', 'form').toLowerCase();
      const pageCode = result(pageData, 'code', '');
      const routeName = 'DigitalEForm';	
      const params = {pageName, pageCode};
      dispatch(NavigationActions.navigate({routeName, params}));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.MIGRATE__CONGRATULATION,
      text: language.EFORM__LIMIT_KEY_1 + language.EFORM__LIMIT_KEY_2 + currencyFormatter(result(res, 'data.nextForm.limit', '')),
      button1: language.GENERIC__OK,
      onButton1Press: goToNextForm,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function onPeriodChange () {
  return (dispatch, getState) => {
    const state = getState();
    const isNewApply = result(state, 'form.DigitalEForm.values.isNewApply', true);
    if (isNewApply === false) {
      const amount = result(state, 'form.DigitalEForm.values.4~1~1', 0);
      const period = result(state, 'form.DigitalEForm.values.4~1~3.value', 0);
      const totalInterest = (amount * 0.7 / 100) * period;
      const amountGet = amount - totalInterest;
      const amountPay = amount;
      dispatch(change('DigitalEForm', '4~1~1', amount));
      dispatch(change('DigitalEForm', '4~1~4', totalInterest));
      dispatch(change('DigitalEForm', '4~1~5', amountGet));
      dispatch(change('DigitalEForm', '4~1~6', amountPay));
    }
  };
}

export function showPopupContactDeny () {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goBack = () => {
      if (cifCode === '') {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Introduction'})
          ]
        }));
      } else {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'})
          ]
        }));
      }
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: 'To continue, go to Settings and allow SimobiPlus to use device\'s contacts',
      button1: language.GENERIC__OK,
      onButton1Press: goBack,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}
  
export function showPopupLocationDeny () {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goBack = () => {
      if (cifCode === '') {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Introduction'})
          ]
        }));
      } else {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'})
          ]
        }));
      }
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: 'To continue, go to Settings and allow SimobiPlus to use device\'s location',
      button1: language.GENERIC__OK,
      onButton1Press: goBack,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function getSavingProductsItemsForDeeplink (productCode) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api.getSavingProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const findDataProduct = find(config, {'productCode': productCode});
      dispatch(actionCreators.saveProductCode(productCode));
      dispatch(actionCreators.saveProductData(findDataProduct));
      dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'})); 
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getListLoanProduct () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api.getLoanProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'LOAN__CHOOSE_PRODUCTS';
      dispatch(actionCreators.saveProductsItem({config, configTitle}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getConfigMenuSavingValas () {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const accountList = result(state, 'accounts', []);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const currency = '';
    const payload = {currency};
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    let show = false;

    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          show = false;
        } else {
          show = true;
        }
      } else {
        show = false;
      }
    } else {
      show = false;
    }

    if (show) {
      return api.getConfigDataSavingValas(payload, dispatch).then((res) => {
        dispatch(actionCreators.hideSpinner());
        const config = result(res, 'data.config', []);
        dispatch(actionCreators.saveProductsItemSimasValas({config}));
        dispatch(NavigationActions.navigate({routeName: 'SimasValasProductTypeSelections'}));
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
    } else {
      dispatch(getSavingProductsItems());
    }
  };
}

export function getCurrentSectionAccountMenu (isOnboard = false) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const code = result(state, 'productCode', '');

    const targetUrl = 'getCurrentSection';
    const type = 'post';
    const requestData = {cifCode, mobileNumber, code};
    const payload = {requestData, targetUrl, type};

    dispatch(actionCreators.showSpinner());
    return api.digitalEForm(payload, dispatch).then((res) =>     {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      const status = result(res, 'data.data.status', '');
      const data = result(res, 'data', {});
      const orderId = result(res, 'data.data.orderId', '');
      const statNum = status !== '99' && status !== '98' && status !== '97' ? status : null;

      if (responseCode === '00') {
        const {id} = data; 
        const storedData = {id};
        dispatch(actionCreators.saveEForm(storedData));
        dispatch(actionCreators.saveCurrentSection(result(res, 'data.config', [])));
        if (statNum) {
          dispatch(requestPopUp(orderId, status));
        } else {
          dispatch(NavigationActions.navigate({routeName: 'AccountEditProfile', params: {isOnboard}}));
        }
      } 
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export const getConfirmFields = (status) => (dispatch, getState) => {
  const {user = {}, accounts = [], productCode = '', EForm = {}} = getState();
  const {id} = EForm;
  const cifCode = result(user, 'profile.customer.cifCode', '');
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'});
  const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
  const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
  const targetUrl = 'confirmRegistrationData';
  const type = 'post';
  const requestData = {cifCode, mobileNumber, id, productCode};
  const payload = {requestData, targetUrl, type};
  
  dispatch(actionCreators.showSpinner());
  return api.digitalEForm(payload, dispatch).then((res) => {
    dispatch(actionCreators.hideSpinner());
    const responseCode = result(res, 'data.responseCode', '');
    const data = result(res, 'data', {});

    if (responseCode === '00') {
      dispatch(actionCreators.saveConfirmFields(data));
      dispatch(NavigationActions.navigate({routeName: 'ConfirmEditProfile', params: {status}}));
    }
  }).catch((error) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const verificationPopUp = (isAdvanceAI) => (dispatch) => {
  const goToVerif = () => {
    dispatch(actionCreators.hideSinarmasAlert());

    if (isAdvanceAI) {
      dispatch(PDLivenessCheck());      
    } else {
      dispatch(NavigationActions.navigate({routeName: 'ConfirmEditProfileSelfieCamera'}));
    }
  };
  
  const sinarmasModalOptions = {
    heading2: language.TAKE__SELFIE,
    text: language.DESC__SELFIE,
    button1: language.PGO__REJECT_BUTTON,
    onButton1Press: goToVerif,
    closeOnTouchOutside: false,
  };
  dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'SELFIEPD'}));
};

export function commitConfirmEditProfile () {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const productCode = result(state, 'productCode', '');

    dispatch(actionCreators.showSpinner());
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    if (easyPin) easyPin = 'encryptedPassword:' + OBM_GetEncryptedPassword() + '|encodingParameter:' + OBM_GetEncodingParameter() + '|randomNumber:' + randomNumber;
    const targetUrl = 'commitRegistration';
    const type = 'post';
    const requestData = {cifCode, mobileNumber, productCode};
    const payload = {easyPin, targetUrl, type, requestData};
    return api.commitPengkinianData(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      const data = result(res, 'data.responsePushData.data.orderId', {});
      if (responseCode === '00') {
        dispatch(actionCreators.saveConfirmFields(data));
        dispatch(NavigationActions.navigate({routeName: 'SuccessVerification'}));
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkSelfiePhoto (livenessId) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const id = result(state, 'EForm.id', '');
    const requestData = {cifCode, livenessId, mobileNumber, id};
    const payload = {requestData};
    
    return api.checkImage(payload, dispatch).then((res) => {
      const responseCode = result(res, 'data.responseCode', '');
      dispatch(actionCreators.hideSpinner());
      if (responseCode === '00') {
        const commitData = () => {
          dispatch(commitConfirmEditProfile());
        };
        const params = {onSubmit: commitData, amount: 0, isOtp: false};
        dispatch(triggerAuthNavigate('pengkinianData', 0, true, 'ConfirmationAuth', params));
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkSelfiePD (data) {	
  return (dispatch, getState) => {	
    const state = getState();	
    dispatch(actionCreators.showSpinner());	
    const cifCode = result(state, 'user.profile.customer.cifCode', '');	
    const selfiePhoto = result(data, 'base64', '');	
    const id = result(state, 'EForm.id', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const requestData = {cifCode, id, mobileNumber};	
    const payload = {selfiePhoto, requestData};	

    return api.checkImage(payload, dispatch).then((res) => {	
      const responseCode = result(res, 'data.responseCode', '');	
      const selfieScore = result(res, 'data.selfieScore', '');	
      dispatch(actionCreators.hideSpinner());	
      if (responseCode === '00') {	
        const commitData = () => {	
          dispatch(change('CameraSelfieForm', 'selfieScore', selfieScore));	
          dispatch(commitConfirmEditProfile());	
        };	
        const params = {onSubmit: commitData, amount: 0, isOtp: false};	
        dispatch(triggerAuthNavigate('pengkinianData', 0, true, 'ConfirmationAuth', params));	
      }	
    }).catch((error) => {	
      dispatch(actionCreators.hideSpinner());	
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);	
    });	
  };	
}	

export function requestPopUp (orderId, status) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.hideSpinner());
    };
    dispatch(actionCreators.showSpinner());

    const notifRequest = () => {
      dispatch(getConfirmFields(status));
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const requestTitle = language.REQUEST__ID_NUMBER + orderId;

    const sinarmasModalOptions = {
      text1Black: requestTitle,
      heading3: language.REQUEST__HEADER,
      text: language.REQUEST__SUBTITLE,
      button1: language.PGO__REJECT_BUTTON,
      onButton1Press: notifRequest,
      closeOnTouchOutside: true,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'PROGRESSPD'}));
  };
}

export function getCreditCardProductsItemsForDeeplink () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api.getCreditCardProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'CREDITCARD__CHOOSE_PRODUCTS';
      const isCreditCard = true;
      dispatch(actionCreators.saveProductsItem({config, configTitle, isCreditCard}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}


export function filterListIndustry (fieldName, onClearChange) {
  return (dispatch, getState) => {
    const state = getState();
    const formName = 'DigitalEForm';
    const formValues = result(state, `form[${formName}].values`, {});
    const name = result(formValues, `${fieldName}.name`, '');
    const shortname = result(formValues, `${fieldName}.shortname`, '');
    let listIndustryNew = result(state, 'configEForm.listConfigEform.simplifiedIndustryList', []);
    let filteredListIndustryNew = [];
    const groupValue = shortname === 'picklist' ? 'picklist' : name;
    const productCode = result(state, 'productCode', '');
    if (productCode !== 'SADG') {
      remove(listIndustryNew, {code: '1056'});
      remove(listIndustryNew, {code: '1057'});
    }
    if (name === '') {
      return Promise.resolve();
    } else {
      forEach(listIndustryNew, function (item) {
        forEach(item.group, function (group) {
          if (group === groupValue) {
            filteredListIndustryNew.push(item);
          }
        });
      });
      dispatch(actionCreators.saveSimplifiedListIndustryNew(filteredListIndustryNew));
      dispatch(clearData(onClearChange));
    }
  };
}

export function filterListJob () {
  return (dispatch, getState) => {
    const state = getState();
    const productCode = result(state, 'productCode', '');
    const simplifiedJobList = result(state, 'configEForm.listConfigEform.simplifiedJobList', []);
    let newSimplifiedJobList = [];
    if (productCode !== 'SADG') {
      forEach(simplifiedJobList, (item) => {
        const description = result(item, 'description', '');
        const shortname = result(item, 'shortname', '');
        description !== 'Others' && newSimplifiedJobList.push(item);
        shortname === 'picklist' && newSimplifiedJobList.push(item);
      });
    } else {
      newSimplifiedJobList = simplifiedJobList;
    }
    dispatch(actionCreators.saveSimplifiedListJobNew(sortedUniq(newSimplifiedJobList)));
  };
}

export function getLivenessIdIOS (pageCode, livenessId) {
  return (dispatch, getState) => {
    const state = getState();
    const productCode = result(state, 'productCode', '');
    if (productCode === 'PD') {
      dispatch(checkSelfiePhoto(livenessId));
    } else {
      const EForm = result(state, 'EForm', {});
      const page = result(EForm, 'page', {});
      const fields = result(page, 'fields', []);
      const field = filter(fields, (obj) => obj.component === 'selfieCamera')[0] || fields[0]; // fields that uses camera or the first field if none specified
      const {code: fieldName} = field;
      dispatch(change(eFormFields.formName, fieldName, livenessId)); // 0~1~3
      const formValues = result(getState(), `form.${eFormFields.formName}.values`, {});
      dispatch(handleSubmit(formValues, {pageName: pageCode, livenessId}));
    }
  };
}

export function successLiveness () {
  return (dispatch, getState) => {
    const state = getState();
    const productCode = result(state, 'productCode', '');

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const backToSection = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      if (productCode === 'EMONEY') {
        dispatch(NavigationActions.reset({
          index: 2,	
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),	
            NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}),	
            NavigationActions.navigate({routeName: 'CurrentSection'})
          ]
        }));
      } else {
        dispatch(NavigationActions.reset({
          index: 2,	
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),	
            NavigationActions.navigate({routeName: 'ChooseProductsItem'}),	
            NavigationActions.navigate({routeName: 'CurrentSection'})
          ]
        }));
      }
    };
    const sinarmasModalOptions = {
      heading1: language.LIVENESS__SUCCESS,
      text: language.LIVENESS__SUCCESS_NOTICE,
      button1: language.GENERIC__OK,
      onButton1Press: Platform.OS === 'android' ? hideAlert : backToSection,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'SUCCESSLIVENESS'}));
  };
}

export function goToTnC (value) {
  return (dispatch, getState) => {
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const accountList = result(state, 'accounts', []);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const nav = result(state, 'nav', {});
    const productCode = result(state, 'productCode', '');
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isUserLogin = isLogin && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const emoneyKycOnly = getEmoneyKyc(accountList).length === 1 && !startsWith(cifCode, 'NK');

    if (productCode.includes('PGO')) {
      if (isUserLogin) {
        if (!startsWith(cifCode, 'NK')) {
          if (emoneyKycOnly) {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardForm1', params: {value}}));
          } else {
            dispatch(openLoanAccount(value));
          }
        } else {
          dispatch(NavigationActions.navigate({routeName: 'CreditCardForm1', params: {value}}));
        }
      } else {
        dispatch(NavigationActions.navigate({routeName: 'EmoneyRegistration'}));
      }
    } else {
      dispatch(NavigationActions.navigate({routeName: 'ProductsTnC'}));
    }
  };
}

export function getSimulationDetail (detail) {
  return (dispatch) => {
    forEach(detail, (key) => {
      const code = result(key, 'code', '');
      const value = result(key, 'value', '');
      dispatch(change('DigitalEForm', code, value));
    });
  };
}

export function PDLivenessCheck () {
  return (dispatch) => {
    if (Platform.OS === 'ios') {
      dispatch(NavigationActions.navigate({routeName: 'LivenessSection'}));
    } else {
      NativeModules.LivenessModule.startLiveness(
        (livenessId) => {
          dispatch(checkSelfiePhoto(livenessId));
        },
        (err, errorMessage) => {
          // cancel, errorMessage, errorCode
          // FACE_MISSINNG
          // ACTION_TIMEOUT
          const isCancel = !err;
          if (isCancel) {
            if (errorMessage !== null) {
              Toast.show(errorMessage, Toast.LONG);
            }
          }
          return Promise.resolve();
        }
      );
    }
  };
}

export function getListLoanProductFromKycUser () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api.getLoanProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'LOAN__CHOOSE_PRODUCTS';
      dispatch(actionCreators.saveProductsItem({config, configTitle}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getCreditCardProductsItemsFromKycUser () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    api.getCreditCardProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'CREDITCARD__CHOOSE_PRODUCTS';
      const isCreditCard = true;
      dispatch(actionCreators.saveProductsItem({config, configTitle, isCreditCard}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getLoginSavingProductsItems () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    const ipassport = result(getState(), 'user.ipassport', '');
    const newIpass = isLogin ? ipassport : null;
    const payload = {ipassport: newIpass};
    return api.getSavingProducts(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const config = result(res, 'data.config', []);
      const configTitle = 'SAVING__CHOOSE_PRODUCTS';
      dispatch(actionCreators.saveProductsItem({config, configTitle}));
      dispatch(NavigationActions.navigate({routeName: 'ChooseProductsItem'}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}