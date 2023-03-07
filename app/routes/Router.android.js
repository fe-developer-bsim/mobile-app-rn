import React from 'react';
import PropTypes from 'prop-types';
// import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import {BackHandler} from 'react-native';
import Routes from './index.routes';
import {getCurrentRouteName} from '../utils/transformer.util';

class RouterWrapper extends React.Component {
  static propTypes = {
    nav: PropTypes.object,
    dispatch: PropTypes.func,
    showSpinner: PropTypes.bool,
    goToLoginWithEasyPin: PropTypes.func,
  }
  componentDidMount () { // FROM: https://github.com/react-community/react-navigation/issues/117
    BackHandler.addEventListener('backPress', () => {
      const {dispatch, nav, showSpinner} = this.props;
      const currentRoute = getCurrentRouteName(nav);
      if (currentRoute === 'Landing' || currentRoute === 'Introduction' || currentRoute === 'MigrateLandingPage' || currentRoute === 'Login' || currentRoute === '') { // exit the app from landing page
        return false;
      }
      if (['HomeScreen', 'AppVersionUpdator'].includes(currentRoute)
      || showSpinner
      || currentRoute === 'EgiftPaymentStatus'
      || currentRoute === 'CgvConfirmAccount'
      || currentRoute === 'CgvConfirmStatus'
      || currentRoute === 'DukcapilNotMatch'
      || currentRoute === 'CreditCardFinalize'
      || currentRoute === 'QRInvoiceData'
      || currentRoute === 'ImageConfirmation'
      || currentRoute === 'EgiftSrcAcc'
      || currentRoute === 'SavingDukcapilNotMatch'
      || currentRoute === 'SavingAccountFinalize'
      || currentRoute === 'EmoneyUpgradeFinalize'
      || currentRoute === 'EgiftPaymentStatus' 
      || currentRoute === 'AlfacartCheckout'
      || currentRoute === 'QRPaymentStatus' || currentRoute === 'PaymentStatusNew' 
      || currentRoute === 'QRPaymentStatusRevamp' || currentRoute === 'PaymentStatusRevamp'
      || currentRoute === 'QRRegisterStatus'
      || currentRoute === 'QRRefundStatus'
      || currentRoute === 'QRTerminalStatus'
      || currentRoute === 'QRTerminalDelStatus'
      || currentRoute === 'QRTerminalResetStatus'
      || currentRoute === 'QRTerminalEditStatus' 
      || currentRoute === 'FundTransferPaymentSetLimit'
      || currentRoute === 'HighValue'
      || currentRoute === 'FundTransferPaymentFromSetLimit'
      || currentRoute === 'DigitalEForm'
      ) { // Don't go back if spinner or payment modal is visible or from main tabs
        return true;
      } else { // in all the other cases, navigate back
        dispatch({type: 'Navigation/BACK'});
        return true;
      }
    });
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('backPress');
  }

  render() {
    const {dispatch, nav, goToLoginWithEasyPin} = this.props;
    return (
      <Routes
        navigation={{
          dispatch,
          state: nav,
          goToLoginWithEasyPin,
          addListener: () => {},
        }}
      />
    );
  }
}

const mapStateToProps = ({nav, showSpinner, appInitKeys}) => ({nav, showSpinner, appInitKeys});

const mapDispatchToProps = (dispatch) => ({dispatch});

export const ConnectedRoutes = connect(mapStateToProps, mapDispatchToProps)(RouterWrapper);

export default Routes;