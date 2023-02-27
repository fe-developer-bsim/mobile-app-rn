import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, getSimasPoinLogin} from '../../state/thunks/common.thunks';
import {transfer} from '../../state/thunks/fundTransfer.thunks';
import FundTransferConfirmation from '../../components/FundTransferJourney/FundTransferValasConfirmation.component';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'fundTransferValasConfirmation',
  destroyOnUnmount: true,
  initialValues: {
    refreshRateValue: {},
  },
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, payee, formValues, getCurrency, isLogin, shouldSendSmsOtp}) => {
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: payee.isNewPayee || shouldSendSmsOtp, getCurrency};
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (payee.isNewPayee === true) {
          dispatch(getSimasPoinLogin(params));
        } else {
          triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, shouldSendSmsOtp);
        }
      } else {
        dispatch(getSimasPoinLogin(params));
      }
    } else {
      triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, shouldSendSmsOtp);
    }
  }
};

const DecoratedFundTransferConfirmation = reduxForm(formConfig)(FundTransferConfirmation);

class FundTransferConfirmationPage extends Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    payee: PropTypes.object,
    transfer: PropTypes.func,
    resData: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    isLogin: PropTypes.bool,
    formRefreshRateValas: PropTypes.object,
    toggleSpreadMargin: PropTypes.bool,
    valasRefreshInterval: PropTypes.number,
  };

  doTransfer = () => {
    const {navigation, transfer} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    const isValas = result(navigation, 'state.params.isValas', false);
    const currencyRate = result(navigation, 'state.params.currencyRate', []);
    transfer(formValues, payee, resData, isValas, currencyRate);
  }

  render () {
    const {navigation, triggerAuth, appConfig, gapTimeServer, isLogin, formRefreshRateValas, toggleSpreadMargin, valasRefreshInterval} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData.transferTransaction', {});
    const resDataRecurr = result(navigation, 'state.params.resData', {});
    const getCurrency = result(navigation, 'state.params.getCurrency', []);
    const currencyRate = result(navigation, 'state.params.currencyRate', []);
    const isValas = result(navigation, 'state.params.isValas', false);
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    const rateChangeValas = result(formRefreshRateValas, 'rateChange', false);
    return <DecoratedFundTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData}
      config={appConfig} gapTime={gapTimeServer} getCurrency={getCurrency}
      currencyRate={currencyRate} isValas={isValas} isLogin={isLogin} shouldSendSmsOtp={shouldSendSmsOtp}
      resDataRecurr={resDataRecurr} formRefreshRateValas={formRefreshRateValas} rateChangeValas={rateChangeValas} toggleSpreadMargin={toggleSpreadMargin} valasRefreshInterval={valasRefreshInterval}/>;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params, shouldSendSmsOtp) => {
    if (isNewPayee || shouldSendSmsOtp) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData, isValas, currencyRate) => dispatch(transfer(values, payee, 'fundTransfer', resData, isValas, currencyRate)),
});

const mapStateToProps = (state) => ({
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  isLogin: !isEmpty(result(state, 'user', {})),
  formRefreshRateValas: result(state, 'form.fundTransferValasConfirmation.values.refreshRateValue', {}),
  toggleSpreadMargin: result(state, 'config.toggleSpreadMargin', true),
  valasRefreshInterval: result(state, 'config.valasRefreshInterval', 0),
});

const connectedFundTransferConfirmation = connect(mapStateToProps, mapDispatchToProps)(FundTransferConfirmationPage);
export default connectedFundTransferConfirmation;