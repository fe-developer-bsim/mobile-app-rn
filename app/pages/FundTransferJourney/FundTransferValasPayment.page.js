import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import FundTransferPayment from '../../components/FundTransferJourney/FundTransferValasPayment.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {validateRequiredFields, isInRange, validateMaxTransferAmount, validateMaxTransferNetwork, isPrk, validateBalance, validateMaxTransactionAmount} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts, getPayeeType} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import {confirmTransfer} from '../../state/thunks/fundTransfer.thunks';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';
import {getValas} from '../../state/thunks/common.thunks';
import groupBy from 'lodash/groupBy';

const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: false,
  initialValues: {
    myAccount: {},
    amount: '',
    note: ''
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['amount']),
    };
    return {
      ...errors
    };
  }
};

const DecoratedFundTransferPayment = reduxForm(formConfig)(FundTransferPayment);

class FundTransferPaymentPage extends Component {

  componentDidMount () {
    const {getCurrency} = this.props;
    if (isEmpty(getCurrency)) {
      this.props.getValas();
    }
  }


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
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    changeFormValues: PropTypes.func,
    getValas: PropTypes.func,
    setAmount: PropTypes.func,
    getCurrency: PropTypes.array,
    amountNormalise: PropTypes.func,
    chargeList: PropTypes.array,
  };

  state = {
    scheduled: false,
  }

  checkboxChange = () => {
    const scheduled = !this.state.scheduled;
    this.setState({scheduled});
  }

  onNext = (currencyRate) => {
    const {goToPaymentMethod, formValues, navigation, goToSummary, goToSchedule, getCurrency} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const toEmoney = result(payee, 'payeeType.value', 'bank') === 'emoney' || result(payee, 'accountType', '') === 'emoneyAccount';
    const fromEmoney = result(formValues, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external';
    const isNetwork = fromEmoney && toOtherBank;
    if (this.state.scheduled) {
      goToSchedule(payee, formValues);
    } else {
      if (getPayeeType(payee, isNetwork) === 'internal' || toEmoney || isNetwork) {
        if ((isEmpty(formValues.currency)) || (formValues.currency.name === 'IDR')) {
          goToSummary(payee, getCurrency, currencyRate, formValues);
        } else {
          const amount = parseInt(result(formValues, 'amount', 0));
          const toIDR = parseInt(result(currencyRate, 'toIDR', 0));
          const realAmount = amount * toIDR;
          const newformValues = {...formValues, amount: realAmount};
          goToSummary(payee, newformValues, getCurrency, currencyRate, formValues);
        }
      } else {
        goToPaymentMethod(payee, formValues, getCurrency, currencyRate);
      }
    }
  }
  selectSourceAcc = () => {
    const {getSourceAcc, navigation} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    getSourceAcc(payee);
  }

  amountNormalise = (name)  => {
    const {formValues, getCurrency, setAmount} = this.props;
    const amtVal = parseInt(result(formValues, 'amount', 0));
    const currency = result(name, 'name', '');
    const currrencyList = groupBy(getCurrency, 'currency');
    if (currency === 'IDR' || isEmpty(name)) {
      const totalVal = amtVal;
      setAmount(totalVal);
    } else {
      if (currency === 'USD') {
        const sellRate = parseInt(result(currrencyList, 'USD.0.sellRate', 0));
        const totalVal = amtVal / sellRate;
        setAmount(totalVal);
      } else if (currency === 'EUR') {
        const sellRate = parseInt(result(currrencyList, 'EUR.0.sellRate', 0));
        const totalVal = amtVal / sellRate;
        setAmount(totalVal);
      } else if (currency === 'AUD') {
        const sellRate = parseInt(result(currrencyList, 'AUD.0.sellRate', 0));
        const totalVal = amtVal / sellRate;
        setAmount(totalVal);
      } else if (currency === 'JPY') {
        const sellRate = parseInt(result(currrencyList, 'JPY.0.sellRate', 0));
        const totalVal = amtVal / sellRate;
        setAmount(totalVal);
      } else if (currency === 'SGD') {
        const sellRate = parseInt(result(currrencyList, 'SGD.0.sellRate', 0));
        const totalVal = amtVal / sellRate;
        setAmount(totalVal);
      } else {
        const totalVal = amtVal;
        setAmount(totalVal);
      }
    }

    setAmount();
  }

  render () {
    const {navigation, accountList, formValues, appConfig, unregisteredName, setAmount, getCurrency, chargeList} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(chargeList, 'transfer', []);
    const prkList = result(appConfig, 'prkPrefixCSV', '');
    const accounts = payee.name === unregisteredName && startsWith(payee.accountNumber, '3808') ? [find(accountList, {accountType: 'emoneyAccount'})] : accountList;
    const disabled = isEmpty(result(formValues, 'myAccount', {}));
    const fromEmoney = result(formValues, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external';
    const isNetwork = fromEmoney && toOtherBank;
    const accountBalance = getAccountAmount(result(formValues, 'myAccount', {}));
    const errors = [];
    const maxAmountError = isNetwork ? validateMaxTransferNetwork(formValues.amount, transferChargeConfig) : validateMaxTransferAmount(formValues.amount, transferChargeConfig);
    const passValidateAmount = isPrk(prkList, result(formValues, 'myAccount', {}));
    const currency = result(payee, 'currency', '');
    const currencyTarget = ['IDR', currency];
    const currencyRate = [];
    const currrencyList = groupBy(getCurrency, 'currency', []);
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const validateOwnAccount = validateMaxTransactionAmount(formValues.amount, result(appConfig, 'tokenConfig', []), result(payee, 'transferType', ''));
    if ((isEmpty(formValues.currency)) || (formValues.currency.name === 'IDR')) {
      const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount)
    || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1000) ? (isInRange(1000, accountBalance, formValues.amount)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRange(1000, accountBalance, formValues.amount) : amount;
    } else {
      const amount = passValidateAmount ? undefined : (validateBalance(accountBalance, formValues.amount)
    || maxAmountError);
      errors['amountLess'] = (formValues.amount < 1) ? (isInRange(1, accountBalance, formValues.amount)) : undefined;
      errors['amount'] = isOwnAccount ? validateOwnAccount || isInRange(1, accountBalance, formValues.amount) : amount;
    }

    if (currency === 'USD') {
      const buyRate = parseInt(result(currrencyList, 'USD.0.buyRate', 0));
      const sellRate = parseInt(result(currrencyList, 'USD.0.sellRate', 0));
      const fromIDR = 1 / sellRate;
      const toIDR = 1 * buyRate;
      currencyRate['toIDR'] = toIDR;
      currencyRate['fromIDR'] = fromIDR;
    } else if (currency === 'EUR') {
      const buyRate = parseInt(result(currrencyList, 'EUR.0.buyRate', 0));
      const sellRate = parseInt(result(currrencyList, 'EUR.0.sellRate', 0));
      const fromIDR = 1 / sellRate;
      const toIDR = 1 * buyRate;
      currencyRate['toIDR'] = toIDR;
      currencyRate['fromIDR'] = fromIDR;
    } else if (currency === 'AUD') {
      const buyRate = parseInt(result(currrencyList, 'AUD.0.buyRate', 0));
      const sellRate = parseInt(result(currrencyList, 'AUD.0.sellRate', 0));
      const fromIDR = 1 / sellRate;
      const toIDR = 1 * buyRate;
      currencyRate['toIDR'] = toIDR;
      currencyRate['fromIDR'] = fromIDR;
    } else if (currency === 'JPY') {
      const buyRate = parseInt(result(currrencyList, 'JPY.0.buyRate', 0));
      const sellRate = parseInt(result(currrencyList, 'JPY.0.sellRate', 0));
      const fromIDR = 1 / sellRate;
      const toIDR = 1 * buyRate;
      currencyRate['toIDR'] = toIDR;
      currencyRate['fromIDR'] = fromIDR;
    } else if (currency === 'SGD') {
      const buyRate = parseInt(result(currrencyList, 'SGD.0.buyRate', 0));
      const sellRate = parseInt(result(currrencyList, 'SGD.0.sellRate', 0));
      const fromIDR = 1 / sellRate;
      const toIDR = 1 * buyRate;
      currencyRate['toIDR'] = toIDR;
      currencyRate['fromIDR'] = fromIDR;
    } else {
      currencyRate['toIDR'] = 0;
      currencyRate['fromIDR'] = 0;
    }

    return (
      <DecoratedFundTransferPayment accountList={accounts} onNextPress={this.onNext} payee={payee} getSourceAcc={this.selectSourceAcc}
        formValues={formValues} tokenConfig={tokenConfig} checkboxChange={this.checkboxChange}
        transferChargeConfig={transferChargeConfig} prkList={prkList} amountChange={this.amountChange} disabled={disabled} errors={errors} setAmount={setAmount} currencyTarget={currencyTarget} amountNormalise={this.amountNormalise} currencyRate={currencyRate}/>
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
  getCurrency: result(state, 'currencyRates', []),
  chargeList: result(state, 'chargeList', [])
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
  goToSchedule: (payee, formValues) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferSchedule',
      params: {formValues, payee}
    }));
  },
  goToSummary: (payee, formValues, getCurrency, currencyRate, newformValues) => {
    dispatch(confirmTransfer(formValues, payee, getCurrency, currencyRate, newformValues, 'fundTransfer'));
  },
  getSourceAcc: (payee) => {
    dispatch(NavigationActions.navigate({
      routeName: 'TransferSourceAccount',
      params: {formName: 'fundTransfer', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee}
    }));
  },
  setAmount: (totalVal) => {
    dispatch(change('fundTransfer', 'amount', totalVal));
  },
  getValas: () => dispatch(getValas()),
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(FundTransferPaymentPage);
export default connectedTransfer;
