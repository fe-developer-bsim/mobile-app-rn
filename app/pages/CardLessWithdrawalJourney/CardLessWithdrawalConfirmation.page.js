import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, getSimasPoinLogin} from '../../state/thunks/common.thunks';
import {transfer} from '../../state/thunks/fundTransfer.thunks';
import CardLessWithdrawalConfirmation from '../../components/CardLessWithdrawalJourney/CardLessWithdrawalConfirmation.component';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'CardLessWithdrawalConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, payee, formValues, isOwnAccount, isLogin, shouldSendSmsOtp}) => {
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: payee.isNewPayee};
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (payee.isNewPayee === true) {
          dispatch(getSimasPoinLogin(params));
        } else {
          triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, true);
        }
      } else {
        dispatch(getSimasPoinLogin(params));
      }
    } else {
      triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, true);
    }
  }
};

const DecoratedCardLessWithdrawalConfirmation = reduxForm(formConfig)(CardLessWithdrawalConfirmation);

class CardLessWithdrawalConfirmationPage extends Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    payee: PropTypes.object,
    transfer: PropTypes.func,
    appConfig: PropTypes.object,
    prefixCardlessWithdrawal: PropTypes.string,
    resData: PropTypes.object,
    isLogin: PropTypes.bool,
  };

  doTransfer = () => {
    const {navigation, transfer} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    transfer(formValues, payee, resData);
  }

  render () {
    const {navigation, triggerAuth, appConfig, isLogin} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const prefixCardlessWithdrawal = result(appConfig, 'cardlessWithdrawalPrefix', '');
    const resData = result(navigation, 'state.params.resData', {});
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    return <DecoratedCardLessWithdrawalConfirmation currentDate={new Date().toDateString()}
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData}
      prefixCardlessWithdrawal={prefixCardlessWithdrawal} shouldSendSmsOtp={shouldSendSmsOtp} isLogin={isLogin}/>;
  }
}

const mapStateToProps = (state) => ({
  appConfig: result(state, 'config', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData) => dispatch(transfer(values, payee, 'cardlessWithdrawal', resData))
});

const connectedCardLessWithdrawalConfirmation = connect(mapStateToProps, mapDispatchToProps)(CardLessWithdrawalConfirmationPage);
export default connectedCardLessWithdrawalConfirmation;
