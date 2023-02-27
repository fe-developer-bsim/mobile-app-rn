import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeOnePayment from '../../components/BillerTypeOneJourney/BillerTypeOnePayment.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateBalance, validateRequiredFields} from '../../utils/validator.util';
import {getAccountAmount} from '../../utils/transformer.util';
import {noop, isEmpty, result, toLower} from 'lodash';
import {confirmGenericBillTypeOne, detailGenericBillTypeOne, silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import {NavigationActions} from 'react-navigation';
import {moreInfoBL} from '../../state/thunks/common.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import * as actionCreators from '../../state/actions/index.actions.js';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeOnePayment',
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = validateRequiredFields(values, ['date']);
    return errors;
  },
  onSubmit: (values, dispatch, {subscriberNo, biller, billDetails, isLogin, isUseSimas, checked, isADebit}) => {
    const autoDebitDate = result(values, 'date.value', '');
    const typeVA = result(billDetails, 'vaInputMode', '');
    const uniqueCode = result(billDetails, 'uniqueCode', '');
    if ((checked || isADebit) && !isEmpty(autoDebitDate)) {
      dispatch(actionCreators.saveFlagAutodebit({date: autoDebitDate, isRegular: checked || isADebit}));
    }
    const detailGenericBillTypeOneFunc = () => {
      dispatch(detailGenericBillTypeOne({subscriberNo, values, biller, typeVA, uniqueCode, isUseSimas, autoDebitDate}));
    };
    if (isLogin) {
      dispatch(confirmGenericBillTypeOne({subscriberNo, values, biller, typeVA, isUseSimas, autoDebitDate}));
    } else {
      dispatch(silentLoginBillpay(detailGenericBillTypeOneFunc));
    }
  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.BillerTypeOnePayment.values', {}),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
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
    dispatch(change('BillerTypeOnePayment', name, amount));
  },
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeOnePayment', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  billerAccountWithCC: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeOnePayment', fieldName: 'accountNo', sourceType: 'genericBillerWithCC'}})),
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('BillerTypeOnePayment', 'accountNo', defaultAccount));
  },
  dispatch: (data) => dispatch(data),
  clearAutodebitCheck: () => {
    dispatch(actionCreators.clearFlagAutodebit());
  },
  clearAutodebitDate: () => {
    dispatch(change('BillerTypeOnePayment', 'date', ''));
  },
});

const DecoratedForm = reduxForm(formConfig)(BillerTypeOnePayment);

class BillerTypeOnePaymentPage extends React.Component {
  static propTypes = {
    updateAccounts: PropTypes.func,
    setAmount: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    billerAccount: PropTypes.func,
    billerAccountWithCC: PropTypes.func,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    setDefaultAccount: PropTypes.func,
    moreInfoBL: PropTypes.func,
    billerBlacklist: PropTypes.string,
    isAutoSwitchToogle: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    dispatch: PropTypes.func,
    showAlert: PropTypes.func,
    isAutoDebit: PropTypes.string,
    setAsAutodebit: PropTypes.func,
    clearAutodebitCheck: PropTypes.func,
    clearAutodebitDate: PropTypes.func,
  };

  state = {
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
    const {navigation, setAmount = noop, setDefaultAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, isAutoDebit, clearAutodebitCheck, dispatch} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const isADebit = result(isAutoDebit, 'isAddNew', false);
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', 'NONE');
    if (!isADebit) {
      clearAutodebitCheck();
    } else {
      if (autoDebitEnabled === 'NONE') {
        dispatch(actionCreators.saveFlagAutodebit({isRegular: false}));
      }
    }
    if (result(navParams, 'billDetails.vaInputMode') === 'MINIMUM') {
      setAmount('amount', result(navParams, 'billDetails.billAmount', 0));
    } else {
      setAmount('amount', 0);
    }

    if (result(navParams, 'billDetails.vaInputMode') === 'OPEN') {
      setAmount('billAmount', 0);
    } else {
      setAmount('billAmount', result(navParams, 'billDetails.billAmount', 0));
    }

    !isLogin && isAutoSwitchToogle && switchAccountToogleBE && setDefaultAccount(defaultAccount);
    // const code = result(navParams, 'biller.billerPreferences.code', '');
    // const billCode = code.concat('-2');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
  }

  render () {
    const {accounts = [], formValues = {}, navigation, moreInfoBL, billerAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, billerAccountWithCC, billerBlacklist, isAutoDebit, ...extraProps} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', '');
    let disabled = isEmpty(result(formValues, 'accountNo', {}));
    const balances = result(formValues, 'accountNo.balances', '');
    const billerCode = result(navParams, 'biller.billerPreferences.code', '');
    const isBillerBlacklisted = billerBlacklist.includes(billerCode) ? true : 'false';
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', '');
    const isADebit = result(isAutoDebit, 'isAddNew');
    let errors = {};
    if (balances !== '') {
      const selectedAccountBalance = getAccountAmount(formValues.accountNo);
      const transactionAmount = result(formValues, 'amount', '');
      const transactionBillAmount = result(formValues, 'billAmount', '');
      disabled = disabled || !!(validateBalance(selectedAccountBalance, transactionAmount)) || !!(validateBalance(selectedAccountBalance, transactionBillAmount));
      errors = {...errors, accountNo: validateBalance(selectedAccountBalance, transactionAmount), billAmount: validateBalance(selectedAccountBalance, transactionBillAmount)};
    }
    return <DecoratedForm {...navParams} formValues={formValues} accounts={accounts} disabled={disabled} errors={errors}
      billerAccount={billerAccount} seletctSof={this.selectSof} defaultAccount={defaultAccount}  moreInfoBL={moreInfoBL}
      isLogin={isLogin} {...extraProps} isUseSimas={isUseSimas} isAutoSwitchToogle={isAutoSwitchToogle} switchAccountToogleBE={switchAccountToogleBE}
      billerAccountWithCC={billerAccountWithCC} billerBlacklist={billerBlacklist} isBillerBlacklisted={isBillerBlacklisted}
      checked={this.state.checked} hidden={this.state.hidden} toogleCheckbox={this.toogleCheckbox} showAlert={this.showAlert}
      isAutoDebit={isAutoDebit} closeAlert={this.closeAlert} isADebit={isADebit} autoDebitEnabled={autoDebitEnabled}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeOnePaymentPage);
