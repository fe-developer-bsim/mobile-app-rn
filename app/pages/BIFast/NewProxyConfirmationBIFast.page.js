import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, showFavoriteTransfer, removeFavorite, saveAlias} from '../../state/thunks/common.thunks';
import {transfer} from '../../state/thunks/fundTransfer.thunks';
import FundTransferConfirmation from '../../components/BIFast/NewProxyConfirmationBIFast.component';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import {NavigationActions} from 'react-navigation';
import {addRegisterProxyAddress, portingRegisterProxyAddress} from '../../state/thunks/biFast.thunks';

const formConfig = {
  form: 'BiFastConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {registerProxyAddress, addProxyAddress, portingRegisterProxyAddress, isPortingProxyRC}) => {
    if (isPortingProxyRC) {
      const params = {onSubmit: portingRegisterProxyAddress, isOtp: false, addProxyAddress};
      dispatch(triggerAuthNavigate('CustomBiFast', 0, true, 'AuthBiFast', params));
    } else {
      const params = {onSubmit: registerProxyAddress, isOtp: false, addProxyAddress};
      dispatch(triggerAuthNavigate('CustomBiFast', 0, true, 'AuthBiFast', params));
    }
  },
};

const DecoratedFundTransferConfirmation = reduxForm(formConfig)(FundTransferConfirmation);

class FundTransferConfirmationPage extends Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    payee: PropTypes.object,
    transfer: PropTypes.func,
    resData: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    favoriteBill: PropTypes.string,
    billerFavorite: PropTypes.array,
    showFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    saveAlias: PropTypes.func,
    ownAccount: PropTypes.array,
    getFavBillerTrf: PropTypes.func,
    isFavorite: PropTypes.bool,
    timeConfig: PropTypes.object,
    tokenConfig: PropTypes.array,
    isLogin: PropTypes.bool,
    goBack: PropTypes.func,
    addRegisterProxyAddress: PropTypes.func,
    portingRegisterProxyAddress: PropTypes.func,

  };

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

  render () {
    const {navigation, triggerAuth, appConfig, gapTimeServer, favoriteBill, billerFavorite, showFavorite, removeFavorite, ownAccount, saveAlias, timeConfig, isLogin,
      goBack, addRegisterProxyAddress} = this.props;
    const addProxyAddress = result(navigation, 'state.params.addProxyAddress', '');
    const proxyAlias = result(navigation, 'state.params.proxyAlias', '');
    const isPortingProxyRC = result(navigation, 'state.params.responseCode', '');
    const myAccount = result(navigation, 'state.params.myAccount', {});
    
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData', {});
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const findFav = find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber);
    const isFavorite = !isEmpty(findFav);
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    return <DecoratedFundTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} resData={resData}
      config={appConfig} gapTime={gapTimeServer} favoriteBill={favoriteBill}
      billerFavorite={billerFavorite} showFavorite={showFavorite} removeFavorite={removeFavorite}
      ownAccount={ownAccount} isFavorite={isFavorite} saveAlias={saveAlias} timeConfig={timeConfig} 
      shouldSendSmsOtp={shouldSendSmsOtp} isLogin={isLogin} navigation={navigation}
      goBack={goBack} addProxyAddress={addProxyAddress} proxyAlias={proxyAlias}myAccount={myAccount} 
      isPortingProxyRC={isPortingProxyRC}
      registerProxyAddress={this.registerProxyAddress}
      addRegisterProxyAddress={addRegisterProxyAddress}
      portingRegisterProxyAddress={this.portingProxyAddress}
    />;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData, isKyc) => dispatch(transfer(values, payee, 'fundTransfer', resData, false, '', isKyc)),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavoriteTransfer(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias()),
  goBack: () => {
    dispatch(NavigationActions.back());
  },
  addRegisterProxyAddress: (data) => {
    dispatch(addRegisterProxyAddress(data));
  }, 
  portingRegisterProxyAddress: (data) => {
    dispatch(portingRegisterProxyAddress(data));
  },
});

const mapStateToProps = (state) => ({
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  favoriteBill: result(state, 'billerDescFav.isFavorite', ''),
  billerFavorite: result(state, 'billerFavorite', {}),
  ownAccount: result(state, 'accounts', {}),
  timeConfig: result(state, 'timeConfig', {}),
  tokenConfig: result(state, 'config.tokenConfig', []),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const connectedFundTransferConfirmation = connect(mapStateToProps, mapDispatchToProps)(FundTransferConfirmationPage);
export default connectedFundTransferConfirmation;
