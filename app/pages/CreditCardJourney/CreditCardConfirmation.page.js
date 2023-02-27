import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {transfer} from '../../state/thunks/fundTransfer.thunks';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, couponCustomer, removeCoupon, getSimasPoinLogin} from '../../state/thunks/common.thunks';
import CreditCardConfirmation from '../../components/CreditCardJourney/CreditCardConfirmation.component';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'CreditCardConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, formValues, payee, shouldSendSmsOtp, isLogin}) => {
    const isNewPayee = !payee.id;
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: isNewPayee};
    const isOwnAccount = false;
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (isNewPayee === true) {
          dispatch(getSimasPoinLogin(params));
        } else {
          triggerAuth(formValues.amount, isNewPayee, isOwnAccount, 'AuthCC', params, true);
        }
      } else {
        dispatch(getSimasPoinLogin(params));
      }
    } else {
      triggerAuth(formValues.amount, isNewPayee, isOwnAccount, 'AuthCC', params, true);
    }
  }
};

const DecoratedCreditCardConfirmation = reduxForm(formConfig)(CreditCardConfirmation);

class CreditCardConfirmationPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isConnected: PropTypes.bool,
    triggerAuth: PropTypes.func,
    payees: PropTypes.array,
    biller: PropTypes.array,
    transfer: PropTypes.func,
    doTransfer: PropTypes.func,
    resData: PropTypes.object,
    checkCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    isLogin: PropTypes.bool,
  };
  state={
    voucherDescription: '',
  }

  componentWillReceiveProps (newProps) {
    this.setState({voucherDescription: result(newProps, 'couponUse', '')});
  }

  doTransfer = () => {
    const {navigation, transfer, isLogin} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const data = result(navigation, 'state.params.resData', {});
    const isBfr = isLogin ? '' : true;
    const resData = isLogin ? data : {...data, isBfr};
    transfer(formValues, payee, resData);
  }

  goToCoupon = () => {
    const {navigation, checkCoupon} = this.props;
    const amount = result(navigation, 'state.params.amount', 0);
    const typeBiller = '1';
    checkCoupon(amount, typeBiller);
  }

  render () {
    const {navigation, isConnected, triggerAuth, payees, biller, removeCoupon, isLogin} = this.props;
    const navParams = navigation.state.params;
    const props = {triggerAuth, isConnected, payees, biller};
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    return (<DecoratedCreditCardConfirmation doTransfer={this.doTransfer} removeCoupon={removeCoupon} couponUse={this.state.voucherDescription} goToCoupon={this.goToCoupon} shouldSendSmsOtp={shouldSendSmsOtp} isLogin={isLogin} {...props} {...navParams} />);
  }
}

const mapStateToProps = (state) => ({
  isConnected: result(state, 'networkStatus.isConnected', true),
  couponUse: result(state, 'couponCheck.description', ''),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData) => dispatch(transfer(values, payee, 'creditCard', resData)),
  checkCoupon: (dataValue, typeBiller) => dispatch(couponCustomer(dataValue, typeBiller)),
  removeCoupon: () => dispatch(removeCoupon()),
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(CreditCardConfirmationPage);
export default connectedCreditCardConfirmation;
