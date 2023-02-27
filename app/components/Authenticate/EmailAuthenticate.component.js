import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import EmailOtp from '../Authenticate/EmailOtp.component';
import result from 'lodash/result';

export const fields = {
  formName: 'EmailAuthenticateForm',
};

class EmailAuthenticate extends React.Component {
  static propTypes = {
    fieldOTP: PropTypes.string,
    transRefNum: PropTypes.string,
    resendBillPayOTP: PropTypes.func,
    userId: PropTypes.number,
    email: PropTypes.string,
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    moreInfo: PropTypes.func,
    transactionId: PropTypes.string,
    dontRecogniseEmail: PropTypes.func,
    resendEmailOTP: PropTypes.func,
    params: PropTypes.object,
    maskedEmail: PropTypes.string,
  }
  render () {
    const {fieldOTP = 'otp', resendEmailOTP = noop, params = {}, /** the route at which it is on (the ones on mainTabs.routes) */
      userId, email, maskedEmail, handleSubmit, transRefNum, formValues, dontRecogniseEmail, transactionId = ''} = this.props;   
    const disabled = result(formValues, fieldOTP, '').length < 6;
    const keyRoute = result(params, 'keyRoute', 'Home');
    return <Field name={fieldOTP} userId={userId} component={EmailOtp} resendOTP={resendEmailOTP} handleSubmit={handleSubmit}
      email={email} transRefNum={transRefNum} disabled={disabled} dontRecogniseEmail={dontRecogniseEmail}
      transactionId={transactionId} keyRoute={keyRoute} params={params} maskedEmail={maskedEmail}/>;
  }
}

export default EmailAuthenticate;
