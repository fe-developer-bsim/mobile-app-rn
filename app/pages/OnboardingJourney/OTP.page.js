import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import OTPFormView from '../../components/OnboardingJourney/OTP.component';
import {verifyOTP, verifyOTPWhenEasyPinNotSet, onboardingOtpResend, verifyOTPMigrate} from '../../state/thunks/onboarding.thunks';
import {registerFaceLockdown} from '../../state/thunks/faceRecognition.thunks';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {moreInfo, dontRecogniseNumber} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'OTPForm',
  destroyOnUnmount: true,
  initialValues: {
    OTP: '',
  },
  onSubmit: (values, dispatch, props) => {
    let verifyOTPThunk = verifyOTP;
    let maskedUsername = props.maskedUsername;
    if (props.registerFace) {
      return dispatch(registerFaceLockdown(props.image, props.orientationCode));
    } else if (!props.regisATM && !props.isForgetPassword && !props.goToPin) {
      verifyOTPThunk = verifyOTPWhenEasyPinNotSet;
    }
    if (props.isMigrate) {
      verifyOTPThunk = verifyOTPMigrate;
    }
    return dispatch(verifyOTPThunk(values.OTP, maskedUsername, true, props.isForgetPassword, props.panNumber, props.regisATM, props.isMigrate, props.encryptedToken));
  },
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
  setOTP: (otp) => dispatch(change('OTPForm', 'OTP', otp)),
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
    const isEasyPinSet = result(navigation, 'state.params.isEasyPinSet', undefined);
    const maskedUsername = result(navigation, 'state.params.maskedUsername', '');
    const isMigrate = result(navigation, 'state.params.isMigrate', false);
    const newUserMobile = result(navigation, 'state.params.newUserMobile', '');
    const isResetEasypin = result(navigation, 'state.params.isResetEasypin', '');
    const TXID = result(navigation, 'state.params.TXID', '');
    const isForgetPassword = result(navigation, 'state.params.isForgetPassword', false);
    const goToPin = result(navigation, 'state.params.goToPin', false);
    const regisATM = result(navigation, 'state.params.regisATM', false);
    const panNumber = result(navigation, 'state.params.panNumber', '');
    const currentLang = result(currentLanguage, 'id', '');
    const registerFace = result(navigation, 'state.params.registerFace', false);
    const image = result(navigation, 'state.params.image', '');
    const orientationCode = result(navigation, 'state.params.orientationCode', '');
    const newUserMobileMigrate = result(navigation, 'state.params.userData.data.attributeMap.mobileNumberMasking', '');
    return (
      // mobileNumber is for registered user/Internet Banking user whose device is not locked yet.
      // newUserMobile is for unregistered user while onboarding
      <DecoratedForm userId={userId} isEasyPinSet={isEasyPinSet} maskedUsername={maskedUsername} resendOTP = {resendOTP} setOTP={this.props.setOTP}
        mobileNumber={newUserMobile || mobileNumber} transRefNum={transRefNum} TXID={TXID} goToPin={goToPin}
        isForgetPassword={isForgetPassword} isResetEasypin={isResetEasypin} newUserMobileMigrate={newUserMobileMigrate}
        panNumber={panNumber} isMigrate={isMigrate} regisATM={regisATM} moreInfo={moreInfo} currentLanguage={currentLang}
        dontRecogniseNumber={dontRecogniseNumber} registerFace={registerFace} image={image} orientationCode={orientationCode}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
