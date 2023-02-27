import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import BiFastEasyPin from '../../components/Authenticate/BiFastEasyPin.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import result from 'lodash/result';
import {clearAndResetPasswordEmall} from '../../state/thunks/onboarding.thunks';
import {triggerAuthNavigateProxy, triggerAuthNavigateProxyEdit} from '../../state/thunks/common.thunks';
import {addRegisterProxyAddress, proxyUpdate, portingRegisterProxyAddress} from '../../state/thunks/biFast.thunks';

const formConfig = {
  form: 'BiFastEasyPin',
  destroyOnUnmount: true,
  initialValues: {
    easyPinBiFast: '',
  },
  onSubmit: (values, dispatch, {registerProxyAddress, addProxyAddress, isEditProxy, emailParam, doEdit, portingRegisterProxyAddress, isPortingProxyRC}) => {
    if (isEditProxy) {
      const params = {onSubmit: doEdit, isOtp: true, emailParam, isIgnoreverifyEmailOTP: true, updateProxy: 'updateProxy'};
      const isAuthEmailPhone = emailParam ? 'AuthBiFast' : 'EmailAuth';
      dispatch(triggerAuthNavigateProxyEdit('CustomBiFast', null, false, isAuthEmailPhone, params));
    } else if (isPortingProxyRC) {
      const params = {onSubmit: portingRegisterProxyAddress, isOtp: true, addProxyAddress, isIgnoreverifyEmailOTP: true};
      const isAuthEmailPhone = addProxyAddress === 'Email Address' ? 'EmailAuth' : 'AuthBiFast';
      dispatch(triggerAuthNavigateProxy('CustomBiFast', null, false, isAuthEmailPhone, params));
    } else {
      const params = {onSubmit: registerProxyAddress, isOtp: true, addProxyAddress, isIgnoreverifyEmailOTP: true, registrationProxy: 'registrationProxy'};
      const isAuthEmailPhone = addProxyAddress === 'Email Address' ? 'EmailAuth' : 'AuthBiFast';
      dispatch(triggerAuthNavigateProxy('CustomBiFast', null, false, isAuthEmailPhone, params));
    }
  },
  validate: (values) => ({
    _error: validatePinCodeLength(values['easyPinBiFast'])
  }),
};

const DecoratedForm = reduxForm(formConfig)(BiFastEasyPin);

const mapStateToProps = (state) => ({
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
  currentLanguage: state.currentLanguage,
  isFaceRegistered: result(state, 'isFaceRegistered.isFaceRegistered', false),
  // isFaceRegistered: state.isFaceRegistered.isFaceRegistered,
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
  // triggerAuth: (params) => {
  //   dispatch(triggerAddLimit('CustomLimit', null, true, false, 'AuthBiFast', params));
  // },
  addRegisterProxyAddress: (data) => {
    dispatch(addRegisterProxyAddress(data));
  }, 
  portingRegisterProxyAddress: (data) => {
    dispatch(portingRegisterProxyAddress(data));
  },

  editProxy: (user, detailByCustNo, selectedAccount, myAccount, myAlldata) => dispatch(proxyUpdate(user, detailByCustNo, selectedAccount, myAccount, myAlldata)),

  dispatch 
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
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    isFaceRegistered: PropTypes.bool,
    loginFingerprint: PropTypes.func,
    lastSuccessfulLogin: PropTypes.string,
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),    
    addRegisterProxyAddress: PropTypes.func,
    editProxy: PropTypes.func,
    portingRegisterProxyAddress: PropTypes.func,
  }

  registerProxyAddress = () => {
    const {addRegisterProxyAddress, navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const data = {...navParams};
    addRegisterProxyAddress(data);
  }

  portingProxyAddress = () => {
    const {portingRegisterProxyAddress, navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const data = {...navParams};
    portingRegisterProxyAddress(data);
  }

  doEdit = () => {
    const {navigation, editProxy} = this.props;
    const formValues = result(navigation, 'state.params.navigation.state.params.formValues', {});
    const user = result(navigation, 'state.params.navigation.state.params.user', {});
    const detailByCustNo = result(navigation, 'state.params.navigation.state.params.detailByCustNo', {});
    const selectedAccount = result(navigation, 'state.params.navigation.state.params.selectedAccount', {});
    const myAccount = result(navigation, 'state.params.navigation.state.params.myAccount', {});
    const myAlldata = result(navigation, 'state.params.navigation.state.params.myAlldata', {});
    editProxy(formValues, user, detailByCustNo, selectedAccount, myAccount, myAlldata);

  }

  render () {
    const {visible} = this.state;
    const {forgotEasyPin, isLockedDevice, navigation, addRegisterProxyAddress} = this.props;
    const addProxyAddress = result(navigation, 'state.params.addProxyAddress', '');
    const proxyAlias = result(navigation, 'state.params.proxyAlias', '');
    const myAccount = result(navigation, 'state.params.myAccount', {});

    const isEditProxy = result(navigation, 'state.params.isEditProxy');
    const emailParam = result(navigation, 'state.params.navigation.state.params.formValues.proxyTypeNumber', '') === '01';
    const isPortingProxyRC = result(navigation, 'state.params.navigation', '');

    const isbiller = result(navigation, 'state.params.biller', false);
    const isOrami = result(navigation, 'state.params.typeActivation', '');
    const allSegment = result(navigation, 'state.params.allSegment', false);
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    const tokenPayment = result(navigation, 'state.params.tokenPayment', false);
    const tokenId = result(navigation, 'state.params.tokenId', false);
    return (
      <DecoratedForm
        pathRoute={pathRoute}
        navigation={navigation}
        allSegment={allSegment}
        isOrami={isOrami}
        visible={visible}
        onModalClose={this.onModalClose}
        handleAuthenticationAttempted={this.handleAuthenticationAttempted}
        loginFaceRecognition={this.loginFaceRecognition}
        forgotEasyPin={forgotEasyPin}
        isLockedDevice={isLockedDevice}
        isbiller={isbiller}
        tokenPayment={tokenPayment}
        tokenId={tokenId}
        addRegisterProxyAddress={addRegisterProxyAddress}
        addProxyAddress={addProxyAddress}
        proxyAlias={proxyAlias}
        myAccount={myAccount}
        registerProxyAddress={this.registerProxyAddress}
        doEdit={this.doEdit}
        isEditProxy={isEditProxy}
        emailParam={emailParam}
        portingRegisterProxyAddress={this.portingProxyAddress}
        isPortingProxyRC={isPortingProxyRC}
      />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEasyPin);
