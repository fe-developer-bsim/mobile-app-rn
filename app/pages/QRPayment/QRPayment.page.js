import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import QRPaymentPayment from '../../components/QRPayment/QRPayment.component';
import result from 'lodash/result';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getTransferPossibleAccounts, getAccountAmount} from '../../utils/transformer.util';
import split from 'lodash/split';
import isArray from 'lodash/isArray';
import {qrPayment} from '../../state/thunks/qrpayment.thunk';
import {triggerAuth, resendBillPayOTP} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'QRPayment',
  destroyOnUnmount: true,
  initialValues: {
    myAccount: {},
  },
  validate: (values, {invoice}) => {
    const selectedAccountBalance = getAccountAmount(values.myAccount);
    const amount = (isArray(invoice) && invoice[3] !== '') ? invoice[3] : '';
    let errors = {
      myAccount: validateBalance(selectedAccountBalance, amount),
      ...validateRequiredFields(values, ['myAccount']),
    };
    return errors;
  },
  onSubmit (values, dispatch, {invoice, transRefNum}) {
    dispatch(qrPayment({...values, invoice, transRefNum}));
  }
};

const DecoratedQRPayment = reduxForm(formConfig)(QRPaymentPayment);

class QRPaymentPage extends Component {

  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
  };

  render () {
    const {navigation} = this.props;
    const invoice = result(navigation, 'state.params.invoice', '');
    const invoiceDetail = split(invoice, '#');
    return (
      <DecoratedQRPayment
        invoice={invoiceDetail}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRPayment.values', {}),
  transRefNum: state.transRefNum,
  config: result(state, 'config.tokenConfig', []),
  userId: result(state, 'user.profile.customer.id', 0),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', '')
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount) => dispatch(triggerAuth('transfer', amount)),
  resendBillPayOTP: (transactionId) => dispatch(resendBillPayOTP(transactionId))
});

const connectedQRPayment = connect(mapStateToProps, mapDispatchToProps)(QRPaymentPage);

export default connectedQRPayment;
