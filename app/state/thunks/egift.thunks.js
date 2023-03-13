import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import remove from 'lodash/remove';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import sumBy from 'lodash/sumBy';
import isEmpty from 'lodash/isEmpty';
import {getErrorMessage} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {destroy, reset} from 'redux-form';
import fill from 'lodash/fill';
import {language} from '../../config/language';
import {Toast} from '../../utils/RNHelpers.util.js';
import * as middlewareUtils from '../../utils/middleware.util';
import {
  populateConfigData,
  inquirySimasPoin,
  popUpRewardMgm,
} from './common.thunks';
import {
  randomString,
  OBM_EncryptPassword,
  OBM_GetEncodingParameter,
  OBM_GetEncryptedPassword,
} from '../../utils/vendor/pinEncryption.util';
import {logout, login} from './onboarding.thunks.js';
import lowerCase from 'lodash/lowerCase';

export function goToCart(product, quantity) {
  return (dispatch, getState) => {
    const state = getState();
    const cartItems = result(state, 'egiftCart', []);
    const newList = filter(
      cartItems,
      items => items.egiftId !== product.egiftId,
    );
    const products = fill(Array(quantity), product);
    if (result(state, 'simasPoin.status', '') !== 'success') {
      dispatch(inquirySimasPoin());
    }
    dispatch(actionCreators.updateEgiftCart([...newList, ...products]));
    dispatch(NavigationActions.navigate({routeName: 'EgiftCart'}));
  };
}

export function addToCart(product) {
  return dispatch => {
    dispatch(actionCreators.addEgiftCart([product]));
  };
}

export function minusToCart(product) {
  return (dispatch, getState) => {
    const state = getState();
    const cartItems = result(state, 'egiftCart', []);
    const removedList = remove(cartItems, {egiftId: product.egiftId}).slice(
      0,
      -1,
    );
    dispatch(actionCreators.updateEgiftCart([...cartItems, ...removedList]));
  };
}

export function dropFromCart(product) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const deleteProduct = () => {
      const state = getState();
      const cartItems = result(state, 'egiftCart', []);
      const newList = filter(
        cartItems,
        items => items.egiftId !== product.egiftId,
      );
      dispatch(actionCreators.updateEgiftCart(newList));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const productName = result(product, 'itemName', '');
    const sinarmasModalOptions = {
      heading1: language.EGIFT__CART_DELETE_HEADER,
      text: productName,
      button1: language.EGIFT__CART_CANCEL_BUTTON,
      onButton1Press: hideAlert,
      button2: language.EGIFT__CART_DELETE_BUTTON,
      onButton2Press: deleteProduct,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function goToLanding() {
  return dispatch => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
  };
}

export function goToLogin() {
  return (dispatch, getState) => {
    const isLogin = !isEmpty(result(getState(), 'user', {}));
    if (!isLogin) {
      dispatch(silentLoginEgift());
    }
    dispatch(NavigationActions.navigate({routeName: 'EgiftConfirm'}));
  };
}

export function goToPayment() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'Egift'}));
  };
}

export function getEmail() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'EgiftPayment'}));
  };
}

export function goToConfirmation() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'EgiftConfirmation'}));
  };
}

export function goToEasyPin() {
  return (dispatch, getState) => {
    const state = getState();
    const email = result(state, 'form.EgiftPaymentForm.values.email', '');
    const isLogin = !isEmpty(result(state, 'user', {}));
    const onSubmit = () => {
      const newState = getState();
      let easyPin = result(
        newState,
        'form.AuthenticateForm.values.easypin',
        '',
      );
      const transRefNum = result(newState, 'transRefNum', '');
      const cartItems = result(state, 'egiftCart', []);
      const groupedTransactions = groupBy(cartItems, 'programId');
      const name = result(state, 'simasPoin.fullName', '');
      let purchaseList = [];
      const total = sumBy(cartItems, 'value');
      forEach(groupedTransactions, item => {
        const detail = {
          agregatorCode: item[0].agregatorCode,
          program_id: item[0].programId,
          priceGift: item[0].value,
          itemName: item[0].itemName,
          quantity: item.length,
          urlImage: item[0].image,
          agregatorName: item[0].agregatorName,
        };
        purchaseList = [...purchaseList, detail];
      });
      const randomNumber = randomString(16);
      OBM_EncryptPassword(easyPin, randomNumber);
      if (easyPin) {
        easyPin =
          'encryptedPassword:' +
          OBM_GetEncryptedPassword() +
          '|encodingParameter:' +
          OBM_GetEncodingParameter() +
          '|randomNumber:' +
          randomNumber;
      }
      const flagMgm = result(state, 'config.hideNotifMGM', '');
      const flagMgmOn = lowerCase(flagMgm) === 'yes';
      const payload = {
        pushToken: '123456',
        clientCheck: 'WEB_BROWSER',
        purchaseList,
        redeemPoin: total,
        email,
        easyPin,
        alreadyLogin: isLogin,
        transRefNum,
      };
      const additional = [
        'TXID',
        'sessionCode',
        'E2EE_RANDOM',
        'tokenClient',
        'tokenServer',
        'deviceParam',
        'lang',
        'ipassport',
      ];
      dispatch(actionCreators.showSpinner());
      return api
        .purchaseEgift(payload, additional, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          const isbfrEgift = !isLogin ? true : '';
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({routeName: 'EgiftPaymentStatus'}),
              ],
            }),
          );
          if (!flagMgmOn) {
            dispatch(popUpRewardMgm());
          }
          const paymentStatusData = {
            status: 'SUCCESS',
            resultData: res.data,
            name,
            transRefNum,
            isbfrEgift,
          };
          dispatch(actionCreators.updatePaymentStatus({...paymentStatusData}));
          dispatch(destroy('EgiftPaymentForm'));
          dispatch(actionCreators.clearEgiftCart());
          dispatch(actionCreators.clearTransRefNum());
        })
        .catch(err => {
          const isbfrEgift = !isLogin ? true : '';
          const easyPinAttempt = result(err, 'data.easypinAttempt', '');
          if (easyPinAttempt === 'invalid') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
          } else if (easyPinAttempt === 'blocked') {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.clearTransRefNum());
            Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
            dispatch(logout());
          } else if (easyPinAttempt === 'errHsm') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({routeName: 'EgiftPaymentStatus'}),
                ],
              }),
            );
            if (!flagMgmOn) {
              dispatch(popUpRewardMgm());
            }
            const errorText = getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
            );
            const paymentStatusData = {
              status: 'FAILED',
              name,
              errorText,
              isbfrEgift,
            };
            dispatch(
              actionCreators.updatePaymentStatus({...paymentStatusData}),
            );
            dispatch(destroy('EgiftPaymentForm'));
            dispatch(actionCreators.clearEgiftCart());
            dispatch(actionCreators.clearTransRefNum());
          }
        });
    };
    dispatch(populateConfigData())
      .then(() => {
        const payload = middlewareUtils.prepateTransRefNumPayload(
          'eCommerce',
          false,
        );
        dispatch(actionCreators.showSpinner());
        return api.getTransRefNum({...payload, smsPriority: false}, dispatch);
      })
      .then(response => {
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'EgiftEasyPin',
            params: {isEasypin: true, onSubmit},
          }),
        );
      })
      .catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION,
          ),
          Toast.LONG,
        );
      });
  };
}

export function silentLoginEgift() {
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
