import React from 'react';
import PropTypes from 'prop-types';
import AccountSettings from '../../components/Account/AccountSettings.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {goToMyVoucher, resetAndNavigate, triggerAuthNavigate, getReleaseDeviceQRRevamp, saveEasypin, getInternetBankingSettings} from '../../state/thunks/common.thunks';
import {getLoginPreference} from '../../state/thunks/appSetup.thunks.js';
import {upperCase} from '../../utils/transformer.util';
import startsWith from 'lodash/startsWith';

const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage,
  profile: result(state, 'user.profile', {}),
  showChangeDevice: upperCase(result(state, 'config.flag.flagReleaseDevice', 'INACTIVE')) === 'ACTIVE',
  isLockedDevice: Boolean(result(state, 'appInitKeys', {}) && result(state, 'appInitKeys.username', {}) && result(state, 'appInitKeys.tokenClient', {}) && result(state, 'appInitKeys.tokenServer', {})),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  user: state.user,
  nav: state.nav,
  cif: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToMyVoucher: () => dispatch(goToMyVoucher()),
  resetAndNavigateTo: (destinationRoute, params) => () => {
    dispatch(resetAndNavigate(destinationRoute, params));
  },
  getLoginPreference: () => {
    dispatch(getLoginPreference());
    dispatch(resetAndNavigate('LoginPreference'));
  },
  goToShowQr: (loginName, isSearch) => () => {
    dispatch(saveEasypin());
    dispatch(getReleaseDeviceQRRevamp(loginName, isSearch));
  },
  goToInternetBankingSettings: () => dispatch(getInternetBankingSettings()),
  dispatch: (data) => dispatch(data)
});

class AccountSettingsPage extends React.Component {

  static propTypes = {
    profile: PropTypes.object,
    resetAndNavigateTo: PropTypes.func,
    getLoginPreference: PropTypes.func,
    user: PropTypes.object,
    nav: PropTypes.object,
    dispatch: PropTypes.func,
    goToShowQr: PropTypes.func,
    showChangeDevice: PropTypes.bool,
    isLockedDevice: PropTypes.bool,
    navigation: PropTypes.object,
    goToInternetBankingSettings: PropTypes.func,
    cif: PropTypes.string,
  }

  toShowQr = () => {
    const {dispatch, goToShowQr, user, navigation} = this.props;
    const isSearch = result(navigation, 'state.params.isSearch', false);
    const loginName = result(user, 'profile.loginName', '');
    const params = {onSubmit: goToShowQr(loginName, isSearch), amount: 0, isOtp: false};
    dispatch(triggerAuthNavigate('lkd', 0, true, 'Auth', params));
  }

  render () {
    const {profile, resetAndNavigateTo, getLoginPreference, user, nav, showChangeDevice, isLockedDevice, navigation, goToInternetBankingSettings, cif = ''} = this.props;
    const isSetting = result(navigation, 'state.params.isSetting', false);
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const isKyc = !startsWith(cif, 'NK');
    return <AccountSettings profile={profile} resetAndNavigate={resetAndNavigateTo} getLoginPreference={getLoginPreference} isSetting={isSetting}
      isLogin={isLogin} toShowQr={this.toShowQr} nav={nav} showChangeDevice={showChangeDevice} isLockedDevice={isLockedDevice} getInternetBankingSettings={goToInternetBankingSettings} isKyc=
        {isKyc}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsPage);
