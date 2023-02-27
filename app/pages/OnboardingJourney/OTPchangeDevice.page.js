import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import OTPFormView from '../../components/OnboardingJourney/OTPchangeDevice.component';
import {verifyOTP, verifyOTPWhenEasyPinNotSet, onboardingOtpResend, verifyOTPMigrate, verifyOTPReleaseDeviceRevamp} from '../../state/thunks/onboarding.thunks';
import {registerFaceLockdown} from '../../state/thunks/faceRecognition.thunks';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {moreInfo, dontRecogniseNumber} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import * as actionCreators from '../../state/actions/index.actions.js';
import {language} from '../../config/language';

const formConfig = {
  form: 'OTPForm',
  destroyOnUnmount: true,
  initialValues: {
    OTP: '',
  },
  onSubmit: (values, dispatch, props) => {
    let verifyOTPThunk = verifyOTP;
    let maskedUsername = props.maskedUsername;
    if (props.isLoginChangeDevice) {
      const payload = {mPinInputed: values.OTP, transRefNum: props.ipass, securityMode: '1', TOKEN_CLIENT: props.token_client, randNumCode: props.randNumCode};
      return dispatch(verifyOTPReleaseDeviceRevamp(payload));
    } else {
      if (props.registerFace) {
        return dispatch(registerFaceLockdown(props.image, props.orientationCode));
      } else if (!props.regisATM && !props.isForgetPassword && !props.goToPin) {
        verifyOTPThunk = verifyOTPWhenEasyPinNotSet;
      }
      if (props.isMigrate) {
        verifyOTPThunk = verifyOTPMigrate;
      }

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
  doBack: () => dispatch(NavigationActions.back()),
  dispatch: (data) => dispatch(data)
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
    dontRecogniseNumber: PropTypes.func,
    doBack: PropTypes.func,
    dispatch: PropTypes.func,
  }


  showAlertOtpFailed = () => {
    const {dispatch} = this.props;

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      button1: language.BUTTON_OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      heading1: language.OTP__EXPIRE,
      text: language.OTP__EXPIRE_DETAIL,
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  }

  render () {
    const {navigation, transRefNum = '', userId, resendOTP, moreInfo, currentLanguage, dontRecogniseNumber, doBack} = this.props;
    const isEasyPinSet = result(navigation, 'state.params.isEasyPinSet', undefined);
    const maskedUsername = result(navigation, 'state.params.maskedUsername', '');
    const isMigrate = result(navigation, 'state.params.isMigrate', false);
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
    const isLoginChangeDevice = result(navigation, 'state.params.isLoginChangeDevice', false);
    const ipass = result(navigation, 'state.params.ipass', '');
    const mobileNumber = result(navigation, 'state.params.mobileNumber', '');
    const token_client = result(navigation, 'state.params.token_client', '');
    const randNumCode = result(navigation, 'state.params.randNumCode', '');
    const payload = result(navigation, 'state.params.payload', '');

    return (
      // mobileNumber is for registered user/Internet Banking user whose device is not locked yet.
      // newUserMobile is for unregistered user while onboarding
      <DecoratedForm userId={userId} isEasyPinSet={isEasyPinSet} maskedUsername={maskedUsername} resendOTP = {resendOTP} setOTP={this.props.setOTP}
        mobileNumber={mobileNumber} transRefNum={transRefNum} TXID={TXID} goToPin={goToPin}
        isForgetPassword={isForgetPassword} isResetEasypin={isResetEasypin} newUserMobileMigrate={newUserMobileMigrate}
        panNumber={panNumber} isMigrate={isMigrate} regisATM={regisATM} moreInfo={moreInfo} currentLanguage={currentLang}
        dontRecogniseNumber={dontRecogniseNumber} registerFace={registerFace} image={image} orientationCode={orientationCode}
        isLoginChangeDevice={isLoginChangeDevice} ipass={ipass} token_client={token_client} randNumCode={randNumCode} payload={payload} doBack={doBack}
        showAlertOtpFailed={this.showAlertOtpFailed}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
