import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import SmsOtpModal from '../SmsOtp/SmsOtpModal.component';
import EasyPinModal from '../EasyPin/EasyPinModal.component';
import {getTransactionType} from '../../utils/transformer.util';

// This Component returns redux-field specifying which component to use: easypin or smsOTP
class Authenticate extends React.Component {
  static propTypes = {
    fieldEasypin: PropTypes.string,
    fieldOTP: PropTypes.string,
    fieldSimasToken: PropTypes.string,
    transRefNum: PropTypes.string,
    visible: PropTypes.bool,
    config: PropTypes.array,
    onClose: PropTypes.func,
    submitHandler: PropTypes.func,
    resendOTP: PropTypes.func,
    // easyPinPaymentLimit: PropTypes.number, //Might be used if later we want to set diffferent transaciton limits for each bill payment
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    transactionId: PropTypes.string
  }
  render () {
    const {fieldEasypin = 'easypin', fieldOTP = 'otp', amount = 0, resendOTP  = noop,
      config = {}, userId, isOwnAccount, transactionId = '', ...fieldProps} = this.props; // fieldProps contains: visible , onClose , submitHandler
    if (getTransactionType(amount, config, isOwnAccount) === '3') { // token type 3 is easypin
      return <Field name={fieldEasypin} component={EasyPinModal} {...fieldProps}/>;
    } else if (getTransactionType(amount, config, isOwnAccount) === '0') { // token type 3 is smsOtp
      return <Field name={fieldOTP} userId={userId} component={SmsOtpModal} resendOTP={resendOTP} transactionId = {transactionId} {...fieldProps}/>;
    } else {
      return <Field name={fieldOTP} userId={userId} component={SmsOtpModal} resendOTP={resendOTP} transactionId = {transactionId} {...fieldProps}/>;
    }
  }
}

export default Authenticate;
