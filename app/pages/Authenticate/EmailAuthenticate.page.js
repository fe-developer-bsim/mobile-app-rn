import React from 'react';
import PropTypes from 'prop-types';
import EmailAuthenticate, {fields} from '../../components/Authenticate/EmailAuthenticate.component';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {resetToVerify, sendEmailOTP, verifyEmailOTP, destroyEmailVerificationForms} from '../../state/thunks/emailVerification.thunks';
import noop from 'lodash/noop';
import {Toast} from '../../utils/RNHelpers.util.js';
import {getErrorMessage} from '../../utils/transformer.util';
import {language} from '../../config/language';

const formConfig = {
  form: fields.formName,
  onSubmit: (values, dispatch, {params}) => {
    const onSubmit = params.onSubmit ? params.onSubmit : noop;
    dispatch(verifyEmailOTP(values.otp)).then(() => {
      dispatch(destroyEmailVerificationForms());
      dispatch(onSubmit());
    }, (errorMsg) => {
      Toast.show(errorMsg, Toast.LONG);
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__UNKNOWN_ERROR), Toast.LONG);
    });
  }
};

const ConnectedForm = reduxForm(formConfig)(EmailAuthenticate);

class EmailAuthenticatePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    config: PropTypes.array,
    userId: PropTypes.number,
    formValues: PropTypes.object,
    changeEasyPin: PropTypes.func,
    dontRecogniseEmail: PropTypes.func,
    setNotLoading: PropTypes.func,
    resendEmailOTP: PropTypes.func,
  };

  render () {
    const {navigation, dontRecogniseEmail, resendEmailOTP, transRefNum, config, userId, formValues, changeEasyPin} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const transactionId = result(navParams, 'transactionId', '');
    return <ConnectedForm userId={userId} {...navParams} config={config} transRefNum={transRefNum} resendEmailOTP={resendEmailOTP}
      formValues={formValues} changeEasyPin={changeEasyPin} transactionId={transactionId}
      dontRecogniseEmail={dontRecogniseEmail}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  resendEmailOTP: (email) => dispatch(sendEmailOTP(email)),
  changeEasyPin: (encryptedEasyPin) => dispatch(change('AuthenticateForm', 'easypin', encryptedEasyPin)),
  dontRecogniseEmail: (keyRoute, params) => dispatch(resetToVerify(keyRoute, params)),
});

const mapStateToProps = ({transRefNum, config, user, form}) => ({
  transRefNum, config: result(config, 'tokenConfig', []),
  userId: result(user, 'profile.customer.id', 0),
  formValues: result(form, `${fields.formName}.values`, ''),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuthenticatePage);