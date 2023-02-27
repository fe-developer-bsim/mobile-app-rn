import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import OTPFormView from '../../components/OTP/CommonOTP.component';
import {onboardingOtpResend} from '../../state/thunks/onboarding.thunks';
import {registerFaceLockdownDrawer} from '../../state/thunks/faceRecognition.thunks';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {moreInfo, dontRecogniseNumber} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'OTPFormCommon',
  destroyOnUnmount: true,
  initialValues: {
    OTP: '',
  },
  onSubmit: (values, dispatch, props) => dispatch(registerFaceLockdownDrawer(props.image, props.orientationCode)),
  validate: (values) => ({
    OTP: validatePinCodeLength(values['OTP'])
  })
};

const mapStateToProps = ({currentLanguage, user, transRefNum}) => ({
  currentLanguage,
  mobileNumber: result(user, 'profile.mobileNumberMasking', ''),
  username: result(user, 'profile.loginName', ''),
  userId: result(user, 'profile.customer.id', 0),
  transRefNum
});

const mapDispatchToProps = (dispatch) => ({
  setOTP: (otp) => dispatch(change('OTPFormCommon', 'OTP', otp)),
  resendOTP: () => dispatch(onboardingOtpResend()),
  moreInfo: () => dispatch(moreInfo()),
  dontRecogniseNumber: () => dispatch(dontRecogniseNumber()),
});

const DecoratedForm = reduxForm(formConfig)(OTPFormView);

class OTPScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    mobileNumber: PropTypes.string,
    username: PropTypes.string,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    setOTP: PropTypes.func,
    resendOTP: PropTypes.func,
    moreInfo: PropTypes.func,
    currentLanguage: PropTypes.object,
    dontRecogniseNumber: PropTypes.func
  }
  render () {
    const {navigation, mobileNumber, transRefNum = '', userId, resendOTP, moreInfo, currentLanguage, dontRecogniseNumber} = this.props;
    const currentLang = result(currentLanguage, 'id', '');
    const registerFace = result(navigation, 'state.params.registerFace', false);
    const image = result(navigation, 'state.params.image', '');
    const orientationCode = result(navigation, 'state.params.orientationCode', '');
    return (
      // mobileNumber is for registered user/Internet Banking user whose device is not locked yet.
      // newUserMobile is for unregistered user while onboarding
      <DecoratedForm userId={userId} resendOTP = {resendOTP} setOTP={this.props.setOTP}
        mobileNumber={mobileNumber} transRefNum={transRefNum}
        moreInfo={moreInfo} currentLanguage={currentLang}
        dontRecogniseNumber={dontRecogniseNumber} registerFace={registerFace} image={image}
        orientationCode={orientationCode}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
