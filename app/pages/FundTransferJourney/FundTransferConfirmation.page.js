import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, showFavoriteTransfer, removeFavorite, saveAlias, getSimasPoinLogin, triggerAuthNavigateSetLimit} from '../../state/thunks/common.thunks';
import {transfer} from '../../state/thunks/fundTransfer.thunks';
import FundTransferConfirmation from '../../components/FundTransferJourney/FundTransferConfirmation.component';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, triggerAuthSetLimit, payee, formValues, shouldSendSmsOtp, isLogin, isSplitBill}) => {
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const amountSetLimit = 500000000;
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: payee.isNewPayee, isOwnAccount};
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (payee.isNewPayee === true) {
          dispatch(getSimasPoinLogin(params));
        } else {
          triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, true);
        }
      } else {
        dispatch(getSimasPoinLogin(params));
      }
    } else if (isSplitBill) {
      triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransferBill', params, true);
    } else if (Number(formValues.amount) > amountSetLimit) {
      triggerAuthSetLimit(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransferSetLimit', params, true);
    }    else {
      triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, true);
    }
  }
};

const DecoratedFundTransferConfirmation = reduxForm(formConfig)(FundTransferConfirmation);

class FundTransferConfirmationPage extends Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    triggerAuthSetLimit: PropTypes.func,
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
    isSplitBill: PropTypes.bool,
    timeConfig: PropTypes.object,
    dataTransRefNum: PropTypes.string,
    tokenConfig: PropTypes.array,
    isLogin: PropTypes.bool,
  };

  doTransfer = () => {
    const {navigation, transfer} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isKyc = result(navigation, 'state.params.isKyc', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    const dataTransRefNum = result(navigation, 'state.params.dataTransRefNum', '');
    const invoiceNumber = result(navigation, 'state.params.invoiceNumber', '');
    const isBiFast = result(navigation, 'state.params.payee.isBiFast', false);
    setTimeout(() => transfer(formValues, payee, resData, isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber), 10);

  }

  render () {
    const {navigation, triggerAuth, triggerAuthSetLimit, appConfig, gapTimeServer, favoriteBill, billerFavorite, showFavorite, removeFavorite, ownAccount, saveAlias, timeConfig, isLogin} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData', {});
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const findFav = find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber);
    const isFavorite = !isEmpty(findFav);
    const isSplitBill = result(navigation, 'state.params.isSplitBill');
    const dataTransRefNum = result(navigation, 'state.params.dataTransRefNum', '');
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);    
    return <DecoratedFundTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData}
      config={appConfig} gapTime={gapTimeServer} favoriteBill={favoriteBill}
      billerFavorite={billerFavorite} showFavorite={showFavorite} removeFavorite={removeFavorite}
      ownAccount={ownAccount} isFavorite={isFavorite} saveAlias={saveAlias} timeConfig={timeConfig} shouldSendSmsOtp={shouldSendSmsOtp} isLogin={isLogin} 
      isSplitBill={isSplitBill} dataTransRefNum={dataTransRefNum} triggerAuthSetLimit={triggerAuthSetLimit}
    />;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    } else {
      return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
    }
  },
  triggerAuthSetLimit: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigateSetLimit('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData, isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber) => dispatch(transfer(values, payee, 'fundTransfer', resData, false, '', isKyc, isBiFast, isSplitBill, dataTransRefNum, invoiceNumber)),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavoriteTransfer(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias())
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
