import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import PasswordValidate from '../../components/Profile/PasswordValidate.component';
import {verifyPassword} from '../../state/thunks/profile.thunks';
import {clearAndResetPasswordBurgerMenu} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'validatePasswordForm',
  destroyOnUnmount: true,
  initialValues: {
    password: ''
  },
  validate: (values) => {
    const errors = {_error: ''};
    if (!values.password) {
      errors['_error'] = 'Password is required';
    }
    return errors;
  },
  onSubmit: (values, dispatch, {nextRouteName, isSetNewCredential, isOBMPassword, isOBM, isOBMAll, profileScope, forgotPassword, isSimasPoin, isLoginEgift, isLoginEmoney, isLoginAccount, isSearch, isOBMDashboard, isFromSearch, offers, routeMenuSearch, productName}) => {
    dispatch(verifyPassword(values.password, nextRouteName, isSetNewCredential, isOBMPassword, isOBM, isOBMAll, profileScope, forgotPassword, isSimasPoin, isLoginEgift, isLoginEmoney, isLoginAccount, isSearch, isOBMDashboard, isFromSearch, offers, routeMenuSearch, productName));
  }
};

const PasswordValidateForm = reduxForm(formConfig)(PasswordValidate);

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
  goToAtmRegistration: () => {
    dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'}));
  }
});

const ConnectedForm = connect(null, mapDispatchToProps)(PasswordValidateForm);

class EasyPinUpdatePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    forgotEasyPin: PropTypes.func,
    forgotPassword: PropTypes.func,
    goToAtmRegistration: PropTypes.func
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

  render () {
    const nextRouteName = result(this.props.navigation, 'state.params.nextRouteName', '');
    const isSetNewCredential = result(this.props.navigation, 'state.params.setNewCredentialOBM', '');
    const isOBMPassword = result(this.props.navigation, 'state.params.isOBMPassword');
    const isOBM = result(this.props.navigation, 'state.params.isOBM');
    const isOBMAll = result(this.props.navigation, 'state.params.isOBMAll');
    const profileScope = result(this.props.navigation, 'state.params.profileScope');
    const isSimasPoin = result(this.props.navigation, 'state.params.isSimasPoin');
    const isLoginEgift = result(this.props.navigation, 'state.params.isLoginEgift');
    const isLoginEmoney = result(this.props.navigation, 'state.params.isLoginEmoney');
    const isLoginAccount = result(this.props.navigation, 'state.params.isLoginAccount');
    const isSearch = result(this.props.navigation, 'state.params.isSearch', false);
    const isOBMDashboard = result(this.props.navigation, 'state.params.gotoluckyDip');
    const isFromSearch = result(this.props.navigation, 'state.params.isFromSearch');
    const offers = result(this.props.navigation, 'state.params.offers');
    const routeMenuSearch = result(this.props.navigation, 'state.params.routeMenuSearch');
    const productName = result(this.props.navigation, 'state.params.productName');
    const {forgotEasyPin, forgotPassword, goToAtmRegistration} = this.props;
    return <ConnectedForm nextRouteName={nextRouteName} isSetNewCredential={isSetNewCredential} isOBMPassword={isOBMPassword} isOBM={isOBM} isOBMAll={isOBMAll} profileScope={profileScope} showOrHidePassword={this.showOrHidePassword()} isSecureTextEntry={this.state.isSecureTextEntry}
      forgotEasyPin={forgotEasyPin} forgotPassword={forgotPassword} goToAtmRegistration={goToAtmRegistration} isSimasPoin={isSimasPoin} isLoginEgift={isLoginEgift} isLoginEmoney={isLoginEmoney} isLoginAccount={isLoginAccount} isSearch={isSearch} isOBMDashboard={isOBMDashboard} isFromSearch={isFromSearch}
      offers={offers} routeMenuSearch={routeMenuSearch} productName={productName}/>;
  }
}
const ConnectedVerifikasiscreen = connect(null, mapDispatchToProps)(EasyPinUpdatePage);
export default ConnectedVerifikasiscreen;
