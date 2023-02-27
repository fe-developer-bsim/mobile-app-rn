import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {getErrorMessage, generateCaptchaOpenProduct as generateCaptcha,
  formatMobileNumberEmoneyRegistration, transformTokenIos, isEmptyOrNull, addZero} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {change, destroy} from 'redux-form';
import {result, isEmpty, sortBy, split, map, forEach, startsWith, find} from 'lodash';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import {fields as eFormFields} from '../../components/CreateNewAccount/RenderEForm.component.js';
import {fields as registerFields} from '../../components/CreateNewAccount/RegisterPhoneEmailKTP.component.js';
import {wrapDispatchMethodInFunction} from './common.thunks.js';
import {sendTrackingFivePointTwo, sendTrackingFivePointFive, sendTrackingFivePointFour, getInstalledApp} from './loan.thunks';
import {storageKeys, set as setStore} from '../../utils/storage.util';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const getAreaData = (mode, code, apiName) => (dispatch) => {
  const payload = {mode, code};
  return api[apiName](payload, dispatch);
};

export const setFormValue = (fieldName, value) => (dispatch) => dispatch(change('EForm', fieldName, value));

export const getDistrictByCity = (cityName) => (dispatch) => dispatch(getAreaData('district', cityName, 'getDistrictList'));

export const getCityByProvince = (provinceName) => (dispatch) => dispatch(getAreaData('city', provinceName, 'getCityList'));

export const getDistrictBySubDistrict = (subDistrictName) => (dispatch) => dispatch(getAreaData('subDistrict', subDistrictName, 'getSubDistrictList'));

export const getWorkTypeList = (jobType) => (dispatch) => dispatch(getAreaData('jobType', jobType, 'getWorkList'));

export const clearData = (onClearChange) => (dispatch, getState) => {
  const state = getState();
  forEach(split(onClearChange, ','), (value) => {
    const keyValue = state.form.EForm.values[`${value}`];
    if (!isEmpty(keyValue) || keyValue !== '') {
      dispatch(change('EForm', `${value}`, {}));
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

export const getCityList = (provinceData, onClearChange) => (dispatch) => {
  dispatch(actionCreators.showSpinner());
  const provinceCode = result(provinceData, 'code', {});
  return dispatch(getCityByProvince(provinceCode)).then((res) => {
    dispatch(actionCreators.hideSpinner());
    const cityList = sortBy(result(res, 'data.data.city', []), 'name');
    dispatch(actionCreators.saveCityList(cityList));
    dispatch(clearData(onClearChange));
  }).catch((error) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const getDistrictList = (cityData, onClearChange) => (dispatch) => {
  dispatch(actionCreators.showSpinner());
  const cityCode = result(cityData, 'code', {});
  return dispatch(getDistrictByCity(cityCode)).then((res) => {
    const districtList = sortBy(result(res, 'data.data.district', []), 'name');
    dispatch(actionCreators.saveDistrictList(districtList));
    dispatch(clearData(onClearChange));
    dispatch(actionCreators.hideSpinner());
  }).catch((error) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const getSubDistrictList = (districtData, onClearChange) => (dispatch) => {
  dispatch(actionCreators.showSpinner());
  const districtCode = result(districtData, 'code', {});
  return dispatch(getDistrictBySubDistrict(districtCode)).then((res) => {
    const subDistrictList = sortBy(result(res, 'data.data.subDistrict', []), 'name');
    dispatch(actionCreators.saveSubDistrictList(subDistrictList));
    dispatch(clearData(onClearChange));
    dispatch(actionCreators.hideSpinner());
  }).catch((error) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const getJobList = (jobType) => (dispatch) => {
  dispatch(actionCreators.showSpinner());
  const jobCode = result(jobType, 'name', '');
  return dispatch(getWorkTypeList(jobCode)).then((res) => {
    const jobTypeList = sortBy(result(res, 'data.data.workList', []), 'name');
    dispatch(actionCreators.saveJobType(jobTypeList));
    dispatch(actionCreators.hideSpinner());
  }).catch((error) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const saveEFormBasicData = (values) => (dispatch) => {
  dispatch(actionCreators.saveEForm(...values));
};

export const handleSubmit = (values, {pageName}) => (dispatch, getState) => {
  dispatch(actionCreators.showSpinner());
  const {EForm = {}, user, accountList = [], nav = {}, accounts = []} = getState();
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'});
  const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
  const {id, code, formid, dataDukcapil, dataCore} = EForm;
  const requestValue = map(values, (obj, key) => ({code: key, value: obj}));
  const cifCode = result(user, 'profile.customer.cifCode', '');
  const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
  const requestData = {cifCode, mobileNumber, id, code, formid, dataDukcapil, dataCore, dataSubmit: {
    code: pageName,
    value: requestValue
  }};
  const targetUrl = 'genericRegistration';
  const type = 'post';
  const payload = {requestData, targetUrl, type};

  const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
  const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
  const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
  const routeFlaging = {isEmoneyKyc, isLogin};

  return api.apiGeneral(payload, dispatch).then((res) => {
    dispatch(actionCreators.hideSpinner());
    dispatch(destroy(eFormFields.formName));
    const {data} = res;
    const {id, referenceCode, nextForm} = data;
    const {pageData, value} = nextForm;
    const storedData = {id, referenceCode, page: pageData, value};
    const pageName = result(pageData, 'type', 'form').toLowerCase();
    const pageCode = result(pageData, 'code', '');
    const routeName = 'EForm';
    const params = {pageName, dataDukcapil, dataCore, pageCode, routeFlaging};
    dispatch(actionCreators.saveEForm(storedData));
    if (pageName === 'camera') {
      dispatch(checkCameraPermission());
      dispatch(NavigationActions.back());
      dispatch(NavigationActions.navigate({routeName, params}));
    } else {
      if (!isEmoneyKyc && isLogin) {
        dispatch(NavigationActions.reset({
          index: 2,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({routeName: 'ChooseLoanAccount'}),
            NavigationActions.navigate({routeName, params})
          ]
        }));
      } else {
        dispatch(NavigationActions.navigate({routeName, params}));
      }
    }
  }).catch((err) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const generatePhoto = (dataUser, fieldName, base64, pageName, formid) => (dispatch, getState) => {
  dispatch(actionCreators.showSpinner());
  const state = getState();
  const mobileNumber = result(state, 'EForm.data.mobileNumber', '');
  const cifCode = result(state, 'user.profile.customer.cifCode', '');
  const requestData = {cifCode, mobileNumber, photoBase64: base64, namePhoto: fieldName};
  const targetUrl = 'generatePhoto';
  const type = 'post';
  const auth = 'EFORMCENTRAL|s3cuR3p455w0rD3f0rM';

  const username = 'EFORMCENTRAL';
  const password = 's3cuR3p455w0rD3f0rM';

  const isNotEncrypt = result(state, 'config.InactiveEncryptEformKey', null);
  let payload = {};
  let apiName = '';

  if (isNotEncrypt === null) {
    payload = {requestData, targetUrl, type, auth};
    apiName = 'eformGeneral';
  } else {
    payload = {requestData, targetUrl, type, username, password};
    apiName = 'eformGeneralNoAuth';
  }

  return api[apiName](payload, dispatch).then((res) => {
    const data = result(res, 'data.pathLocationPhoto');
    dispatch(change(eFormFields.formName, fieldName, data));
    dispatch(actionCreators.hideSpinner());
    return Promise.resolve();
  }).then(() => {
    dispatch(NavigationActions.back());
    const formValues = result(getState(), `form.${eFormFields.formName}.values`, {});
    return dispatch(handleSubmit(formValues, {pageName, formid, dataUser}));
  }).catch((error) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

export const confirmImage = (dataUser, fieldName, pageName, formid, data) => (dispatch) => {
  const base64 = result(data, 'base64', '');
  const nextFunction = dispatch(wrapDispatchMethodInFunction(generatePhoto, dataUser, fieldName, base64, pageName, formid));
  dispatch(NavigationActions.navigate({routeName: 'ImageConfirmation', params: {data: base64, nextFunction}}));
};

export const confirmImageRetake = (data) => (dispatch) => {
  const base64 = result(data, 'base64', '');
  dispatch(NavigationActions.navigate({routeName: 'ConfirmRetakeSelfiePage', params: {data: base64}}));
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
      const responseCode = result(res, 'data.responseCode', '');
      if (responseCode === '00') {
        dispatch(actionCreators.saveLoanProduct(result(res, 'data.config', [])));
        dispatch(NavigationActions.navigate({routeName: 'ChooseLoanAccount'}));
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkLoginSaving (referralCodeOrami, typeActivation, usernameOrami, emailUser, handphoneNumberRaw) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    setTimeout(() => {
      dispatch(actionCreators.hideSpinner());
      const phoneNumber = transformTokenIos(handphoneNumberRaw);
      if (typeActivation === '021') {
        dispatch(actionCreators.saveCcCode('SAO-SIMOBI-002'));
      }
      dispatch(actionCreators.saveParamsLinkSavingOrCC({phoneNumber, referralCodeOrami, usernameOrami, emailUser}));
      dispatch(NavigationActions.navigate({routeName: 'SavingTnC'}));
    }, 5000);
  };
}

export const openLoanAccount = (item) => (dispatch, getState) => {
  dispatch(actionCreators.showSpinner());
  const {user, nav} = getState();
  const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
  const isLogin = !isEmptyOrNull(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
  const formCode = result(item, 'productCode', '');
  const mode = 'SIMOBI';
  const version = 2;
  const formid = `${formCode}-${mode}-${addZero(version, 3)}`;
  dispatch(actionCreators.saveFormId({formid, code: formCode}));
  if (isLogin) {
    const cifCode = result(user, 'profile.customer.cifCode', '');
    const payload = {cifCode};
    return api.getCcDataCif(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const dataDukcapil = result(res, 'data.data.dataEktpMurni', {});
      const dataCore = result(res, 'data.data.dataCore', {});
      return dispatch(getFirstPage(dataDukcapil, dataCore));
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      dispatch(actionCreators.hideSpinner());
    });
  } else {
    dispatch(NavigationActions.navigate({routeName: 'NewEForm'}));
  }
};

export const getFirstPage = (dataDukcapil, dataCore, flagBack = false, pageNameBack = '') => (dispatch, getState) => {
  dispatch(actionCreators.showSpinner());
  dispatch(actionCreators.saveEFormDukcapil(dataDukcapil));
  dispatch(actionCreators.saveEFormCoreData(dataCore));
  setTimeout(() => {
    dispatch(sendTrackingFivePointTwo());
  }, 4000);
  setTimeout(() => {
    dispatch(sendTrackingFivePointFour());
  }, 7000);
  setTimeout(() => {
    dispatch(sendTrackingFivePointFive());
  }, 10000);
  if (Platform.OS === 'android') {
    setTimeout(() => {
      dispatch(getInstalledApp());
    }, 13000);
  }
  const state = getState();
  const ktpId = result(dataDukcapil, 'NIK', '').toString() === '' ? result(state, 'form.CCForm1.values.ktpId', '') : result(dataDukcapil, 'NIK', '').toString();
  const accountList = result(state, 'accounts', []);
  const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
  const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
  const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
  const formid = result(state, 'EForm.formid', '');
  const code = result(state, 'EForm.code', '');
  const cifCode = result(state, 'user.profile.customer.cifCode', '');
  const requestData = {ktpId, formid, mobileNumber, cifCode, code, flagBack, pageNameBack};
  const targetUrl = 'getGenericData';
  const type = 'post';
  const payload = {requestData, targetUrl, type};
  const nav = result(state, 'nav', {});
  const user = result(state, 'user', {});

  const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
  const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
  const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
  const routeFlaging = {isEmoneyKyc, isLogin};

  return api.apiGeneral(payload, dispatch).then((res) => {
    const {data: response} = res;
    const {data, nextPage} = response;
    const {id, referenceCode, referralCode} = data;
    const {pageData, value} = nextPage;
    const storedData = {id, referenceCode, referralCode, page: pageData, value};
    const pageName = result(pageData, 'type', 'form').toLowerCase();
    const pageCode = result(pageData, 'code', '');

    if (pageName === 'camera') {
      dispatch(checkCameraPermission());
    }
    const routeName = 'EForm';
    const params = {pageName, dataDukcapil, dataCore, pageCode, routeFlaging};
    dispatch(actionCreators.saveEForm(storedData));
    dispatch(actionCreators.hideSpinner());
    dispatch(NavigationActions.navigate({routeName, params}));
  }).catch((err) => {
    Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    dispatch(actionCreators.hideSpinner());
  });
};

export function checkPhoneforCCForm () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const formValues = `form.${registerFields.formName}.values`;
    const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, `${formValues}.phone`, ''));
    const email = result(state, `${formValues}.email`, '');
    const ktpId = result(state, `${formValues}.ktpId`, '');
    const captchaInput = result(state, `${formValues}.captchaInput`, '');
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    const payload = {mobileNumber, email, captchaInput, captchaId, ktpId};
    return api.checkPhoneForCC(payload, dispatch).then((res) => { // mobile number is not registered
      const captcha = generateCaptcha();
      dispatch(actionCreators.setCaptcha(captcha));
      if (result(res, 'data.responseCode', '99') === '00') {
        const payload = {mobileNumber, email, ktpId};
        return api.dukcapilKTP(payload, dispatch).then((res) => {
          const dataDukcapil = result(res, 'data.dataEktpMurni', '');
          dispatch(actionCreators.saveNTBData(payload));
          return dispatch(getFirstPage(dataDukcapil));
        });
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(res, language.APP_ERROR__TITLE), Toast.LONG);
      }

    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function incorrectDataModal (res) {
  return (dispatch, getState) => {
    const state = getState();
    const EForm = result(state, 'EForm', {});
    const {dataDukcapil, dataCore} = EForm;

    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const goToForm = () => {
      const {data: response} = res;
      const {data, nextPage} = response;
      const {id, referenceCode, referralCode} = data;
      const {pageData, value} = nextPage;
      const storedData = {id, referenceCode, referralCode, page: pageData, value};
      dispatch(actionCreators.saveEForm(storedData));

      const pageName = result(pageData, 'type', 'form').toLowerCase();
      const pageCode = result(pageData, 'code', '');
      if (pageName === 'camera') {
        dispatch(checkCameraPermission());
      }
      const routeName = 'EForm';
      const params = {pageName, dataDukcapil, dataCore, pageCode};
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName, params}));
      hideAlert();
    };

    const sinarmasModalOptions = {
      heading1: language.PGO__INCORRECT_FIELD,
      text: language.PGO_INCORRECT_SUBTITLE,
      button1: language.GENERIC__OK,
      onButton1Press: goToForm,
      onClose: hideAlert,
      button1Color: 'red',
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function submitFormPGO (form) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const data = result(state, `${form}`, {});
    const formValues = result(state, `form.${form}.values`);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const code = result(data, 'code', '');
    const formid = result(data, 'formid', '');
    const id = result(data, 'id', '');
    const accountName = result(formValues, 'accountNo.name', '');
    const accountNumber = result(formValues, 'accountNo.accountNumber', '');
    const branchCode = result(formValues, 'accountNo.bankBranch.code', '');
    const requestData = {cifCode, code, formid, id, accountName, accountNumber, branchCode};
    const targetUrl = 'commitData';
    const type = 'post';
    const payload = {requestData, targetUrl, type};

    return api.apiGeneral(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const responseCode = result(res, 'data.responseCode', '');
      const responseMessage = result(res, 'data.responseMessage', '');
      if (responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'EFormLoanSuccess'}));
        setStore(storageKeys['PGO_REJECT'], {alreadyPopUp: false});
        setStore(storageKeys['PGO_PAYMENT'], {alreadyPopUp: false});
      } else if (responseCode === '95') {
        dispatch(destroy('EForm'));
        dispatch(incorrectDataModal(res));
      } else {
        Toast.show(responseMessage, Toast.LONG);
      }
    }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

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
              Toast.show('Go to settings, allow Simobi+ to access device camera', Toast.LONG);
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

export function getDataForPGO (value, dataDukcapil, dataCore) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const formCode = result(value, 'productCode', '');
    const mode = 'SIMOBI';
    const version = 2;
    const formid = `${formCode}-${mode}-${addZero(version, 3)}`;
    dispatch(actionCreators.saveFormId({formid, code: formCode}));
    dispatch(actionCreators.saveEFormDukcapil(dataDukcapil));
    dispatch(actionCreators.saveEFormCoreData(dataCore));
    dispatch(getFirstPage(dataDukcapil, dataCore));
  };
}

export function onPeriodChange (value) {
  return (dispatch, getState) => {
    const state = getState();
    const isNewApply = result(state, 'form.EForm.values.isNewApply', true);
    if (isNewApply === false) {
      const amount = result(state, 'form.EForm.values.4~1~1', 0);
      const periodName = result(value, 'name', 0);
      const period = split(periodName, ' ');
      const totalInterest = (amount * 0.7 / 100) * period[0];
      const amountGet = amount - totalInterest;
      const amountPay = amount;
      dispatch(change('EForm', '4~1~1', amount));
      dispatch(change('EForm', '4~1~4', totalInterest));
      dispatch(change('EForm', '4~1~5', amountGet));
      dispatch(change('EForm', '4~1~6', amountPay));
    }
  };
}
