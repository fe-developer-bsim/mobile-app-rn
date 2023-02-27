import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import FundTransferPayment from '../../components/FundTransferJourney/FundTransferPaymentFromSetLimit.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {validateRequiredFields, isInRange, validateMaxTransferAmount, validateMaxTransferNetwork, isPrk, validateBalance, isInRangeValas, validateBalanceValas, validateMaxTransactionAmount, validateMaxTransferAmountSetLimit} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts, getPayeeType, generatePayeeFromSetLimit} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {setupFundTransferFromSetLimit, confirmTransferFromSetLimit} from '../../state/thunks/fundTransfer.thunks';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';
import {getValas} from '../../state/thunks/common.thunks';
import groupBy from 'lodash/groupBy';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: false,
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
  onSubmit: (values, dispatch, {payeeName, payeeNumber, payeeAccountType, payeeBank, payeeCurrency, payeeId, payeeTargetType, payeeTransferType, formValues}) => {    
    const name = payeeName;
    const accountNumber = payeeNumber;
    const accountType = payeeAccountType;
    const bank = payeeBank;
    const currency = payeeCurrency;    
    const id = payeeId;
    const targetType = payeeTargetType;
    const transferType = payeeTransferType;  
    const payee = generatePayeeFromSetLimit(name, accountNumber, accountType, bank, currency, id, targetType, transferType);
    dispatch(confirmTransferFromSetLimit(formValues, payee, 'fundTransfer'));
  }
};

const DecoratedFundTransferPayment = reduxForm(formConfig)(FundTransferPayment);

class FundTransferPaymentPage extends Component {
  static propTypes = {
    goToSummary: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,    
    dispatch: PropTypes.func,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    goToPaymentMethod: PropTypes.func,
    goToSchedule: PropTypes.func,
    payeeAccNo: PropTypes.string,
    unregisteredName: PropTypes.string,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    changeFormValues: PropTypes.func,
    setAmount: PropTypes.func,
    isLogin: PropTypes.bool,
    getValas: PropTypes.func,
    getCurrency: PropTypes.func,
    isValas: PropTypes.string,
    accounts: PropTypes.array,
    setNewSof: PropTypes.func,    
    setupFundTransferFromSetLimit: PropTypes.func,    
    payeeList: PropTypes.array,   
    goSetPayee: PropTypes.func,
    payeeName: PropTypes.string,
    payeeNumber: PropTypes.string,
    payeeAccountType: PropTypes.string,
    payeeBank: PropTypes.string,
    payeeCurrency: PropTypes.string,
    payeeId: PropTypes.string,
    payeeTargetType: PropTypes.string,
    payeeTransferType: PropTypes.string,
    debitAccountNo: PropTypes.string,

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
        Toast.show(language.EXCHANGE__RATES_VALAS);
      }
    } else {
      this.setState({scheduled});
    }
    
  }

  
  selectSourceAcc = () => {
    const {getSourceAcc, navigation, formValues, getCurrency, dispatch} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isTopup = result(payee, 'accountType', '') === 'emoneyAccount' && result(payee, 'transferType', '') === 'own';
    const currencySource = result(formValues, 'myAccount.currency', '');
    const isSourceIDR = currencySource !== 'IDR';
    const isPayeeIDR = currency !== 'IDR' && currency !== '';
    let isValas = isSourceIDR || isPayeeIDR;
    getSourceAcc(payee, isTopup, isValas);
    const currency = result(payee, 'currency', '');
    const currrencyList = groupBy(getCurrency, 'currency', []);
    let currencyRate = [];
    const currencyDeterminant = result(formValues, 'currency.name', currencySource);
    const currencyTarget = currency !== currencySource ? [currencySource, currency] : [currency];
    dispatch(change('fundTransfer', 'currency', currencyTarget));
    if (currencySource !== 'IDR' && currency !== 'IDR') {
      // untuk valas to valas
      const buyRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadBuyRate', 0));
      const sellRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadSellRate', 0));
      const buyRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadBuyRate', 0));
      const sellRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadSellRate', 0));
      const toTargetCurrency = buyRateTarget / sellRateSource;
      const toSourceCurrency = buyRateSource / sellRateTarget;
      currencyRate['toTargetAcc'] = toTargetCurrency;
      currencyRate['fromTargetAcc'] = toSourceCurrency;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
    } else if (currencySource !== 'IDR' && currency === 'IDR') {
      // untuk valas ke idr
      const buyRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadBuyRate', 0));
      const sellRateSource = parseInt(result(currrencyList, `${currencySource}` + '.0.spreadSellRate', 0));
      const toTargetCurrency = 1 / sellRateSource;
      const toSourceCurrency = 1 * buyRateSource;
      currencyRate['toTargetAcc'] = toTargetCurrency;
      currencyRate['fromTargetAcc'] = toSourceCurrency;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
      
    } else if (currencySource === 'IDR' && currency !== 'IDR') {
      // untuk idr to valas
      const buyRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadBuyRate', 0));
      const sellRateTarget = parseInt(result(currrencyList, `${currency}` + '.0.spreadSellRate', 0));
      const toTargetCurrency = 1 / sellRateTarget;
      const toSourceCurrency = 1 * buyRateTarget;
      currencyRate['toTargetAcc'] = toTargetCurrency;
      currencyRate['fromTargetAcc'] = toSourceCurrency;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
    } else if (currencySource === 'IDR' && currency === 'IDR') {
      // untuk idr ke idr
      currencyRate['toTargetAcc'] = 0;
      currencyRate['fromTargetAcc'] = 0;
      currencyRate['currency'] = currency;
      currencyRate['currencySource'] = currencySource;
      currencyRate['currencyDeterminant'] = currencyDeterminant;
      
    }
  }

  componentDidMount () {
    const {navigation, setAmount, getValas, getCurrency, formValues, accounts, setNewSof} = this.props;
    if (isEmpty(getCurrency)) {
      getValas();
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
  
  goOnPage = () => {
    const {goSetPayee, payeeName, payeeNumber, payeeAccountType, payeeBank, payeeCurrency, payeeId, payeeTargetType, payeeTransferType} = this.props;
    const name = payeeName;
    const accountNumber = payeeNumber;
    const accountType = payeeAccountType;
    const bank = payeeBank;
    const currency = payeeCurrency;    
    const id = payeeId;
    const targetType = payeeTargetType;
    const transferType = payeeTransferType;  
    goSetPayee(name, accountNumber, accountType, bank, currency, id, targetType, transferType);

  }
  
  render () {
    const {navigation, accountList, formValues, appConfig, unregisteredName, getCurrency,  setupFundTransferFromSetLimit, payeeList, payeeAccountType, payeeCurrency, payeeName, payeeNumber, payeeBank, payeeId, payeeTargetType, payeeTransferType, debitAccountNo} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const name = payeeName;
    const transferType = payeeTransferType;
    const accountType = payeeAccountType;    
    const currencyIDR = payeeCurrency;
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(appConfig, 'tokenConfig.1', {});
    const prkList = result(appConfig, 'prkPrefixCSV', '');
    const accounts = payee.name === unregisteredName && startsWith(payee.accountNumber, '3808') ? [find(accountList, {accountType: 'emoneyAccount'})] : accountList;
    const disabled = isEmpty(result(formValues, 'myAccount', {}));
    const fromEmoney = result(formValues, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external';
    const isNetwork = fromEmoney && toOtherBank;
    const accountBalance = getAccountAmount(result(formValues, 'myAccount', {}));
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const errors = [];
    const maxAmountError = isNetwork ? validateMaxTransferNetwork(formValues.amount, transferChargeConfig) : validateMaxTransferAmount(formValues.amount, transferChargeConfig) && validateMaxTransferAmountSetLimit(formValues.amount);
    const passValidateAmount = isPrk(prkList, result(formValues, 'myAccount', {}));
    // const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount) || maxAmountError);
    // errors['amountLess'] = formValues.amount < 1000 ? (isInRange(1000, accountBalance, formValues.amount)) : undefined;
    // errors['amount'] = amount;
    const currencyPayee = result(payee, 'currency', '');
    const currrencyList = groupBy(getCurrency, 'currency', []);
    const currrencyListUsd = groupBy(getCurrency, 'changeCurrency', []);
    const currency = isEmpty(currencyPayee) ? 'IDR' : currencyPayee;
    const currencySource = isEmpty(result(formValues, 'myAccount.currency', '')) ? 'IDR' : result(formValues, 'myAccount.currency', '');
    const currencyTarget = currency !== currencySource ? [currencySource, currency] : [currency];
    const currencyDeterminant = result(formValues, 'currency.name', currencySource);
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
      const amount = passValidateAmount ? undefined : (validateBalanceValas(accountBalance, formValues.amount, '', currencyRate)
      || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1) ? (isInRangeValas(1, accountBalance, formValues.amount, formValues, currencyRate, payee)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRangeValas(1, accountBalance, formValues.amount, formValues, currencyRate, payee) : amount;
    } else {
      const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount)
      || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1000) ? (isInRange(1000, accountBalance, formValues.amount)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRange(1000, accountBalance, formValues.amount) : amount;
    }

    return (
      <DecoratedFundTransferPayment accountList={accounts} onNextPress={this.onNext} 
        payee={payee}
        getSourceAcc={this.selectSourceAcc} formValues={formValues} tokenConfig={tokenConfig}
        checkboxChange={this.checkboxChange} transferChargeConfig={transferChargeConfig} prkList={prkList}
        amountChange={this.amountChange} disabled={disabled} errors={errors} isOwnAccount={isOwnAccount} currencyRate={currencyRate}
        currencyTarget={currencyTarget} isValas={isValas} amountNormalise={this.amountNormalise} getCurrency={getCurrency}
        goSetPayee={this.goOnPage}  
        setupFundTransferFromSetLimit={setupFundTransferFromSetLimit}
        payeeNumber={payeeNumber}
        payeeName={payeeName}
        payeeList={payeeList}
        transferType={transferType}
        accountType={accountType}
        currencyIDR={currencyIDR}
        name={name}
        payeeBank={payeeBank}
        payeeId={payeeId}
        payeeAccountType={payeeAccountType}
        payeeTargetType={payeeTargetType}
        payeeTransferType={payeeTransferType}
        payeeCurrency={payeeCurrency}
        debitAccountNo={debitAccountNo}
      />
    );
  }
}
  
const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.fundTransfer.values', {}),
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  form: state.form,
  unregisteredName: result(state, 'configEmoney.emoneyConfig.pendingAccountName', ''),
  isLogin: !isEmpty(result(state, 'user', {})),
  getCurrency: result(state, 'currencyRates', []),
  accounts: result(state, 'accounts', {}),  
  listAddNew: result(state, 'listLimit', []),  
  getList: result(state, 'configEForm.listConfigEform.listAddNew', []), 
  bankList: result(state, 'valueBankList.bankList', []),  
  payeeList: result(state, 'payees', []),  
  payeeName: result(state, 'setLimitTransactionAdd.payload.payload.creditAccountName', ''),  
  payeeNumber: result(state, 'setLimitTransactionAdd.payload.payload.creditAccountNumber', ''),   
  payeeAccountType: result(state, 'setLimitTransactionAdd.payload.payload.payeeAccountType', ''),
  payeeBank: result(state, 'setLimitTransactionAdd.payload.payload.payeeBank', ''),
  payeeCurrency: result(state, 'setLimitTransactionAdd.payload.payload.payeeCurrency', ''),
  payeeId: result(state, 'setLimitTransactionAdd.payload.payload.payeeId', ''),
  payeeTargetType: result(state, 'setLimitTransactionAdd.payload.payload.payeeTargetType.code', ''),  
  payeeTransferType: result(state, 'setLimitTransactionAdd.payload.payload.payeeTransferType', ''),  
  debitAccountNo: result(state, 'setLimitTransactionAdd.payload.payload.debitAccountName', ''),  
});

const mapDispatchToProps = (dispatch) => ({
  setTransferMode: (mode) => {
    dispatch(change('fundTransfer', 'transferMode', mode));
  },
  goToPaymentMethod: (payee, formValues, getCurrency, currencyRate) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferMethod',
      params: {formValues, payee, getCurrency, currencyRate}
    }));
  },
  goToSchedule: (payee, formValues, getCurrency, currencyRate, isValas, isKyc) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferSchedule',
      params: {formValues, payee, getCurrency, currencyRate, isValas, isKyc}
    }));
  },
  getSourceAcc: (payee, isTopup, isValas) => {
    dispatch(NavigationActions.navigate({
      routeName: 'TransferSourceAccount',
      params: {formName: 'fundTransfer', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup, isValas: isValas}
    }));
  },
  setAmount: (name, amount) => {
    dispatch(change('fundTransfer', name, amount));
  },
  getValas: () => dispatch(getValas()),
  setNewSof: (account) => {
    dispatch(change('fundTransfer', 'myAccount', account));
  },  
  goSetPayee: (name, accountNumber, accountType, bank, currency, id, targetType, transferType) => {
    dispatch(setupFundTransferFromSetLimit(name, accountNumber, accountType, bank, currency, id, targetType, transferType));
  },  
  dispatch
 
});
  
const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(FundTransferPaymentPage);
export default connectedTransfer;