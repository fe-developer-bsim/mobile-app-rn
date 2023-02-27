import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import LoginEasyPinForm from '../../components/Emall/EmallLogin.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {checkCameraPermissionAndNavigate} from '../../state/thunks/common.thunks';
import {Toast, Platform, Alert} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {loginToEmall, clearAndResetPasswordEmall, loginBiller, loginAllsegment} from '../../state/thunks/onboarding.thunks';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'loginEasyPinForm',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, navigation, isbiller, isOrami, pathRoute, allSegment, tokenPayment, tokenId, tokenPaymentNkyc, tokenPaymentSplitBillKyc, 
    tokenPaymentFundtrfSplitBill, tokenPaymentRejectSplitBill, tokenPaymentRejectNKYC}) => {
    const emallData = result(navigation, 'state.params', {});
    if (isbiller === true) {
      dispatch(loginBiller(values, isLockedDevice, isOrami));
    } else if (allSegment) {
      dispatch(loginAllsegment(values, isLockedDevice, pathRoute));
    } else if (tokenPayment) {
      dispatch(loginBiller(values, isLockedDevice, null, tokenId));
    } else if (tokenPaymentSplitBillKyc) {
      dispatch(loginBiller(values, isLockedDevice, null, tokenId, tokenPaymentNkyc, tokenPaymentSplitBillKyc));
    } else if (tokenPaymentNkyc) {
      dispatch(loginBiller(values, isLockedDevice, null, tokenId, tokenPaymentNkyc));
    } else if (tokenPaymentFundtrfSplitBill) {
      dispatch(loginBiller(values, isLockedDevice, null, tokenId, tokenPaymentNkyc, tokenPaymentSplitBillKyc, tokenPaymentFundtrfSplitBill, tokenPaymentRejectSplitBill, tokenPaymentRejectNKYC));
    } else if (tokenPaymentRejectSplitBill) {
      dispatch(loginBiller(values, isLockedDevice, null, tokenId, tokenPaymentNkyc, tokenPaymentSplitBillKyc, tokenPaymentFundtrfSplitBill, tokenPaymentRejectSplitBill, tokenPaymentRejectNKYC));
    } else if (tokenPaymentRejectNKYC) {
      dispatch(loginBiller(values, isLockedDevice, null, tokenId, tokenPaymentNkyc, tokenPaymentSplitBillKyc, tokenPaymentFundtrfSplitBill, tokenPaymentRejectSplitBill, tokenPaymentRejectNKYC));
    } else {
      dispatch(loginToEmall(values, isLockedDevice, emallData));
    }
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(LoginEasyPinForm);

const mapStateToProps = (state) => ({
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  currentLanguage: state.currentLanguage,
  isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
  lastSuccessfulLogin: result(state, 'lastSuccessfulLogin', 'easypin')
});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordEmall());
  },
  loginWithFaceRecognition: (isLockedDevice) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}));
  },
  loginFingerprint: (isLockedDevice, props) => {
    dispatch(loginToEmall({}, isLockedDevice, result(props.navigation, 'state.params.flightData', {})));
  },
  doLogin: () => {
    dispatch();
  }
});

class LoginWithEasyPin extends Component {
  state = {
    visible: false
  }
  static propTypes = {
    navigation: PropTypes.object,
    isLockedDevice: PropTypes.bool,
    loginWithFaceRecognition: PropTypes.func,
    hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    forgotEasyPin: PropTypes.func,
    loginFaceRecognition: PropTypes.func,
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    isFaceRegistered: PropTypes.bool,
    loginFingerprint: PropTypes.func,
    lastSuccessfulLogin: PropTypes.string,
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }
  goRegister = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  onModalClose = () => {
    this.setState({visible: false});
  }

  handleAuthenticationAttempted = () => {
    Toast.show(language.FINGER_PRINT__NOT_RECOGNIZED);
  };

  loginFaceRecognition = () => {
    const {isLockedDevice, loginWithFaceRecognition} = this.props;
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).
        then((res) => {
          if (!res) {
            (async () => {
              const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                loginWithFaceRecognition(isLockedDevice);
              } else {
                Alert.alert(language.CAMERA_PERMISSION_TITLE, language.CAMERA_PERMISSION_REQUEST, [{
                  text: language.GENERIC__OK
                }]);
              }
            })();
          } else {
            loginWithFaceRecognition(isLockedDevice);
          }
        });
    } else {
      loginWithFaceRecognition(isLockedDevice);
    }
  }

  render () {
    const {visible} = this.state;
    const {forgotEasyPin, isLockedDevice, navigation} = this.props;
    const isbiller = result(navigation, 'state.params.biller', false);
    const isOrami = result(navigation, 'state.params.typeActivation', '');
    const allSegment = result(navigation, 'state.params.allSegment', false);
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    const tokenPayment = result(navigation, 'state.params.tokenPayment', false);
    const tokenId = result(navigation, 'state.params.tokenId', false);
    const tokenPaymentNkyc = result(navigation, 'state.params.tokenPaymentNkyc', false);
    const tokenPaymentSplitBillKyc = result(navigation, 'state.params.tokenPaymentSplitBillKyc', false);
    const tokenPaymentFundtrfSplitBill = result(navigation, 'state.params.tokenPaymentFundtrfSplitBill', false);
    const tokenPaymentRejectSplitBill = result(navigation, 'state.params.tokenPaymentRejectSplitBill', false);
    const tokenPaymentRejectNKYC = result(navigation, 'state.params.tokenPaymentRejectNKYC', false);
    return (
      <DecoratedForm
        pathRoute={pathRoute}
        navigation={navigation}
        allSegment={allSegment}
        isOrami={isOrami}
        goRegister={this.goRegister}
        visible={visible}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        loginFaceRecognition={this.loginFaceRecognition}
        forgotEasyPin={forgotEasyPin}
        isLockedDevice={isLockedDevice}
        isbiller={isbiller}
        tokenPayment={tokenPayment}
        tokenId={tokenId}
        tokenPaymentNkyc={tokenPaymentNkyc}
        tokenPaymentSplitBillKyc={tokenPaymentSplitBillKyc}
        tokenPaymentFundtrfSplitBill={tokenPaymentFundtrfSplitBill}
        tokenPaymentRejectSplitBill={tokenPaymentRejectSplitBill}
        tokenPaymentRejectNKYC={tokenPaymentRejectNKYC}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
