import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import LoginEasyPinForm from '../../components/MerchantJourney/MerchantEstoreLogin.component';
import {clearAndResetPasswordBurgerMenu} from '../../state/thunks/onboarding.thunks';
import {loginToEstoreMerchant} from '../../state/thunks/digitalStore.thunks';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {checkCameraPermissionAndNavigate} from '../../state/thunks/common.thunks';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'loginEasyPinForm',
  destroyOnUnmount: true,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {isLockedDevice, navigation}) => {
    dispatch(loginToEstoreMerchant(values, isLockedDevice, false, false, false, false, result(navigation, 'state.params.typeMerchant', '')));
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPin'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(LoginEasyPinForm);

const mapStateToProps = (state) => ({
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  currentLanguage: state.currentLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  loginWithFaceRecognition: (isLockedDevice, props) => {
    dispatch(checkCameraPermissionAndNavigate('CameraPage', {isLockedDevice, action: 'Login'}, result(props.navigation, 'state.params.data', {})));
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
    forgotEasyPin: PropTypes.func,
    loginFaceRecognition: PropTypes.func,
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

  render () {
    const {visible} = this.state;
    const {forgotEasyPin, isLockedDevice, navigation} = this.props;
    return (
      <DecoratedForm
        navigation={navigation}
        goRegister={this.goRegister}
        visible={visible}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        forgotEasyPin={forgotEasyPin}
        isLockedDevice={isLockedDevice}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
