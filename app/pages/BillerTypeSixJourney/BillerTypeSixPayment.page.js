import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeSixPayment from '../../components/BillerTypeSixJourney/BillerTypeSixPayment.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateBalance, validatePackageCode, validateMaxAmount} from '../../utils/validator.util';
import {getAccountAmount, generateDenomination, getFilteredBillerData, formatMobileNumberEmoney, getTransactionType} from '../../utils/transformer.util';
import {isEmpty, result, filter, find, forEach, clone, uniq, toLower} from 'lodash';
import {confirmGenericBillTypeSix, detailGenericBillTypeSix, silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import {NavigationActions} from 'react-navigation';
import {moreInfoBL} from '../../state/thunks/common.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import split from 'lodash/split';
import * as actionCreators from '../../state/actions/index.actions.js';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeSixPayment',
  destroyOnUnmount: false,
  validate: (values, {biller, isLogin}) => {
    const errors = validateRequiredFields(values, ['accountNo', 'amount', 'denomination', 'packageCode', 'date']);
    if (values.accountNo.balances && isLogin) {
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      const transactionAmount = values.denomination ? values.denomination.id :  values.amount || '';

      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    if (values.packageCode) {
      errors['packageCode'] = validatePackageCode(values.packageCode.id);
    }
    if (result(biller, 'billerPreferences.isPrepaidOpenAmount')) {
      errors['amount'] = validateMaxAmount(values.amount);
    }
    return errors;
  },
  onSubmit: (values, dispatch, {subscriberNo, biller, isLogin, history, billerCodeNewNeedOTP, isUseSimas, tokenConfig, checked, isADebit}) => {
    const listLastHistory = result(history, 'savedBillPaymentList', []);
    const isNewSubs = isEmpty(find(listLastHistory, (trx) => formatMobileNumberEmoney(subscriberNo) === formatMobileNumberEmoney(trx.subscriberNo)));
    const isOwnAccount = false;
    const shouldSendSmsOtp = getTransactionType(values.amount, tokenConfig, isOwnAccount) === '0';
    const billerCode = result(biller, 'billerPreferences.code', '');
    const billerOtp =  split(billerCodeNewNeedOTP, ',');
    const autoDebitDate = result(values, 'date.value', '');
    if ((checked || isADebit) && !isEmpty(autoDebitDate)) {
      dispatch(actionCreators.saveFlagAutodebit({date: autoDebitDate, isRegular: checked || isADebit}));
    }
    let isBillpayOtp = false;
    forEach(billerOtp, (value) => {
      if (billerCode === value) {
        isBillpayOtp = true;
      }
    });
    let sendSmsOtpNewBiller = false;
    if (isBillpayOtp === true && isNewSubs === true) {
      sendSmsOtpNewBiller = true;
    } else {
      sendSmsOtpNewBiller = false;
    }
    const detailGenericBillTypeSixFunc = () => {
      dispatch(detailGenericBillTypeSix({subscriberNo, values, biller, isNewSubs, billerCodeNewNeedOTP, isUseSimas, autoDebitDate}));
    };
    if (isLogin) {
      dispatch(confirmGenericBillTypeSix({subscriberNo, values, biller, isUseSimas, autoDebitDate}));
    } else {
      if (shouldSendSmsOtp === false && sendSmsOtpNewBiller === false) {
        dispatch(silentLoginBillpay(detailGenericBillTypeSixFunc));
      } else {
        if (!isLogin) {
          dispatch(silentLoginBillpay(detailGenericBillTypeSixFunc));
        } else {
          detailGenericBillTypeSixFunc();
        }
      }
    }
  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.BillerTypeSixPayment.values', {}),
  billerCodeLink: result(state, 'deepLinkbillerCode', ''),
  paramsDeeplink: result(state, 'paramsDeeplink', []),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  billpayHistory: result(state, 'billpayHistory', []),
  billerCodeNewNeedOTP: result(state, 'config.billerCodeNewNeedOTP', ''),
  tokenConfig: result(state, 'config.tokenConfig', []),
  billerBlacklist: result(state, 'config.blacklistMerchantCC', ''),
  isAutoSwitchToogle: result(state, 'primaryToogleAccount', false),
  switchAccountToogleBE: toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active',
  isAutoDebit: result(state, 'flagAutoDebit'),
});
const mapDispatchToProps = (dispatch) => ({
  moreInfoBL: (data) => {
    dispatch(moreInfoBL(data));
  },
  setAmount: (name, amount) => {
    dispatch(change('BillerTypeSixPayment', name, amount));
  },
  billerAccountWithCC: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeSixPayment', fieldName: 'accountNo', sourceType: 'genericBillerWithCC'}})),
  billerAccount: (billerCode) => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeSixPayment', fieldName: 'accountNo', sourceType: 'genericBiller', billerCode}})),
  // billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeSixPayment', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  // billerAccountWithCC: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeSixPayment', fieldName: 'accountNo', sourceType: 'genericBillerWithCC'}})),
  autoSelectionLinkDenom: (subscriberNo) => {
    dispatch(change('BillerTypeSixPayment', 'denomination', subscriberNo));
  },
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('BillerTypeSixPayment', 'accountNo', defaultAccount));
  },
  dispatch: (data) => dispatch(data),
  clearAutodebitCheck: () => {
    dispatch(actionCreators.clearFlagAutodebit());
  },
  clearAutodebitDate: () => {
    dispatch(change('BillerTypeSixPayment', 'date', ''));
  },
});

const DecoratedForm = reduxForm(formConfig)(BillerTypeSixPayment);

class BillerTypeSixPaymentPage extends React.Component {
  static propTypes = {
    updateAccounts: PropTypes.func,
    setAmount: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    billerAccount: PropTypes.func,
    billerAccountWithCC: PropTypes.func,
    autoSelectionLinkDenom: PropTypes.func,
    billerCodeLink: PropTypes.string,
    paramsDeeplink: PropTypes.array,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    setDefaultAccount: PropTypes.func,
    moreInfoBL: PropTypes.func,
    billerConfig: PropTypes.object,
    billpayHistory: PropTypes.func,
    billerCodeNewNeedOTP: PropTypes.string,
    tokenConfig: PropTypes.array,
    billerBlacklist: PropTypes.string,
    isAutoSwitchToogle: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    dispatch: PropTypes.func,
    showAlert: PropTypes.func,
    isAutoDebit: PropTypes.object,
    setAsAutodebit: PropTypes.func,
    clearAutodebitCheck: PropTypes.func,
    clearAutodebitDate: PropTypes.func,
  };

  state = {
    displayList: {},
    checked: false,
    hidden: true,
    disable: false
  }

  toogleCheckbox = (checked) => {
    const {dispatch, isAutoDebit, clearAutodebitDate, clearAutodebitCheck} = this.props;
    this.setState({checked: checked, hidden: !checked, disable: checked});
    const isADebit = result(isAutoDebit, 'isAddNew');
    if (!isADebit) {
      dispatch(actionCreators.saveFlagAutodebit({isRegular: checked}));
      if (checked === false) {
        clearAutodebitDate();
        clearAutodebitCheck();
      }
    }
  }

  componentDidMount () {
    const {navigation, setAmount, autoSelectionLinkDenom, billerCodeLink, paramsDeeplink, setDefaultAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, isAutoDebit, clearAutodebitCheck, dispatch} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const existBiller = result(navParams, 'biller', {});
    const denomBiller = result(existBiller, 'denomList', []);
    const favBiller = result(navParams, 'favBiller', {});
    const amount = result(favBiller, 'amount', '');
    const favAmount = amount === null ? '' : amount.toString();
    const filterDenom = filter(denomBiller, {'id': favAmount})[0];
    const isADebit = result(isAutoDebit, 'isAddNew', false);
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', 'NONE');
    if (!isADebit) {
      clearAutodebitCheck();
    } else {
      if (autoDebitEnabled === 'NONE') {
        dispatch(actionCreators.saveFlagAutodebit({isRegular: false}));
      }
    }
    setAmount('denomination', filterDenom);
    setAmount('amount', favAmount);
    if (!isEmpty(billerCodeLink) && !isEmpty(paramsDeeplink)) {
      const denomLinkRaw = find(paramsDeeplink, function (o) {
        return o.keyId === 'denom';
      });
      const denomLink = result(denomLinkRaw, 'valueId', '');
      const denomChoice = find(generateDenomination(existBiller), function (o) {
        return o.id === denomLink;
      });
      autoSelectionLinkDenom(denomChoice);
    }
    !isLogin && isAutoSwitchToogle && switchAccountToogleBE && setDefaultAccount(defaultAccount);
    // const code = result(navParams, 'biller.billerPreferences.code', '');
    // const billCode = code.concat('-2');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
  }
  getHistory = () => {
    const {navigation = {}, billerConfig, billpayHistory} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const savedBillPaymentList = result(billpayHistory, 'savedBillPaymentList', []);
    let history = {};
    history = clone(billpayHistory);
    if (isEmpty(biller)) {
      const billers = getFilteredBillerData(billerConfig, 'TOPUP');
      let historyTopup = [];
      forEach(billers, (biller) => {
        const billPaymentList = filter(savedBillPaymentList, (historyItem) => historyItem.billerId === biller.id);
        historyTopup = uniq([...historyTopup, ...billPaymentList]);
      });
      return history;
    } else {
      const newBillPaymentList = filter(savedBillPaymentList, (historyItem) => historyItem.billerId === biller.id);
      history.savedBillPaymentList = newBillPaymentList;
      return history;
    }
  }

  selectSof  = () => {
    const {navigation, billerAccount} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const billerCode = result(navParams, 'biller.billerPreferences.code', '');
    billerAccount(billerCode);
  }

  render () {
    const {accounts = [], formValues = {}, navigation, billerAccount, moreInfoBL, defaultAccount, isLogin, billerCodeNewNeedOTP, tokenConfig, isAutoSwitchToogle, switchAccountToogleBE, billerAccountWithCC, billerBlacklist, isAutoDebit, ...extraProps} = this.props;
    const navParams = navigation.state.params;
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', false);
    const showInquiry = result(this.props, 'navigation.state.params.biller.billerInqMenu', false);
    const disabled = isEmpty(result(formValues, 'accountNo', {}));
    const errors = [];
    const balances = isAutoSwitchToogle ? '' : result(formValues, 'accountNo.balances', '');
    const packageCode = result(formValues, 'packageCode', {});
    const packageCodeId = result(formValues, 'packageCode.id', '');
    const denomination = result(formValues, 'denomination', '');
    const denominationId = result(formValues, 'denomination.id', '');
    const denominationFilter = result(formValues, 'denomination.filter', '');
    const denomValue = !isEmpty(denominationFilter) ? denominationFilter : denominationId;
    const amount = result(formValues, 'amount', '');
    const billerCode = result(navParams, 'biller.billerPreferences.code', '');
    const isBillerBlacklisted = billerBlacklist.includes(billerCode) ? true : 'false';
    const history = this.getHistory();
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', '');
    const isADebit = result(isAutoDebit, 'isAddNew');
    if (balances) {
      const selectedAccountBalance = getAccountAmount(formValues.accountNo);
      const transactionAmount = denomination ? denomValue :  amount || '';
      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    if (packageCode) {
      errors['packageCode'] = validatePackageCode(packageCodeId);
    }
    if (result(navParams.biller, 'billerPreferences.isPrepaidOpenAmount')) {
      errors['amount'] = validateRequiredFields(formValues, ['amount']);
    }
    return <DecoratedForm {...navParams} displayList={this.state.displayList}
      showInquiry={showInquiry} formValues={formValues} accounts={accounts}
      disabled={disabled} errors={errors} isUseSimas={isUseSimas}
      billerAccount={billerAccount} selectSof={this.selectSof} defaultAccount={defaultAccount} moreInfoBL={moreInfoBL} billerAccountWithCC={billerAccountWithCC} billerBlacklist={billerBlacklist} isBillerBlacklisted={isBillerBlacklisted}
      isLogin={isLogin} {...extraProps} history={history} billerCodeNewNeedOTP={billerCodeNewNeedOTP} tokenConfig={tokenConfig} isAutoSwitchToogle={isAutoSwitchToogle} switchAccountToogleBE={switchAccountToogleBE}
      checked={this.state.checked} hidden={this.state.hidden} toogleCheckbox={this.toogleCheckbox}
      isAutoDebit={isAutoDebit} autoDebitEnabled={autoDebitEnabled} isADebit={isADebit}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeSixPaymentPage);
