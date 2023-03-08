import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermandCondition from '../../components/RegisterEmoneyJourney/AgreementEmoney.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import {set, get, storageKeys} from '../../utils/storage.util';
import {isEmpty, startsWith} from 'lodash';
import {
  getSavingProductsItemsForDeeplink,
  getCreditCardProductsItemsForDeeplink,
  getListLoanProduct,
} from '../../state/thunks/digitalAccountOpening.thunks';

const mapStateToProps = state => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  TncURL: result(state, 'config.attention.urlSimobiOnboardingTnC', ''),
  isLockedDevice: Boolean(
    result(state, 'appInitKeys', {}) &&
      result(state, 'appInitKeys.username', {}) &&
      result(state, 'appInitKeys.tokenClient', {}) &&
      result(state, 'appInitKeys.tokenServer', {}),
  ),
  utmState: result(state, 'utmCode', {}),
});

const mapDispatchToProps = dispatch => ({
  goToNextPage: utmState => {
    set(storageKeys.TNC_LOCKDOWN, false);
    const codeDestination = result(utmState, 'productCode', '');
    if (codeDestination === 'Emoney') {
      dispatch(NavigationActions.navigate({routeName: 'EmoneyRegistration'}));
    } else if (startsWith(codeDestination, 'SA')) {
      dispatch(getSavingProductsItemsForDeeplink(codeDestination));
    } else if (startsWith(codeDestination, 'credit')) {
      dispatch(getCreditCardProductsItemsForDeeplink(codeDestination));
    } else if (startsWith(codeDestination, 'loan')) {
      dispatch(getListLoanProduct(codeDestination));
    } else if (isEmpty(utmState)) {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Introduction'})],
        }),
      );
    }
  },
  goToNextLanding: () => {
    set(storageKeys.TNC_LOCKDOWN, false);
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
  },
  getEmoneyTnc: () => get(storageKeys.TNC_LOCKDOWN).then(res => res),
  turnOffTnc: () => set(storageKeys.TNC_LOCKDOWN, false),
});

class TermandConditionEMoney extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    TncURL: PropTypes.string,
    goToNextPage: PropTypes.func,
    login: PropTypes.func,
    getEmoneyTnc: PropTypes.func,
    tncLockdown: PropTypes.bool,
    isLockedDevice: PropTypes.bool,
    turnOffTnc: PropTypes.func,
    goToNextLanding: PropTypes.func,
    utmState: PropTypes.object,
  };
  state = {
    checked: false,
    showed: false,
  };
  onAgreeTnc = () => {
    const {goToNextPage, turnOffTnc, utmState} = this.props;
    goToNextPage(utmState);
    turnOffTnc();
  };
  onAgreeTncLockdown = () => {
    const {goToNextLanding, turnOffTnc} = this.props;
    goToNextLanding();
    turnOffTnc();
  };
  checking = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };
  endReached = () => {
    this.setState({
      showed: true,
    });
  };

  render() {
    const {currentLanguage, TncURL, login, tncLockdown, isLockedDevice} =
      this.props;
    const {checked, showed} = this.state;
    return (
      <TermandCondition
        onAgreeTnc={this.onAgreeTnc}
        currentLanguage={currentLanguage}
        TncURL={TncURL}
        login={login}
        tncLockdown={tncLockdown}
        isLockedDevice={isLockedDevice}
        checked={checked}
        checking={this.checking}
        endReached={this.endReached}
        showed={showed}
        onAgreeTncLockdown={this.onAgreeTncLockdown}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermandConditionEMoney);
