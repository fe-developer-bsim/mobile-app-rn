import api from '../../utils/api.util';
import {getErrorMessage} from '../../utils/transformer.util';
import result from 'lodash/result';
import {formatFieldAmount, lowerCase} from '../../utils/transformer.util';
import {StackActions, NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy} from 'redux-form';
import {language} from '../../config/language';
import {storageKeys, set, getPopUpPayday, getPaydayLoanRedeem} from '../../utils/storage.util';
import * as actionCreators from '../actions/index.actions.js';
import moment from 'moment';
import {getDatiForPL, preparePaydayLoanDisburse} from '../../utils/middleware.util';
import sortBy from 'lodash/sortBy';

export function paydayPopupOffer (uriImg, monthOffer, plafond) {
  return (dispatch) => {
    let checked = false;
    const hideAlert = () => {
      set(storageKeys['PAYDAYPOPUPOFFER'], {dontShow: checked, monthId: monthOffer});
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goToPayDayLoanForm = () => {
      dispatch(NavigationActions.navigate({routeName: 'AboutPaydayLoan'}));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const checkboxChange = (res) => {
      checked = !res;
    };
    const uriImage = uriImg;
    getPopUpPayday().then((res) => {
      getPaydayLoanRedeem().then((response) => {
        if (((result(res, 'monthId', '') !== monthOffer) || !(result(res, 'dontShow', true))) && (result(response, 'monthRedeem', '') !== monthOffer)) {
          set(storageKeys['PAYDAYPOPUPOFFER'], {dontShow: false});
          const modalOptions = {
            button1: language.PAYDAY_LOAN__ONBOARDING__NO,
            button1Color: 'black',
            button2: language.PAYDAY_LOAN__ONBOARDING__GET,
            onButton1Press: hideAlert,
            onButton2Press: goToPayDayLoanForm,
            closeOnTouchOutside: false,
            checkboxChange,
            onClose: hideAlert,
            checkboxPosition: 'TOP',
            checkboxLabel: language.LANDING__DONT_SHOW_AGAIN_PAYDAYLOAN,
            text1: language.PAYDAY_LOAN__ONBOARDING__TEXT1,
            text2: `${language.DASHBOARD__ACCOUNT_IDR} ${plafond}`,
            text3: language.PAYDAY_LOAN__ONBOARDING__TEXT3,
          };
          dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'WARNING', uriImage}));
        }
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
      });
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
    });
  };
}

export function getPayday () {
  return (dispatch, getState) => {
    const state = getState();
    const cif = {
      'cif': result(state, 'user.profile.customer.cifCode', '')
    };
    const serverTime = result(state, 'timeConfig.serverTime', '');
    const monthServer = serverTime.substring(5, 7);
    api.getPaydayLoan(dispatch, cif).then((res) => {
      const responseCode = result(res, 'data.responseCode', '');
      const eligible = lowerCase(result(res, 'data.data.eligible_status', 'no'));
      const monthOffer = monthServer;
      dispatch(actionCreators.setPaydayLoanConfig(result(res, 'data', {})));
      let urlImg = result(res, 'data.imagePayDayLoan', '');
      const plafond = formatFieldAmount(result(res, 'data.data.plafond', ''));
      if (responseCode === '00') {
        if (urlImg) {
          eligible === 'yes' ? dispatch(paydayPopupOffer(urlImg, monthOffer, plafond)) : null;
        }
      }
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__GET_DATA));
    });
  };
}

export function getPayLoanDataForm () {
  return (dispatch, getState) => {
    const state = getState();
    const plafond = result(state, 'paydayLoan.data.plafond', '');
    const cif = {
      'cif': result(state, 'user.profile.customer.cifCode', '')
    };
    dispatch(actionCreators.showSpinner());
    return api.getPaydayLoanData(cif, dispatch).
      then((response) => {
        const data = result(response, 'data', {});
        const configPostal = result(data, 'config.root.row', []);
        const selected = sortBy(getDatiForPL(configPostal), ['DESC2']);
        const skipDataEntry = result(state, 'paydayLoan.data.skip_data_entry', '');
        dispatch(actionCreators.setPaydayLoanDataConfig(data));
        if (skipDataEntry === 'no') {
          dispatch(NavigationActions.navigate({routeName: 'PayDayLoanIndex', params: {data: data, configPostal: selected, checkForm: 'yes', plafond: plafond}}));
          dispatch(actionCreators.hideSpinner());
        } else {
          dispatch(NavigationActions.navigate({routeName: 'PayDayLoanIndex', params: {data: data, configPostal: selected, checkForm: 'no', plafond: plafond}}));
          dispatch(actionCreators.hideSpinner());
        }
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_GET_DATA_PAYDAYLOAN_CONFIG), Toast.LONG);
      });
  };
}

export function paydayLoanDisburse (values) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = state.transRefNum;
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const paydayLoanData = result(state, 'paydayLoanData.data', {});
    const amountLoan = result(values, 'amountLoan', '');
    const loan_amount = amountLoan ? amountLoan : result(values, 'paydayLoanForm.amountPayloan', '');
    const no_hp = result(state, 'paydayLoanData.data.nomor_telepon_genggam', '');
    const alamatForm = result(values, 'values.city.DESC1', '');
    const dati2 = alamatForm ? alamatForm : result(paydayLoanData, 'dati2', '');
    const kodePos = result(values, 'values.postalCode', '');
    const kode_pos = kodePos ? kodePos : result(paydayLoanData, 'kode_pos', '');
    const alamat_email = result(values, 'values.email', '');
    const npwpForm = result(values, 'values.npwp', '');
    const npwp = npwpForm ? npwpForm : result(paydayLoanData, 'npwp', '');
    const date = result(state, 'config.serverTime', '');
    const tanggal_pengajuan = moment(date).format('YYYYMMDD');
    const tanggal_cair = moment(date).format('YYYYMMDD');
    const account_no = result(state, 'paydayLoanData.data.nomor_rek_payroll', '');
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(state, 'form.AuthenticateForm.values.simasToken', '');
    const payload = {no_ref: transRefNum, tanggal_pengajuan: tanggal_pengajuan, tanggal_cair: tanggal_cair, cif: cif, account_no: account_no, loan_amount: loan_amount, email: alamat_email, no_hp: no_hp, customer_data: {...paydayLoanData, kode_pos, dati2, alamat_email, npwp}};
    const disburse = preparePaydayLoanDisburse(transRefNum, easyPin, smsOtp, simasToken, payload);
    dispatch(actionCreators.showSpinner());
    return api.sendPaydayLoanForm(disburse, dispatch).
      then(() => {
        const serverTime = result(state, 'config.serverTime', '');
        const timeRedeemLoan = serverTime.substring(5, 7);
        set(storageKeys['PAYDAYLOANREDEEM'], {monthRedeem: timeRedeemLoan});
        dispatch(StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'HomeScreen'}),
            NavigationActions.navigate({routeName: 'FinalizePaydayLoan'})
          ]
        }));
        dispatch(destroy('PaydayLoanFormFill'));
        dispatch(destroy('ConfirmPaydayLoan'));
        dispatch(destroy('PaydayLoanIndexForm'));
        dispatch(destroy('AboutPaydayLoan'));
        dispatch(destroy('PaydayLoanForm'));
        dispatch(actionCreators.hideSpinner());
      }).
      catch(() => {
        dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'ErrorPagePayday', params: {isPaydayLoan: 'true'}})
          ]
        }));
        dispatch(destroy('PaydayLoanFormFill'));
        dispatch(destroy('ConfirmPaydayLoan'));
        dispatch(destroy('PaydayLoanIndexForm'));
        dispatch(destroy('AboutPaydayLoan'));
        dispatch(destroy('PaydayLoanForm'));
        dispatch(actionCreators.hideSpinner());
      });
  };
}
