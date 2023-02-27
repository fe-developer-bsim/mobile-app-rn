import React from 'react';
import PropTypes from 'prop-types';
import BillerTypeEightPayment from '../../components/BillerTypeEightJourney/BillerTypeEightPayment.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getAccountAmount} from '../../utils/transformer.util';
import {isEmpty, result, toLower} from 'lodash';
import {confirmGenericBillTypeEight, detailGenericBillTypeEight, silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import {NavigationActions} from 'react-navigation';
import {moreInfoBL} from '../../state/thunks/common.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
import * as actionCreators from '../../state/actions/index.actions.js';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'BillerTypeEightPayment',
  destroyOnUnmount: false,
  validate: (values, {billDetails, isLogin}) => {
    const errors = validateRequiredFields(values, ['accountNo', 'date']);
    if (values.accountNo.balances && isLogin) {
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      errors['accountNo'] = validateBalance(selectedAccountBalance, billDetails.billAmount);
    }
    return errors;
  },
  onSubmit: (values, dispatch, {subscriberNo, biller, billDetails, isLogin, isUseSimas, checked, isADebit}) => {
    const autoDebitDate = result(values, 'date.value', '');
    if ((checked || isADebit) && !isEmpty(autoDebitDate)) {
      dispatch(actionCreators.saveFlagAutodebit({date: autoDebitDate, isRegular: checked || isADebit}));
    }
    const detailGenericBillTypeEightFunc = () => {
      dispatch(detailGenericBillTypeEight({subscriberNo, values, biller, isUseSimas, billDetails, autoDebitDate}));
    };
    if (isLogin) {
      dispatch(confirmGenericBillTypeEight({subscriberNo, values, biller, billDetails, isUseSimas, autoDebitDate}));
    } else {
      dispatch(silentLoginBillpay(detailGenericBillTypeEightFunc));
    }
  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.BillerTypeEightPayment.values', {}),
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
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeEightPayment', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  billerAccountWithCC: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'BillerTypeEightPayment', fieldName: 'accountNo', sourceType: 'genericBillerWithCC'}})),
  setDefaultAccount: (defaultAccount) => {
    dispatch(change('BillerTypeEightPayment', 'accountNo', defaultAccount));
  },
  dispatch: (data) => dispatch(data),
  clearAutodebitCheck: () => {
    dispatch(actionCreators.clearFlagAutodebit());
  },
  clearAutodebitDate: () => {
    dispatch(change('BillerTypeEightPayment', 'date', ''));
  },
});

const DecoratedForm = reduxForm(formConfig)(BillerTypeEightPayment);

class BillerTypeEightPaymentPage extends React.Component {
  static propTypes = {
    updateAccounts: PropTypes.func,
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
    const {navigation, setDefaultAccount, defaultAccount, isLogin, isAutoSwitchToogle, switchAccountToogleBE, isAutoDebit, clearAutodebitCheck, dispatch} = this.props;
    const navParams = result(navigation, 'state.params', {});
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
    const {accounts = [], formValues = {}, navigation, billerAccount, billerAccountWithCC, billerBlacklist, defaultAccount, isLogin, moreInfoBL, isAutoSwitchToogle, switchAccountToogleBE, isAutoDebit, ...extraProps} = this.props;
    const navParams = navigation.state.params;
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', '');
    const disabled = isEmpty(result(formValues, 'accountNo', {}));
    const billerCode = result(navParams, 'biller.billerPreferences.code', '');
    const isTrue = true;
    const isBillerBlacklisted = billerBlacklist.includes(billerCode) ? isTrue : false;
    const errors = [];
    const balances = isAutoSwitchToogle ? '' : result(formValues, 'accountNo.balances', '');
    const autoDebitEnabled = result(navParams, 'biller.billerPreferences.isAutodebetEnabled', '');
    const isADebit = result(isAutoDebit, 'isAddNew');
    if (balances !== '') {
      const selectedAccountBalance = getAccountAmount(formValues.accountNo);
      errors['accountNo'] = validateBalance(selectedAccountBalance, navParams.billDetails.billAmount);
    }
    return <DecoratedForm {...navParams} formValues={formValues} accounts={accounts} disabled={disabled} errors={errors}
      billerAccount={billerAccount} billerAccountWithCC={billerAccountWithCC} billerBlacklist={billerBlacklist} isBillerBlacklisted={isBillerBlacklisted} defaultAccount={defaultAccount} moreInfoBL={moreInfoBL}
      isLogin={isLogin} {...extraProps} isUseSimas={isUseSimas} isAutoSwitchToogle={isAutoSwitchToogle} switchAccountToogleBE={switchAccountToogleBE}
      checked={this.state.checked} hidden={this.state.hidden} toogleCheckbox={this.toogleCheckbox}
      isAutoDebit={isAutoDebit} isADebit={isADebit} autoDebitEnabled={autoDebitEnabled}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillerTypeEightPaymentPage);
