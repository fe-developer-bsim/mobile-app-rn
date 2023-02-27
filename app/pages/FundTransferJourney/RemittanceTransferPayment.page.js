import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import RemittanceTransferPayment from '../../components/FundTransferJourney/RemittanceTransferPayment.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {validateRequiredFields, isInRange, validateMaxTransferNetwork, isPrk, validateBalance, isInRangeValas, validateMaxTransactionAmount, validateBalanceValasRemittance} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts, getPayeeType, getTransferPossibleAccountsRemittance} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {silentLoginBillpay, confirmTransferRemittance} from '../../state/thunks/fundTransfer.thunks';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';
import {getExchangeCurrency} from '../../state/thunks/common.thunks';
import groupBy from 'lodash/groupBy';
import {language} from '../../config/language';
import {Toast} from '../../utils/RNHelpers.util';
import * as actionCreators from '../../state/actions/index.actions.js';

const formConfig = {
  form: 'remittanceTransfer',
  destroyOnUnmount: true,
  initialValues: {
    myAccount: {},
    amount: '',
    note: '',
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['amount']),
    };
    return {
      ...errors
    };
  },
};

const DecoratedRemittanceTransferPayment = reduxForm(formConfig)(RemittanceTransferPayment);

class RemittanceTransferPaymentPage extends Component {
  static propTypes = {
    goToSummary: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    goToPaymentMethod: PropTypes.func,
    goToSchedule: PropTypes.func,
    payeeAccNo: PropTypes.string,
    unregisteredName: PropTypes.string,
    selectedSourceAcc: PropTypes.object,
    changeFormValues: PropTypes.func,
    setAmount: PropTypes.func,
    getCurrency: PropTypes.array,
    amountNormalise: PropTypes.func,
    accountsTransfer: PropTypes.array,
    getAmount: PropTypes.func,
    dispatch: PropTypes.func,
    isLogin: PropTypes.bool,
    isValas: PropTypes.string,
    accounts: PropTypes.array,
    setNewSof: PropTypes.func,
    exchangeCurrency: PropTypes.object,
    toogleRemittance: PropTypes.bool,
  };

  state = {
    scheduled: false,
    isValas: false,
  }

  checkboxChange = () => {
    const {navigation, formValues} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const payeeCurrency = result(payee, 'currency', '');
    const sourceCurrency = result(formValues, 'myAccount.currency', '');
    const isSourceIDR = sourceCurrency !== 'IDR' && sourceCurrency !== '';
    const isPayeeIDR = payeeCurrency !== 'IDR' && payeeCurrency !== '';
    let isValas = isSourceIDR || isPayeeIDR;
    const scheduled = !this.state.scheduled;
    if (isValas) {
      if (sourceCurrency === payeeCurrency) {
        this.setState({scheduled});
      } else {
        Toast.show(language.EXCHANGE__SCHEDULED_REMITTANCE);
      }
    } else {
      this.setState({scheduled});
    }
  }

  onNext = (currencyRate = []) => {
    const {formValues, navigation, goToSummary, goToSchedule, dispatch, isLogin, getCurrency, exchangeCurrency} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isKyc = result(navigation, 'state.params.isKyc', false);
    const toEmoney = result(payee, 'payeeType.value', 'bank') === 'emoney' || result(payee, 'accountType', '') === 'emoneyAccount';
    const fromEmoney = result(formValues, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external' || getPayeeType(payee) === 'remmitance';
    const isNetwork = fromEmoney && toOtherBank;
    let isValas = false;
    const totalAmountView = result(exchangeCurrency, 'totalAmountView', '');
    const totalAmount = result(exchangeCurrency, 'totalAmount', '');
    const currencyAccountFrom = result(exchangeCurrency, 'currencyAccountFrom', '');
    const currencyRemmitance = result(exchangeCurrency, 'currencyRemmitance', '');
    const feeRateDisplay = result(exchangeCurrency, 'getConvertAmountFee.feeRateDisplay', '');
    const equivalenRateDisplay = result(exchangeCurrency, 'getConvertAmountTransaction.equivalenRateDisplay', '');
    const currencyRateDisplay = result(exchangeCurrency, 'getConvertAmountTransaction.currencyRateDisplay', '');
    const amountInBaseCurrency = result(exchangeCurrency, 'amountInBaseCurrency', '');
    const dataTransactionRemittance = {totalAmountView, totalAmount, currencyAccountFrom, currencyRemmitance, feeRateDisplay, equivalenRateDisplay, currencyRateDisplay, amountInBaseCurrency};
    if (this.state.scheduled) {
      goToSchedule(payee, formValues, getCurrency, currencyRate, isValas, isKyc, dataTransactionRemittance);
    } else {
      if (getPayeeType(payee, isNetwork) === 'internal' || toEmoney || isNetwork || isValas) {
        if ((isEmpty(formValues.currency)) || (formValues.currency.name === 'IDR' || formValues.currency.name !== 'IDR')) {
          goToSummary(payee, formValues, getCurrency, currencyRate, {}, isValas, isKyc, dataTransactionRemittance);
        }
      } else {
        if (isLogin) {
          goToSummary(payee, formValues, getCurrency, currencyRate, {}, isValas, isKyc, dataTransactionRemittance);
        } else {
          dispatch(silentLoginBillpay());
          goToSummary(payee, formValues, getCurrency, currencyRate, {}, isValas, isKyc, dataTransactionRemittance);
        }
      }
    }
  }


  componentDidMount () {
    const {navigation, setAmount, getCurrency, formValues, accounts, setNewSof, dispatch, exchangeCurrency} = this.props;
    if (!isEmpty(exchangeCurrency)) {
      dispatch(actionCreators.clearExchangeCurrency());
    }
    if (isEmpty(getCurrency)) {
      // getValas();
    }
    const navParams = result(navigation, 'state.params', {});
    const amount = result(navParams, 'payee.amount', '');
    const favAmount = amount === null ? '' : amount.toString();
    setAmount('amount', favAmount);
    if (!isEmpty(formValues)) {
      const currentSof = result(formValues, 'myAccount.accountNumber', {});
      const newSof = find(accounts, {accountNumber: currentSof});
      setNewSof(newSof);
    }
  }


  onthisChangeAmount = (value) => {
    const {formValues, navigation} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const currencyRemmitance = result(payee, 'currency', '');
    const beforeSOFCurrency = result(value, 'currency', '');
    const beforeAccountFrom = String(result(value, 'id', ''));
    const afterSOFCurrency = result(formValues, 'myAccount.currency', '');
    const afterAccountFrom = String(result(formValues, 'myAccount.id', ''));
    if (isEmpty(beforeSOFCurrency)) {
      this.props.getAmount(currencyRemmitance, afterSOFCurrency, afterAccountFrom);
      if (currencyRemmitance !== afterSOFCurrency) {
        const scheduled = false;
        this.setState({scheduled});
      }
    } else {
      this.props.getAmount(currencyRemmitance, beforeSOFCurrency, beforeAccountFrom);
      if (currencyRemmitance !== beforeSOFCurrency) {
        const scheduled = false;
        this.setState({scheduled});
      }
    }
  }


  render () {
    const {navigation, accountList, formValues, appConfig, unregisteredName, getCurrency, accountsTransfer, setAmount, exchangeCurrency, toogleRemittance} = this.props; 
    const payee = result(navigation, 'state.params.payee', {});
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(appConfig, 'tokenConfig.1', {});
    const prkList = result(appConfig, 'prkPrefixCSV', '');
    const accounts = payee.name === unregisteredName && startsWith(payee.accountNumber, '3808') ? [find(accountList, {accountType: 'emoneyAccount'})] : accountList;
    const disabled = isEmpty(result(formValues, 'myAccount', {}));
    const accountBalance = getAccountAmount(result(formValues, 'myAccount', {}));
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const errors = [];
    const amountInBaseCurrencyRemittance = result(exchangeCurrency, 'amountInBaseCurrency', 0);
    const maxAmountError = validateMaxTransferNetwork(amountInBaseCurrencyRemittance, transferChargeConfig);
    const passValidateAmount = isPrk(prkList, result(formValues, 'myAccount', {}));
    const currencyPayee = result(payee, 'currency', '');
    const currrencyList = groupBy(getCurrency, 'currency', []);
    const currrencyListUsd = groupBy(getCurrency, 'changeCurrency', []);
    const currency = isEmpty(currencyPayee) ? 'IDR' : currencyPayee;
    const currencySource = isEmpty(result(formValues, 'myAccount.currency', '')) ? 'IDR' : result(formValues, 'myAccount.currency', '');
    const currencyTarget = currency !== currencySource ? currency : currency;
    const currencyDeterminant = result(payee, 'currency', currencySource);
    let currencyRate = [];
    let currencyIndicator = 'noValas';
    if (isEmpty(currency)) {
      currencyIndicator = 'noValas';
    } else {
      currencyIndicator = currencySource !== 'IDR' && currency !== 'IDR' && currency !== currencySource ? 'fullValas' :
        currencySource !== 'IDR' && currency !== 'IDR' && currency === currencySource ? 'sameValas' :
          currencySource !== 'IDR' || currency !== 'IDR' ? 'halfValas' : 'noValas';
    }
    
    if (currency === 'IDR') {
      if (currencySource !== 'IDR' && currencySource !== 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      } else if (currencySource === 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      }
    } else if (currency === 'USD') {
      if (currencySource !== 'IDR' && currencySource !== 'USD') {
        // SPECIAL CASE
        const currencyObject = result(currrencyListUsd, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
        const currencyObjectAdditional = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObjectAdditional'] = currencyObjectAdditional;
      } else if (currencySource === 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      } else if (currencySource === 'IDR') {
        const currencyObject = result(currrencyList, `${currency}`, {});
        currencyRate['currencyObject'] = currencyObject;
      }
    } else if (currency !== 'IDR' && currency !== 'USD') {
      if (currencySource === 'IDR') {
        const currencyObject = result(currrencyList, `${currency}`, {});
        currencyRate['currencyObject'] = currencyObject;
      } else if (currencySource === 'USD') {
        // SPECIAL CASE
        const currencyObject = result(currrencyListUsd, `${currency}`, {});
        currencyRate['currencyObject'] = currencyObject;
        const currencyObjectAdditional = result(currrencyList, `${currency}`, {});
        currencyRate['currencyObjectAdditional'] = currencyObjectAdditional;
        
      } else if (currencySource !== 'IDR' && currencySource !== 'USD') {
        const currencyObject = result(currrencyList, `${currencySource}`, {});
        currencyRate['currencyObject'] = currencyObject;
      }
    }
    currencyRate['currency'] = currency;
    currencyRate['currencySource'] = currencySource;
    currencyRate['currencyDeterminant'] = currencyDeterminant;
    currencyRate['currencyIndicator'] = currencyIndicator;
    const isSourceIDR = currencySource !== 'IDR';
    const isPayeeIDR = currency !== 'IDR' && currency !== '';
    let isValas = isSourceIDR || isPayeeIDR;
    const validateOwnAccount = validateMaxTransactionAmount(formValues.amount, result(appConfig, 'tokenConfig', []), result(payee, 'transferType', ''));
    if (currencyIndicator === 'halfValas' || currencyIndicator === 'fullValas' || currencyIndicator === 'sameValas') {
      const amount = passValidateAmount ? undefined : (validateBalanceValasRemittance(accountBalance, formValues.amount, '', currencyRate, exchangeCurrency)
      || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1) ? (isInRangeValas(1, accountBalance, formValues.amount, formValues, currencyRate, payee)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRangeValas(1, accountBalance, formValues.amount) : amount;
    } else {
      const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount)
      || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1000) ? (isInRange(1000, accountBalance, formValues.amount)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRange(1000, accountBalance, formValues.amount) : amount;
    }
    return (
      <DecoratedRemittanceTransferPayment accountList={accounts} onNextPress={this.onNext} payee={payee}
        formValues={formValues} tokenConfig={tokenConfig} checkboxChange={this.checkboxChange}
        transferChargeConfig={transferChargeConfig} prkList={prkList} amountChange={this.amountChange} disabled={disabled} errors={errors} setAmount={setAmount} currencyTarget={currencyTarget} amountNormalise={this.amountNormalise} currencyRate={currencyRate}
        accountsTransfer={accountsTransfer} getAmount={this.onthisChangeAmount}
        isOwnAccount={isOwnAccount}
        isValas={isValas} getCurrency={getCurrency} exchangeCurrency={exchangeCurrency} toogleRemittance={toogleRemittance}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  accountList: getTransferPossibleAccountsRemittance(result(state, 'accounts', []), 'ft'),
  accountsTransfer: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.isValas', {})),
  formValues: result(state, 'form.remittanceTransfer.values', {}),
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  form: state.form,
  unregisteredName: result(state, 'configEmoney.emoneyConfig.pendingAccountName', ''),
  isLogin: !isEmpty(result(state, 'user', {})),
  getCurrency: result(state, 'currencyRates', []),
  exchangeCurrency: result(state, 'exchangeCurrencyRemittance', {}),
  toogleRemittance: result(state, 'toogleRemittance', false),
  accounts: result(state, 'accounts', {})
});

const mapDispatchToProps = (dispatch) => ({
  setTransferMode: (mode) => {
    dispatch(change('remittanceTransfer', 'transferMode', mode));
  },
  goToPaymentMethod: (payee, formValues, getCurrency, currencyRate, remittanceData) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferMethodRemittance',
      params: {formValues, payee, getCurrency, currencyRate, remittanceData}
    }));
  },
  getAmount: (currencyRemmitance, currencyAccountFrom, accountFrom) => {
    dispatch(getExchangeCurrency(currencyRemmitance, currencyAccountFrom, accountFrom));
  },
  goToSchedule: (payee, formValues, getCurrency, currencyRate, isValas, isKyc, dataTransactionRemittance) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferRemittanceSchedule',
      params: {formValues, payee, getCurrency, currencyRate, isValas, isKyc, isRemittance: true, dataTransactionRemittance}
    }));
  },
  goToSummary: (payee, formValues, getCurrency, currencyRate, newformValues, isValas, isKyc, dataTransactionRemittance) => {
    dispatch(confirmTransferRemittance(formValues, payee, 'fundTransferRemittance', getCurrency, currencyRate, newformValues, isValas, isKyc, dataTransactionRemittance));
  },
  setAmount: (name, amount) => {
    dispatch(change('remittanceTransfer', name, amount));
  },
  setNewSof: (account) => {
    dispatch(change('remittanceTransfer', 'myAccount', account));
  },
  dispatch
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(RemittanceTransferPaymentPage);
export default connectedTransfer;