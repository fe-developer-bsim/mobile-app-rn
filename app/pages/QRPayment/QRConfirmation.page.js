import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {qrInvoicePayment} from '../../state/thunks/qrpayment.thunk';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate, resendBillPayOTP} from '../../state/thunks/common.thunks';

import QRConfirmation from '../../components/QRPayment/QRConfirmation.component';

const formConfig = {
  form: 'QRConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, props) => {
    const {triggerAuth, payBill, totalAmountWithTip} = props;
    const params = {onSubmit: payBill, amount: totalAmountWithTip, isOtp: false};
    triggerAuth(totalAmountWithTip, 'Auth', params);
  }
};

const DecoratedForm = reduxForm(formConfig)(QRConfirmation);

class QRConfirmationPage extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    triggerAuth: PropTypes.func,
    navigation: PropTypes.object,
    setTipAmount: PropTypes.func,
    deleteQRInvoice: PropTypes.func,
    resetManualTip: PropTypes.func,
    userMobileNumber: PropTypes.string,
    qrInvoicePayment: PropTypes.func,
    addCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    selectedCoupon: PropTypes.number,
    QRInvoice: PropTypes.object
  };

  payBill = () => {
    const {navigation, qrInvoicePayment} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const amount = result(navParams, 'prop.totalAmount', '');
    const selectedCoupon = result(navParams, 'prop.selectedCoupon', '');
    const discount = result(navParams, 'prop.discount', '');
    const value = result(navParams, 'value', {});
    const totalCouponAmount = result(navParams, 'prop.totalCouponAmount', '');
    const tipAmount = result(value, 'tipAmount.value', 0) === 'manual' ? result(value, 'tipAmountManual', 0) : result(value, 'tipAmount.value', 0);
    const totalAmount = amount + Number(tipAmount); // discounted amount + tips
    qrInvoicePayment(value, totalAmount, selectedCoupon, discount, totalCouponAmount);
  }

  render () {
    const {QRInvoice, triggerAuth, navigation,  ...extraProps} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const prop = result(navigation, 'state.params.prop', {});
    const value = result(navigation, 'state.params.value', {});
    const amount = result(prop, 'totalAmount', '');
    const tipAmount = result(value, 'tipAmount.value', 0) === 'manual' ? result(value, 'tipAmountManual', 0) : result(value, 'tipAmount.value', 0);
    const totalAmount = amount + Number(tipAmount);
    return <DecoratedForm QRInvoice={QRInvoice} {...navParams} {...prop}
      triggerAuth={triggerAuth} payBill={this.payBill} totalAmountWithTip={totalAmount} tipAmount={tipAmount} {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  QRInvoice: result(state, 'QRInvoice', {}),
  userId: result(state, 'user.profile.customer.id', 0),
  transRefNum: result(state, 'transRefNum', ''),
  config: result(state, 'config.tokenConfig', []),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', '')
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, routeName, params) => dispatch(triggerAuthNavigate('qr', billAmount, false, routeName, params)),
  resendBillPayOTP: () => dispatch(resendBillPayOTP('qr')),
  qrInvoicePayment: (value, totalAmount, selectedCoupon, discount, totalCouponAmount) => dispatch(qrInvoicePayment({...value, totalAmount, selectedCoupon, discount, totalCouponAmount}))
});

const connectedQRInvoiceDetail = connect(mapStateToProps, mapDispatchToProps)(QRConfirmationPage);
export default connectedQRInvoiceDetail;
