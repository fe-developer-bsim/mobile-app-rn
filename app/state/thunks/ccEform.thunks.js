import * as actionCreators from '../actions/index.actions.js';
import {storageKeys, getInitKeys} from '../../utils/storage.util';
import api from '../../utils/api.util';
import * as middlewareUtils from '../../utils/middleware.util';
import {getErrorMessage, getFormName, getFieldName, generateCaptchaOpenProduct as generateCaptcha,
  formatMobileNumberEmoneyRegistration, openAccountCoreData, changeFormByCode} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language, setCurrentLang} from '../../config/language';
import tracker from '../../utils/googleAnalytics.util';
import {initializeRSA} from '../../utils/secure.util';
import {ENV} from '../../config/env.config';
import moment from 'moment';
import {change} from 'redux-form';
import {filter, sortBy, forEach, split, result, endsWith, startsWith, isEmpty, find} from 'lodash';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import {registerEmoney, logout, sendOtpActivation} from '../../state/thunks/onboarding.thunks';
import {getDataForPGO} from '../../state/thunks/EForm.thunks';

// let Analytics = firebase.analytics();

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

export function setupAppInitKeys () {
  return (dispatch) => getInitKeys().then((values) => {
    const data = {};
    data[storageKeys['USERNAME']] = values[0];
    data[storageKeys['TOKEN_CLIENT']] = values[1];
    data[storageKeys['TOKEN_SERVER']] = values[2];
    dispatch(actionCreators.saveAppInitKeys(data));
    return data;
  });
}

export function populateConfigData () {
  return (dispatch, getState) => {
    const storeState = getState();
    if (result(storeState, 'config.bankList', []).length === 0) {
      return api.getAppConfig(dispatch).
        then((res) => {
          const timeOutSession = Number(result(res, 'data.timeoutSession', 5));
          dispatch(actionCreators.saveTimeReducer(timeOutSession * 60));
          dispatch(actionCreators.setAppTimeout(timeOutSession * 60));
          dispatch(actionCreators.configPopulateData(res.data));
        });
    }
    return Promise.resolve(); // So that the function always return a valid promise
  };
}

export function hsmInit () {
  return (dispatch) => {
    // Do not init HSM Encryption in dev/uat environments
    if (ENV === 'production' || ENV === 'dev') {
      return Promise.resolve();
    }
    return api.retrieveHSMInitKeys(dispatch).
      then((r) => {
        const E2EE_RANDOM = r.data['_e2EERandomNum'];
        const publicKey = r.data['_e2EEPublicKey'];
        const sessionId = r.data['_e2EESessionId'];
        dispatch(actionCreators.setAPIPayloadParam({E2EE_RANDOM, publicKey, sessionId}));
        return initializeRSA(publicKey, sessionId, E2EE_RANDOM);
      }).
      catch((err) => tracker.trackEvent('NON_FATAL_ERROR', 'HSM_INIT API FAILED', null, {label: `ERROR_MSG: ${JSON.stringify(err)}`}));
  };
}

export function checkHSMInit () {
  return (dispatch, getState) => {
    // Do not init HSM Encryption in dev/uat environments
    if (ENV === 'production' || ENV === 'dev') {
      return Promise.resolve();
    }

    const resultE2EE_RANDOM = result(getState(), 'additionalApiPayload.E2EE_RANDOM', {});
    const resultpublicKey = result(getState(), 'additionalApiPayload.publicKey', {});
    const resultsessionId = result(getState(), 'additionalApiPayload.sessionId', {});

    if (isEmpty(resultE2EE_RANDOM) || isEmpty(resultpublicKey) || isEmpty(resultsessionId)) {
      return api.retrieveHSMInitKeys(dispatch).
        then((r) => {
          const E2EE_RANDOM = r.data['_e2EERandomNum'];
          const publicKey = r.data['_e2EEPublicKey'];
          const sessionId = r.data['_e2EESessionId'];

          dispatch(actionCreators.setAPIPayloadParam({E2EE_RANDOM, publicKey, sessionId}));
          initializeRSA(publicKey, sessionId, E2EE_RANDOM);
          return Promise.resolve();
        }).
        catch(() => {
          const err = {
            data: {
              responseMessage: language.ERROR_MESSAGE__HSM_RE_INIT_FAILED
            }
          };
          tracker.trackEvent('NON_FATAL_ERROR', 'HSM RE-INIT API FAILED', null, {label: `ERROR_MSG: ${JSON.stringify(err)}`});
          return Promise.reject(err);
        });
    } else {
      return Promise.resolve();
    }
  };
}

export function setCurrentLanguage (languageId) {
  return (dispatch) => {
    if (!['id', 'en'].includes(languageId)) { // If asyncstorage contains anything else except 'id' or 'en', use 'id'
      languageId = 'en';
    }
    setCurrentLang(languageId);
    return dispatch(actionCreators.setLanguage(languageId));
  };
}

export function clearReducer () {
  return (dispatch) => {
    dispatch(actionCreators.clearAccounts());
    dispatch(actionCreators.clearUserMetaData());
    dispatch(actionCreators.clearPayee());
    dispatch(actionCreators.clearElectricityPayment());
    dispatch(actionCreators.clearWaterPayment());
    dispatch(actionCreators.clearPostpaidPayment());
    dispatch(actionCreators.clearRecharges());
    dispatch(actionCreators.clearPayees());
    dispatch(actionCreators.clearCreditCardPayment());
    dispatch(actionCreators.clearAppInitKeys());
    dispatch(actionCreators.clearCcHistory());
    dispatch(actionCreators.cleanClearTransactions());
    dispatch(actionCreators.clearTransRefNum());
    dispatch(actionCreators.clearAPIPayloadParam());
    dispatch(actionCreators.clearUserApiKey());
    dispatch(actionCreators.clearIsUsingFaceRecog());
    dispatch(actionCreators.clearIsUsingFingerprint());
    dispatch(actionCreators.clearHasFingerprint());
    dispatch(actionCreators.clearEgiftCart());
    dispatch(actionCreators.clearSimasPoin());
    dispatch(actionCreators.clearPaymentStatus());
    dispatch(actionCreators.saveSimasPoin({isLockdown: false}));
    dispatch(actionCreators.clearEmoney());
    return Promise.resolve();
  };
}

export function resetAndNavigate (route, params) {
  return (dispatch) => {
    dispatch(actionCreators.hideDrawer());
    dispatch(NavigationActions.navigate({routeName: route, params}));
  };
}

export function receiveCreditCardProvince () {
  return (dispatch, getState) => {
    const state = getState();
    const res = result(state, 'configEmoney.emoneyConfig.listLocationProvinceConfig', []);
    const middleWareList = middlewareUtils.getDataOptions(res);
    dispatch(actionCreators.updateListProvince(middleWareList));
  };
}

export function createCreditCardForm (statusForm, pageName, checkpoint = false, existing = false) {
  return (dispatch, getState) => {
    if (pageName.toLowerCase().includes('camera')) {
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
    }

    const state = getState();
    dispatch(actionCreators.showSpinner());
    const formid = result(state, 'ccCode', '');
    const name = result(state, 'openAccountData.name', '') === '' ? result(state, 'user.profile.name', '') : result(state, 'openAccountData.name', '');
    const referralCode = result(state, 'openAccountData.referralCode', '') === '' ? result(state, 'couponCheck.referralCodeCC', '') : result(state, 'openAccountData.referralCode', '');
    const email = result(state, 'form.EmailForm.values.email', '');
    const id = result(state, 'openAccountData.id', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const phoneNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);
    const mobileNumber = formatMobileNumberEmoneyRegistration(phoneNumber);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const accessFrom = 'v3';
    const transRefNum = result(state, 'transRefNum', '');

    const npwpImage = result(state, 'openAccountData.npwpImage', '') === '' ? result(state, 'form.CameraNPWPForm.values.imageData', '') : result(state, 'openAccountData.npwpImage', '');

    // KTP Camera
    const ktpImage = result(state, 'openAccountData.ktpImage', '');

    const coreData = result(state, 'openAccountData.coreData', []);

    // First Form
    const ktpId = result(state, 'form.CCForm1.values.ktpId', '') === '' ? result(state, 'openAccountData.ktpId', '') : result(state, 'form.CCForm1.values.ktpId', '');
    const maritalStatus = result(state, 'form.CCForm1.values.maritalStatus', '');
    const dob = result(state, 'form.CCForm1.values.birthDate', '') === '' ? '' : moment(result(state, 'form.CCForm1.values.birthDate', '')).format('YYYY-MM-DD');
    const mothersMaiden = result(state, 'form.CCForm1.values.mothersMaiden', '');
    const ktpId2 = result(state, 'form.CCForm1.values.ktpId2', '');
    const maritalStatus2 = result(state, 'form.CCForm1.values.maritalStatus2', '');
    const dob2 = result(state, 'form.CCForm1.values.dob2', '');
    const mothersMaiden2 = result(state, 'form.CCForm1.values.mothersMaiden2', '');
    const birthPlace = result(state, 'form.CCForm1.values.birthPlace', '');
    const religion = result(state, 'listDukcapil.0~2~10', '');
    const gender = result(state, 'listDukcapil.0~2~11', '');

    // Second Form
    const country = isEmpty(result(state, 'form.CCForm2.values', {})) ? '' : 'Indonesia';
    const province = result(state, 'form.CCForm2.values.province', '');
    const city = result(state, 'form.CCForm2.values.city', '');
    const district = result(state, 'form.CCForm2.values.district', '');
    const subDistrict = result(state, 'form.CCForm2.values.subDistrict', '');
    const postalCode = result(state, 'form.CCForm2.values.postalCode', '');
    const rt = result(state, 'form.CCForm2.values.rt', '');
    const rw = result(state, 'form.CCForm2.values.rw', '');
    const rtRw = rt === '' && rw === '' ? '' : rt + '/' + rw;
    const streetAddress = result(state, 'form.CCForm2.values.streetAddress', '');

    const usingKtpData = result(state, 'form.CCForm2.values.usingKtpData', true);
    const statusAddress = usingKtpData ? 'CHECKED' : 'UNCHECKED';

    const country2 = result(state, 'form.CCForm2.values.country2', '');
    const province2 = result(state, 'form.CCForm2.values.province2', '');
    const city2 = result(state, 'form.CCForm2.values.city2', '');
    const district2 = result(state, 'form.CCForm2.values.district2', '');
    const subDistrict2 = result(state, 'form.CCForm2.values.subDistrict2', '');
    const postalCode2 = result(state, 'form.CCForm2.values.postalCode2', '');
    const rt2 = result(state, 'form.SavingForm2.values.rt2', '');
    const rw2 = result(state, 'form.SavingForm2.values.rw2', '');
    const rtRw2 = rt2 === '' && rw2 === '' ? '' : rt2 + '/' + rw2;
    const streetAddress2 = result(state, 'form.CCForm2.values.streetAddress2', '');

    // Third Form
    const work = result(state, 'form.CCForm3.values.work', '');
    const monthlyIncome = result(state, 'form.CCForm3.values.monthlyIncome', '');
    const sourceOfFund = result(state, 'form.CCForm3.values.sourceOfFund', '');

    // Fourth Form
    const workTitle = result(state, 'form.CCForm4.values.workTitle', '');
    const workPosition = result(state, 'form.CCForm4.values.workPosition', '');
    const industry = result(state, 'form.CCForm4.values.industry', '');
    const companyName = result(state, 'form.CCForm4.values.companyName', '');
    const companyAddress = result(state, 'form.CCForm4.values.companyAddress', '');
    const companyPhoneNumber = result(state, 'form.CCForm4.values.companyPhoneNumber', '');
    const companyCountry = isEmpty(result(state, 'form.CCForm4.values', {})) ? '' : 'Indonesia';
    const companyProvince = result(state, 'form.CCForm4.values.companyProvince', '');
    const companyCity = result(state, 'form.CCForm4.values.companyCity', '');
    const companyDistrict = result(state, 'form.CCForm4.values.companyDistrict', '');
    const companySubDistrict = result(state, 'form.CCForm4.values.companySubDistrict', '');
    const companyPostalCode = result(state, 'form.CCForm4.values.companyPostalCode', '');
    const companyrt = result(state, 'form.CCForm4.values.companyRT', '');
    const companyrw = result(state, 'form.CCForm4.values.companyRW', '');
    const companyRtRw = companyrt === '' && companyrw === '' ? '' : companyrt + '/' + companyrw;

    // Fifth Form
    const lastEducation = result(state, 'form.CCForm5.values.lastEducation', '');
    const purposeOfOpening = result(state, 'form.CCForm5.values.purposeOfOpening', '');
    const numberOfDebit = result(state, 'form.CCForm5.values.numberOfDebit', '');
    const debitPerMonth = result(state, 'form.CCForm5.values.debitPerMonth', '');
    const numberOfCredit = result(state, 'form.CCForm5.values.numberOfCredit', '');
    const creditPerMonth = result(state, 'form.CCForm5.values.creditPerMonth', '');
    const numberOfDependant = cifCode.includes('NK') ? result(state, 'form.CCForm5.values.numberOfDependant', '') :
      result(state, 'form.CCForm3.values.numberOfDependant2', '');

    // Sixth Form
    const cardName = result(state, 'form.CCForm6.values.cardName', '');
    const creditLimit = result(state, 'form.CCForm6.values.creditLimit', '');
    const currentAddressStatus = result(state, 'form.CCForm6.values.currentAddressStatus', '');
    const staySince = result(state, 'form.CCForm6.values.currentAddressSince', '');
    const creditTotal = result(state, 'form.CCForm6.values.creditTotal', '');
    const sourceOfFundPayment = result(state, 'form.CCForm6.values.sourceOfFundPayment', '');
    const paymentType = result(state, 'form.CCForm6.values.paymentType', '');

    // Seventh Form
    const npwpNumber = result(state, 'form.CCForm7.values.npwpNumber', '');
    const reasonNoNPWP = npwpNumber === '' ? result(state, 'form.CCForm7.values.reasonNoNPWP', '') : '';

    // Eighth Form
    const workStatus = result(state, 'form.CCForm8.values.workStatus', '');
    const startWork = result(state, 'form.CCForm8.values.startWork', '');
    const startBusiness = result(state, 'form.CCForm8.values.startBusiness', '');
    const savingStatement1 = result(state, 'form.CCForm8.values.savingStatement1', '');
    const savingStatement2 = result(state, 'form.CCForm8.values.savingStatement2', '');
    const savingStatement3 = result(state, 'form.CCForm8.values.savingStatement3', '');
    const latestPayslipImage = result(state, 'form.CCForm8.values.latestPayslip', '');

    // Ninth Form
    const emergencyFullName = result(state, 'form.CCForm9.values.emergencyFullName', '');
    const emergencyRelationship = result(state, 'form.CCForm9.values.emergencyRelationship', '');
    const emergencyPhone = result(state, 'form.CCForm9.values.emergencyPhone', '');
    const emergencyCountry = isEmpty(result(state, 'form.CCForm9.values', {})) ? '' : 'Indonesia';
    const emergencyProvince = result(state, 'form.CCForm9.values.emergencyProvince', '');
    const emergencyCity = result(state, 'form.CCForm9.values.emergencyCity', '');
    const emergencyDistrict = result(state, 'form.CCForm9.values.emergencyDistrict', '');
    const emergencySubDistrict = result(state, 'form.CCForm9.values.emergencySubDistrict', '');
    const emergencyPostalCode = result(state, 'form.CCForm9.values.emergencyPostalCode', '');
    const emergencyRT = result(state, 'form.CCForm9.values.emergencyRT', '');
    const emergencyRW = result(state, 'form.CCForm9.values.emergencyRW', '');
    const emergencyRtRw = emergencyRT === '' && emergencyRW === '' ? '' : emergencyRT + '/' + emergencyRW;
    const emergencyStreetAddress = result(state, 'form.CCForm9.values.emergencyStreetAddress', '');

    // Delivery form
    const deliverTo = result(state, 'form.cardDelivery.values.deliveryMode', {});
    const deliveryCode = isEmpty(deliverTo) ? '' :
      result(deliverTo, 'label', '') === language.CREDITCARD__CURRENT_ADDRESS ? '1' :
        result(deliverTo, 'label', '') === language.CREDITCARD__KTP_ADDRESS ? '2' : '3';

    const checkpointPage = checkpoint ? result(state, 'checkpoint.pageName', '') : pageName;

    const dataAdditional = {
      customer_id: formid.includes('CCO') ? result(state, 'customerIdOrami.customer_id', '') : '',
      utm_source: result(state, 'couponCheck.utmSource', '')
    };

    const formData =
      {formid, name, email, mobileNumber, ktpId, cifCode, pageName: checkpointPage, statusAddress, referralCode, id,
        'dataSubmit':
        {
          'stage0':
          [
            {'code': '0~1',
              'value': [
                {
                  'code': '0~1~1',
                  'value': ktpImage
                }
              ]
            },
            {'code': '0~2',
              'value': [
                {
                  'code': '0~2~1',
                  'value': ktpId
                },
                {
                  'code': '0~2~2',
                  'value': maritalStatus
                },
                {
                  'code': '0~2~3',
                  'value': dob
                },
                {
                  'code': '0~2~4',
                  'value': mothersMaiden
                },
                {
                  'code': '0~2~5',
                  'value': ktpId2
                },
                {
                  'code': '0~2~6',
                  'value': maritalStatus2
                },
                {
                  'code': '0~2~7',
                  'value': dob2
                },
                {
                  'code': '0~2~8',
                  'value': mothersMaiden2
                },
                {
                  'code': '0~2~9',
                  'value': birthPlace
                },
                {
                  'code': '0~2~10',
                  'value': religion
                },
                {
                  'code': '0~2~11',
                  'value': gender
                },
              ]
            },
            {'code': '0~3',
              'value': [
                {
                  'code': '0~3~1',
                  'value': country2
                },
                {
                  'code': '0~3~2',
                  'value': province2
                },
                {
                  'code': '0~3~3',
                  'value': city2
                },
                {
                  'code': '0~3~4',
                  'value': district2
                },
                {
                  'code': '0~3~5',
                  'value': subDistrict2
                },
                {
                  'code': '0~3~6',
                  'value': postalCode2
                },
                {
                  'code': '0~3~7',
                  'value': rtRw2
                },
                {
                  'code': '0~3~8',
                  'value': streetAddress2
                }
              ]
            },
            {'code': '0~4',
              'value': [
                {
                  'code': '0~4~1',
                  'value': country
                },
                {
                  'code': '0~4~2',
                  'value': province
                },
                {
                  'code': '0~4~3',
                  'value': city
                },
                {
                  'code': '0~4~4',
                  'value': district
                },
                {
                  'code': '0~4~5',
                  'value': subDistrict
                },
                {
                  'code': '0~4~6',
                  'value': postalCode
                },
                {
                  'code': '0~4~7',
                  'value': rtRw
                },
                {
                  'code': '0~4~8',
                  'value': streetAddress
                }
              ]
            },
            {'code': '0~5',
              'value': [
                {
                  'code': '0~5~1',
                  'value': work
                },
                {
                  'code': '0~5~2',
                  'value': monthlyIncome
                },
                {
                  'code': '0~5~3',
                  'value': sourceOfFund
                }
              ]
            },
            {'code': '0~6',
              'value': coreData
            },
          ],

          'stage1':
          [
            {'code': '1~1',
              'value': [
                {
                  'code': '1~1~1',
                  'value': workTitle
                },
                {
                  'code': '1~1~2',
                  'value': workPosition
                },
                {
                  'code': '1~1~3',
                  'value': industry
                },
                {
                  'code': '1~1~4',
                  'value': companyName
                },
                {
                  'code': '1~1~5',
                  'value': companyAddress
                },
                {
                  'code': '1~1~6',
                  'value': companyPhoneNumber
                },
                {
                  'code': '1~1~7',
                  'value': companyCountry
                },
                {
                  'code': '1~1~8',
                  'value': companyProvince
                },
                {
                  'code': '1~1~9',
                  'value': companyCity
                },
                {
                  'code': '1~1~10',
                  'value': companyDistrict
                },
                {
                  'code': '1~1~11',
                  'value': companySubDistrict
                },
                {
                  'code': '1~1~12',
                  'value': companyPostalCode
                },
                {
                  'code': '1~1~13',
                  'value': companyRtRw
                },
              ]
            },
            {'code': '1~2',
              'value': [
                {
                  'code': '1~2~1',
                  'value': lastEducation
                },
                {
                  'code': '1~2~2',
                  'value': purposeOfOpening
                },
                {
                  'code': '1~2~3',
                  'value': numberOfDebit
                },
                {
                  'code': '1~2~4',
                  'value': debitPerMonth
                },
                {
                  'code': '1~2~5',
                  'value': numberOfCredit
                },
                {
                  'code': '1~2~6',
                  'value': creditPerMonth
                },
                {
                  'code': '1~2~7',
                  'value': numberOfDependant.toString()
                }
              ]
            },
          ],
          'stage2': [
            {'code': '2~1',
              'value': [
                {
                  'code': '2~1~1',
                  'value': cardName.toUpperCase()
                },
                {
                  'code': '2~1~2',
                  'value': creditLimit
                },
                {
                  'code': '2~1~3',
                  'value': currentAddressStatus
                },
                {
                  'code': '2~1~4',
                  'value': staySince
                },
                {
                  'code': '2~1~5',
                  'value': creditTotal
                },
                {
                  'code': '2~1~6',
                  'value': sourceOfFundPayment
                },
                {
                  'code': '2~1~7',
                  'value': paymentType
                }
              ]
            },
            {'code': '2~2',
              'value': [
                {
                  'code': '2~2~1',
                  'value': npwpNumber
                },
                {
                  'code': '2~2~2',
                  'value': reasonNoNPWP
                }
              ]
            },
            {'code': '2~3',
              'value': [
                {
                  'code': '2~3~1',
                  'value': npwpImage
                }
              ]
            },
            {'code': '2~4',
              'value': [
                {
                  'code': '2~4~1',
                  'value': workStatus
                },
                {
                  'code': '2~4~2',
                  'value': startWork
                },
                {
                  'code': '2~4~3',
                  'value': latestPayslipImage
                },
                {
                  'code': '2~4~4',
                  'value': startBusiness
                },
                {
                  'code': '2~4~5',
                  'value': savingStatement1
                },
                {
                  'code': '2~4~6',
                  'value': savingStatement2
                },
                {
                  'code': '2~4~7',
                  'value': savingStatement3
                },
              ]
            },
            {'code': '2~5',
              'value': [
                {
                  'code': '2~5~1',
                  'value': emergencyFullName
                },
                {
                  'code': '2~5~2',
                  'value': emergencyRelationship
                },
                {
                  'code': '2~5~3',
                  'value': emergencyPhone
                },
                {
                  'code': '2~5~4',
                  'value': emergencyCountry
                },
                {
                  'code': '2~5~5',
                  'value': emergencyProvince
                },
                {
                  'code': '2~5~6',
                  'value': emergencyCity
                },
                {
                  'code': '2~5~7',
                  'value': emergencyDistrict
                },
                {
                  'code': '2~5~8',
                  'value': emergencySubDistrict
                },
                {
                  'code': '2~5~9',
                  'value': emergencyPostalCode
                },
                {
                  'code': '2~5~10',
                  'value': emergencyRtRw
                },
                {
                  'code': '2~5~11',
                  'value': emergencyStreetAddress
                }
              ]
            },
            {'code': '2~6',
              'value': [
                {
                  'code': '2~6~1',
                  'value': deliveryCode
                }
              ]
            }
          ]
        },
        dataAdditional
      };
    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {transRefNum, accessFrom, formData, statusForm, lang};
    const targetUrl = 'registration';
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
      const dataId = result(res, 'data.id', '');
      dispatch(actionCreators.saveOpenAccountDataId(dataId));
      if (pageName === 'CreditCardFinalize') {
        dispatch(actionCreators.clearOpenAccountData());
      }
      if (checkpoint) {
        if (pageName === 'CreditCardForm8' || pageName === 'CreditCardNPWPCamera') {
          let dataCheckpoint = result(state, 'checkpoint', {});
          const newPageName = pageName;
          dispatch(actionCreators.saveCheckpoint({...dataCheckpoint, pageName: newPageName}));
        }
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSpinner());
      } else if (pageName === 'CreditCardForm1') {
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
            NavigationActions.navigate({routeName: pageName}),
          ]
        }));
      } else if (pageName === 'CreditCardForm8') {
        dispatch(NavigationActions.back());
        setTimeout(() => {
          dispatch(NavigationActions.navigate({routeName: pageName}));
        }, 0);
      } else if (statusForm === 'SUBMIT') {
        dispatch(actionCreators.hideSpinner());
        // const utmSource = result(state, 'utmAndDataLink', {});
        // const utm = result(utmSource, 'utm', '');
        // const referralCode = result(utmSource, 'referralCode', '');
        // const typeActivation = result(utmSource, 'typeActivation', '');
        // const codeProduct = result(utmSource, 'codeProduct', '');
        // const stringEvent = 'PRM_SBT_' + utm + '_PM_' + referralCode + '_PD_' + codeProduct + '_ACT_' + typeActivation;
        // if (utm !== '' && referralCode !== '') {
        //   Analytics.logEvent(stringEvent);
        // }
        const name = result(res, 'data.name', '');
        const ticketCode = result(res, 'data.ktpId', '');
        const mobileNumber = result(res, 'data.mobileNumber', '');
        dispatch(actionCreators.clearCcType());
        dispatch(NavigationActions.navigate({routeName: pageName, params: {name, ticketCode, mobileNumber}}));
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: pageName, params: {existing}, pageName}));
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function getExistingData (refferalCodeOrami) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const payload = {cifCode: cif.toString()};
    return api.getCcDataCif(payload, dispatch).then((res) => {
      dispatch(actionCreators.saveCheckpoint(result(res, 'data.data.dataUser')));
      const name = result(res, 'data.data.dataUser.name', '');
      const email = result(res, 'data.data.dataUser.email', '');
      dispatch(change('EmailForm', 'email', email));
      const mobileNumber = result(res, 'data.data.dataUser.mobileNumber', '');
      const ktpId = result(res, 'data.data.dataUser.ktpId', '');
      const dataFromCore = result(res, 'data.data.dataFromCore', {});

      dispatch(change('CCForm2', 'country', 'Indonesia'));
      dispatch(change('CCForm2', 'province', openAccountCoreData(result(dataFromCore, '0~6~24', ''))));
      dispatch(change('CCForm2', 'city', openAccountCoreData(result(dataFromCore, '0~6~23', ''))));
      dispatch(change('CCForm2', 'district', openAccountCoreData(result(dataFromCore, '0~6~21', ''))));
      dispatch(change('CCForm2', 'subDistrict', openAccountCoreData(result(dataFromCore, '0~6~22', ''))));
      dispatch(change('CCForm2', 'postalCode', result(dataFromCore, '0~6~25', '')));
      const rtrw = split(result(dataFromCore, '0~6~20', ''), '/', 2);
      const rt = rtrw[0] || '';
      const rw = rtrw[1] || '';
      dispatch(change('CCForm2', 'rt', rt));
      dispatch(change('CCForm2', 'rw', rw));
      dispatch(change('CCForm2', 'streetAddress', result(dataFromCore, '0~6~19', '')));

      let coreData = [];
      forEach(dataFromCore, (value, key) => {
        coreData = [...coreData, {
          code: key,
          value: value
        }];
      });

      const dataDukcapil = result(res, 'data.data.dataDukcapil', {});
      dispatch(actionCreators.saveDukcapil(dataDukcapil));
      dispatch(actionCreators.saveOpenAccountDataName(name));
      dispatch(actionCreators.hideSpinner());
      dispatch(change('CCForm1', 'ktpId2', result(dataDukcapil, '0~2~5', '')));
      dispatch(change('CCForm1', 'maritalStatus2', result(dataDukcapil, '0~2~6', '')));
      dispatch(change('CCForm1', 'dob2', result(dataDukcapil, '0~2~7', '')));
      dispatch(change('CCForm1', 'mothersMaiden2', result(dataDukcapil, '0~2~8', '')));
      dispatch(change('CCForm1', 'birthPlace', result(dataDukcapil, '0~2~9', '')));

      dispatch(change('CCForm2', 'country2', result(dataDukcapil, '0~3~1', '')));
      dispatch(change('CCForm2', 'province2', result(dataDukcapil, '0~3~2', '')));
      dispatch(change('CCForm2', 'city2', result(dataDukcapil, '0~3~3', '')));
      dispatch(change('CCForm2', 'district2', result(dataDukcapil, '0~3~4', '')));
      dispatch(change('CCForm2', 'subDistrict2', result(dataDukcapil, '0~3~5', '')));
      dispatch(change('CCForm2', 'postalCode2', result(dataDukcapil, '0~3~6', '')));
      dispatch(change('CCForm2', 'rtRw2', result(dataDukcapil, '0~3~7', '')));
      dispatch(change('CCForm2', 'streetAddress2', result(dataDukcapil, '0~3~8', '')));

      dispatch(actionCreators.saveOpenAccountData({name, email, mobileNumber, ktpId, coreData}));
      dispatch(NavigationActions.navigate({routeName: 'EmailForm', params: {existing: true, refferalCodeOrami}}));
    }).catch((err) => {
      const errorCode = result(err, 'data.data.responseCode', '99');
      dispatch(actionCreators.hideSpinner());
      if (errorCode === '98') {
        const formid = result(state, 'ccCode', '');
        const ktpId = result(state, 'openAccountData.ktpId', '') === '' ? ' ' : result(state, 'openAccountData.ktpId', '');
        const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, 'openAccountData.mobileNumber', '')) === '' ? ' ' :
          formatMobileNumberEmoneyRegistration(result(state, 'openAccountData.mobileNumber', ''));
        const flow = 'ETB';
        const messageError = result(err, 'data.data.responseMessage', '');
        const referralCode = result(state, 'openAccountData.referralCode', '') === '' ? ' ' :
          result(state, 'openAccountData.referralCode', '');
        const cifCode = result(state, 'user.profile.customer.cifCode', '');
        const lang = result(state, 'currentLanguage.id', '');
        const requestData = {formid, lang, ktpId, mobileNumber, flow, messageError, referralCode, cifCode};
        const targetUrl = 'rejectDataSave';
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

        dispatch(actionCreators.showSpinner());
        return api[apiName](payload, dispatch).
          then(() => {
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'DukcapilNotMatch'}),
              ]
            }));
          });
      } else {
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      }
    });
  };
}

export function getCheckpointCC (statusForm, pageName, checkpoint) {
  return (dispatch, getState) => {
    const state = getState();
    const idNumber = result(state, 'form.CCForm1.values.ktpId', '');
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const phoneNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);
    const mobileNumber = formatMobileNumberEmoneyRegistration(phoneNumber);
    const productType = 'creditCard';
    const virtualCard = result(state, 'ccType', '') === 'Virtual' ? 'true' : '';
    const postalCode = result(state, 'listDukcapil.0~3~6', '');
    const formCode = result(state, 'ccCode', '');
    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {mobileNumber, ktpId: idNumber, productType, lang, virtualCard};
    const targetUrl = 'getData';
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

    dispatch(actionCreators.showSpinner());

    return api[apiName](payload, dispatch).
      then((res) => {
        if (result(res, 'data.responseCode', '') === '00') {
          const checkpointData = result(res, 'data.data.dataQuery.0.rawData.dataSubmit', {});
          const checkpointPageName = result(res, 'data.data.dataQuery.0.pageName', '');
          const checkpointEmail = result(res, 'data.data.dataQuery.0.email', '');
          const pageName = changeFormByCode(checkpointPageName, formCode);
          const statusAddress = result(res, 'data.data.dataQuery.0.statusAddress', '');
          let useKtp = false;
          if (statusAddress === 'CHECKED') {
            useKtp = true;
          } else {
            useKtp = false;
          }
          dispatch(change('CCForm2', 'usingKtpData', useKtp));
          dispatch(change('EmailForm', 'email', checkpointEmail));

          forEach(checkpointData, (data) => {
            forEach(data, (form) => {
              const formName = getFormName(form.code);
              const formData = result(form, 'value', {});
              forEach(formData, (item) => {
                if (item.value !== '') {
                  if (item.code === '0~4~7') {
                    const rtrw = split(item.value, '/');
                    dispatch(change(formName, 'rt', rtrw[0]));
                    dispatch(change(formName, 'rw', rtrw[1]));
                  } else if (item.code === '2~5~10') {
                    const rtrw = split(item.value, '/');
                    dispatch(change(formName, 'emergencyRT', rtrw[0]));
                    dispatch(change(formName, 'emergencyRW', rtrw[1]));
                  } else if (item.code === '1~1~13') {
                    const rtrw = split(item.value, '/');
                    dispatch(change(formName, 'companyRT', rtrw[0]));
                    dispatch(change(formName, 'companyRW', rtrw[1]));
                  } else if (item.code === '2~1~4') {
                    const newDate = moment(item.value).format('DD/MM/YYYY');
                    dispatch(change(formName, 'currentAddressSince', newDate));
                  } else if (item.code === '2~4~2') {
                    const newDate = moment(item.value).format();
                    dispatch(change(formName, 'startWork', newDate));
                  } else if (item.code === '2~4~4') {
                    const newDate = moment(item.value).format();
                    dispatch(change(formName, 'startBusiness', newDate));
                  } else {
                    if (item.code === '0~3~6') {
                      dispatch(change(formName, 'postalCode', result(item, 'value.code', '')));
                    } else if (item.code === '1~1~12') {
                      dispatch(change(formName, 'companyPostalCode', result(item, 'value.code', '')));
                    } else if (item.code === '2~5~9') {
                      dispatch(change(formName, 'emergencyPostalCode', result(item, 'value.code', '')));
                    }
                    const fieldName = getFieldName(item);
                    let value = result(item, 'value', null);
                    dispatch(change(formName, fieldName, value));
                  }
                }
              });
            });
          });

          const state = getState();
          let CCFormData2Filtered = {values: {}};
          forEach(result(state, 'form.CCForm2.values', {}), (value, key) => {
            if (!endsWith(key, '2')) {
              CCFormData2Filtered.values[`${key}`] = value;
            }
          });
          const allData = [result(state, 'form.CCForm1', {}),
            CCFormData2Filtered,
            result(state, 'form.CCForm3', {}),
            result(state, 'form.CCForm4', {}),
            result(state, 'form.CCForm5', {}),
            result(state, 'form.CCForm6', {}),
            result(state, 'form.CCForm7', {}),
            result(state, 'form.CCForm8', {}),
            result(state, 'form.CCForm9', {})];
          let progress = 0;
          forEach(allData, (data) => {
            if (!isEmpty(result(data, 'values', {}))) {
              progress++;
            }
          });

          const npwpNumber = result(state, 'form.CCForm7.values.npwpNumber', '');
          const imageNpwp = result(state, 'form.npwpImage.values.npwpImage', '');

          if (npwpNumber !== '' && imageNpwp !== '') {
            dispatch(change('CCForm7', 'reasonNoNPWP', ''));
          } else if (npwpNumber === '' && imageNpwp !== '') {
            dispatch(change('CameraNPWPForm', 'npwpImage', ''));
          }

          const remainingProgress = 10 - progress;
          const dataQuery = result(res, 'data.data.dataQuery', {});
          dispatch(actionCreators.saveCheckpoint({...dataQuery, remainingProgress, progress, pageName, statusAddress}));
          dispatch(actionCreators.hideSpinner());
          const npwpImage = result(checkpointData, 'stage2.2.value.0.value', '');
          const ktpImage = result(checkpointData, 'stage0.0.value.0.value', '');
          dispatch(actionCreators.saveOpenAccountData({npwpImage, ktpImage}));

          if (formCode.includes('CCO')) {
            payload = {email: checkpointEmail};
            dispatch(actionCreators.showSpinner());
            return api.checkEmailOrami(payload, dispatch).
              then((res) => {
                dispatch(actionCreators.hideSpinner());
                const responseCode = result(res, 'data.responseCode', '');
                const customer_id = result(res, 'data.customer_id', '');
                dispatch(actionCreators.saveCustomerIdOrami({'customer_id': customer_id}));
                if (responseCode === '00') {
                  dispatch(NavigationActions.navigate({routeName: 'Checkpoint'}));
                } else {
                  const checkpoint = true;
                  dispatch(unregisteredOramiEmail(checkpoint));
                }
              }).
              catch((err) => {
                dispatch(actionCreators.hideSpinner());
                Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
              });
          } else {
            dispatch(NavigationActions.navigate({routeName: 'Checkpoint'}));
          }
        } else {
          const email = result(state, 'user.profile.email', '');
          if (postalCode === '' || isNaN(postalCode) || postalCode.length < 5 || email === '') {
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.navigate({routeName: 'MissingForm'}));
          } else {
            dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
          }
        }
      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
      });
  };
}

export function setMaritalStatus () {
  return (dispatch, getState) => {
    const state = getState();
    const gender = result(state, 'form.UpgradeEmoneyForm.values.gender.value', '');
    const maritalStatusOptions = sortBy(middlewareUtils.getDataOptions(result(state, 'configEmoney.emoneyConfig.listMaritalStatusConfig', {})), ['label']);
    let filteredStatus = [];
    if (gender === 'M') {
      filteredStatus = filter(maritalStatusOptions, function (o) {
        return o.value !== '4';
      });
    } else if (gender === 'F') {
      filteredStatus = filter(maritalStatusOptions, function (o) {
        return o.value !== '5';
      });
    }
    dispatch(actionCreators.saveMaritalStatus(filteredStatus));
  };
}

export function checkKtpDukcapil (navigation = {}, value = {}) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ktpId = result(state, 'form.CCForm1.values.ktpId', '');
    const maritalStatus = result(state, 'form.CCForm1.values.maritalStatus.code', '');
    const dob = moment(result(state, 'form.CCForm1.values.birthDate', '')).format('YYYY-MM-DD');
    const mothersMaiden = result(state, 'form.CCForm1.values.mothersMaiden', '');
    const payload = {ktpId, maritalStatus, dob, mothersMaiden};
    return api.dukcapilKTP(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        const dataDukcapil = result(res, 'data.dataDukcapil', '');
        const name = result(res, 'data.name', '');
        dispatch(actionCreators.saveDukcapil(dataDukcapil));
        dispatch(actionCreators.saveOpenAccountDataName(name));
        dispatch(actionCreators.hideSpinner());
        if (responseCode === '00') {
          dispatch(checkFromEDW(navigation, value, res));
        } else {
          const formid = result(state, 'ccCode', '');
          const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, 'openAccountData.mobileNumber', '')) === '' ? ' ' :
            formatMobileNumberEmoneyRegistration(result(state, 'openAccountData.mobileNumber', ''));
          const flow = 'NTB';
          const messageError = result(res, 'data.responseMessage', '');
          const referralCode = result(state, 'openAccountData.referralCode', '') === '' ? ' ' :
            result(state, 'openAccountData.referralCode', '');
          const cifCode = result(state, 'user.profile.customer.cifCode', '') === '' ? ' ' :
            result(state, 'user.profile.customer.cifCode', '');
          const lang = result(state, 'currentLanguage.id', '');

          const requestData = {formid, ktpId, mobileNumber, flow, messageError, referralCode, cifCode, lang};
          const targetUrl = 'rejectDataSave';
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
          dispatch(actionCreators.showSpinner());

          return api[apiName](payload, dispatch).
            then(() => {
              dispatch(actionCreators.hideSpinner());
              dispatch(NavigationActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({routeName: 'DukcapilNotMatch'}),
                ]
              }));
            });
        }
      }).
      catch((err) => {
        const errorCode = result(err, 'data.data.responseCode', '99');
        dispatch(actionCreators.hideSpinner());
        if (errorCode === '98') {
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({routeName: 'DukcapilNotMatch'}),
            ]
          }));
        } else {
          Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
        }
      });
  };
}

export function checkFromEDW (navigation = {}, value = {}, resData = {}) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const ID = result(state, 'form.CCForm1.values.ktpId', '');
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const ccCode = result(state, 'ccCode', '');
    const token = result(resData, 'data.token', '');
    const payload = {ID, token};
    return api.getCustomerProfile(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const resCustProfile = result(res, 'data.responseGetCustomerProfileForUpgradeMap', {});
        const isExist = result(resCustProfile, 'isExist', 'false');
        if (responseCode === '00') {
          if (isExist === 'true') {
            dispatch(accountRegistered(cifCode));
          } else {
            if (ccCode.includes('CC')) {
              dispatch(change('CCForm1', 'ktpId2', result(resData, 'data.dataDukcapil.0~2~5', '')));
              dispatch(change('CCForm1', 'maritalStatus2', result(resData, 'data.dataDukcapil.0~2~6', '')));
              dispatch(change('CCForm1', 'dob2', result(resData, 'data.dataDukcapil.0~2~7', '')));
              dispatch(change('CCForm1', 'mothersMaiden2', result(resData, 'data.dataDukcapil.0~2~8', '')));
              dispatch(change('CCForm1', 'birthPlace', result(resData, 'data.dataDukcapil.0~2~9', '')));

              dispatch(change('CCForm2', 'country2', result(resData, 'data.dataDukcapil.0~3~1', '')));
              dispatch(change('CCForm2', 'province2', result(resData, 'data.dataDukcapil.0~3~2', '')));
              dispatch(change('CCForm2', 'city2', result(resData, 'data.dataDukcapil.0~3~3', '')));
              dispatch(change('CCForm2', 'district2', result(resData, 'data.dataDukcapil.0~3~4', '')));
              dispatch(change('CCForm2', 'subDistrict2', result(resData, 'data.dataDukcapil.0~3~5', '')));
              dispatch(change('CCForm2', 'postalCode2', result(resData, 'data.dataDukcapil.0~3~6', '')));
              dispatch(change('CCForm2', 'streetAddress2', result(resData, 'data.dataDukcapil.0~3~8', '')));

              const rtrw2 = split(result(resData, 'data.dataDukcapil.0~3~7', ''), '/', 2);
              const rt2 = rtrw2[0] || '';
              const rw2 = rtrw2[1] || '';
              dispatch(change('CCForm2', 'rt2', rt2));
              dispatch(change('CCForm2', 'rw2', rw2));

              const checkpoint = result(navigation, 'state.params.checkpoint', false);
              const statusForm = 'NEXT';
              const pageName = 'CreditCardForm2';
              dispatch(getCheckpointCC(statusForm, pageName, checkpoint));
            } else {
              const dataDukcapil = result(resData, 'data.dataEktpMurni', {});
              const dataCore = result(resData, 'data.dataCore', {});
              dispatch(getDataForPGO(value, dataDukcapil, dataCore));
            }
          }
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.EMONEY__EDW_PROFILE_FAILED), Toast.LONG);
      });
  };
}

export function checkPhoneforCCForm () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const formid = result(state, 'ccCode', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, 'form.identifyUserForm.values.phone', ''));
    const email = result(state, 'form.identifyUserForm.values.email', '');
    const captchaInput = result(state, 'form.identifyUserForm.values.captchaInput', '');
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    const payload = {mobileNumber, email, captchaInput, captchaId};
    return api.checkPhoneForCC(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
          if (formid === 'CCO-SIMOBI-002') {
            dispatch(checkEmailOrami());
          } else {
            dispatch(requestOtpEform());
          }
        } else {
          dispatch(ccPhoneRegistered());
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM), Toast.LONG);
      });
  };
}

export function checkEmailOrami () {
  return (dispatch, getState) => {
    const state = getState();
    const email = result(state, 'form.identifyUserForm.values.email', '');
    const payload = {email};
    return api.checkEmailOrami(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        const customer_id = result(res, 'data.customer_id', '');
        dispatch(actionCreators.saveCustomerIdOrami({'customer_id': customer_id}));

        if (responseCode === '00') {
          dispatch(gotoKTPCamera());
        } else {
          dispatch(oramiEmaiNotRegistered());
        }
        dispatch(actionCreators.hideSpinner());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function checkEmailOramiETB () {
  return (dispatch, getState) => {
    const state = getState();
    const email = result(state, 'form.EmailForm.values.email', '');
    const payload = {email};
    dispatch(actionCreators.showSpinner());
    return api.checkEmailOrami(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const customer_id = result(res, 'data.customer_id', '');
        dispatch(actionCreators.saveCustomerIdOrami({'customer_id': customer_id}));

        if (responseCode === '00') {
          const pageName = 'CreditCardForm2';
          const statusForm = 'NEXT';
          dispatch(createCreditCardForm(statusForm, pageName, false, true));
        } else {
          dispatch(oramiEmaiNotRegistered());
        }
        dispatch(actionCreators.hideSpinner());
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function oramiEmaiNotRegistered () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goBack = () => {
      NavigationActions.back();
      hideAlert();
    };

    const goToNext = () => {

      const pageName = 'CreditCardForm2';
      const statusForm = 'NEXT';
      dispatch(createCreditCardForm(statusForm, pageName, false, true));

      dispatch(actionCreators.clearCaptcha());
      hideAlert();
    };

    const sinarmasModalOptions = {
      heading1: language.CREDITCARD__ORAMI_NOTFOUND,
      text: language.CREDITCARD__ORAMI_NOT_REGISTERED,
      button1: language.MIGRATE__ERROR_BUTTON,
      onButton1Press: goBack,
      button2: language.CREDITCARD__ORAMI_REGISTER_BUTTON,
      onButton2Press: goToNext,
      onClose: hideAlert,
      button1Color: 'black'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function verifyOtpEform () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const name = result(state, 'form.identifyUserForm.values.name', '');
    const mobileNumber = result(state, 'form.identifyUserForm.values.phone', '');
    const email = result(state, 'form.identifyUserForm.values.email', '');
    const referralCode = result(state, 'form.identifyUserForm.values.referralCode', '');
    const captchaInput = result(state, 'form.identifyUserForm.values.captchaInput', '');
    const smsOtp = result(state, 'form.OTPEForm.values.OTP', '');
    const transRefNum = result(state, 'transRefNum', '');
    const lang = result(state, 'currentLanguage.id', 'id');
    const payload = {mobileNumber, mPinInputed: smsOtp, securityMode: '1', transRefNum, lang};
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).
        then((res) => {
          if (!res) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
              if ('granted' === result) {
                return api.verifyOtpEform(payload, dispatch).
                  then(() => {
                    dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, email, referralCode, captchaInput}));
                    dispatch(NavigationActions.back());
                    setTimeout(() => {
                      dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
                    }, 0);
                    dispatch(actionCreators.clearTransRefNum());
                    dispatch(actionCreators.hideSpinner());
                  }).
                  catch((err) => {
                    dispatch(actionCreators.hideSpinner());
                    Toast.show(getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR), Toast.LONG);
                  });
              } else {
                return Promise.resolve();
              }
            });
          } else {
            return api.verifyOtpEform(payload, dispatch).
              then(() => {
                dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, email, referralCode, captchaInput}));
                dispatch(NavigationActions.back());
                setTimeout(() => {
                  dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
                }, 0);
                dispatch(actionCreators.clearTransRefNum());
                dispatch(actionCreators.hideSpinner());
              }).
              catch((err) => {
                dispatch(actionCreators.hideSpinner());
                Toast.show(getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR), Toast.LONG);
              });
          }
        });
    } else {
      Permissions.check('ios.permission.CAMERA').then((response) => {
        if (response === 'granted') {
          return api.verifyOtpEform(payload, dispatch).
            then(() => {
              dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, email, referralCode, captchaInput}));
              dispatch(NavigationActions.back());
              setTimeout(() => {
                dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
              }, 0);
              dispatch(actionCreators.clearTransRefNum());
              dispatch(actionCreators.hideSpinner());
            }).
            catch((err) => {
              dispatch(actionCreators.hideSpinner());
              Toast.show(getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR), Toast.LONG);
            });
        } else {
          Permissions.request('ios.permission.CAMERA').then((response) => {
            if (response === 'granted') {
              return api.verifyOtpEform(payload, dispatch).
                then(() => {
                  dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, email, referralCode, captchaInput}));
                  dispatch(NavigationActions.back());
                  setTimeout(() => {
                    dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
                  }, 0);
                  dispatch(actionCreators.clearTransRefNum());
                  dispatch(actionCreators.hideSpinner());
                }).
                catch((err) => {
                  dispatch(actionCreators.hideSpinner());
                  Toast.show(getErrorMessage(err, language.CREATE_ACCOUNT__OTP_ERROR), Toast.LONG);
                });
            } else {
              Toast.show('Go to settings, allow Simobi+ to access device camera', Toast.LONG);
              return Promise.resolve();
            }
          });
        }
      });
    }
  };
}

export function ccPhoneRegistered () {
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

export function receiveCreditCardCitySecond () {
  return (dispatch, getState) => {
    const state = getState();
    const res = result(state, 'form.CCForm9.values.emergencyProvince.value', '');
    const resPlus = (parseInt(res) + 100).toString();
    const resPlusnull = resPlus.length > 3 ? resPlus : '0'(parseInt(res) + 100).toString();
    const resCity = result(state, 'configEmoney.emoneyConfig.listLocationConfig', []);
    const searchListCity = filter(resCity, function (o) {
      return o.code > res && o.code < resPlusnull;
    });
    const middleWareList = sortBy(middlewareUtils.getDataOptions(searchListCity), ['label']);
    dispatch(actionCreators.updateListCity2(middleWareList));
  };
}

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

export function getCityList (formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
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
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    }
  };
}

export function getDistrictList (formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const formValues = state.form[`${formName}`].values;
    const code = result(formValues[`${fieldName}`], 'code', '');
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'district', code};
      return api.getDistrictList(payload, dispatch).then((res) => {
        const districtList = sortBy(result(res, 'data.data.district', []), 'name');
        dispatch(actionCreators.saveDistrictList(districtList));
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    }
  };
}

export function getSubDistrictList (formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
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
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    }
  };
}

export function prefilledFromDukcapil (navigation) {
  return (dispatch, getState) => {
    const state = getState();

    const usingKtpData = result(state, 'form.CCForm2.values.usingKtpData', true);
    const listDukcapil = result(state, 'listDukcapil', {});

    if (usingKtpData === true) {
      dispatch(change('CCForm2', 'province', {code: result(listDukcapil, '0~3~2', ''), name: result(listDukcapil, '0~3~2', ''), value: result(listDukcapil, '0~3~2', '')}));
      dispatch(change('CCForm2', 'city', {code: result(listDukcapil, '0~3~3', ''), name: result(listDukcapil, '0~3~3', ''), value: result(listDukcapil, '0~3~3', '')}));
      dispatch(change('CCForm2', 'district', {code: result(listDukcapil, '0~3~4', ''), name: result(listDukcapil, '0~3~4', ''), value: result(listDukcapil, '0~3~4', '')}));
      dispatch(change('CCForm2', 'subDistrict', {code: result(listDukcapil, '0~3~5', ''), name: result(listDukcapil, '0~3~5', ''), value: result(listDukcapil, '0~3~5', ''), zipCode: result(listDukcapil, '0~3~6', '')}));
      const postalCode = result(listDukcapil, '0~3~6', '');
      if (postalCode === '') {
        const inputtedPostalCode = result(state, 'form.PostalCodeForm.values.postalCode', '');
        dispatch(change('CCForm2', 'postalCode', inputtedPostalCode));
      } else {
        dispatch(change('CCForm2', 'postalCode', postalCode));
      }
      const rtrw = split(result(listDukcapil, '0~3~7', ''), '/');
      dispatch(change('CCForm2', 'rt', rtrw[0]));
      dispatch(change('CCForm2', 'rw', rtrw[1]));
      dispatch(change('CCForm2', 'streetAddress', result(listDukcapil, '0~3~8', '')));
    }

    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const existing = result(navigation, 'state.params.existing', false);
    const statusForm = 'NEXT';
    const pageName = 'CreditCardForm3';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint, existing));
  };
}

export function openCreditCard (refferalCodeOrami, nav) {
  return (dispatch, getState) => {
    const state = getState();
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(result(state, 'user', {})) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const accountList = result(state, 'accounts', []);
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');

    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
        } else {
          dispatch(getExistingData(refferalCodeOrami));
        }
      } else {
        dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
      }
    } else {
      dispatch(NavigationActions.navigate({routeName: 'CreateCCAccount', params: {refferalCodeOrami}}));
    }
  };
}

export function generatePhotoKTP (base64) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cifCode = result(state, 'user.profile.customer.cifCode', '');
    const nav = result(state, 'nav', {});
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(result(state, 'user', {})) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');

    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);

    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {mobileNumber, photoBase64: result(base64, 'base64', ''), namePhoto: '0~1~1', lang};
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
      dispatch(actionCreators.saveOpenAccountDataKtp(data));
      if (isLogin) {
        if (!startsWith(cifCode, 'NK')) {
          if (emoneyKycOnly) {
            setTimeout(() => {
              dispatch(NavigationActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({routeName: 'CreditCardForm1'})
                ]
              }));
            }, 1000);
          } else {
            setTimeout(() => {
              dispatch(NavigationActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({routeName: 'CreditCardForm1'})
                ]
              }));
            }, 1000);
          }
        } else {
          setTimeout(() => {
            dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'CreditCardForm1'})
              ]
            }));
          }, 1000);
        }
      } else {
        setTimeout(() => {
          dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Login'}),
              NavigationActions.navigate({routeName: 'CreditCardForm1'})
            ]
          }));
        }, 1000);
      }
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function generatePhotoNPWP (base64) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);

    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {mobileNumber, photoBase64: result(base64, 'base64', ''), namePhoto: '2~3~1', lang};
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
      dispatch(actionCreators.saveOpenAccountDataNpwp(data));
      dispatch(change('CameraNPWPForm', 'imageData', data));
      dispatch(createCreditCardForm('NEXT', 'CreditCardForm8'));
      dispatch(actionCreators.hideSpinner());
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
    let namePhoto = '';
    if (fieldName === 'savingStatement1') {
      namePhoto = '2~4~5';
    } else if (fieldName === 'savingStatement2') {
      namePhoto = '2~4~6';
    } else if (fieldName === 'savingStatement3') {
      namePhoto = '2~4~7';
    } else {
      namePhoto = '2~4~3';
    }
    const accountList = result(state, 'accounts', []);
    const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
    const mobileNumber = emoneyNoAcc.substring(2, emoneyNoAcc.length);
    const lang = result(state, 'currentLanguage.id', '');

    const requestData = {mobileNumber, photoBase64: base64, namePhoto, lang};
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
      dispatch(change('CCForm8', fieldName,  data)),
      dispatch(actionCreators.hideSpinner());
    }).catch((error) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function createOramiId (navigation) {
  return (dispatch, getState) => {
    const state = getState();
    const formid = result(state, 'ccCode', '');
    const customer_id = result(state, 'customerIdOrami.customer_id', '');
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const statusForm = 'SUBMIT';
    const pageName = 'CreditCardFinalize';
    if (formid === 'CCO-SIMOBI-002') {
      if (customer_id !== null) {
        dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
      } else {
        const cifCode = result(state, 'user.profile.customer.cifCode', '');
        const name = result(state, 'user.profile.name', '');
        const fullname = name.split(' ');
        const firstname = fullname[0];
        const lastname = fullname[fullname.length - 1];
        const email = result(state, 'form.EmailForm.values.email', '');
        const accountList = result(state, 'accounts', []);
        const emoneyAccount = find(accountList, {accountType: 'emoneyAccount'});
        const emoneyNoAcc = result(emoneyAccount, 'accountNumber', '');
        const mobile_number = emoneyNoAcc.substring(2, emoneyNoAcc.length);
        const gender = result(state, 'listDukcapil.0~2~11', '') === 'Laki-Laki' ? 'M' : 'F';

        const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
        let isValidKyc = false;

        if (!startsWith(cifCode, 'NK')) {
          if (emoneyKycOnly) {
            isValidKyc = false;
          } else {
            isValidKyc = true;
          }
        } else {
          isValidKyc = false;
        }
        const dob = isValidKyc ? moment(result(state, 'listDukcapil.0~2~7', '')).format('DD/MM/YYYY') :
          moment(result(state, 'form.CCForm1.values.birthDate', '')).format('DD/MM/YYYY');

        dispatch(actionCreators.showSpinner());
        const payload = {firstname, lastname, email, mobile_number, gender, dob};
        return api.registerVerifyOrami(payload, dispatch).then((res) => {
          const entity_id = result(res, 'data.data.entity_id', '');
          dispatch(actionCreators.saveCustomerIdOrami({'customer_id': entity_id}));
          dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
          dispatch(actionCreators.hideSpinner());
        }).catch((error) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
        });
      }
    } else {
      dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
    }
  };
}

export function requestOtpEform () {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const mobileNumber = result(state, 'form.identifyUserForm.values.phone', '');
    const payload = {mobileNumber, transactionType: 'openAccount', activateOtp: true, smsPriority: false};
    return api.requestOtpEform(payload, dispatch).
      then((res) => {
        const transRefNum = result(res, 'data.transRefNum', '');
        dispatch(actionCreators.saveTransRefNum(transRefNum));
        dispatch(NavigationActions.navigate({routeName: 'CreateAccountOTP'}));
        dispatch(actionCreators.hideSpinner());
      }).
      catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function resendOtpEform () {
  return (dispatch, getState) => {
    const state = getState();
    const mobileNumber = result(state, 'form.identifyUserForm.values.phone', '');
    const payload = {mobileNumber, transactionType: 'openAccount', activateOtp: true, smsPriority: false};
    return api.requestOtpEform(payload, dispatch).
      catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function verifyPhoneNumber (firebaseEmoney) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const name = result(state, 'form.identifyUserForm.values.name', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, 'form.identifyUserForm.values.phone', ''));
    const captchaInput = result(state, 'form.identifyUserForm.values.captchaInput', '');
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    const referralCode = result(state, 'form.identifyUserForm.values.referralCode', '');
    const payload = {mobileNumber, captchaInput, captchaId};
    return api.checkPhoneForCC(payload, dispatch).
      then((res) => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, referralCode, captchaInput}));
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
          const emoneyData = {
            fullName: name,
            phone: mobileNumber,
            captchaInput: captchaInput,
          };
          dispatch(registerEmoney(emoneyData, captchaId, firebaseEmoney));
        } else {
          dispatch(ccPhoneRegistered(firebaseEmoney));
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM), Toast.LONG);
      });
  };
}

export function prefilledDukcapilCreditCard (data, maritalStatus) {
  return (dispatch) => {
    dispatch(change('CCForm1', 'ktpId', result(data, '0~2~5', '')));
    dispatch(change('CCForm1', 'maritalStatus', maritalStatus));
    dispatch(change('CCForm1', 'birthDate', result(data, '0~2~7', '')));
    dispatch(change('CCForm1', 'mothersMaiden', result(data, '0~2~8', '')));

    dispatch(change('CCForm1', 'ktpId2', result(data, '0~2~5', '')));
    dispatch(change('CCForm1', 'maritalStatus2', result(data, '0~2~6', '')));
    dispatch(change('CCForm1', 'dob2', result(data, '0~2~7', '')));
    dispatch(change('CCForm1', 'mothersMaiden2', result(data, '0~2~8', '')));
    dispatch(change('CCForm1', 'birthPlace', result(data, '0~2~9', '')));

    dispatch(change('CCForm2', 'country2', result(data, '0~3~1', '')));
    dispatch(change('CCForm2', 'province2', result(data, '0~3~2', '')));
    dispatch(change('CCForm2', 'city2', result(data, '0~3~3', '')));
    dispatch(change('CCForm2', 'district2', result(data, '0~3~4', '')));
    dispatch(change('CCForm2', 'subDistrict2', result(data, '0~3~5', '')));
    dispatch(change('CCForm2', 'postalCode2', result(data, '0~3~6', '')));
    dispatch(change('CCForm2', 'streetAddress2', result(data, '0~3~8', '')));

    const rtrw2 = split(result(data, '0~3~7', ''), '/', 2);
    const rt2 = rtrw2[0] || '';
    const rw2 = rtrw2[1] || '';
    dispatch(change('CCForm2', 'rt2', rt2));
    dispatch(change('CCForm2', 'rw2', rw2));
  };
}

export function gotoKTPCamera () {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).
        then((res) => {
          if (!res) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
              if ('granted' === result) {
                dispatch(NavigationActions.back());
                setTimeout(() => {
                  dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
                }, 0);
                dispatch(actionCreators.clearTransRefNum());
                dispatch(actionCreators.hideSpinner());
              } else {
                return Promise.resolve();
              }
            });
          } else {
            dispatch(NavigationActions.back());
            setTimeout(() => {
              dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
            }, 0);
            dispatch(actionCreators.clearTransRefNum());
            dispatch(actionCreators.hideSpinner());
          }
        });
    } else {
      Permissions.check('ios.permission.CAMERA').then((response) => {
        if (response === 'granted') {
          dispatch(NavigationActions.back());
          setTimeout(() => {
            dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
          }, 0);
          dispatch(actionCreators.clearTransRefNum());
          dispatch(actionCreators.hideSpinner());
        } else {
          Permissions.request('ios.permission.CAMERA').then((response) => {
            if (response === 'granted') {
              dispatch(NavigationActions.back());
              setTimeout(() => {
                dispatch(NavigationActions.navigate({routeName: 'CreditCardKTPCamera'}));
              }, 0);
              dispatch(actionCreators.clearTransRefNum());
              dispatch(actionCreators.hideSpinner());
            } else {
              Toast.show('Go to settings, allow Simobi+ to access device camera', Toast.LONG);
              return Promise.resolve();
            }
          });
        }
      });
    }
  };
}

export function accountRegistered () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToRegisterAtm = () => {
      Promise.all([
        dispatch(logout())
      ]).then(() => {
        dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'}));
      });
      dispatch(actionCreators.clearCaptcha());
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      heading1: language.ACCOUNT__REGISTERED,
      text: language.ACCOUNT__REGISTERED2,
      button1: language.GENERIC__CANCEL,
      onButton1Press: hideAlert,
      button2: language.GENERATE_CODE_FORM_BUTTON_NEXT,
      onButton2Press: goToRegisterAtm,
      onClose: hideAlert,
      button1Color: 'black'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function unregisteredOramiEmail (checkpoint = false) {
  return (dispatch) => {

    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goBack = () => {
      NavigationActions.back();
      hideAlert();
    };

    const goToNext = () => {
      if (checkpoint) {
        dispatch(NavigationActions.navigate({routeName: 'Checkpoint'}));
      } else {
        const pageName = 'CreditCardForm2';
        const statusForm = 'NEXT';
        dispatch(createCreditCardForm(statusForm, pageName));
      }
      dispatch(actionCreators.clearCaptcha());
      hideAlert();
    };

    const sinarmasModalOptions = {
      heading1: language.CREDITCARD__ORAMI_NOTFOUND,
      text: language.CREDITCARD__ORAMI_NOT_REGISTERED,
      button1: language.MIGRATE__ERROR_BUTTON,
      onButton1Press: goBack,
      button2: language.CREDITCARD__ORAMI_REGISTER_BUTTON,
      onButton2Press: goToNext,
      onClose: hideAlert,
      button1Color: 'black'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function checkEmail (values) {
  return (dispatch, getState) => {
    const state = getState();
    const ccCode = result(state, 'ccCode', '');
    const postalCode = result(values, 'postalCode', '');
    const email = result(values, 'email', '');
    dispatch(change('CCForm2', 'postalCode2', postalCode));
    dispatch(change('EmailForm', 'email', email));

    if (ccCode.includes('CCO')) {
      dispatch(actionCreators.showSpinner());
      const payload = {email};
      return api.checkEmailOrami(payload, dispatch).
        then((res) => {
          dispatch(actionCreators.hideSpinner());
          const responseCode = result(res, 'data.responseCode', '');
          const customer_id = result(res, 'data.customer_id', '');
          dispatch(actionCreators.saveCustomerIdOrami({'customer_id': customer_id}));
          if (responseCode === '00') {
            const pageName = 'CreditCardForm2';
            const statusForm = 'NEXT';
            dispatch(createCreditCardForm(statusForm, pageName));
          } else {
            dispatch(unregisteredOramiEmail());
          }
        }).
        catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
        });
    } else {
      const pageName = 'CreditCardForm2';
      const statusForm = 'NEXT';
      dispatch(createCreditCardForm(statusForm, pageName));
    }
  };
}

export function verifyPhoneNumberSendEmail (firebaseEmoney) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const name = result(state, 'form.identifyUserForm.values.name', '');
    const mobileNumber = formatMobileNumberEmoneyRegistration(result(state, 'form.identifyUserForm.values.phone', ''));
    const captchaInput = result(state, 'form.identifyUserForm.values.captchaInput', '');
    const captchaId = result(state, 'captcha.captchaId', '').toString();
    const referralCode = result(state, 'form.identifyUserForm.values.referralCode', '');
    const payload = {mobileNumber, captchaInput, captchaId, name, referralCode};
    return api.sendEmailOtpEmoneyRegister(payload, dispatch).
      then((res) => {
        dispatch(actionCreators.hideSpinner());
        const responseCode = result(res, 'data.responseCode', '');
        const emailToken = result(res, 'data.emailToken', '');
        const isLockedDevice = Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer);
        const typeActivation = '001';
        if (responseCode === '00') {
          dispatch(actionCreators.saveOpenAccountData({name, mobileNumber, referralCode, captchaInput}));
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
          dispatch(actionCreators.hideSpinner());
          dispatch(sendOtpActivation(emailToken, typeActivation, isLockedDevice, firebaseEmoney));
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(ccPhoneRegistered(firebaseEmoney));
          const captcha = generateCaptcha();
          dispatch(actionCreators.setCaptcha(captcha));
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        const captcha = generateCaptcha();
        dispatch(actionCreators.setCaptcha(captcha));
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__POPULATE_REDEEM), Toast.LONG);
      });

  };
}
