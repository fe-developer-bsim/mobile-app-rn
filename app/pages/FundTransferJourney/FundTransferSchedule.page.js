import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import FundTransferSchedule, {fields} from '../../components/FundTransferJourney/FundTransferSchedule.component';
import result from 'lodash/result';
import {validateRequiredFields, validateRequiredString} from '../../utils/validator.util';
import {getTransferPossibleAccounts, getPayeeType} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import moment from 'moment';
import {confirmTransfer, confirmTransferRemittance} from '../../state/thunks/fundTransfer.thunks';

const formConfig = {
  form: 'fundTransferSchedule',
  destroyOnUnmount: true,
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.SCHEDULE_FIELD]),
      ...validateRequiredString(values, [fields.SCHEDULE_DATE])
    };
    return {
      ...errors,
    };

  }
};

const DecoratedFundTransferSchedule = reduxForm(formConfig)(FundTransferSchedule);

class FundTransferSchedulePage extends Component {
  state = {
    times: 1,
    scheduleTime: ''
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
    formValuesPayment: PropTypes.object,
    currentLanguage: PropTypes.string,
    formValuesPaymentRemittance: PropTypes.object
  };

  onNext = () => {
    const {goToPaymentMethod, formValues, navigation, goToSummary, formValuesPayment, formValuesPaymentRemittance} = this.props;
    const {times, scheduleTime} = this.state;
    const payee = result(navigation, 'state.params.payee', {});
    const isValas = result(navigation, 'state.params.isValas', {});
    const currencyRate = result(navigation, 'state.params.currencyRate', {});
    const getCurrency = result(navigation, 'state.params.getCurrency', {});
    const schedule = scheduleTime === 'oneTime' ? '' : scheduleTime === 'everyday' ? '1' : scheduleTime === 'onceAWeek' ? '2' : scheduleTime === 'onceEveryTwoWeeks' ? '3' : '4';
    const transferTime = result(formValues, 'transferTime', '');
    const isRemittance = result(navigation, 'state.params.isRemittance', false);
    const values = isRemittance ? {schedule, times, transferTime, ...formValuesPaymentRemittance} : {schedule, times, transferTime, ...formValuesPayment};
    const toEmoney = result(payee, 'payeeType.value', 'bank') === 'emoney' || result(payee, 'accountType', '') === 'emoneyAccount';
    const fromEmoney = isRemittance ? result(formValuesPaymentRemittance, 'myAccount.accountType', 'bank') === 'emoneyAccount' : result(formValuesPayment, 'myAccount.accountType', 'bank') === 'emoneyAccount';
    const toOtherBank = getPayeeType(payee) === 'external' || getPayeeType(payee) === 'remmitance';
    const isNetwork = fromEmoney && toOtherBank;
    const dataTransactionRemittance = result(navigation, 'state.params.dataTransactionRemittance', '');
    if (getPayeeType(payee) === 'internal' || toEmoney || isNetwork) {
      goToSummary(payee, values, getCurrency, currencyRate, {}, isValas, null, isRemittance);
    } else if (isRemittance) {
      goToSummary(payee, values, getCurrency, currencyRate, {}, isValas, null, isRemittance, dataTransactionRemittance);
    } else {
      goToPaymentMethod(payee, values,  getCurrency, currencyRate, {}, isValas);
    }
  }

  addTimes = () => {
    const times = this.state.times;
    this.setState({times: times + 1});
  }

  minusTimes = () => {
    const times = this.state.times;
    this.setState({times: times - 1});
  }

  changeScheduleTime = (itemValue) => {
    const sched = result(itemValue, 'value', '');
    this.setState({scheduleTime: sched});
  }

  render () {
    const {times, scheduleTime} = this.state;
    const {currentLanguage} = this.props;
    const appTime = new Date();
    const gapTime = result(this, 'props.gapTimeServer', 0);
    const serverTime = moment(appTime).add(gapTime, 'seconds');
    const serverTimeNew = moment(serverTime).add(1, 'days');
    return (
      <DecoratedFundTransferSchedule onNextPress={this.onNext} times={times} currentLanguage={currentLanguage} scheduleTime={scheduleTime}
        addTimes={this.addTimes} minusTimes={this.minusTimes} changeScheduleTime={this.changeScheduleTime} serverTimeNew={serverTimeNew}/>
    );
  }
}

const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.fundTransferSchedule.values', {}),
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  amount: result(state, 'form.fundTransfer.values.amount'),
  formValuesPayment: result(state, 'form.fundTransfer.values', {}),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  formValuesPaymentRemittance: result(state, 'form.remittanceTransfer.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToPaymentMethod: (payee, formValues) => {
    dispatch(NavigationActions.navigate({
      routeName: 'FundTransferMethod',
      params: {formValuesSchedule: formValues, payee}}));
  },
  goToSummary: (payee, formValues, getCurrency, currencyRate, newformValues, isValas, isKyc, isRemittance, dataTransactionRemittance) => {
    if (isRemittance) {
      dispatch(confirmTransferRemittance(formValues, payee, 'fundTransferRemittance', getCurrency, currencyRate, newformValues,  isValas, isKyc, dataTransactionRemittance));
    } else {
      dispatch(confirmTransfer(formValues, payee, 'fundTransfer', getCurrency, currencyRate, newformValues,  isValas, isKyc));
    }
  }
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(FundTransferSchedulePage);
export default connectedTransfer;