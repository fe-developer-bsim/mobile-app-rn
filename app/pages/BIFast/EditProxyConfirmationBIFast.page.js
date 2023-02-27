import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {proxyUpdate} from '../../state/thunks/biFast.thunks';
import FundTransferConfirmation from '../../components/BIFast/EditProxyConfirmationBIFast.component';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doEdit}) => {
    const params = {onSubmit: doEdit, isOtp: false};
    dispatch(triggerAuthNavigate('CustomBiFast', 0, true, 'AuthBiFast', params));
  }
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
    selectedAccount: PropTypes.object,
    user: PropTypes.object,
    detailByCustNo: PropTypes.object,
    editProxy: PropTypes.func,
    dispatch: PropTypes.func
  };

  doTransfer = () => {
    const {navigation, transfer} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isKyc = result(navigation, 'state.params.isKyc', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    setTimeout(() => transfer(formValues, payee, resData, isKyc), 10);

  }
  doEdit = () => {
    const {navigation, editProxy} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const user = result(navigation, 'state.params.user', {});
    const detailByCustNo = result(navigation, 'state.params.detailByCustNo', {});
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    const myAccount = result(navigation, 'state.params.myAccount', {});
    const myAlldata = result(navigation, 'state.params.myAlldata', {});
    editProxy(formValues, user, detailByCustNo, selectedAccount, myAccount, myAlldata);
  }

  render () {
    const {navigation, triggerAuth, appConfig, gapTimeServer, favoriteBill, billerFavorite, showFavorite, removeFavorite, ownAccount, saveAlias, timeConfig, isLogin, editProxy, dispatch} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData', {});
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const findFav = find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber);
    const isFavorite = !isEmpty(findFav);
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    const myAccount = result(navigation, 'state.params.myAccount', {});
    return <DecoratedFundTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData} myAccount={myAccount}
      config={appConfig} gapTime={gapTimeServer} favoriteBill={favoriteBill} dispatch={dispatch}
      billerFavorite={billerFavorite} showFavorite={showFavorite} removeFavorite={removeFavorite}
      ownAccount={ownAccount} isFavorite={isFavorite} saveAlias={saveAlias} timeConfig={timeConfig}
      shouldSendSmsOtp={shouldSendSmsOtp} isLogin={isLogin} navigation={navigation} editProxy={editProxy} 
      doEdit={this.doEdit}/>;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(triggerAuthNavigate('fundTransfer', true, 'AuthDashboard', params)),
  editProxy: (user, detailByCustNo, selectedAccount, myAccount, myAlldata) => dispatch(proxyUpdate(user, detailByCustNo, selectedAccount, myAccount, myAlldata)),
  dispatch
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
