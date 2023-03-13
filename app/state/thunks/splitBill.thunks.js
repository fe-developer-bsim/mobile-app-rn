import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result, map, isEmpty} from 'lodash';
import {StackActions, NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {change, reset} from 'redux-form';
import {
  getErrorMessage,
  removeDot,
  normalisePhoneNumber,
} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {triggerAuthNavigate, resetToDashboardFrom} from './common.thunks';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import moment from 'moment';
import {
  randomString,
  OBM_EncryptPassword,
  OBM_GetEncodingParameter,
  OBM_GetEncryptedPassword,
} from '../../utils/vendor/pinEncryption.util';
import {logout, login, checkLogin} from './onboarding.thunks.js';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

export function goToSplitBillMenu(validateStatus) {
  return dispatch => {
    const isCheckEmpty = true;
    if (validateStatus) {
      Toast.show(
        getErrorMessage(language.SPLITBILL_LIMIT_STATUS__TITLE),
        Toast.LONG,
      );
    } else {
      dispatch(goToYouBill(isCheckEmpty));
    }
  };
}

export function detailSplitBillMenu(value) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    dispatch(
      NavigationActions.navigate({
        routeName: 'DetailSplitBillMenu',
        params: value,
      }),
    );
  };
}

export function goToYouBill(isCheckEmpty) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    api
      .getListSplitBillBySender(dispatch)
      .then(res => {
        setTimeout(() => {
          if (!isCheckEmpty) {
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(goToYouOwe(isCheckEmpty));
          }
        }, 4000);
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.getListSender({res}));
        }
        if (responseCode === '99') {
          dispatch(actionCreators.getListSender({res}));
        }
      })
      .catch(error => {
        const responseCode = result(error, 'data.responseCode', '');
        if (responseCode !== '01' && responseCode !== '91') {
          if (!isCheckEmpty) {
            dispatch(actionCreators.hideSpinner());
          }
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        } else {
          null;
          if (!isCheckEmpty) {
            dispatch(actionCreators.hideSpinner());
          }
        }
      });
  };
}

export function updateSenderListCounter() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    api
      .getListSplitBillBySender(dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.getListSender({res}));
        }
        if (responseCode === '99') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.getListSender({res}));
        }
      })
      .catch(error => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(error, language.APP_ERROR__TITLE),
          Toast.LONG,
        );
      });
  };
}

export function goToYouOwe(isCheckEmpty) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    api
      .getListSplitBillByReceiver(dispatch)
      .then(res => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
        }, 2000);
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.getListReceiver({res}));
          if (isCheckEmpty) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'SplitBillMenu',
                params: {isCheckEmpty},
              }),
            );
          }
        } else {
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(error => {
        const responseCode = result(error, 'data.responseCode', '');
        if (responseCode !== '01') {
          dispatch(actionCreators.hideSpinner());
          if (isCheckEmpty) {
            dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
          }
          dispatch(actionCreators.hideSpinner());
        } else {
          null;
          dispatch(actionCreators.hideSpinner());
        }
      });
  };
}

export function goToSplitBill(dataTrx, validateStatus) {
  return dispatch => {
    const isFromQrPayment = result(dataTrx, 'isFromQrPayment');
    if (validateStatus) {
      Toast.show(
        getErrorMessage(language.SPLITBILL_LIMIT_STATUS__TITLE),
        Toast.LONG,
      );
    } else if (isFromQrPayment) {
      dispatch(actionCreators.clearListSelectedContacts());
      dispatch(actionCreators.clearSelectedContacts());
      dispatch(NavigationActions.back());
      dispatch(
        NavigationActions.navigate({
          routeName: 'FromQRSplitBillIndex',
          params: dataTrx,
        }),
      );
    } else {
      dispatch(actionCreators.clearListSelectedContacts());
      dispatch(actionCreators.clearSelectedContacts());
      dispatch(
        NavigationActions.navigate({
          routeName: 'SplitBillIndex',
          params: dataTrx,
        }),
      );
    }
  };
}

export function confirmSplitBill(
  selectedContacts,
  navConfirmation,
  validateMember,
) {
  return dispatch => {
    const valueBillPay = navConfirmation;
    if (validateMember) {
      Toast.show(
        getErrorMessage(language.SPLITBILL_LIMIT_SELECTED_CONTACT__ALERT),
        Toast.LONG,
      );
    } else {
      dispatch(
        NavigationActions.navigate({
          routeName: 'SplitBillConfirmation',
          params: {contacts: selectedContacts, valueBillPay: valueBillPay},
        }),
      );
    }
  };
}

export function confirmSplitBillAddNew(
  selectedContacts,
  navConfirmation,
  isAddNewParticipants,
  formValuesConfirmation,
  validateMember,
  valueSplitBillAddQR,
) {
  return (dispatch, getState) => {
    const valueBillPay = navConfirmation;
    const state = getState();
    const isAddCreate = result(state, 'saveNewParticipants', '');
    if (validateMember) {
      Toast.show(
        getErrorMessage(language.SPLITBILL_LIMIT_SELECTED_CONTACT__ALERT),
        Toast.LONG,
      );
    } else {
      if (isAddCreate === 'ADD_NEW') {
        dispatch(
          NavigationActions.navigate({routeName: 'HomeScreenSplitBill'}),
        );
        dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
        dispatch(NavigationActions.navigate({routeName: 'SplitBillIndex'}));
      }
      dispatch(
        NavigationActions.navigate({
          routeName: 'SplitBillConfirmation',
          params: {
            contacts: selectedContacts,
            valueBillPay: valueBillPay,
            isAddNewParticipants: isAddNewParticipants,
            formValuesConfirmation,
            valueSplitBillAddQR: valueSplitBillAddQR,
          },
        }),
      );
    }
  };
}

export function authSplitBill() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'Authenticate'}));
  };
}

export function generateStatementReceipt(fieldName, base64) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const mobileNumber = result(state, 'openAccountData.mobileNumber', '');
    const lang = result(state, 'currentLanguage.id', '');
    const requestData = {mobileNumber, photoBase64: base64, lang};
    const targetUrl = 'generatePhoto';
    const type = 'post';
    const username = 'EFORMCENTRAL';
    const password = 's3cuR3p455w0rD3f0rM';
    const payload = {requestData, targetUrl, type, username, password};
    return api
      .sendSplitBill(payload, dispatch)
      .then(res => {
        const data = result(res, 'data.pathLocationPhoto');
        dispatch(change('CCForm8', fieldName, data)),
          dispatch(actionCreators.hideSpinner());
      })
      .catch(error => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(error, language.APP_ERROR__TITLE),
          Toast.LONG,
        );
      });
  };
}

export function createSplitBillEqual(formValues, total, newContact, imageData) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    easyPin =
      'encryptedPassword:' +
      OBM_GetEncryptedPassword() +
      '|encodingParameter:' +
      OBM_GetEncodingParameter() +
      '|randomNumber:' +
      randomNumber;
    const amount = result(formValues, 'amount', '');
    const TotalAmount = removeDot(amount);
    const Description = result(formValues, 'description', '');
    const accountId = result(
      formValues,
      'destinationAccount.id',
      '',
    ).toString();
    const dateNow = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const counter = -1;
    newContact.map(value => {
      value.Amount = removeDot(total.toString());
      value.date = dateNow;
      value.counter = counter;
    });
    const receivers = newContact;
    let payload = {
      receivers,
      lang,
      TotalAmount,
      easyPin,
      Description,
      image: imageData,
      accountId,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .sendSplitBill(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: language.SPLITBILL__SUCCESS_MESSAGE,
            text: language.SPLITBILL__SUCCESS_MESSAGE_SUBTITLE,
            button1: language.SPLITBILL__CONFIRMATION_GOTIT,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'HomeScreenSplitBill'}),
                NavigationActions.navigate({routeName: 'SplitBillMenu'}),
              ],
            }),
          );
          dispatch(
            actionCreators.showSinarmasAlert({
              ...sinarmasModalOptions,
              image: 'SPLITBILL',
            }),
          );
          dispatch(actionCreators.hideSpinner());
        } else {
          Toast.show(responseMessage, Toast.LONG);
          dispatch(NavigationActions.back());
        }
      })
      .catch(err => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(
            getErrorMessage(err, language.SPLITBILL_CREATE_ERROR),
            Toast.LONG,
          );
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.SPLITBILL_CREATE_ERROR),
            Toast.LONG,
          );
        }
      });
  };
}

export function createSplitBill(formValues, billIndex, finalImage) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const lang = result(state, 'currentLanguage.id', 'id');
    let easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const randomNumber = randomString(16);
    OBM_EncryptPassword(easyPin, randomNumber);
    easyPin =
      'encryptedPassword:' +
      OBM_GetEncryptedPassword() +
      '|encodingParameter:' +
      OBM_GetEncodingParameter() +
      '|randomNumber:' +
      randomNumber;
    const amount = result(formValues, 'amount', '');
    const TotalAmount = removeDot(amount);
    const Description = result(formValues, 'description', '');
    const accountId = result(
      formValues,
      'destinationAccount.id',
      '',
    ).toString();
    const dateNow = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const counter = -1;
    billIndex.map(value => {
      value.Amount = result(value, 'Amount', '').toString();
      value.date = dateNow;
      value.counter = counter;
      delete value.indexBill;
    });
    const receivers = billIndex;
    let payload = {
      receivers,
      lang,
      TotalAmount,
      easyPin,
      Description,
      image: finalImage,
      accountId,
    };
    dispatch(actionCreators.showSpinner());
    return api
      .sendSplitBill(payload, dispatch)
      .then(res => {
        const responseCode = result(res, 'data.responseCode', '');
        const responseMessage = result(res, 'data.responseMessage', '');
        if (responseCode === '00') {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: language.SPLITBILL__SUCCESS_MESSAGE,
            text: language.SPLITBILL__SUCCESS_MESSAGE_SUBTITLE,
            button1: language.SPLITBILL__CONFIRMATION_GOTIT,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'HomeScreenSplitBill'}),
                NavigationActions.navigate({routeName: 'SplitBillMenu'}),
              ],
            }),
          );
          dispatch(
            actionCreators.showSinarmasAlert({
              ...sinarmasModalOptions,
              image: 'SPLITBILL',
            }),
          );
          dispatch(actionCreators.hideSpinner());
        } else {
          Toast.show(responseMessage, Toast.LONG);
          dispatch(NavigationActions.back());
        }
      })
      .catch(err => {
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(
            getErrorMessage(err, language.SPLITBILL_CREATE_ERROR),
            Toast.LONG,
          );
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.SPLITBILL_CREATE_ERROR),
            Toast.LONG,
          );
        }
      });
  };
}

export function goToTransfer(selectedData) {
  return dispatch => {
    dispatch(actionCreators.hideSpinner());
    const data = {selectedData};
    dispatch(
      NavigationActions.navigate({
        routeName: 'FundTransferPayment',
        params: data,
      }),
    );
  };
}

export function popupSplitBillConfirmationEqual(
  formValues,
  total,
  newContact,
  imageData,
) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      const submitParams = () => {
        dispatch(
          createSplitBillEqual(formValues, total, newContact, imageData),
        );
      };
      const params = {
        onSubmit: submitParams,
        currentAmount: '0',
        isEasypin: true,
        shouldSendSmsOtp: false,
        isOtp: false,
      };
      dispatch(
        triggerAuthNavigate('splitbill', null, false, 'AuthDashboard', params),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.SPLITBILL__CONFIRMATION_POPUP_TITLE,
      text: language.SPLITBILL__CONFIRMATION_POPUP_SUBTITLE,
      button1: language.SPLITBILL__CONFIRMATION_CANCEL,
      onButton1Press: hideAlert,
      button2: language.SPLITBILL__CONFIRMATION_YES,
      onButton2Press: buttonYes,
      onClose: hideAlert,
      button2Color: 'white',
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'SPLITBILL_REVAMP',
      }),
    );
  };
}

export function popupSplitBillConfirmation(formValues, billIndex, finalImage) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      const submitParams = () => {
        dispatch(createSplitBill(formValues, billIndex, finalImage));
      };
      const params = {
        onSubmit: submitParams,
        currentAmount: '0',
        isEasypin: true,
        shouldSendSmsOtp: false,
        isOtp: false,
      };
      dispatch(
        triggerAuthNavigate('splitbill', null, false, 'AuthDashboard', params),
      );
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.SPLITBILL__CONFIRMATION_POPUP_TITLE,
      text: language.SPLITBILL__CONFIRMATION_POPUP_SUBTITLE,
      button1: language.SPLITBILL__CONFIRMATION_CANCEL,
      onButton1Press: hideAlert,
      button2: language.SPLITBILL__CONFIRMATION_YES,
      onButton2Press: buttonYes,
      onClose: hideAlert,
      button2Color: 'white',
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'SPLITBILL_REVAMP',
      }),
    );
  };
}

export function deleteSelectedYouBill(value) {
  return dispatch => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goDelete = () => {
      const invoiceNumber = result(value, 'invoiceNumber', '');
      const payload = {invoiceNumber};
      dispatch(actionCreators.hideSinarmasAlert());
      dispatch(actionCreators.showSpinner());
      return api
        .deleteYouBillList(payload, dispatch)
        .then(() => {
          dispatch(goToYouBill());
          dispatch(actionCreators.hideSpinner());
          Toast.show(language.SPLITBILL__DELETE_BILL_SUCCESS);
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.SPLITBILL__DELETE_BILL_ERROR),
            Toast.LONG,
          );
        });
    };
    const sinarmasModalOptions = {
      heading1: language.SPLITBILL__DELETE_YOU_BILL,
      text: language.SPLITBILL__DELETE_YOU_BILL_SUBTITLE,
      button1: language.SPLITBILL__CONFIRMATION_CANCEL,
      onButton1Press: hideAlert,
      button2: language.SPLITBILL__CONFIRMATION_YES,
      onButton2Press: goDelete,
      onClose: hideAlert,
      button2Color: 'white',
    };
    dispatch(
      actionCreators.showSinarmasAlert({
        ...sinarmasModalOptions,
        image: 'SPLITBILL_REVAMP',
      }),
    );
  };
}

export function editStatusDetail(valueDetail) {
  return dispatch => {
    const transRefNum = result(valueDetail, 'transRefNum', '');
    const mobileNumber = normalisePhoneNumber(
      result(valueDetail, 'mobileNumber', ''),
    );
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasInputAlert());
    };
    const goEditStatus = setStatus => {
      const declinedIsChecked = result(setStatus, 'declinedIsChecked', false);
      const paidIsChecked = result(setStatus, 'paidIsChecked', false);
      if (declinedIsChecked) {
        const status = 'reject';
        const payload = {status, transRefNum, mobileNumber};
        dispatch(actionCreators.hideSinarmasInputAlert());
        dispatch(actionCreators.showSpinner());
        return api
          .editStatusSplitBillYouBill(payload, dispatch)
          .then(res => {
            const data = result(res, 'data', {});
            const receivers = result(data, 'receivers', '');
            dispatch(actionCreators.saveStatus(receivers));
            dispatch(goToYouBill());
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.SPLITBILL__EDIT_SUCCESS, Toast.LONG);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.SPLITBILL__EDIT_ERROR, Toast.LONG);
          });
      } else if (paidIsChecked) {
        const status = 'paid';
        const payload = {status, transRefNum, mobileNumber};
        dispatch(actionCreators.hideSinarmasInputAlert());
        dispatch(actionCreators.showSpinner());
        return api
          .editStatusSplitBillYouBill(payload, dispatch)
          .then(res => {
            const data = result(res, 'data', {});
            const receivers = result(data, 'receivers', '');
            dispatch(actionCreators.saveStatus(receivers));
            dispatch(goToYouBill());
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.SPLITBILL__EDIT_SUCCESS, Toast.LONG);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.SPLITBILL__EDIT_ERROR, Toast.LONG);
          });
      } else {
        const status = setStatus;
        const payload = {status, transRefNum, mobileNumber};
        dispatch(actionCreators.hideSinarmasInputAlert());
        dispatch(actionCreators.showSpinner());
        return api
          .editStatusSplitBillYouBill(payload, dispatch)
          .then(res => {
            const data = result(res, 'data', {});
            const receivers = result(data, 'receivers', '');
            dispatch(actionCreators.saveStatus(receivers));
            dispatch(goToYouBill());
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.SPLITBILL__EDIT_SUCCESS, Toast.LONG);
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.SPLITBILL__EDIT_ERROR, Toast.LONG);
          });
      }
    };
    const sinarmasModalOptions = {
      heading1: language.SPLITBILL_EDIT_STATUS,
      button3: language.SPLITBILL_EDIT_STATUS_NOT_PAID_YET,
      button4: language.SPLITBILL_EDIT_STATUS_DECLINED,
      button5: language.SPLITBILL_EDIT_STATUS_PAID,
      button1: 'OK',
      button2: 'CANCEL',
      onButton1Press: goEditStatus,
      onClose: hideAlert,
      onButton2Press: hideAlert,
      button1Color: 'white',
    };
    dispatch(
      actionCreators.showSinarmasInputAlert({
        ...sinarmasModalOptions,
        input: 'EditStatusSplitBill',
        textInput2: '2',
        textInput3: '3',
        textInput4: '4',
      }),
    );
  };
}

export function requestBill(valueDetail) {
  return dispatch => {
    const mobileNumber = normalisePhoneNumber(
      result(valueDetail, 'mobileNumber', ''),
    );
    const invoiceNumber = result(valueDetail, 'invoiceNumber', '');
    const payload = {invoiceNumber, mobileNumber};
    dispatch(actionCreators.hideSinarmasInputAlert());
    dispatch(actionCreators.showSpinner());
    return api
      .requestSplitBillYouBill(payload, dispatch)
      .then(res => {
        const data = result(res, 'data', {});
        const receivers = result(data, 'receivers', '');
        dispatch(actionCreators.saveStatus(receivers));
        dispatch(goToYouBill());
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.SPLITBILL__REQUEST_SUCCESS, Toast.LONG);
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.SPLITBILL__REQUEST_ERROR, Toast.LONG);
      });
  };
}

export function reminderBill(valueDetail) {
  return dispatch => {
    const mobileNumber = normalisePhoneNumber(
      result(valueDetail, 'mobileNumber', ''),
    );
    const invoiceNumber = result(valueDetail, 'invoiceNumber', '');
    const payload = {invoiceNumber, mobileNumber};
    const reminderCounter = result(valueDetail, 'reminderCounter', 0);
    dispatch(actionCreators.hideSinarmasInputAlert());
    dispatch(actionCreators.showSpinner());
    return api
      .reminderSplitBillYouBill(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(updateSenderListCounter());
        Toast.show(language.SPLITBILL__REMINDER_SUCCESS, Toast.LONG);
      })
      .catch(err => {
        const responseCode = result(err, 'data.responseCode', '');
        const responseMessage = result(err, 'data.responseMessage', '');
        dispatch(actionCreators.hideSpinner());
        if (responseCode === '01' && '6' && '67') {
          Toast.show(getErrorMessage(err, responseMessage, ''), Toast.LONG);
        } else if (responseCode === '06') {
          if (reminderCounter === 0) {
            Toast.show(
              language.SPLITBILL__REMINDER_ERROR_0_COUNTER,
              Toast.LONG,
            );
          } else {
            Toast.show(language.SPLITBILL__REMINDER_ERROR, Toast.LONG);
          }
        } else {
          Toast.show(getErrorMessage(err, responseMessage, ''), Toast.LONG);
        }
      });
  };
}

export function rejectYouOweList(selectedDataReject) {
  return dispatch => {
    const invoiceNumber = result(selectedDataReject, 'invoiceNumber', '');
    const mobileNumber = result(selectedDataReject, 'getNumber', '');
    const payload = {invoiceNumber, mobileNumber};
    dispatch(actionCreators.hideSinarmasInputAlert());
    dispatch(actionCreators.showSpinner());
    return api
      .rejectSplitBillYouOwe(payload, dispatch)
      .then(() => {
        dispatch(goToYouOwe());
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.SPLITBILL__REJECT_SUCCESS, Toast.LONG);
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(language.SPLITBILL__REJECT_ERROR, Toast.LONG);
      });
  };
}

export function firstDownloadAndroid(res) {
  return dispatch => {
    const image = result(res, 'data.image', '');
    const base64 = image;
    const date = new Date();
    const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
    const dirs = RNFetchBlob.fs.dirs;
    const path = `${dirs.DownloadDir}/${nameFile}.png`;
    RNFS.writeFile(path, image, 'base64')
      .then(() => {
        RNFetchBlob.fs
          .scanFile([{path: path, mime: 'image/png'}])
          .then(() => {
            const hideAlert = () => {
              dispatch(actionCreators.hideSinarmasAlert());
            };
            const sinarmasModalOptions = {
              heading1: !isEmpty(base64)
                ? language.SPLITBILL__DOWNLOAD_SUCCESS
                : language.SPLITBILL__DOWNLOAD_NO_ANY,
              button1: language.SPLITBILL__CONFIRMATION_OK,
              onButton1Press: hideAlert,
              onClose: hideAlert,
            };
            dispatch(
              actionCreators.showSinarmasAlert({...sinarmasModalOptions}),
            );
            dispatch(actionCreators.hideSpinner());
          })
          .catch(() => {
            dispatch(actionCreators.hideSpinner());
          });
      })
      .catch(error => {
        if (isEmpty(base64)) {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: !isEmpty(base64)
              ? language.SPLITBILL__DOWNLOAD_SUCCESS
              : language.SPLITBILL__DOWNLOAD_NO_ANY,
            button1: language.SPLITBILL__CONFIRMATION_OK,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.SPLITBILL_DOWNLOAD_ERROR),
            Toast.LONG,
          );
        }
      });
  };
}

export function firstDownloadIOS(res) {
  return dispatch => {
    const image = result(res, 'data.image', '');
    const base64 = image;
    const date = new Date();
    const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
    const dirs = RNFetchBlob.fs.dirs;
    const path = `${dirs.DownloadDir}/${nameFile}.png`;
    RNFS.writeFile(path, image, 'base64')
      .then(() => {
        const hideAlert = () => {
          dispatch(actionCreators.hideSinarmasAlert());
        };
        const sinarmasModalOptions = {
          heading1: !isEmpty(base64)
            ? language.SPLITBILL__DOWNLOAD_SUCCESS
            : language.SPLITBILL__DOWNLOAD_NO_ANY,
          button1: language.SPLITBILL__CONFIRMATION_OK,
          onButton1Press: hideAlert,
          onClose: hideAlert,
        };
        dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(error => {
        if (isEmpty(base64)) {
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
          };
          const sinarmasModalOptions = {
            heading1: !isEmpty(base64)
              ? language.SPLITBILL__DOWNLOAD_SUCCESS
              : language.SPLITBILL__DOWNLOAD_NO_ANY,
            button1: language.SPLITBILL__CONFIRMATION_OK,
            onButton1Press: hideAlert,
            onClose: hideAlert,
          };
          dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.SPLITBILL_DOWNLOAD_ERROR),
            Toast.LONG,
          );
        }
      });
  };
}

export function downloadReceiptBill(data) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const invoiceNumber = result(data, 'invoiceNumber', '');
    const payload = {invoiceNumber};
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(res => {
        if (!res) {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ).then(result => {
            if (result === 'granted') {
              return api
                .downloadReceiptSplitBill(payload, dispatch)
                .then(res => {
                  dispatch(firstDownloadAndroid(res));
                })
                .catch(err => {
                  dispatch(actionCreators.hideSpinner());
                  Toast.show(
                    getErrorMessage(err, language.SPLITBILL_DOWNLOAD_ERROR),
                    Toast.LONG,
                  );
                });
            } else {
              dispatch(actionCreators.hideSpinner());
              Toast.show(
                'Go to settings, allow Simobi+ to access device camera',
                Toast.LONG,
              );
            }
          });
        } else {
          return api
            .downloadReceiptSplitBill(payload, dispatch)
            .then(res => {
              const image = result(res, 'data.image', '');
              const base64 = image;
              const date = new Date();
              const nameFile = Math.floor(
                date.getTime() + date.getSeconds() / 2,
              );
              const dirs = RNFetchBlob.fs.dirs;
              const path = `${dirs.DownloadDir}/${nameFile}.png`;
              RNFS.writeFile(path, image, 'base64')
                .then(() => {
                  RNFetchBlob.fs
                    .scanFile([{path: path, mime: 'image/png'}])
                    .then(() => {
                      const hideAlert = () => {
                        dispatch(actionCreators.hideSinarmasAlert());
                      };
                      const sinarmasModalOptions = {
                        heading1: !isEmpty(base64)
                          ? language.SPLITBILL__DOWNLOAD_SUCCESS
                          : language.SPLITBILL__DOWNLOAD_NO_ANY,
                        button1: language.SPLITBILL__CONFIRMATION_OK,
                        onButton1Press: hideAlert,
                        onClose: hideAlert,
                      };
                      dispatch(
                        actionCreators.showSinarmasAlert({
                          ...sinarmasModalOptions,
                        }),
                      );
                      dispatch(actionCreators.hideSpinner());
                    })
                    .catch(() => {
                      dispatch(actionCreators.hideSpinner());
                    });
                })
                .catch(error => {
                  if (isEmpty(base64)) {
                    const hideAlert = () => {
                      dispatch(actionCreators.hideSinarmasAlert());
                    };
                    const sinarmasModalOptions = {
                      heading1: !isEmpty(base64)
                        ? language.SPLITBILL__DOWNLOAD_SUCCESS
                        : language.SPLITBILL__DOWNLOAD_NO_ANY,
                      button1: language.SPLITBILL__CONFIRMATION_OK,
                      onButton1Press: hideAlert,
                      onClose: hideAlert,
                    };
                    dispatch(
                      actionCreators.showSinarmasAlert({
                        ...sinarmasModalOptions,
                      }),
                    );
                    dispatch(actionCreators.hideSpinner());
                  } else {
                    dispatch(actionCreators.hideSpinner());
                    Toast.show(
                      getErrorMessage(error, language.SPLITBILL_DOWNLOAD_ERROR),
                      Toast.LONG,
                    );
                  }
                });
            })
            .catch(err => {
              dispatch(actionCreators.hideSpinner());
              Toast.show(
                getErrorMessage(err, language.SPLITBILL_DOWNLOAD_ERROR),
                Toast.LONG,
              );
            });
        }
      });
    } else {
      return api
        .downloadReceiptSplitBill(payload, dispatch)
        .then(res => {
          const image = result(res, 'data.image', '');
          const base64 = image;
          const dirs = RNFetchBlob.fs.dirs;
          const date = new Date();
          const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
          const path = `${dirs.DocumentDir}/${nameFile}.png`;
          RNFS.writeFile(path, image, 'base64')
            .then(() => {
              CameraRoll.saveToCameraRoll(path, 'photo')
                .then(res => {
                  const hideAlert = () => {
                    dispatch(actionCreators.hideSinarmasAlert());
                  };
                  const sinarmasModalOptions = {
                    heading1: !isEmpty(base64)
                      ? language.SPLITBILL__DOWNLOAD_SUCCESS
                      : language.SPLITBILL__DOWNLOAD_NO_ANY,
                    button1: language.SPLITBILL__CONFIRMATION_OK,
                    onButton1Press: hideAlert,
                    onClose: hideAlert,
                  };
                  dispatch(
                    actionCreators.showSinarmasAlert({...sinarmasModalOptions}),
                  );
                  if (!isEmpty(res)) {
                    dispatch(actionCreators.hideSpinner());
                  }
                })
                .catch(error => {
                  if (isEmpty(base64)) {
                    const hideAlert = () => {
                      dispatch(actionCreators.hideSinarmasAlert());
                    };
                    const sinarmasModalOptions = {
                      heading1: !isEmpty(base64)
                        ? language.SPLITBILL__DOWNLOAD_SUCCESS
                        : language.SPLITBILL__DOWNLOAD_NO_ANY,
                      button1: language.SPLITBILL__CONFIRMATION_OK,
                      onButton1Press: hideAlert,
                      onClose: hideAlert,
                    };
                    dispatch(
                      actionCreators.showSinarmasAlert({
                        ...sinarmasModalOptions,
                      }),
                    );
                    dispatch(actionCreators.hideSpinner());
                  } else {
                    dispatch(actionCreators.hideSpinner());
                    Toast.show(
                      getErrorMessage(error, language.SPLITBILL_DOWNLOAD_ERROR),
                      Toast.LONG,
                    );
                  }
                });
            })
            .catch(err => {
              dispatch(actionCreators.hideSpinner());
              Toast.show(
                getErrorMessage(err, language.SPLITBILL_DOWNLOAD_ERROR),
                Toast.LONG,
              );
            });
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, language.SPLITBILL_DOWNLOAD_ERROR),
            Toast.LONG,
          );
        });
    }
  };
}

export function goToSplitBillFromTransaction(
  totalAmountTransfer,
  isFromQrPayment,
) {
  return dispatch => {
    const isSplitBill = true;
    const dataTrx = {
      amount: totalAmountTransfer,
      isSplitBill: isSplitBill,
      isFromQrPayment: isFromQrPayment,
    };
    dispatch(actionCreators.showSpinner());
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const getToSplitBill = () => {
      const validateAmountQR = result(dataTrx, 'amount', '');
      if (validateAmountQR < 10000) {
        Toast.show(language.VALIDATE__QR_LESS_THAN_MIN_SPLITBILL, Toast.LONG);
        dispatch(actionCreators.hideSinarmasAlert());
        dispatch(actionCreators.hideSpinner());
      } else {
        dispatch(goToSplitBill(dataTrx));
        dispatch(actionCreators.hideSinarmasAlert());
        dispatch(actionCreators.hideSpinner());
      }
    };
    const sinarmasModalOptions = {
      text: language.GO__TOSPLITBILL_BILL,
      button1: language.SPLITBILL__CONFIRMATION_CANCEL,
      onButton1Press: hideAlert,
      button2: language.SPLITBILL__CONFIRMATION_OK,
      onButton2Press: getToSplitBill,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export const gotoYouBillDetailDeeplink =
  (invNumber, activation, isInbox) => (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const invoiceNumber = invNumber;
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    if (isLogin) {
      return api
        .getListSplitBillBySender(dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.getListSender({res}));
          const invoice = result(res, 'data.InvoiceList', {});
          let data = [];
          map(invoice, val => {
            const selectedInvoice = result(val, 'invoiceNumber', '');
            if (selectedInvoice === invoiceNumber) {
              data = val;
            }
          });
          if (!isEmpty(data)) {
            if (!isInbox) {
              dispatch(resetToDashboardFrom('Landing'));
            }
            dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
            dispatch(
              NavigationActions.navigate({
                routeName: 'DetailSplitBillMenu',
                params: data,
              }),
            );
            dispatch(actionCreators.hideSpinner());
          } else {
            if (!isInbox) {
              dispatch(resetToDashboardFrom('Landing'));
            }
            dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
          }
        })
        .catch(error => {
          const responseCode = result(error, 'data.responseCode', '');
          if (responseCode !== '01') {
            dispatch(actionCreators.hideSpinner());
            Toast.show(
              getErrorMessage(error, language.APP_ERROR__TITLE),
              Toast.LONG,
            );
          } else {
            null;
            dispatch(actionCreators.hideSpinner());
          }
        });
    } else {
      dispatch(checkLogin(invoiceNumber, activation));
    }
  };

export const gotoYouOweDetailDeepLink =
  (invNumber, activation) => (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const invoiceNumber = invNumber;
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    if (isLogin) {
      return api
        .getListSplitBillByReceiver(dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.getListReceiver({res}));
          const invoice = result(res, 'data.ListInvoice', {});
          let data = [];
          map(invoice, val => {
            const selectedInvoice = result(val, 'invoiceNumber', '');
            if (selectedInvoice === invoiceNumber) {
              data = val;
            }
          });
          if (!isEmpty(data)) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
            dispatch(
              NavigationActions.navigate({
                routeName: 'DetailSplitBillMenuOwe',
                params: data,
              }),
            );
          } else {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
          }
        })
        .catch(error => {
          const responseCode = result(error, 'data.responseCode', '');
          if (responseCode !== '01') {
            dispatch(actionCreators.hideSpinner());
          } else {
            null;
            dispatch(actionCreators.hideSpinner());
          }
        });
    } else {
      dispatch(checkLogin(invoiceNumber, activation));
    }
  };

export function resetToConfirmationFrom(currentRouteIndex) {
  return dispatch => {
    dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'SplitBillConfirmationBack'}),
          NavigationActions.navigate({routeName: currentRouteIndex}),
        ],
      }),
    );
  };
}

export const gotoUpgradeEmoney = invNumber => dispatch => {
  dispatch(actionCreators.showSpinner());
  const invoiceNumber = invNumber;
  return api
    .getListSplitBillByReceiver(dispatch)
    .then(res => {
      dispatch(actionCreators.hideSpinner());
      const invoice = result(res, 'data.ListInvoice', {});
      let data = [];
      map(invoice, val => {
        const selectedInvoice = result(val, 'invoiceNumber', '');
        if (selectedInvoice === invoiceNumber) {
          data = val;
        }
      });
      if (!isEmpty(data)) {
        dispatch(
          NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}),
        );
      } else {
        dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
      }
    })
    .catch(error => {
      const responseCode = result(error, 'data.responseCode', '');
      if (responseCode !== '01') {
        dispatch(actionCreators.hideSpinner());
      } else {
        null;
        dispatch(actionCreators.hideSpinner());
      }
    });
};

export function silentLoginBillpay() {
  return dispatch => {
    dispatch(login({}, true, false, false, false, false, true, 1, 1))
      .then(() => {})
      .catch(err => {
        const responseMessage = result(
          err,
          'data.responseMessage',
          language.ERROR_MESSAGE_VALID_SESSION,
        );
        Toast.show(responseMessage);
      });
  };
}

export function updateInvoiceSplitBillTF(value) {
  return dispatch => {
    const status = 'paid';
    const transRefNum = result(value, 'dataTransRefNum', '');
    const payload = {status, transRefNum};
    dispatch(actionCreators.showSpinner());
    return api
      .updateInvoiceFT(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        return Promise.resolve();
      });
  };
}

export function reminderMaxBalanceSplitBill(invoiceNumber) {
  return dispatch => {
    const payload = {invoiceNumber};
    dispatch(actionCreators.showSpinner());
    return api
      .reminderMaxBalanceSplitBill(payload, dispatch)
      .then(() => {
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        return Promise.resolve();
      });
  };
}

export const gotoNKYCDeeplink =
  (invNumber, activation) => (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const invoiceNumber = invNumber;
    const state = getState();
    const isLogin = !isEmpty(result(state, 'user', {}));
    if (isLogin) {
      dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}));
      dispatch(actionCreators.hideSpinner());
    } else {
      dispatch(checkLogin(invoiceNumber, activation));
    }
  };

export function checkReceipt(data) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const invoiceNumber = result(data, 'invoiceNumber', '');
    const payload = {invoiceNumber};
    return api
      .downloadReceiptSplitBill(payload, dispatch)
      .then(res => {
        const imageSplitBill = result(res, 'data.image', '');
        dispatch(actionCreators.saveCheckReceipt(imageSplitBill));
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
        }, 4000);
      })
      .catch(error => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
        }, 4000);
        Toast.show(
          getErrorMessage(error, language.SPLITBILL_DOWNLOAD_ERROR),
          Toast.LONG,
        );
      });
  };
}

export function goToSplitBillMenuLoginProduct(validateStatus) {
  return dispatch => {
    const isCheckEmpty = true;
    if (validateStatus) {
      Toast.show(
        getErrorMessage(language.SPLITBILL_LIMIT_STATUS__TITLE),
        Toast.LONG,
      );
    } else {
      dispatch(goToYouBillLoginProduct(isCheckEmpty));
    }
  };
}

export function goToYouBillLoginProduct(isCheckEmpty) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    api
      .getListSplitBillBySender(dispatch)
      .then(res => {
        setTimeout(() => {
          if (!isCheckEmpty) {
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(goToYouOweLoginProduct(isCheckEmpty));
          }
        }, 4000);
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.getListSender({res}));
        }
        if (responseCode === '99') {
          dispatch(actionCreators.getListSender({res}));
        }
      })
      .catch(error => {
        const responseCode = result(error, 'data.responseCode', '');
        if (responseCode !== '01' && responseCode !== '91') {
          if (!isCheckEmpty) {
            dispatch(actionCreators.hideSpinner());
          }
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        } else {
          null;
          if (!isCheckEmpty) {
            dispatch(actionCreators.hideSpinner());
          }
        }
      });
  };
}

export function goToYouOweLoginProduct(isCheckEmpty) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    api
      .getListSplitBillByReceiver(dispatch)
      .then(res => {
        setTimeout(() => {
          dispatch(actionCreators.hideSpinner());
        }, 2000);
        const responseCode = result(res, 'data.responseCode', '');
        if (responseCode === '00') {
          dispatch(actionCreators.getListReceiver({res}));
          if (isCheckEmpty) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'SplitBillMenu',
                params: {isCheckEmpty},
              }),
            );
          }
        } else {
          dispatch(actionCreators.hideSpinner());
        }
      })
      .catch(error => {
        const responseCode = result(error, 'data.responseCode', '');
        if (responseCode !== '01') {
          dispatch(actionCreators.hideSpinner());
          if (isCheckEmpty) {
            dispatch(NavigationActions.navigate({routeName: 'SplitBillMenu'}));
          }
          dispatch(actionCreators.hideSpinner());
        } else {
          null;
          dispatch(actionCreators.hideSpinner());
        }
      });
  };
}
