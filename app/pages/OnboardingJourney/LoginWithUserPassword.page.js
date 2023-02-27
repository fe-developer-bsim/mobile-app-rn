import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, destroy} from 'redux-form';
import {connect} from 'react-redux';
import {result, find} from 'lodash';
import LoginFormView, {fields} from '../../components/OnboardingJourney/LoginWithUserPassword.component';
import {login as loginThunk, clearAndResetPasswordBurgerMenu, loginOBM} from '../../state/thunks/onboarding.thunks';
import verifyEasyPin from '../../state/thunks/profile.thunks';
import {getAllOffersExcept} from '../../utils/transformer.util';
import {deeplinkCatcher} from '../../state/thunks/common.thunks';
import DeepLinking from 'react-native-deep-linking';
import {Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'loginWithUsernamePassword',
  onSubmit: (values, dispatch, {isLockedDevice, isOBM, regisATM, loginATM, isUserRegistered, verifyEasyPin, isOBMActive}) => {
    if (isOBMActive === 'TRUE' && result(values, 'username', '') === '62999') {
      dispatch(loginThunk(values, isLockedDevice, false, regisATM, loginATM, isUserRegistered));
    } else {
      dispatch(loginOBM(values, isLockedDevice, isOBM, regisATM, loginATM, isUserRegistered, verifyEasyPin));
    }
  },
  destroyOnUnmount: false,
  validate: (values) => {
    const {USERNAME, PASSWORD} = fields;

    const errors = {};
    if (!values[USERNAME]) {
      errors[USERNAME] = 'Required';
    }

    if (!values[PASSWORD]) {
      errors[PASSWORD] = 'Required';
    }

    return errors;
  }
};

const LoginForm = reduxForm(formConfig)(LoginFormView);

const mapStateToProps = (state) => {
  const isLockedDevice = Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  return {
    isOBMActive: result(state, 'config.isOBMActive', 'FALSE'),
    isLockedDevice,
    initialValues: {
      [fields.USERNAME]: isLockedDevice ? result(state, 'appInitKeys.username', '') : '',
      [fields.PASSWORD]: ''
    },
    currentLanguage: state.currentLanguage,
    isDeeplinkExist: state.isDeeplinkExist,
    offers: getAllOffersExcept(clickedOffer, allOffers),

  };
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  destroy: () => {
    dispatch(destroy('loginWithUsernamePassword'));
  },
  verifyEasyPin: () => {
    dispatch(verifyEasyPin());
  },
  deeplinkCatcher: () => dispatch(deeplinkCatcher()),
  goToRegisterProduct: () => dispatch(NavigationActions.navigate({routeName: 'ChooseRegistration'}))
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

class Loginscreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    forgotPassword: PropTypes.func,
    destroy: PropTypes.func,
    regisATM: PropTypes.string,
    isLockedDevice: PropTypes.bool,
    verifyEmail: PropTypes.func,
    verifyEasyPin: PropTypes.func,
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    deeplinkCatcher: PropTypes.func,
    goToRegisterProduct: PropTypes.func
  }

  goRegister = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  state = {
    isSecureTextEntry: true
  }

  showOrHidePassword = () => () => {
    if (this.state.isSecureTextEntry) {
      this.setState({isSecureTextEntry: false});
    } else {
      this.setState({isSecureTextEntry: true});
    }
  }
  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  goToRegisterNTB = () => this.props.navigation.navigate('AgreementScreen')

  componentWillUnmount () {
    // Linking.removeEventListener('url', this.handleUrl);

    const {destroy} = this.props;
    const regisATM = result(this.props, 'navigation.state.params.regisATM', false);
    if (regisATM) {
      destroy();
    }
  }
  componentWillMount () {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  componentDidMount () {
    // Linking.addEventListener('url', this.handleUrl);
    // this.props.deeplinkCatcher();
  }

  render () {
    const {isOBMActive} = this.props;
    const regisATM = result(this.props, 'navigation.state.params.regisATM', false);
    const loginATM = result(this.props, 'navigation.state.params.loginATM', false);
    const isUserRegistered = result(this.props, 'navigation.state.params.isUserRegistered', false);
    const isOBM = result(this.props, 'navigation.state.params.isOBM');
    const loginLanding = result(this.props, 'navigation.state.params.loginLanding', '');
    return (
      <ConnectedForm
        isUserRegistered={isUserRegistered}
        regisATM={regisATM}
        loginATM={loginATM}
        goRegister={this.goRegister}
        forgotPassword={this.props.forgotPassword}
        showOrHidePassword={this.showOrHidePassword()}
        isSecureTextEntry={this.state.isSecureTextEntry}
        isLockedDevice={this.props.isLockedDevice}
        goToRegisterNTB={this.goToRegisterNTB}
        verifyEasyPin={this.verifyEasyPin}
        isOBM={isOBM}
        isOBMActive={isOBMActive}
        goToRegisterProduct={this.props.goToRegisterProduct}
        loginLanding={loginLanding}
      />);
  }
}

const ConnectedLoginscreen = connect(mapStateToProps, mapDispatchToProps)(Loginscreen);

export default ConnectedLoginscreen;
