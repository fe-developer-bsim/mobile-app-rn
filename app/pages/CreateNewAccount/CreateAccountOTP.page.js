import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreateAccountOTP from '../../components/CreateNewAccount/CreateAccountOTP.component';
import {resendOtpEform, verifyOtpEform} from '../../state/thunks/ccEform.thunks';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';
import {maskingMobileNumber} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {moreInfo} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'OTPEForm',
  destroyOnUnmount: true,
  initialValues: {
    OTP: '',
  },
  onSubmit: (values, dispatch) => dispatch(verifyOtpEform()),
  validate: (values) => ({
    OTP: validatePinCodeLength(values['OTP'])
  })
};

const mapStateToProps = ({currentLanguage, transRefNum, form}) => ({
  currentLanguage,
  mobileNumber: maskingMobileNumber(result(form, 'identifyUserForm.values.phone', '')),
  transRefNum
});

const mapDispatchToProps = (dispatch) => ({
  setOTP: (otp) => dispatch(change('OTPForm', 'OTP', otp)),
  resendOTP: () => dispatch(resendOtpEform()),
  moreInfo: () => dispatch(moreInfo()),
});

const DecoratedForm = reduxForm(formConfig)(CreateAccountOTP);

class OTPScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    mobileNumber: PropTypes.string,
    transRefNum: PropTypes.string,
    setOTP: PropTypes.func,
    resendOTP: PropTypes.func,
    moreInfo: PropTypes.func,
    currentLanguage: PropTypes.object
  }
  
  render () {
    const {navigation, mobileNumber, transRefNum = '', resendOTP, moreInfo, currentLanguage} = this.props;
    const TXID = result(navigation, 'state.params.TXID', '');
    const currentLang = result(currentLanguage, 'id', '');
    return (
      <DecoratedForm resendOTP = {resendOTP} setOTP={this.props.setOTP}
        mobileNumber={mobileNumber} transRefNum={transRefNum} TXID={TXID}
        moreInfo={moreInfo} currentLanguage={currentLang}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
