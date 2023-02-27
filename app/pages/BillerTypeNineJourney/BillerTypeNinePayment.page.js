import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeNinePayment from '../../components/BillerTypeNineJourney/BillerTypeNinePayment.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getAccountAmount} from '../../utils/transformer.util';
import {isEmpty, result, filter, toLower} from 'lodash';
import {confirmGenericBillTypeNine, detailGenericBillTypeNine, silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import {NavigationActions} from 'react-navigation';
import {moreInfoBL} from '../../state/thunks/common.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import * as actionCreators from '../../state/actions/index.actions.js';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeNinePayment',
  destroyOnUnmount: false,
  validate: (values, {isLogin}) => {
    const errors = validateRequiredFields(values, ['accountNo', 'denomination', 'date']);
    if (values.accountNo.balances && values.denomination && isLogin) {
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      const transactionAmount = values.denomination.id;
      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    return errors;
  },
  onSubmit: (values, dispatch, {subscriberNo, biller, billDetails, isLogin, isUseSimas, checked, isADebit}) => {
    const autoDebitDate = result(values, 'date.value', '');
    if ((checked || isADebit) && !isEmpty(autoDebitDate)) {
      dispatch(actionCreators.saveFlagAutodebit({date: autoDebitDate, isRegular: checked || isADebit}));
    }
    const detailGenericBillTypeNineFunc = () => {
      dispatch(detailGenericBillTypeNine({subscriberNo, values, biller, isUseSimas, autoDebitDate}));
    };
    if (isLogin) {
      dispatch(confirmGenericBillTypeNine({subscriberNo, values, biller, billDetails, isUseSimas, autoDebitDate}));
    } else {
      dispatch(silentLoginBillpay(detailGenericBillTypeNineFunc));

    }
  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.BillerTypeNinePayment.values', {}),
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
    dispatch(change('BillerTypeNinePayment', name, amount));
  },
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeNinePayment', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  billerAccountWithCC: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeNinePayment', fieldName: 'accountNo', sourceType: 'genericBillerWithCC'}})),
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('BillerTypeTwoPayment', 'accountNo', defaultAccount));
  },
  dispatch: (data) => dispatch(data),
  clearAutodebitCheck: () => {
    dispatch(actionCreators.clearFlagAutodebit());
  },
  clearAutodebitDate: () => {
    dispatch(change('BillerTypeNinePayment', 'date', ''));
  },
});

const DecoratedForm = reduxForm(formConfig)(BillerTypeNinePayment);

class BillerTypeNinePaymentPage extends React.Component {
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
    const {navigation, setAmount, setDefaultAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, isAutoDebit, clearAutodebitCheck, dispatch} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const existBiller = result(navParams, 'biller', {});
    const denomBiller = result(existBiller, 'denomList', []);
    const favBiller = result(navParams, 'favBiller', {});
    const amount = result(favBiller, 'amount', '');
    const favAmount = amount === null ? '' : amount.toString();
    const filterDenom = filter(denomBiller, {'id': favAmount})[0];
    setAmount('denomination', filterDenom);
    setAmount('amount', favAmount);
    !isLogin && isAutoSwitchToogle && switchAccountToogleBE && setDefaultAccount(defaultAccount);
    // const code = result(navParams, 'biller.billerPreferences.code', '');
    // const billCode = code.concat('-2');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
    const isADebit = result(isAutoDebit, 'isAddNew', false);
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', 'NONE');
    if (!isADebit) {
      clearAutodebitCheck();
    } else {
      if (autoDebitEnabled === 'NONE') {
        dispatch(actionCreators.saveFlagAutodebit({isRegular: false}));
      }
    }
  }

  render () {
    const {accounts = [], formValues = {}, navigation, billerAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, billerAccountWithCC, billerBlacklist, isAutoDebit, ...extraProps} = this.props;
    const navParams = navigation.state.params;
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', '');
    const disabled = isEmpty(result(formValues, 'accountNo', {}));
    const errors = [];
    const balances = isAutoSwitchToogle ? '' : result(formValues, 'accountNo.balances', '');
    const denomination = result(formValues, 'denomination', {});
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', '');
    const isADebit = result(isAutoDebit, 'isAddNew');
    const billerCode = result(navParams, 'biller.billerPreferences.code', '');
    const isBillerBlacklisted = billerBlacklist.includes(billerCode) ? true : 'false';
    if (balances && denomination) {
      const selectedAccountBalance = getAccountAmount(formValues.accountNo);
      const transactionAmount = formValues.denomination.id;
      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    return <DecoratedForm {...navParams} formValues={formValues} accounts={accounts} disabled={disabled} errors={errors}
      billerAccount={billerAccount} defaultAccount={defaultAccount}
      billerAccountWithCC={billerAccountWithCC} billerBlacklist={billerBlacklist} isLogin={isLogin} {...extraProps}
      isUseSimas={isUseSimas} isAutoSwitchToogle={isAutoSwitchToogle} switchAccountToogleBE={switchAccountToogleBE} isBillerBlacklisted={isBillerBlacklisted}
      checked={this.state.checked} hidden={this.state.hidden} toogleCheckbox={this.toogleCheckbox}
      isAutoDebit={isAutoDebit} isADebit={isADebit} autoDebitEnabled={autoDebitEnabled}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeNinePaymentPage);
