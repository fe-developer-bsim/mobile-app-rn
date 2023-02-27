import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, showFavoriteTransfer, removeFavorite, saveAlias} from '../../state/thunks/common.thunks';
import {transferSIL} from '../../state/thunks/dashboard.thunks';
import FundTransferConfirmation from '../../components/InvestmentJourney/SILPaymentConfirmation.component';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

const formConfig = {
  form: 'buySilTransfer',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, payee, formValues, isOwnAccount}) => {
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: true};
    triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthDashboard', params, true);
  }
};

const mapStateToProps = (state) => ({
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  favoriteBill: result(state, 'billerDescFav.isFavorite', ''),
  billerFavorite: result(state, 'billerFavorite', {}),
  ownAccount: result(state, 'accounts', {}),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  currencySil: result(state, 'getCurrencyNBSil.currencyRateList', {}),
  nameCurrency: result(state, 'form.buyPaymentSIL.values.myAccount.currency')
});

const DecoratedFundTransferConfirmation = reduxForm(formConfig)(FundTransferConfirmation);

class ConfirmationPaymentBuyPolisSIL extends Component {
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
    isSilIdrUsd: PropTypes.string,
    currencySil: PropTypes.array,
    nameCurrency: PropTypes.object,
    inputAmount: PropTypes.string
  };

  doTransfer = () => {
    const {navigation, transfer} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    const silFlag = 'new business';
    setTimeout(() => transfer(formValues, payee, resData, silFlag), 10);

  }

  render () {
    const {navigation, triggerAuth, appConfig, gapTimeServer, favoriteBill, billerFavorite,
      showFavorite, removeFavorite, ownAccount, saveAlias, isSilIdrUsd, currencySil, nameCurrency} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData.transferTransaction', {});
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const findFav = find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber);
    const isFavorite = !isEmpty(findFav);
    const inputAmount = result(formValues, 'amount', 0);

    return <DecoratedFundTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData}
      config={appConfig} gapTime={gapTimeServer} favoriteBill={favoriteBill}
      billerFavorite={billerFavorite} showFavorite={showFavorite} removeFavorite={removeFavorite}
      ownAccount={ownAccount} isFavorite={isFavorite} saveAlias={saveAlias} isSilIdrUsd={isSilIdrUsd}
      currencySil={currencySil} nameCurrency={nameCurrency}
      inputAmount={inputAmount}/>;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData, silFlag) => dispatch(transferSIL(values, payee, 'nbSil', resData, silFlag)),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavoriteTransfer(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias())
});

const connectedFundTransferConfirmation = connect(mapStateToProps, mapDispatchToProps)(ConfirmationPaymentBuyPolisSIL);
export default connectedFundTransferConfirmation;