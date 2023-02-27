import * as actionCreators from '../actions/index.actions.js';
import {storageKeys, set, get} from '../../utils/storage.util';
import api from '../../utils/api.util';
import result from 'lodash/result';
import {getErrorMessage} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {succesGetLoanPGO, succesPayLoanPGO, succesSignLoanPGO} from './dashboard.thunks';
import size from 'lodash/size';
import DeviceInfo from 'react-native-device-info';
import VersionNumber from 'react-native-version-number';
import Contacts from 'react-native-contacts';
import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import * as middlewareUtils from '../../utils/middleware.util';
import moment from 'moment';
import {filter, find, startsWith} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {ENV} from '../../config/env.config';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

let GetAppList;

if (Platform.OS === 'android') {
  GetAppList = require('react-native-android-installed-apps');
}


export function saveLoanDataPgoAcceptOnly () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const version = VersionNumber.appVersion;
    const requestData = {cif, version};
    const targetUrlThreePointOne = '3.1';
    const payload = {requestData, targetUrl: targetUrlThreePointOne, type: 'post'};
    dispatch(actionCreators.showSpinner());
    return api.apiGeneral(payload, dispatch).then((response) => {
      const responseDataRaw = result(response, 'data.data', '');
      dispatch(actionCreators.hideSpinner());
      dispatch(checkingCustomerKYC(responseDataRaw));
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFivePointTwo () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const userType = '1';
    const mSsid = ' ';
    const mBssid = ' ';
    const mCapabilities = ' ';
    const mVenueName = ' ';
    const mChannelWidth = ' ';
    const mOperatorFriendlyName = ' ';
    const requestData = {cif, contents: [{userType, mBssid, mSsid, mCapabilities, mChannelWidth, mOperatorFriendlyName, mVenueName}]};
    const targetUrl = '5.1';
    const payload = {requestData, targetUrl, type: 'post'};
    return api.apiGeneral(payload, dispatch).then(() => {
    }).catch(() => {
    });
  };
}

export function sendTrackingFivePointThree () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const rawAppsData = result(state, 'listAPPuser', []);
    const platformType = Platform.OS;
    const phoneOs = result(Platform, 'Version', '').toString();
    let model = DeviceInfo.getModel();
    const version = VersionNumber.appVersion;
    const contents = middlewareUtils.getListAppInstalled(rawAppsData, platformType);
    const requestData = {contents, platform: platformType, cif, phoneModel: model, phoneOs, version};
    const targetUrl = '5.2';
    const payload = {requestData, targetUrl, type: 'post'};
    return api.apiGeneral(payload, dispatch).then(() => {
    }).catch(() => {
    });
  };
}

export function sendTrackingFivePointFour () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const userType = '1';
    const mapType = 'google';// google or etc
    const targetUrl = '5.3';
    Geolocation.getCurrentPosition((info) => {
      const lat = result(info, 'coords.latitude', '0').toString();
      const lot = result(info, 'coords.longitude', '0').toString();
      const requestData = {cif, lat, lot, userType, mapType};
      const payload = {requestData, targetUrl, type: 'post'};
      return api.apiGeneral(payload, dispatch).then(() => {
      }).catch(() => {
      });
    });

  };
}

export function sendTrackingFivePointFive (eventCodeRaw = ' ') { // 5.4
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
    const mobile = DeviceInfo.getPhoneNumber() === undefined ? 'not have sim card' : DeviceInfo.getPhoneNumber();
    const bankCard = ' ';
    const eventCode = eventCodeRaw;
    const platformType = result(Platform, 'OS', 'android') === 'android' ? '2' : '1';
    const deviceId = DeviceInfo.getDeviceId();
    const userChannel = ' ';
    const triggerTime = moment().format('YYYY-MM-DD');
    const isDelete = '0';
    const version = VersionNumber.appVersion;
    const remark = 'note';
    const requestData = {cif, mobile, bankCard, eventCode, platformType, deviceId, userChannel, triggerTime, isDelete, version, remark};
    const targetUrl = '5.4';
    const payload = {requestData, targetUrl, type: 'post'};
    return api.apiGeneral(payload, dispatch).then(() => {
    }).catch(() => {
    });
  };
}

export function getContactForLoan () {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      dispatch(getPermissionAndroidandGetContact());
    } else {
      dispatch(getPermissionIosandGetContact());
    }
  };
}

export function getPermissionAndroidandGetContact () { // aka 2.10
  return (dispatch, getState) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).
      then((status) => {
        if ([PermissionsAndroid.RESULTS.GRANTED, true].includes(status)) {
          Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              Toast.show(language.PERMISSION_ERROR__CONTACTS, Toast.LONG);
            } else {
              const state = getState();
              const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
              const allContactRaw = middlewareUtils.getListPhone(contacts);
              let idContacts = [];
              const customContacts = filter(allContactRaw, (obj) => {
                filter(obj, (obj2) => {
                  idContacts.push(obj2);
                });
              });
              const content = [...idContacts, ...customContacts];
              const requestIp = result(state, 'ipAddress', ' ');
              const deviceId = DeviceInfo.getDeviceId();
              const requestData = {deviceId, requestIp, cif, content};
              const targetUrl = '2.10';
              const payload = {requestData, targetUrl, type: 'post'};
              return api.apiGeneral(payload, dispatch).then(() => {
                dispatch(actionCreators.hideSpinner());
              }).catch(() => {
                dispatch(actionCreators.hideSpinner());
              });
            }
          });
        }
      }).catch(() => {
      });
  };
}

export function getPermissionIosandGetContact () { // aka 2.10
  return (dispatch, getState) => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      } else {
        const state = getState();
        const cif = String(result(state, 'user.profile.customer.cifCode', ' '));
        const allContactRaw = middlewareUtils.getListPhone(contacts);
        let idContacts = [];
        const customContacts = filter(allContactRaw, (obj) => {
          filter(obj, (obj2) => {
            idContacts.push(obj2);
          });
        });
        const content = [...idContacts, ...customContacts];
        const requestIp = result(state, 'ipAddress', ' ');
        const deviceId = DeviceInfo.getDeviceId();
        const requestData = {deviceId, requestIp, cif, content};
        const targetUrl = '2.10';
        const payload = {requestData, targetUrl, type: 'post'};
        return api.apiGeneral(payload, dispatch).then(() => {
        }).catch(() => {
          dispatch(actionCreators.hideSpinner());
        });
      }
    });
  };
}

export function getInstalledApp () {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      dispatch(getInstalledAppInAndroid());
    }
  };
}

export function getInstalledAppInAndroid () {
  return (dispatch) => {
    GetAppList.getNonSystemApps().
      then((apps) => {
        dispatch(actionCreators.saveAppList(apps));
        dispatch(sendTrackingFivePointThree());
      }).
      catch(() => {
      });
  };
}

export function sendTrackingFourPointOne () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const version = VersionNumber.appVersion;
    const requestData = {cif, version};
    const targetUrl = '4.1';
    const payload = {requestData, targetUrl, type: 'post'};
    return api.apiGeneral(payload, dispatch).then((res) => {
      const response = result(res, 'data.data.status', '').toString();
      if (response === '0') {
        setTimeout(() => {
          dispatch(sendTrackingFourPointThree());
        }, 3000);
      } else if (response === '1') {
        dispatch(NavigationActions.navigate({routeName: 'RetakeSelfiePage'}));
        dispatch(actionCreators.hideSpinner());
      } else {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(actionCreators.hideSpinner());
        Toast.show('Order has been reject', Toast.LONG);
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointTwo () {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cifCode};
    const targetUrl = 'addUserSign';
    const type = 'post';
    const payload = {requestData, targetUrl, type};
    return api.apiGeneral(payload, dispatch).then(() => {
      setTimeout(() => {
        dispatch(sendTrackingFourPointOne());
      }, 3000);
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointThree () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cif};
    const targetUrl = '4.4';
    const payload = {requestData, targetUrl, type: 'post'};
    return api.apiGeneral(payload, dispatch).then((res) => {
      const data = result(res, 'data.data', '');
      if (data === 'aktif') {
        setTimeout(() => {
          dispatch(sendTrackingFourPointFive());
        }, 3000);
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'CreateSignWebViewPage', params: {url: data}}));
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointFour () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cif};
    const targetUrl = '4.3';
    const payload = {requestData, targetUrl, type: 'post'};
    dispatch(actionCreators.showSpinner());
    return api.apiGeneral(payload, dispatch).then((res) => {
      const jso = JSON.parse(result(res, 'data.data', ''));
      const isActive = result(jso, 'JSONFile.info', '').toString();
      if (isActive === 'aktif') {
        setTimeout(() => {
          dispatch(sendTrackingFourPointFive());
        }, 3000);
      } else {
        dispatch(actionCreators.hideSpinner());
        Toast.show('Account Belum aktif', Toast.LONG);
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointFive () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const version = VersionNumber.appVersion;
    const requestData = {cif, version};
    const targetUrlThreePointOne = '3.1';
    const payload = {requestData, targetUrl: targetUrlThreePointOne, type: 'post'};
    return api.apiGeneral(payload, dispatch).then((res) => {
      const orderId = result(res, 'data.data.orderNumber', '').toString();
      const targetUrlFourPointFive = '4.5';
      const payloadLast = {requestData: {cif, orderId}, targetUrl: targetUrlFourPointFive, type: 'post'};
      setTimeout(() => api.apiGeneral(payloadLast, dispatch).then((res) => {
        const email = result(res, 'data.data.email', '');
        const docSendStatus = result(res, 'data.data.docSendStatus', '').toString();
        const rawData = result(res, 'data.data.listAgain', []);
        const protocolNoRaw = filter(rawData, {'orderId': orderId});
        const protocolNo = protocolNoRaw[0];
        if (docSendStatus === '2') {
          setTimeout(() => {
            dispatch(sendTrackingFourPointFiveReload());
          }, 3000);
        } else {
          setTimeout(() => {
            dispatch(sendTrackingFourPointEight(email, protocolNo, orderId));
          }, 3000);
        }
      }).catch(() => {
        dispatch(actionCreators.hideSpinner());
      }), 3000);
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointFiveReload (reSend = '1') {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const version = VersionNumber.appVersion;
    const requestData = {cif, version};
    const targetUrlThreePointOne = '3.1';
    const payload = {requestData, targetUrl: targetUrlThreePointOne, type: 'post'};
    return api.apiGeneral(payload, dispatch).then((res) => {
      const orderId = result(res, 'data.data.orderNumber', '').toString();
      const targetUrlFourPointFive = '4.5';
      const payloadLast = {requestData: {cif, orderId, reSend}, targetUrl: targetUrlFourPointFive, type: 'post'};
      setTimeout(() => api.apiGeneral(payloadLast, dispatch).then((res) => {
        const email = result(res, 'data.data.email', '');
        const rawData = result(res, 'data.data.listAgain', []);
        const protocolNoRaw = filter(rawData, {'orderId': orderId});
        const protocolNo = protocolNoRaw[0];
        setTimeout(() => {
          dispatch(sendTrackingFourPointEight(email, protocolNo, orderId));
        }, 3000);
      }).catch(() => {
        dispatch(actionCreators.hideSpinner());
      }), 3000);
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointSix (orderIdraw) {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cif, orderIdList: [`${orderIdraw}`]};
    const targetUrl = '4.6';
    const payload = {requestData, targetUrl, type: 'post'};
    dispatch(actionCreators.showSpinner());
    return api.apiGeneral(payload, dispatch).then((res) => {
      const response = result(res, 'data.status', '').toString();// 1 success
      if (response === '1') {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(actionCreators.hideSpinner());
        dispatch(succesSignLoanPGO());  
      } else {
        Toast.show('Account Belum aktif', Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointSeven () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cif};
    const targetUrl = '4.7';
    const payload = {requestData, targetUrl, type: 'post'};
    dispatch(actionCreators.showSpinner());
    return api.apiGeneral(payload, dispatch).then((res) => {
      const signStatus = result(res, 'data.data.signStep', '').toString();
      if (signStatus === '0') {
        setTimeout(() => {
          dispatch(sendTrackingFourPointTwo());
        }, 3000);
      } else if (signStatus === '1') {
        setTimeout(() => {
          dispatch(sendTrackingFourPointThree());
        }, 3000);
      } else if (signStatus === '2') {
        setTimeout(() => {
          dispatch(sendTrackingFourPointFive());
        }, 3000);
      } else {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        Toast.show('Document already signed', Toast.LONG);
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function sendTrackingFourPointEight (email = '', protocolNumber = '', orderId = '') {
  let targetUrl = '';
  if (ENV === 'dev') {
    targetUrl = 'https://digitalloantest.banksinarmas.com:9022/sign/signPageLoad?email=' + email + '&docNo=' + result(protocolNumber, 'protocolNum', '');
  } else {
    targetUrl = 'http://digitalloan.banksinarmas.com:9022/sign/signPageLoad?email=' + email + '&docNo=' + result(protocolNumber, 'protocolNum', '');
  }
  return (dispatch, getState) => {
    const state = getState();
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cif};
    const payload = {targetUrl, type: 'get', requestData};
    return api.apiGeneral(payload, dispatch).then((res) => {
      const response = result(res, 'data.result', '');
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'SigningWebViewPage', params: {urlAndroid: response, orderId, urlIos: targetUrl}}));
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function RetakeSelfieCamera (data) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cifCode, photoBase64: data};
    const targetUrl = 'sendSelfiePhoto';
    const payload = {targetUrl, type: 'post', requestData};
    dispatch(actionCreators.showSpinner());
    return api.apiGeneral(payload, dispatch).then(() => {
      setTimeout(() => {
        dispatch(sendTrackingFourPointTwo());
      }, 3000);

    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function saveLoanDataPgo (dataLoan = []) {
  return (dispatch, getState) => {
    const state = getState();
    const checkingFlag = result(state, 'checkingPGOModal', '');
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const version = VersionNumber.appVersion;
    const requestData = {cif, version};
    const targetUrlThreePointOne = '3.1';
    const payload = {requestData, targetUrl: targetUrlThreePointOne, type: 'post'};
    return api.apiGeneral(payload, dispatch).then((response) => {
      const responseDataRaw = result(response, 'data.data', '');
      const status = result(responseDataRaw, 'loanStatus', '');
      const checkingStatus = status === 'SUCCESS_REPAY' || status === 'UN_BORROW' ? '1' : '0';
      const analisis = size(responseDataRaw);
      if (analisis !== 0 && checkingStatus === '0') {
        dispatch(actionCreators.saveLoanAccounts([{...responseDataRaw, typeOfLoan: 'PGO', accountType: 'ListLoan'}, ...dataLoan]));
        if (checkingFlag === '' || checkingFlag === '0') {
          if (status === 'AUDIT_REFUSE') {
            set(storageKeys['PGO_PAYMENT'], {alreadyPopUp: false});
            get(storageKeys['PGO_PAYMENT']).then((res) => {
              const flagPopup = result(res, 'alreadyPopUp', false);
              if (flagPopup === false) {
                dispatch(actionCreators.saveFlagCheckingPGO('1'));
                set(storageKeys['PGO_REJECT'], {alreadyPopUp: true});
              }
            });
          }
          if (status === 'AUDIT_SUCCESS') {
            dispatch(succesGetLoanPGO());
            dispatch(actionCreators.saveFlagCheckingPGO('1'));
          }
        }
      } else {
        dispatch(actionCreators.saveLoanAccounts(dataLoan));

        this.setState({showLoader: false});
      }
      if (status === 'SUCCESS_REPAY') {
        if (checkingFlag === '' || checkingFlag === '0') {
          set(storageKeys['PGO_REJECT'], {alreadyPopUp: false});
          get(storageKeys['PGO_PAYMENT']).then((res) => {
            const flagPopup = result(res, 'alreadyPopUp', false);
            if (flagPopup === false) {
              dispatch(succesPayLoanPGO());
              dispatch(actionCreators.saveFlagCheckingPGO('1'));
              set(storageKeys['PGO_PAYMENT'], {alreadyPopUp: true});
            }
          });
        }
      }
    }).catch(() => Promise.resolve());
  };
}

export function checkingCustomerKYC (data) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const accountList = result(state, 'accounts', []);
    const accountEmoney = find(accountList,  function (o) {
      return o.accountType === 'emoneyAccount';
    });
    const accountEmoneyTarget = {...accountEmoney};
    const accountNumber = result(accountEmoneyTarget, 'accountNumber', '');
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const requestData = {cifCode, accountNumber};
    const targetUrl = 'requestKycEmoney';
    const payload = {targetUrl, type: 'post', requestData};
    if (startsWith(cifCode, 'NK')) {
      return api.apiGeneral(payload, dispatch).then((response) => {
        const responseCode = result(response, 'responseCode', '');
        if (responseCode === '00') {
          Toast.show(getErrorMessage('Silahkan datang ke cabang terdekat unntuk melakukan pendataan lebih lanjut'));
          dispatch(actionCreators.hideSpinner());
        } else {
          Toast.show(getErrorMessage('Server Time Out, silahkan dicoba beberapa saat lagi'));
          dispatch(actionCreators.hideSpinner());
        }
      }).
        catch((err) => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(getErrorMessage(err, 'Tidak bisa megambil data dari server'));
        });
    } else {
      dispatch(NavigationActions.navigate({routeName: 'LoanSummaryPage', params: {data}}));
      dispatch(actionCreators.hideSpinner());
    }
  };
}

// belom sesuai ekspektasi
export function getUserLoanList (dataLoan = []) {
  return (dispatch) => {
    dispatch(saveLoanDataPgo(dataLoan));
    dispatch(actionCreators.hideSpinner());
  };
}