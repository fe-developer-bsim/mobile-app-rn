import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PaymentPolis, {fields} from '../../components/InvestmentJourney/SILPaymentBuyPolis.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {isEmpty, groupBy, lowerCase} from 'lodash';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {getPayeeNameSILNB} from '../../state/thunks/dashboard.thunks';
import {validateRequiredString, validateBalance, validateNumber, isInRange} from '../../utils/validator.util';

const formConfig = {
  form: 'buyPaymentSIL',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {myAccount, isSilIdrUsd, amount, inputPolisIndividu, currencyRate, nameCurrency}) => {
    const transferMode = 'inbank';
    dispatch(getPayeeNameSILNB(inputPolisIndividu, {myAccount, amount, transferMode, nameCurrency, currencyRate}, isSilIdrUsd));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredString(values, [fields.AMOUNT])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.buyPaymentSIL.values', {}),
  inquirySIL: result(state, 'inquirySIL', {}),
  flagCrossCurrency: result(state, 'config.flag.flagCrossCurrency', 'INACTIVE'),
  inputPolisIndividu: result(state, 'inputPolisIndividu', {}),
  myAccount: result(state, 'form.buyPaymentSIL.values.myAccount', {}),
  amount: result(state, 'form.SilIustrasiForm2.values.amount', ''),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  sourceOfFund: result(state, 'silStorage[4].dataBody.sourceOfFund', {}),
  currencySil: result(state, 'getCurrencyNBSil.currencyRateList', {}),
  nameCurrency: result(state, 'form.buyPaymentSIL.values.myAccount.currency'),
});

const SimasInvestaLink = reduxForm(formConfig)(PaymentPolis);

class PaymentBuyPolisSIL extends Component {  
  static propTypes = {
    navigation: PropTypes.object,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    inquirySIL: PropTypes.object,
    flagCrossCurrency: PropTypes.string,
    inputPolisIndividu: PropTypes.object,
    myAccount: PropTypes.array,
    isSilIdrUsd: PropTypes.string,
    amount: PropTypes.string,
    currencySil: PropTypes.array,
    nameCurrency: PropTypes.object,
    sourceOfFund: PropTypes.array
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


  getSourceAccountSil = () => () => {
    const {navigation, getSourceAcc, flagCrossCurrency, isSilIdrUsd} = this.props;
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    const mataUang = result(infoPolis, 'mataUang', '');
    const flagCross = lowerCase(flagCrossCurrency) !== 'inactive';
    getSourceAcc(mataUang, flagCross, isSilIdrUsd);
  }

  render () {
    const {navigation, formValues, inquirySIL, inputPolisIndividu, myAccount, 
      amount, isSilIdrUsd, currencySil, nameCurrency, sourceOfFund} = this.props;
    const summaryDetail = result(navigation, 'state.params.summaryDetail', {});
    const infoPolis = result(navigation, 'state.params.infyoPolis', {});
    const accountBalance = result(formValues, 'myAccount.balances.availableBalance', {});
    const disabled = isEmpty(result(formValues, 'myAccount', {}));
    const errors = [];
    const currrencyList = groupBy(currencySil, 'currency');
    const currencyRate = [];
    if (isSilIdrUsd === 'IDR' && nameCurrency === 'USD') {
      const buyRate = parseInt(result(currrencyList, 'USD.0.buyRate', 0));
      const toIDR = amount / buyRate;
      currencyRate['amount'] = toIDR;
      const amounts = validateBalance(accountBalance, toIDR);
      errors['amountLess'] = toIDR < accountBalance ? (isInRange(toIDR, accountBalance, toIDR)) : undefined;
      errors['amount'] = amounts;
    } else if (isSilIdrUsd === 'USD' && nameCurrency === 'IDR') {
      const sellRate = parseInt(result(currrencyList, 'USD.0.sellRate', 0));
      const fromIDR = amount * sellRate;
      const amounts = validateBalance(accountBalance, fromIDR);
      errors['amountLess'] = fromIDR < accountBalance ? (isInRange(fromIDR, accountBalance, fromIDR)) : undefined;
      errors['amount'] = amounts;
      currencyRate['amount'] = fromIDR;
    } else {
      const amounts = validateBalance(accountBalance, amount);
      errors['amountLess'] = amount < accountBalance ? (isInRange(amount, accountBalance, amount)) : undefined;
      errors['amount'] = amounts;
    }
    return <SimasInvestaLink inquirySIL={inquirySIL} formValues={formValues} summaryDetail={summaryDetail}
      getSourceAcc={this.getSourceAccountSil()} infoPolis={infoPolis} sliderChange={this.sliderChange}
      amountSlider={this.state.value} validationInput={this.validationInput} inputPolisIndividu={inputPolisIndividu}
      myAccount={myAccount} isSilIdrUsd={isSilIdrUsd} amount={amount} errors={errors} currencySil={currencySil}
      nameCurrency={nameCurrency} currencyRate={currencyRate} sourceOfFund={sourceOfFund} disabled={disabled}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSourceAcc: (currency, isOpenCrossCurrency, isSilIdrUsd) => {
    dispatch(NavigationActions.navigate({
      routeName: 'TransferAccountSIL',
      params: {formName: 'buyPaymentSIL', fieldName: 'myAccount', sourceType: 'fundTransfer', isOpenCrossCurrency: isOpenCrossCurrency, currency: currency, isSilIdrUsd: isSilIdrUsd}
    }));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(PaymentBuyPolisSIL);
