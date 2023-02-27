import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarInvestamaTopUp, {fields} from '../../components/InvestmentJourney/StarInvestamaTopUp.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {isEmpty, lowerCase} from 'lodash';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {getAmountSimasInvestLink, getPayeeNameStarInvestama} from '../../state/thunks/dashboard.thunks';
import {validateRequiredString, validateRequiredFields, validateNumber, validateBalance, isInRange} from '../../utils/validator.util';


const formConfig = {
  form: 'investasiStarLinkTopUp',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {formValues, infoPolis}) => {
    dispatch(getPayeeNameStarInvestama(infoPolis, formValues, values));
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

const StarInvestamaDetail = reduxForm(formConfig)(StarInvestamaTopUp);

class StarInvestamaPage extends Component {  
  static propTypes = {
    showAlert: PropTypes.func,
    navigation: PropTypes.object,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.func,
    inquiryData: PropTypes.object,
    flagCrossCurrency: PropTypes.string,
    amountValue: PropTypes.number,
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

  getSourceAccountStarInvestama=() => {
    const {navigation, getSourceAcc, flagCrossCurrency} = this.props;
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    const mataUang = result(infoPolis, 'mataUang', '');
    const flagCross = lowerCase(flagCrossCurrency) !== 'inactive';
    getSourceAcc({}, {}, mataUang, flagCross);
  }

  render () {
    const {showAlert, navigation, formValues, inquiryData, amountValue, monthIncome} = this.props;
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    const accountBalance = result(formValues, 'myAccount.balances.availableBalance', {});
    const errors = [];
    const amount = validateBalance(accountBalance, amountValue);
    const limitTopUp = parseInt(result(inquiryData, 'limitTopUp', ''));
    errors['amountLess'] = amountValue < accountBalance ? (isInRange(amountValue, accountBalance, amountValue)) : undefined;
    errors['amount'] = amount;
    errors['checkedAmount'] = amountValue < limitTopUp;
    return <StarInvestamaDetail showAlert={showAlert} inquiryData={inquiryData} formValues={formValues} getSourceAcc={this.getSourceAccountStarInvestama}
      infoPolis={infoPolis} sliderChange={this.sliderChange} amountSlider={this.state.value} validationInput={this.validationInput} amountValue={amountValue}
      errors={errors} monthIncome={monthIncome}/>;
  }
}

const mapDispatchToProps = (dispatch, navigation) => ({
  showAlert: (amountSlider) => () => {
    dispatch(getAmountSimasInvestLink(navigation, amountSlider));
  },
  getSourceAcc: (payee, isTopup, currency, isOpenCrossCurrency) => {
    dispatch(NavigationActions.navigate({
      routeName: 'TransferAccountStarInvestama',
      params: {formName: 'starInvestamaTopUpAccount', fieldName: 'myAccount', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup, isOpenCrossCurrency: isOpenCrossCurrency, currency: currency}
    }));
  },
});

const mapStateToProps = (state) => ({
  selectedAccount: result(state, 'form.MobilePostpaidPaymentForm.values.accountNumber', {}),
  formValues: result(state, 'form.starInvestamaTopUpAccount.values', {}),
  inquiryData: result(state, 'inquiryStarInvestama', {}),
  flagCrossCurrency: result(state, 'config.flag.flagCrossCurrencyStar', 'INACTIVE'),
  amountValue: result(state, 'form.investasiStarLinkTopUp.values.amount', 0),
  monthIncome: result(state, 'form.investasiStarLinkTopUp.values.income', {}),
});
export default connect(mapStateToProps, mapDispatchToProps)(StarInvestamaPage);
