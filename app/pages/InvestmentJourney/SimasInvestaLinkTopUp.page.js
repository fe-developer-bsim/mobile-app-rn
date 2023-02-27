import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimasInvestaLinkTopUp, {fields} from '../../components/InvestmentJourney/SimasInvestaLinkTopUp.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {isEmpty, groupBy, lowerCase} from 'lodash';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {getAmountSimasInvestLink, getPayeeNameSIL, getCurrencyMultiSil} from '../../state/thunks/dashboard.thunks';
import {validateRequiredString, validateRequiredFields, validateNumber, validateBalance, isInRange} from '../../utils/validator.util';

const formConfig = {
  form: 'investasiLinkTopUp',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {infoPolis, formValues}) => {
    dispatch(getPayeeNameSIL(infoPolis, formValues, values));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredString(values, [fields.AMOUNT])
    };
    const fieldArrowError = {
      ...validateRequiredFields(values, [fields.WORK, fields.INCOME, fields.FUND, fields.MATURITYTYPE])
    };
    return {
      ...errors,
      ...fieldArrowError
    };
  }
};

const SimasInvestaLink = reduxForm(formConfig)(SimasInvestaLinkTopUp);

class SimasInvestaLinkPage extends Component {
  static propTypes = {
    showAlert: PropTypes.func,
    navigation: PropTypes.object,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.func,
    inquirySIL: PropTypes.object,
    flagCrossCurrency: PropTypes.string,
    amountValue: PropTypes.number,
    getCurrencyNBSil: PropTypes.object,
    getCurrencyMultiSil: PropTypes.func,
    isSilIdrUsd: PropTypes.string,
    nameCurrency: PropTypes.object,
    currencySil: PropTypes.array,
    currencyRate: PropTypes.array,
    myAccount: PropTypes.array,
    monthIncome: PropTypes.object
  }

  state = {
    value: 1000000
  }

  sliderChange = (value) => {
    this.setState({value});
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amount' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  getSourceAccountSil=() => {
    const {navigation, getSourceAcc, flagCrossCurrency} = this.props;
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    const mataUang = result(infoPolis, 'mataUang', '');
    const flagCross = lowerCase(flagCrossCurrency) !== 'inactive';
    getSourceAcc({}, {}, mataUang, flagCross);
  }

  render () {
    const {showAlert, navigation, formValues, inquirySIL, amountValue, getCurrencyNBSil, currencySil, nameCurrency, myAccount, monthIncome} = this.props;
    const summaryDetail = result(navigation, 'state.params.summaryDetail', {});
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    const accountBalance = result(formValues, 'myAccount.balances.availableBalance', {});
    const currrencyList = groupBy(currencySil, 'currency');
    const currencyIcon = result(infoPolis, 'mataUang', '');
    const silBaseTopupIDR = parseInt(result(inquirySIL, 'silBaseTopupIDR', ''));
    const silBaseTopupUSD = parseInt(result(inquirySIL, 'silBaseTopupUSD', ''));
    const errors = [];
    const currencyRate = [];
    const currency = result(formValues, 'myAccount.currency', '');
    const checkedAmount = [];
    if (currencyIcon === 'IDR' && currency === 'USD') {
      const buyRate = parseInt(result(currrencyList, 'USD.0.buyRate', 0));
      const toIDR = amountValue / buyRate;
      currencyRate['amount'] = toIDR;
      const amounts = validateBalance(accountBalance, toIDR);
      errors['amountLess'] = toIDR < accountBalance ? (isInRange(toIDR, accountBalance, toIDR)) : undefined;
      errors['amount'] = amounts;
      checkedAmount['checkedAmount'] = toIDR < silBaseTopupUSD;
    } else if (currencyIcon === 'USD' && currency === 'IDR') {
      const sellRate = parseInt(result(currrencyList, 'USD.0.sellRate', 0));
      const fromIDR = amountValue * sellRate;
      const amounts = validateBalance(accountBalance, fromIDR);
      errors['amountLess'] = fromIDR < accountBalance ? (isInRange(fromIDR, accountBalance, fromIDR)) : undefined;
      errors['amount'] = amounts;
      checkedAmount['checkedAmount'] = fromIDR < silBaseTopupIDR;
      currencyRate['amount'] = fromIDR;
    } else if (currencyIcon === 'USD' && currency === 'USD') {
      const amounts = validateBalance(accountBalance, amountValue);
      errors['amountLess'] = amountValue < accountBalance ? (isInRange(amountValue, accountBalance, amountValue)) : undefined;
      errors['amount'] = amounts;
      checkedAmount['checkedAmount'] = amountValue < silBaseTopupUSD;
    } else if (currencyIcon === 'IDR' && currency === 'IDR') {
      const amounts = validateBalance(accountBalance, amountValue);
      errors['amountLess'] = amountValue < accountBalance ? (isInRange(amountValue, accountBalance, amountValue)) : undefined;
      errors['amount'] = amounts;
      checkedAmount['checkedAmount'] = amountValue < silBaseTopupIDR;
    }

    return <SimasInvestaLink showAlert={showAlert} inquirySIL={inquirySIL} formValues={formValues} summaryDetail={summaryDetail} getSourceAcc={this.getSourceAccountSil}
      infoPolis={infoPolis} sliderChange={this.sliderChange} amountSlider={this.state.value} validationInput={this.validationInput} amountValue={amountValue}
      getCurrencyNBSil={getCurrencyNBSil} getCurrencyMultiSil={getCurrencyMultiSil} nameCurrency={nameCurrency} currencyIcon={currencyIcon} errors={errors}
      currencySil={currencySil} currencyRate={currencyRate} myAccount={myAccount} checkedAmount={checkedAmount} monthIncome={monthIncome} silBaseTopupIDR={silBaseTopupIDR} silBaseTopupUSD={silBaseTopupUSD}/>;
  }
}

const mapDispatchToProps = (dispatch, navigation) => ({
  showAlert: (amountSlider) => () => {
    dispatch(getAmountSimasInvestLink(navigation, amountSlider));
  },
  getSourceAcc: (payee, isTopup, currency, isOpenCrossCurrency) => {
    dispatch(NavigationActions.navigate({
      routeName: 'TransferAccountSIL',
      params: {formName: 'silTopUpAccount', fieldName: 'myAccount', sourceType: 'fundTransfer',
        payee: payee, isTopup: isTopup, isOpenCrossCurrency: isOpenCrossCurrency,
        currency: currency
      }
    }
    ));
  },
  getCurrencyMultiSil: (getCurrencyNBSil) => () => {
    dispatch(getCurrencyMultiSil(getCurrencyNBSil));
  },
});

const mapStateToProps = (state) => ({
  selectedAccount: result(state, 'form.MobilePostpaidPaymentForm.values.accountNumber', {}),
  formValues: result(state, 'form.silTopUpAccount.values', {}),
  inquirySIL: result(state, 'inquirySIL', {}),
  flagCrossCurrency: result(state, 'config.flag.flagCrossCurrency', 'ACTIVE'),
  getCurrencyNBSil: result(state, 'getCurrencyNBSil', {}),
  nameCurrency: result(state, 'form.silTopUpAccount.values.myAccount.currency'),
  amountValue: result(state, 'form.investasiLinkTopUp.values.amount', {}),
  currencySil: result(state, 'getCurrencyNBSil.currencyRateList', {}),
  myAccount: result(state, 'form.silTopUpAccount.values.myAccount', {}),
  monthIncome: result(state, 'form.investasiLinkTopUp.values.income', {}),

});

export default connect(mapStateToProps, mapDispatchToProps)(SimasInvestaLinkPage);