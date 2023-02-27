import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import SmsOtpComponent from '../Authenticate/SmsOtpComponent.component';
import EasyPinComponent from '../Authenticate/EasyPinComponent.component';
import {getTransactionType} from '../../utils/transformer.util';
import result from 'lodash/result';

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
    resendBillPayOTP: PropTypes.func,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    handleSubmit: PropTypes.func,
    isOtp: PropTypes.bool,
    formValues: PropTypes.object,
    changeEasyPin: PropTypes.func,
    moreInfo: PropTypes.func,
    currentLanguage: PropTypes.string,
    dontRecogniseNumber: PropTypes.func,
    transactionId: PropTypes.string,
    isEasypin: PropTypes.bool,
    isCloseTd: PropTypes.bool,
    isBillPay: PropTypes.func,
    mobileNumberMasking: PropTypes.string,
    forgotEasyPin: PropTypes.func,
    isRemittance: PropTypes.bool,
  }
  render () {
    const {fieldOTP = 'otp', amount = 0, resendBillPayOTP  = noop,
      config = {}, userId, isOwnAccount, handleSubmit, userMobileNumber, isOtp, isEasypin, transRefNum, formValues, changeEasyPin, moreInfo, dontRecogniseNumber, currentLanguage, transactionId = '', isCloseTd, isBillPay, mobileNumberMasking, forgotEasyPin, isRemittance} = this.props;
    if ((getTransactionType(amount, config, isOwnAccount) === '3' && !isOtp) || isEasypin) { // token type 3 is easypin
      const disabled = result(formValues, 'easypin', '').length < 6;
      return <Field name='easyPinPure' component={EasyPinComponent} changeEasyPin={changeEasyPin} handleSubmit={handleSubmit} disabled={disabled} isCloseTd={isCloseTd} forgotEasyPin={forgotEasyPin} isRemittance={isRemittance}/>;
    } else if (getTransactionType(amount, config, isOwnAccount, isBillPay) === '0' || isOtp) { // token type 3 is smsOtp
      const disabled = result(formValues, 'otp', '').length < 6;
      return <Field name={fieldOTP} userId={userId} component={SmsOtpComponent} resendOTP={resendBillPayOTP} handleSubmit={handleSubmit}
        userMobileNumber={userMobileNumber} mobileNumberMasking={mobileNumberMasking} transRefNum={transRefNum} disabled={disabled} moreInfo={moreInfo} currentLanguage={currentLanguage} dontRecogniseNumber={dontRecogniseNumber}
        transactionId={transactionId}/>;
    } else {
      const disabled = result(formValues, 'otp', '').length < 6;
      return <Field name={fieldOTP} userId={userId} component={SmsOtpComponent} resendOTP={resendBillPayOTP} handleSubmit={handleSubmit}
        userMobileNumber={userMobileNumber} transRefNum={transRefNum} disabled={disabled} moreInfo={moreInfo} currentLanguage={currentLanguage} dontRecogniseNumber={dontRecogniseNumber}
        transactionId={transactionId}/>;
    }
  }
}

export default Authenticate;
