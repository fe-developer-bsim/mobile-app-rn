import React from 'react';
import PropTypes from 'prop-types';
import SimasTaraSimulationComponent, {fields} from '../../components/SimasTara/SimasTaraSimulation.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {reduxForm} from 'redux-form';
import moment from 'moment';
import {getTransferPossibleAccounts, getAllAccountsExcept, generateInterestSimasTara} from '../../utils/transformer.util';
import {change} from 'redux-form';
import {validateInputSimasTara, validateRequiredFields} from '../../utils/validator.util';

const simasTaraConfig = {
  form: 'SimasTaraSimulation',
  destroyOnUnmount: true,
  initialValues: {
    AccNo: {},
    amount: '100000'
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.AMOUNT])
    };
    return {
      amount: validateInputSimasTara(values.amount),
      ...errors,
    };
  },
};

const mapStateToProps = (state) => ({
  initialDeposit: result(state, 'savingData.productDeposit', ''),
  formValues: result(state, 'form.SimasTaraSimulation.values', {}),
  formValuesYear: result(state, 'form.SimasTaraSimulation.values.periodList', {}),
  periodList: result(state, 'configEForm.listConfigEform.simasTaraAccountPeriod', []),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
});

const mapDispatchToProps = (dispatch, navigation) => ({
  getSourceAcc: (savingProductType) => {
    dispatch(NavigationActions.navigate({
      routeName: 'SavingSourceAccount',
      params: {formName: 'SimasTaraSimulation', fieldName: 'AccNo', sourceType: savingProductType}
    }));
  },
  showAlert: (amountSlider, interest, estimatedTargetAmount, maturityDate, counting, ratePercent) => () => {
    dispatch(NavigationActions.navigate({routeName: 'SimasTaraSummaryPage',
      params: {amountSlider: amountSlider, interest: interest, estimatedTargetAmount: estimatedTargetAmount, maturityDate: maturityDate, counting: counting, ratePercent: ratePercent},
      navigation, amountSlider, interest, estimatedTargetAmount, maturityDate}));
  },
  getConfirmation: (values) => {
    dispatch(change('SimasTaraSimulation', 'AccNo', values));
  },
  getAmount: (amountFill) => {
    dispatch(change('SimasTaraSimulation', 'amount', amountFill));
  },
});

const SimasTaraSimulation = reduxForm(simasTaraConfig)(SimasTaraSimulationComponent);

class SimasTaraSimulationClass extends React.Component {

  static propTypes = {
    getSourceAcc: PropTypes.func,
    showAlert: PropTypes.func,
    savingProductType: PropTypes.string,
    initialDeposit: PropTypes.string,
    formValues: PropTypes.object,
    periodList: PropTypes.array,
    formValuesYear: PropTypes.object,
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    getAmount: PropTypes.func,
  }

  state = {
    value: 100000,
    counting: 1,
  }

  countDown=() => {
    if (this.state.counting > 1) {
      this.setState({counting: this.state.counting - 1});
    }
  }
  countUp=() => {
    const {periodList} = this.props;
    const countYears = size(periodList);
    if (this.state.counting < countYears) {
      this.setState({counting: this.state.counting + 1});
    }
  }

  sliderChange = (amount) => {
    const {getAmount} = this.props;
    const amountFill = amount.toString();
    getAmount(amountFill);
  }

  getSourceAccList = () => {
    const {getSourceAcc, savingProductType} = this.props;
    getSourceAcc(savingProductType);
  }

  selectAccount = (values) => {
    const {getConfirmation} = this.props;
    getConfirmation(values);
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amount' === typeField) {
      if (isEmpty(validateInputSimasTara(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {initialDeposit, formValues, periodList, formValuesYear, showAlert, navigation, accounts} = this.props;
    const filteredAccount = getAllAccountsExcept(accounts);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const monthPlus = new Date(year, month + (this.state.counting * 12), day);
    const maturityDate = moment(monthPlus).format('DD MMM YYYY');
    const deposit = parseInt(initialDeposit);
    const disabled = deposit === 0 ? false : isEmpty(result(formValues, 'AccNo', {}));
    const balances = result(formValues, 'AccNo.balances.availableBalance', '');
    const amountSlider = parseInt(result(formValues, 'amount', 0)) || 0;
    const isLessAmount = balances === '' ? false : amountSlider > balances;
    const bulan = this.state.counting * 12;
    const ratePercent = parseFloat(result(navigation, 'state.params.interestRateSimasTara', 0));
    const hasil = generateInterestSimasTara(bulan, ratePercent, amountSlider);
    const estimatedTargetAmount = result(hasil, 'totalGross', '');
    const interest = result(hasil, 'bungaGrossTotal', '');

    return <SimasTaraSimulation getSourceAccList={this.getSourceAccList} sliderChange={this.sliderChange} amountSlider={amountSlider}
      showAlert={showAlert} formValuesYear={formValuesYear} formValues={formValues} initialDeposit={initialDeposit} disabled={disabled} periodList={periodList}
      interest={interest} estimatedTargetAmount={estimatedTargetAmount} maturityDate={maturityDate} counting={this.state.counting} countDown={this.countDown} countUp={this.countUp} isLessAmount={isLessAmount}
      navigation={navigation} filteredAccount={filteredAccount} getConfirmation={this.selectAccount} validationInput={this.validationInput()} ratePercent={ratePercent}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SimasTaraSimulationClass);
