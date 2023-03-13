import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/RegisterEmoneyJourney/FailActivationPage.component';
import result from 'lodash/result';
import {StackActions, NavigationActions} from 'react-navigation';
import {
  formatBillDetails,
  formatDataDetailList,
} from '../../utils/transformer.util';
import {logout} from '../../state/thunks/onboarding.thunks';
import * as actionCreators from '../../state/actions/index.actions';

class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    options: PropTypes.object,
    onClose: PropTypes.func,
    logoutFunc: PropTypes.func,
    onDone: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    onLockDown: PropTypes.func,
  };

  render() {
    const {
      navigation,
      options,
      onClose,
      logoutFunc,
      onDone,
      isLockedDevice,
      onLockDown,
    } = this.props;
    const displayList = formatBillDetails(result(options, 'resultDisplay', []));
    const dataDetailList = formatDataDetailList(
      result(options, 'dataDetail', []),
    );
    const errorCode = result(navigation, 'state.params.responseCode', '');
    return (
      <PaymentStatus
        onClose={onClose}
        displayList={displayList}
        dataDetailList={dataDetailList}
        logoutFunc={logoutFunc}
        {...options}
        errorCode={errorCode}
        onDone={onDone}
        isLockedDevice={isLockedDevice}
        onLockDown={onLockDown}
      />
    );
  }
}

const mapStateToProps = state => ({
  options: result(state, 'paymentModal', {}),
  isLockedDevice: Boolean(
    state.appInitKeys &&
      state.appInitKeys.username &&
      state.appInitKeys.tokenClient &&
      state.appInitKeys.tokenServer,
  ),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(actionCreators.savePositionDeeplink('yes'));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      }),
    );
  },
  onLockDown: () => {
    dispatch(actionCreators.savePositionDeeplink('yes'));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
  },
  onDone: () => {
    dispatch(actionCreators.savePositionDeeplink('yes'));
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Introduction',
            params: {backFromLink: true},
          }),
        ],
      }),
    );
  },
  logoutFunc: () => {
    dispatch(NavigationActions.back());
    setTimeout(() => {
      dispatch(logout());
    }, 0);
  },
});

const connectedCreditCardConfirmation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
