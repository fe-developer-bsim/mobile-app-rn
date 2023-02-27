import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeTenPayment from '../../components/BillerTypeTenJourney/BillerTypeTenPayment.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getAccountAmount} from '../../utils/transformer.util';
import {noop, isEmpty, result, toLower} from 'lodash';
import {confirmGenericBillTypeTen, detailGenericBillTypeTen, silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import {NavigationActions} from 'react-navigation';
import {moreInfoBL} from '../../state/thunks/common.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import * as actionCreators from '../../state/actions/index.actions.js';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeTenPayment',
  destroyOnUnmount: false,
  validate: (values, {billDetails, isLogin}) => {
    const errors = validateRequiredFields(values, ['accountNo', 'date']);
    if (values.accountNo.balances && isLogin) {
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      const transactionAmount = values.denomination ? values.denomination.value :  billDetails.billAmount || '';
      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    return errors;
  },
  onSubmit: (values, dispatch, {subscriberNo, biller, isLogin, isUseSimas, checked, isADebit}) => {
    const autoDebitDate = result(values, 'date.value', '');
    if ((checked || isADebit) && !isEmpty(autoDebitDate)) {
      dispatch(actionCreators.saveFlagAutodebit({date: autoDebitDate, isRegular: checked || isADebit}));
    }
    const detailGenericBillTypeTenFunc = () => {
      dispatch(detailGenericBillTypeTen({subscriberNo, values, biller, isUseSimas, autoDebitDate}));
    };
    if (isLogin) {
      dispatch(confirmGenericBillTypeTen({subscriberNo, values, biller, isUseSimas, autoDebitDate}));
    } else {
      dispatch(silentLoginBillpay(detailGenericBillTypeTenFunc));
    }
  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.BillerTypeTenPayment.values', {}),
  defaultAccount: result(state, 'defaultAccount', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  billerBlacklist: result(state, 'config.blacklistMerchantCC', ''),
  isAutoSwitchToogle: result(state, 'primaryToogleAccount', false),
  switchAccountToogleBE: toLower(result(state, 'config.flag.primaryToogleAccount', 'inactive')) === 'active',
  isAutoDebit: result(state, 'flagAutoDebit'),
});

const mapDispatchToProps = (dispatch) => ({
  setAmount: (name, amount) => {
    dispatch(change('BillerTypeTenPayment', name, amount));
  },
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeTenPayment', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  billerAccountWithCC: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeTenPayment', fieldName: 'accountNo', sourceType: 'genericBillerWithCC'}})),
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('BillerTypeTenPayment', 'accountNo', defaultAccount));
  },
  moreInfoBL: (data) => {
    dispatch(moreInfoBL(data));
  },
  dispatch: (data) => dispatch(data),
  clearAutodebitCheck: () => {
    dispatch(actionCreators.clearFlagAutodebit());
  },
  clearAutodebitDate: () => {
    dispatch(change('BillerTypeTenPayment', 'date', ''));
  },
});

const DecoratedForm = reduxForm(formConfig)(BillerTypeTenPayment);

class BillerTypeTenPaymentPage extends React.Component {
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
    const {navigation, setAmount = noop, setDefaultAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, isAutoDebit, clearAutodebitCheck, dispatch} = this.props;
    const navParams = navigation.state.params;
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
    const {accounts = [], formValues = {}, navigation, billerAccount, defaultAccount, isLogin, moreInfoBL, isAutoSwitchToogle, switchAccountToogleBE, billerAccountWithCC, billerBlacklist, isAutoDebit, ...extraProps} = this.props;
    const navParams = navigation.state.params;
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', '');
    const disabled = isEmpty(result(formValues, 'accountNo', {}));
    const billerCode = result(navParams, 'biller.billerPreferences.code', '');
    const isBillerBlacklisted = billerBlacklist.includes(billerCode) ? true : 'false';
    const errors = [];
    const balances = isAutoSwitchToogle ? '' : result(formValues, 'accountNo.balances', '');
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', '');
    const isADebit = result(isAutoDebit, 'isAddNew');
    if (balances !== '') {
      const selectedAccountBalance = getAccountAmount(formValues.accountNo);
      const transactionAmount = formValues.denomination ? formValues.denomination.value :  navParams.billDetails.billAmount || '';
      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    return <DecoratedForm {...navParams} formValues={formValues} accounts={accounts} disabled={disabled} errors={errors}
      billerAccount={billerAccount} defaultAccount={defaultAccount}  moreInfoBL={moreInfoBL}
      isLogin={isLogin} {...extraProps} isUseSimas={isUseSimas} isAutoSwitchToogle={isAutoSwitchToogle} switchAccountToogleBE={switchAccountToogleBE}
      billerAccountWithCC={billerAccountWithCC} billerBlacklist={billerBlacklist} isBillerBlacklisted={isBillerBlacklisted}
      checked={this.state.checked} hidden={this.state.hidden} toogleCheckbox={this.toogleCheckbox}
      isAutoDebit={isAutoDebit} isADebit={isADebit} autoDebitEnabled={autoDebitEnabled}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeTenPaymentPage);
