import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {result, find} from 'lodash';
import {getErrorMessage} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {Toast} from '../../utils/RNHelpers.util.js';
import forEach from 'lodash/forEach';
import {
  populateConfigData,
  refreshStorageNew,
  inquirySimasPoin,
} from './common.thunks';
import {destroy} from 'redux-form';
import {initStoreWithTransactionDetails} from './onboarding.thunks';
import startsWith from 'lodash/startsWith';
import * as middlewareUtils from '../../utils/middleware.util';

export function getSeatLayout(scheduleData) {
  return dispatch => {
    const scheduleCode = result(scheduleData, 'scheduleCode');
    dispatch(actionCreators.showSpinner());
    return api
      .getSeatLayout({scheduleCode}, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const seatData = result(res, 'data', {});
        dispatch(
          NavigationActions.navigate({
            routeName: 'SelectSeat',
            params: {seatData, scheduleData},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__CGV_SEAT_LAYOUT),
          Toast.LONG,
        );
      });
  };
}

export function getCgvLogin(seatData) {
  return dispatch => {
    dispatch(NavigationActions.back());
    dispatch(
      NavigationActions.navigate({
        routeName: 'EmallLogin',
        params: {seatData, type: 'cgv'},
      }),
    );
  };
}

export function goCgv(emallData) {
  return (dispatch, getState) => {
    const state = getState();
    const seatData = result(emallData, 'seatData', {});
    const scheduleCode = result(seatData, 'scheduleData.scheduleCode', '');
    const totalAmount = result(seatData, 'totalAmount', '');
    const cinemaCode = result(seatData, 'scheduleData.cinemaCode', '');
    const secureCode = '01';
    let secureSeatList = [];
    forEach(seatData.paymentSeatInfoList, value => {
      secureSeatList = [...secureSeatList, value.seatLocationNumber];
    });
    const payload = {scheduleCode, cinemaCode, secureCode, secureSeatList};
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = state.user.profile.customer.cifCode;
    dispatch(refreshStorageNew());
    dispatch(inquirySimasPoin());
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
    return api
      .getSelectedSeat(payload, dispatch)
      .then(res => {
        const bookingCode = result(res, 'data.bookingCode', '');
        if (startsWith(cifCode, 'NK')) {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Landing'})],
            }),
          );
          dispatch(NavigationActions.back());
          dispatch(
            NavigationActions.navigate({
              routeName: 'EmallRoutes',
              params: {...emallData, bookingCode, totalAmount},
            }),
          );
        } else {
          if (
            accountList.length === 1 &&
            find(accountList, {accountType: 'emoneyAccount'})
          ) {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(NavigationActions.back());
            dispatch(
              NavigationActions.navigate({
                routeName: 'EmallRoutes',
                params: {...emallData, bookingCode, totalAmount},
              }),
            );
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
              }),
            );
            dispatch(NavigationActions.back());
            dispatch(
              NavigationActions.navigate({
                routeName: 'EmallRoutes',
                params: {...emallData, bookingCode, totalAmount},
              }),
            );
          }
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__CGV_SELECTED_SEAT),
          Toast.LONG,
        );
      });
  };
}

export function goCgvConfirm(accData, emallData) {
  return dispatch => {
    const seatData = result(emallData, 'seatData', {});
    const availBlc = result(accData, 'balances.availableBalance', '');
    const availBalance = parseInt(availBlc);
    const totalAmount = result(seatData, 'totalAmount', '');
    if (availBalance > totalAmount) {
      dispatch(
        NavigationActions.navigate({
          routeName: 'EmallCgv',
          params: {accData, emallData},
        }),
      );
    } else {
      Toast.show(language.CGV__TOAST_BALANCE, Toast.LONG);
    }
  };
}

export function goCgvConfirmSimas(isUseSimas, emallData) {
  return (dispatch, getState) => {
    const state = getState();
    const simasPoin = result(state, 'simasPoin', {});
    const availBlc = result(simasPoin, 'simasPoin.data.total_point', '');
    const availBalance = parseInt(availBlc);
    const totalAmount = result(emallData, 'seatData.totalAmount', '');
    if (availBalance > totalAmount) {
      dispatch(
        NavigationActions.navigate({
          routeName: 'EmallCgv',
          params: {isUseSimas, emallData},
        }),
      );
    } else {
      Toast.show(language.CGV__TOAST_BALANCE, Toast.LONG);
    }
  };
}

export function getConfirmInfo(navData, seatData) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'EmallCgvInfo',
        params: {navData, seatData},
      }),
    );
  };
}

export function getCgvResult(navData, seatData, isUseSimas) {
  return (dispatch, getState) => {
    const onSubmit = () => {
      const newState = getState();
      const easyPin = result(
        newState,
        'form.AuthenticateForm.values.easypin',
        '',
      );
      const transRefNum = result(newState, 'transRefNum', '');
      const isDebetFromSimasPoin = isUseSimas === 'yes';
      const accountFrom = isDebetFromSimasPoin
        ? ''
        : result(navData, 'id', '').toString();
      const amount = result(seatData, 'seatData.totalAmount', '').toString();
      const cinemaCode = result(
        seatData,
        'seatData.scheduleData.cinemaCode',
        '',
      );
      const bookingCode = result(seatData, 'bookingCode', '');
      const scheduleCode = result(
        seatData,
        'seatData.scheduleData.scheduleCode',
        0,
      );
      const locData = result(seatData, 'seatData.paymentSeatInfoList', []);
      const priceData = result(seatData, 'seatData.priceData', []);
      const cinemaName = result(
        seatData,
        'seatData.scheduleData.cinemaName',
        '',
      );
      const movieName = result(seatData, 'seatData.scheduleData.movieName', '');
      const showDate = result(seatData, 'seatData.scheduleData.showDate', '');
      const startTime = result(
        seatData,
        'seatData.scheduleData.showStartTime',
        '',
      );
      const showStartTime =
        startTime === ''
          ? ''
          : startTime.substring(0, 2) + ':' + startTime.substring(2, 4);
      const infoLength = seatData.seatData.paymentSeatInfoList.length;
      let rowSeat = [];
      let i = 0;
      forEach(seatData.seatData.paymentSeatInfoList, value => {
        i++;
        if (i !== infoLength) {
          rowSeat = [...rowSeat, value.rowName + value.seatNumber + ', '];
        } else {
          rowSeat = [...rowSeat, value.rowName + value.seatNumber];
        }
      });
      let paymentSeatInfoList = [];
      forEach(priceData, value => {
        forEach(locData, val => {
          if (value.seatGradeCode === val.seatGradeCode) {
            paymentSeatInfoList = [
              ...paymentSeatInfoList,
              {
                seatLocationNumber: String(val.seatLocationNumber),
                seatGradeCode: value.seatGradeCode,
                standardPrice: String(value.standardPrice),
                salesPrice: String(value.salesPrice),
                ticketIssueAmount: String(value.ticketIssueAmount),
                showingAmount: String(value.showingAmount),
                serviceAmount: String(value.serviceAmount),
              },
            ];
          }
        });
      });
      const additional = [
        'TXID',
        'sessionCode',
        'E2EE_RANDOM',
        'tokenClient',
        'tokenServer',
        'deviceParam',
        'lang',
        'ipassport',
        'OBMParameter',
      ];
      const payload = {
        transRefNum,
        easyPin,
        accountFrom,
        amount,
        cinemaCode,
        bookingCode,
        scheduleCode,
        paymentSeatInfoList,
        isDebetFromSimasPoin,
        cinemaName,
        movieName,
        showDate,
        showStartTime,
        rowSeat,
      };
      dispatch(actionCreators.showSpinner());
      return api
        .getPaymentCinema(payload, additional, dispatch)
        .then(res => {
          dispatch(actionCreators.hideSpinner());
          const resData = result(res, 'data', {});
          const successData = 'success';
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'HomeScreen'}),
                NavigationActions.navigate({
                  routeName: 'EmallCgvStatus',
                  params: {navData, seatData, resData, successData, isUseSimas},
                }),
              ],
            }),
          );
        })
        .catch(err => {
          const resData = result(err, 'data', {});
          const successData = 'failed';
          dispatch(actionCreators.hideSpinner());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'HomeScreen'}),
                NavigationActions.navigate({
                  routeName: 'EmallCgvStatus',
                  params: {navData, seatData, resData, successData, isUseSimas},
                }),
              ],
            }),
          );
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
      .then(res => {
        dispatch(actionCreators.saveTransRefNum(res.data.transRefNum));
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'EmallEasyPin',
            params: {isEasypin: true, onSubmit},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
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

export function getCgvComplete() {
  // -4
  return dispatch => {
    dispatch(actionCreators.clearTransRefNum());
    dispatch(prepareGoDashboardCgv());
  };
}

export function prepareGoDashboardCgv() {
  // go to
  return (dispatch, getState) => {
    const state = getState();
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = state.user.profile.customer.cifCode;
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (startsWith(cifCode, 'NK')) {
      dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
      dispatch(NavigationActions.navigate({routeName: 'Shops'}));
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
        dispatch(NavigationActions.navigate({routeName: 'Shops'}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'Main'}));
        dispatch(NavigationActions.navigate({routeName: 'Shops'}));
      }
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}
