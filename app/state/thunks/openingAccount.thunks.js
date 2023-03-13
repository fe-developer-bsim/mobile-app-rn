import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result, map, omit, isEmpty, find} from 'lodash';
import * as middlewareUtils from '../../utils/middleware.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {getErrorMessage, getPPAUrl} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {getUserLoanList} from '../../state/thunks/loan.thunks';
import {Linking} from 'react-native';
import {encryptEFormString} from '../../utils/secure.util';

// api 2 opening account
export function apiInquiryGetOrderList (codeProduct = '', data = []) {
  return (dispatch, getState) => {
    const state = getState();
    const dataSA = isEmpty(result(state, 'allProductOpeningSA', []));
    const dataCC = isEmpty(result(state, 'allProductOpeningCC', []));
    const dataLOAN = result(state, 'loanAccounts', []);
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    let checkingState = [];
    if (codeProduct === 'CC') {
      checkingState = dataCC;
    } else if (codeProduct === 'SA') {
      checkingState = dataSA;
    } else {
      checkingState = dataLOAN;
    }

    const payload =	{'requestData': {
      'cifCode': cif,
      'productCode': codeProduct,
    },
    'targetUrl': 'getOrderList',
    'type': 'post'
    };
    if (checkingState) {
      return api.sendDataProxyAccount(payload, dispatch).
        then((response) => {
          const allDAta = result(response, 'data.data', []);
          if (codeProduct === 'CC') {
            dispatch(actionCreators.saveOpeningAccountCC(middlewareUtils.transformOpeningDataCC(allDAta)));
          } else if (codeProduct === 'SA') {
            dispatch(actionCreators.saveOpeningAccountSA(middlewareUtils.transformOpeningDataSA(allDAta)));
          } else {
            const loanData = middlewareUtils.transformOpeningDataLOAN(allDAta);
            const finalData = [...data, ...loanData];
            dispatch(getUserLoanList(finalData));
          }
        }).catch(() => {
          if (codeProduct === 'LOAN') {
            dispatch(getUserLoanList(data));
          } else {
            return Promise.resolve();
          }
        });
    }
  };
}

export function getInquiryStatus (data, checkingNext = false) {
  return (dispatch, getState) => {
    const state = getState();
    const dataSA = result(state, 'allProductOpeningSA', []);
    const dataCC = result(state, 'allProductOpeningCC', []);
    const dataLOAN = result(state, 'loanAccounts', []);
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const getOrderId = result(data, 'orderId', '');
    const productCode = result(data, 'productCode', '');
    const idTarget = result(data, 'id', '');
    let getAllproduct = [];
    if (productCode === 'CC') {
      getAllproduct = dataCC;
    } else if (productCode === 'SA') {
      getAllproduct = dataSA;
    } else {
      getAllproduct = dataLOAN;
    }

    dispatch(actionCreators.showSpinner());
    const payload = {
      'requestData': {
        'productCode': productCode,
        'cifCode': cif,
        'id': idTarget,
        'orderId': getOrderId,
      },
      'targetUrl': 'inquiryStatus',
      'type': 'post'
    };
    return api.sendDataProxyAccount(payload, dispatch).then((response) => {
      const newData = result(response, 'data.data', {});
      const newdataTEMP = result(data, 'status', {});
      const alterNewData = map(getAllproduct, function (value) {
        let objectData = value;
        const firstDataId = result(value, 'orderId', '');
        if (firstDataId === getOrderId) {
          const newDataObject = omit(value, ['statusNew']);
          objectData = {statusNew: isEmpty(newData) ? newdataTEMP : newData, ...newDataObject};
        }
        return objectData;
      });

      const checkRejectOrApproeved = result(newData, 'status', '');
      dispatch(actionCreators.hideSpinner());
      
      if (checkingNext === true) {
        if (productCode === 'CC') {
          dispatch(NavigationActions.navigate({routeName: 'ApproveAplicationPage', params: {allData: {...data}}}));
        } else if (productCode === 'LOAN') {
          dispatch(actionCreators.saveLoanAccounts(alterNewData));
          const filterData = find(alterNewData, (dt) => getOrderId === dt.orderId);
          dispatch(NavigationActions.navigate({routeName: 'ApproveAplicationPage', params: {allData: {...filterData}}}));
        } else {
          dispatch(directToNextSTep({...newData, productCode}));
        }
      } else {
        if (productCode === 'CC') {
          dispatch(actionCreators.saveOpeningAccountCC(alterNewData));
          if (checkRejectOrApproeved === '20' || checkRejectOrApproeved === '30' || checkRejectOrApproeved === '99' || checkRejectOrApproeved === '98' || checkRejectOrApproeved === '97') {
            dispatch(succesApplyProduct(checkRejectOrApproeved, {...newData, productCode}, data, productCode));
          }
        } else if (productCode === 'SA') {
          dispatch(actionCreators.saveOpeningAccountSA(alterNewData));
          if (checkRejectOrApproeved === '20' || checkRejectOrApproeved === '30' || checkRejectOrApproeved === '99' || checkRejectOrApproeved === '98' || checkRejectOrApproeved === '97') {
            dispatch(succesApplyProduct(checkRejectOrApproeved, {...newData, productCode}, data, productCode));
          }
        } else {
          dispatch(actionCreators.saveLoanAccounts(alterNewData));
          const filterData = find(alterNewData, (dt) => getOrderId === dt.orderId);
          if (checkRejectOrApproeved === '20' || checkRejectOrApproeved === '30' || checkRejectOrApproeved === '99' || checkRejectOrApproeved === '98' || checkRejectOrApproeved === '97') {
            dispatch(succesApplyProduct(checkRejectOrApproeved, {...newData, productCode}, filterData, productCode));
          }
        }
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function directToNextSTep (data) {
  return (dispatch, getState) => {
    const nextPage = result(data, 'nextStep', '');
    const htmlCode = result(data, 'payload', '');
    const code = result(data, 'code', '');
    if (nextPage === '1') { // register digisign
      dispatch(actionCreators.hideSpinner());
      setTimeout(() => {
        dispatch(registerDigiSignOpeningAccount(data));
      }, 3000);
    } else if (nextPage === '1.1') { // register selfie retake
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'RetakeCameraOpeningAccountPage', params: {dataActivation: {...data}}}));
    } else if (nextPage === '2') { // activation Digisign
      dispatch(NavigationActions.navigate({routeName: 'ActivationAccountPage', params: {htmlCode, dataActivation: {...data}}}));
      dispatch(actionCreators.hideSpinner());
    } else if (nextPage === '3') { // signing document pkph
      dispatch(NavigationActions.navigate({routeName: 'SigningWebViewAccountOpeningPage', params: {htmlCode, dataActivation: {...data}}}));
      dispatch(actionCreators.hideSpinner());
    } else {
      dispatch(actionCreators.hideSpinner());
      if (code === 'LoanKPR') {
        let ipassport = '';
        const iPass = result(getState(), 'user.ipassport', '');
        const orderNo = result(data, 'orderNo', '');
        encryptEFormString(iPass).then((res) => {
          ipassport = res;
          const url = getPPAUrl(ipassport, orderNo);

          dispatch(actionCreators.showSpinner());
          return Linking.openURL(url).then(() => {
            dispatch(actionCreators.hideSpinner());
          }).catch((err) => {
            Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
            dispatch(actionCreators.hideSpinner());
          });
        }).catch((err) => {
          Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        });
      } else {
        dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
      }
    }
  };
}

export function registerDigiSignOpeningAccount (data) { // 1
  return (dispatch, getState) => {
    const state = getState();
    const dataSA = result(state, 'allProductOpeningSA', []);
    const dataCC = result(state, 'allProductOpeningCC', []);
    const dataLOAN = result(state, 'loanAccounts', []);
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const getOrderId = result(data, 'orderId', '');
    const productCode = result(data, 'productCode', '');
    let getAllproduct = [];
    if (productCode === 'CC') {
      getAllproduct = dataCC;
    } else if (productCode === 'SA') {
      getAllproduct = dataSA;
    } else {
      getAllproduct = dataLOAN;
    }

    dispatch(actionCreators.showSpinner());
    const payload = {
      'requestData': {
        'cifCode': cif,
        'orderId': getOrderId,
        'productCode': productCode
      },
      'targetUrl': 'registerDigisign',
      'type': 'post'
    };
    return api.sendDataProxyAccount(payload, dispatch).then((response) => {
      const newData = result(response, 'data.data', {});
      const alterNewData = map(getAllproduct, function (value) {
        let objectData = value;
        const orderId = result(data, 'orderId', ''); // id or orderId
        const firstDataId = result(value, 'orderId', '');
        if (firstDataId === orderId) {
          const newDataObject = omit(value, ['statusNew']);
          objectData = {statusNew: newData, ...newDataObject};
        }
        return objectData;
      });
      if (productCode === 'CC') {
        dispatch(actionCreators.saveOpeningAccountCC(alterNewData));
      } else if (productCode === 'SA') {
        dispatch(actionCreators.saveOpeningAccountSA(alterNewData));
      } else {
        dispatch(actionCreators.saveLoanAccounts(alterNewData));
      }
      dispatch(actionCreators.hideSpinner());
      dispatch(directToNextSTep({...newData, productCode}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkingActivation (data) { // 2
  return (dispatch, getState) => {
    const state = getState();
    const dataSA = result(state, 'allProductOpeningSA', []);
    const dataCC = result(state, 'allProductOpeningCC', []);
    const dataLOAN = result(state, 'loanAccounts', []);
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const getOrderId = result(data, 'orderNo', ''); // id or orderId
    const productCode = result(data, 'productCode', '');
    let getAllproduct = [];
    if (productCode === 'CC') {
      getAllproduct = dataCC;
    } else if (productCode === 'SA') {
      getAllproduct = dataSA;
    } else {
      getAllproduct = dataLOAN;
    }

    dispatch(actionCreators.showSpinner());
    const payload = {
      'requestData': {
        'cifCode': cif,
        'orderId': getOrderId,
        'productCode': productCode
      },
      'targetUrl': 'infoActivationDigisign',
      'type': 'post'
    };
    return api.sendDataProxyAccount(payload, dispatch).then((response) => {
      const newData = result(response, 'data.data', {});
      const alterNewData = map(getAllproduct, function (value) {
        let objectData = value;
        const orderId = result(data, 'orderId', ''); // id or orderId
        const firstDataId = result(value, 'orderId', '');
        if (firstDataId === orderId) {
          const newDataObject = omit(value, ['statusNew']);
          objectData = {statusNew: newData, ...newDataObject};
        }
        return objectData;
      });
      if (productCode === 'CC') {
        dispatch(actionCreators.saveOpeningAccountCC(alterNewData));
      } else if (productCode === 'SA') {
        dispatch(actionCreators.saveOpeningAccountSA(alterNewData));
      } else {
        dispatch(actionCreators.saveLoanAccounts(alterNewData));
      }

      dispatch(actionCreators.hideSpinner());
      dispatch(directToNextSTep({...newData, productCode}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export function checkingSignDocument (data) { // 3
  return (dispatch, getState) => {
    const state = getState();
    const dataSA = result(state, 'allProductOpeningSA', []);
    const dataCC = result(state, 'allProductOpeningCC', []);
    const dataLOAN = result(state, 'loanAccounts', []);
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const getOrderId = result(data, 'orderNo', ''); // id or orderId
    const documentId = result(data, 'documentId', '');
    const productCode = result(data, 'productCode', '');
    let getAllproduct = [];
    if (productCode === 'CC') {
      getAllproduct = dataCC;
    } else if (productCode === 'SA') {
      getAllproduct = dataSA;
    } else {
      getAllproduct = dataLOAN;
    }

    const payload = {
      'requestData': {
        'cifCode': cif,
        'orderId': getOrderId,
        'documentId': documentId,
        'productCode': productCode
      },
      'targetUrl': 'infoSigningDoc',
      'type': 'post'
    };
    dispatch(actionCreators.showSpinner());
    return api.sendDataProxyAccount(payload, dispatch).then((response) => {
      const newData = result(response, 'data.data', {});
      const alterNewData = map(getAllproduct, function (value) {
        let objectData = value;
        const orderId = result(data, 'orderId', ''); // id or orderId
        const firstDataId = result(value, 'orderId', '');
        if (firstDataId === orderId) {
          const newDataObject = omit(value, ['statusNew']);
          objectData = {statusNew: newData, ...newDataObject};
        }
        return objectData;
      });
      if (productCode === 'CC') {
        dispatch(actionCreators.saveOpeningAccountCC(alterNewData));
      } else if (productCode === 'SA') {
        dispatch(actionCreators.saveOpeningAccountSA(alterNewData));
      } else {
        dispatch(actionCreators.saveLoanAccounts(alterNewData));
      }

      dispatch(actionCreators.hideSpinner());
      dispatch(directToNextSTep({...newData, productCode}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}

export const confirmImageRetakeOpeningAccount = (data, allData) => (dispatch) => { // 1.1 part 1
  const base64 = result(data, 'base64', '');
  dispatch(NavigationActions.navigate({routeName: 'ConfirmationImageOpeningAccountPage', params: {data: base64, allData}}));
};

export function RetakeSelfieCamera (data, allData) { // 1.1 part 2
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const dataSA = result(state, 'allProductOpeningSA', []);
    const dataCC = result(state, 'allProductOpeningCC', []);
    const dataLOAN = result(state, 'loanAccounts', []);
    const productCode = result(data, 'productCode', '');
    let getAllproduct = [];
    if (productCode === 'CC') {
      getAllproduct = dataCC;
    } else if (productCode === 'SA') {
      getAllproduct = dataSA;
    } else {
      getAllproduct = dataLOAN;
    }

    const payload = {
      'requestData': {
        'cifCode': cifCode, 
        'photoBase64': data
      },
      'targetUrl': 'infoSigningDoc',
      'type': 'post'
    };
    dispatch(actionCreators.showSpinner());
    return api.sendDataProxyAccount(payload, dispatch).then((response) => {
      const newData = result(response, 'data.data', {});
      const alterNewData = map(getAllproduct, function (value) {
        let objectData = value;
        const orderId = result(data, 'orderId', ''); // id or orderId
        const firstDataId = result(value, 'orderId', '');
        if (firstDataId === orderId) {
          const newDataObject = omit(value, ['statusNew']);
          objectData = {statusNew: newData, ...newDataObject};
        }
        return objectData;
      });
      if (productCode === 'CC') {
        dispatch(actionCreators.saveOpeningAccountCC(alterNewData));
      } else if (productCode === 'SA') {
        dispatch(actionCreators.saveOpeningAccountSA(alterNewData));
      } else {
        dispatch(actionCreators.saveLoanAccounts(alterNewData));
      }

      dispatch(actionCreators.hideSpinner());
      dispatch(directToNextSTep({...newData, productCode}));
    }).catch(() => {
      dispatch(directToNextSTep(allData));
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function succesApplyProduct (checkRejectOrApproeved, dataSA, data, productCode) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const buttonYes = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      if (productCode === 'CC') {
        dispatch(NavigationActions.navigate({routeName: 'ApproveAplicationPage', params: {allData: {...data}, dataTemp: {...dataSA}}}));
      } else if (productCode === 'LOAN') {
        dispatch(NavigationActions.navigate({routeName: 'ApproveAplicationPage', params: {allData: {...data}}}));
      } else {
        dispatch(actionCreators.hideSinarmasAlert());
      }
    };
    const sinarmasModalOptionsApprove = {
      heading1: language.PRODUCT__SUCCESS_APPLY,
      text: productCode === 'SA' ? language.PRODUCT__SUCCESS_APPLYSAVING_TEXT : language.PRODUCT__SUCCESS_APPLY_TEXT,
      button1: productCode === 'SA' ? language.GENERIC__OK : language.PRODUCT__SUCCESS_BUTTON,
      onButton1Press: buttonYes,
      onClose: hideAlert
    };
    const sinarmasModalOptionsReject = {
      heading1: language.PRODUCT__REJECT,
      text: language.PRODUCT__REJECT_TEXT,
      button1: language.PRODUCT__REJECT_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert
    };
    const sinarmasModalOptions = checkRejectOrApproeved === '98' || checkRejectOrApproeved === '97' ? sinarmasModalOptionsReject : sinarmasModalOptionsApprove;
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function submitPPA (data) { // approve or reject
  return (dispatch, getState) => {
    const state = getState();
    const dataSA = result(state, 'allProductOpeningSA', []);
    const dataCC = result(state, 'allProductOpeningCC', []);
    const dataLOAN = result(state, 'loanAccounts', []);
    const cif = String(result(state, 'user.profile.customer.cifCode', ''));
    const getOrderNo = result(data, 'orderNo', ''); // id or orderId
    const productCode = result(data, 'productCode', '');
    let getAllproduct = [];
    if (productCode === 'CC') {
      getAllproduct = dataCC;
    } else if (productCode === 'SA') {
      getAllproduct = dataSA;
    } else {
      getAllproduct = dataLOAN;
    }
    const approveCode = result(data, 'approveCode', '');

    dispatch(actionCreators.showSpinner());
    const payload = {
      'requestData': {
        'cifCode': cif,
        'orderNo': getOrderNo,
        'productCode': productCode,
        'status': approveCode
      },
      'targetUrl': 'infoSigningDoc',
      'type': 'post'
    };
    return api.sendDataProxyAccount(payload, dispatch).then((response) => {
      const newData = result(response, 'data.data', {});
      const alterNewData = map(getAllproduct, function (value) {
        let objectData = value;
        const orderId = result(data, 'orderId', ''); // id or orderId
        const firstDataId = result(value, 'orderId', '');
        if (firstDataId === orderId) {
          const newDataObject = omit(value, ['statusNew']);
          objectData = {statusNew: newData, ...newDataObject};
        }
        return objectData;
      });
      if (productCode === 'CC') {
        dispatch(actionCreators.saveOpeningAccountCC(alterNewData));
      } else if (productCode === 'SA') {
        dispatch(actionCreators.saveOpeningAccountSA(alterNewData));
      } else {
        dispatch(actionCreators.saveLoanAccounts(alterNewData));
      }
      dispatch(actionCreators.hideSpinner());
      if (approveCode === '1') {
        let ipassport = '';
        const iPass = result(state, 'user.ipassport', '');
        encryptEFormString(iPass).then((res) => {
          ipassport = res;
          const url = getPPAUrl(ipassport, getOrderNo);

          dispatch(actionCreators.showSpinner());
          return Linking.openURL(url).then(() => {
            dispatch(actionCreators.hideSpinner());
          }).catch((err) => {
            Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
            dispatch(actionCreators.hideSpinner());
          });
        }).catch((err) => {
          Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        });
      }
      dispatch(directToNextSTep({...newData, productCode}));
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.APP_ERROR__TITLE), Toast.LONG);
    });
  };
}