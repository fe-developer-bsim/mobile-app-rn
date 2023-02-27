import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {getErrorMessage, formatMobileNumberEmoneyRegistration} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {change, destroy} from 'redux-form';
import {result, find, sortBy, forEach, split, isEmpty, map} from 'lodash';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import {fields as eFormFields} from '../../components/Signature/RenderESigning.component';
import {getCurrencyMultiSil} from './dashboard.thunks';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
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
  const code = formValues[`${fieldName}`].code || '';
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
  const code = formValues[`${fieldName}`].code || '';
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
  const code = formValues[`${fieldName}`].code || '';
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

export function goDigitalSigning () {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
    const payload = {cifCode, mobileNumber};
    dispatch(actionCreators.showSpinner());
    return api.digitalSigning(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const data = result(res.data, 'data', {});
      const pageData = result(res.data, 'nextPage.pageData', {});
      const value = result(res.data, 'value', {});
      const {id, referenceCode} = data;
      const storedData = {id, referenceCode, page: pageData, value};
      dispatch(actionCreators.saveEForm(storedData));
      const pageName = result(pageData, 'type', 'form').toLowerCase();
      const pageCode = result(pageData, 'code', '');
      if (pageName === 'camera') {
        dispatch(checkCameraPermission());
      }
      const routeName = 'ESigning';
      const params = {pageName, pageCode};
      dispatch(NavigationActions.navigate({routeName, params}));
    }).catch((err) => {
      const responseCode = result(err, 'data.responseCode', '');
      if (responseCode === '03') {
        dispatch(NavigationActions.navigate({routeName: 'PaymentBuyPolisSIL'}));
      }
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export const handleSubmit = () => (dispatch, getState) => {
  dispatch(actionCreators.showSpinner());
  
  const {user = {}, accounts = []} = getState();
  const state = getState();
  const base64 = result(state, 'form.DigitalEForm.values', '');
  const ktpId = result(state, 'smartInvestasiLinkPolis.nik', '');
  const transIdMerchant = result(state, 'inputPolisIndividu.trx_id', '');
  const requestValue = map(base64, (obj, key) => ({code: key, value: obj}));
  const cifCode = result(user, 'profile.customer.cifCode', '');
  const emoneyAccount = find(accounts, {accountType: 'emoneyAccount'});
  const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
  const pageName = 'ESign';
  const productCode = 'ASJ';
  const object = {
    code: 'transIdMerchant',
    value: transIdMerchant,
  };
  requestValue.push(object);
  const mobileNumber = formatMobileNumberEmoneyRegistration(emoneyNoAcc.substring(2, emoneyNoAcc.length));
  const payload = {requestData: {ktpId, cifCode, mobileNumber, productCode, dataSubmit: {
    code: pageName,
    value: requestValue,
  }}};
  return api.confirmTransIndividu(payload, dispatch).then((res) => {
    dispatch(actionCreators.hideSpinner());
    const isForm = result(res, 'data.isForm', '');
    if (isForm) {
      dispatch(destroy(eFormFields.formName));
      const {data} = res;
      const {id, nextForm} = data; 
      const {pageData, value} = nextForm;
      const storedData = {id, page: pageData, value};
      dispatch(actionCreators.saveEForm(storedData)); 
      const pageName = result(pageData, 'type', 'form').toLowerCase();
      const pageCode = result(pageData, 'code', '');
      const routeName = 'ESigning';
      const params = {pageName, pageCode};
      dispatch(NavigationActions.navigate({routeName, params}));
    } else { 
      dispatch(getCurrencyMultiSil());
      dispatch(NavigationActions.navigate({routeName: 'PaymentBuyPolisSIL'}));
    }
  }).catch((err) => {
    dispatch(actionCreators.hideSpinner());
    Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
  });
};

