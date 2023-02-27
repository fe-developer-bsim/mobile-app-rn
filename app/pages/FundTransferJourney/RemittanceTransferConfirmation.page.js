import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate, showFavoriteTransfer, removeFavorite, saveAlias} from '../../state/thunks/common.thunks';
import {transfer} from '../../state/thunks/fundTransfer.thunks';
import RemittanceTransferConfirmation from '../../components/FundTransferJourney/RemittanceTransferCorfirmation.component';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';


const formConfig = {
  form: 'remittanceTransferConfirmation',
  destroyOnUnmount: true,
  initialValues: {
    refreshRateRemittanceValue: {},
  },
  onSubmit: (values, dispatch, {doTransfer, triggerAuth, payee, formValues, isLogin, shouldSendSmsOtp}) => {
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const params = {onSubmit: doTransfer, amount: formValues.amount, isOtp: payee.isNewPayee || shouldSendSmsOtp};
    if (!isLogin) {
      if (shouldSendSmsOtp === false) {
        if (payee.isNewPayee === true) {
          triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, shouldSendSmsOtp);
        } else {
          triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, shouldSendSmsOtp);
        }
      }
    } else {
      triggerAuth(formValues.amount, payee.isNewPayee, isOwnAccount, 'AuthTransfer', params, shouldSendSmsOtp);
    }
  }
};

const DecoratedRemittanceTransferConfirmation = reduxForm(formConfig)(RemittanceTransferConfirmation);

class RemittanceTransferConfirmationPage extends Component {
  static propTypes = {
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    payee: PropTypes.object,
    transfer: PropTypes.func,
    resData: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    isLogin: PropTypes.bool,
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
    formRefreshRateRemittance: PropTypes.object,
    toggleSpreadMargin: PropTypes.bool,
    valasRefreshInterval: PropTypes.number,
  };

  doTransfer = () => {
    const {navigation, transfer} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isKyc = result(navigation, 'state.params.isKyc', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const resData = result(navigation, 'state.params.resData', {});
    setTimeout(() => transfer(formValues, payee, resData, isKyc), 10);
  }

  render () {
    const {navigation, triggerAuth, appConfig, gapTimeServer, isLogin, favoriteBill, billerFavorite, showFavorite, ownAccount, timeConfig, formRefreshRateRemittance, toggleSpreadMargin, valasRefreshInterval} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const formValues = result(navigation, 'state.params.formValues', {});
    const isOwnAccount = result(payee, 'transferType', '') === 'own';
    const resData = result(navigation, 'state.params.resData.transferTransaction', {});
    const getCurrency = result(navigation, 'state.params.getCurrency', []);
    const currencyRate = result(navigation, 'state.params.currencyRate', []);
    const isValas = result(navigation, 'state.params.isValas', false);
    const shouldSendSmsOtp = result(navigation, 'state.params.shouldSendSmsOtp', false);
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const findFav = find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber);
    const isFavorite = !isEmpty(findFav);
    const dataTransactionRemittance = result(navigation, 'state.params.dataTransactionRemittance', {});
    const rateChangeRemittance = result(formRefreshRateRemittance, 'rateChange', false);
    return <DecoratedRemittanceTransferConfirmation
      triggerAuth={triggerAuth} payee={payee} formValues={formValues}
      isOwnAccount={isOwnAccount} doTransfer={this.doTransfer} resData={resData}
      config={appConfig} gapTime={gapTimeServer} getCurrency={getCurrency}
      currencyRate={currencyRate} isValas={isValas} isLogin={isLogin} shouldSendSmsOtp={shouldSendSmsOtp}
      favoriteBill={favoriteBill} billerFavorite={billerFavorite} showFavorite={showFavorite} removeFavorite={removeFavorite}
      ownAccount={ownAccount} isFavorite={isFavorite} saveAlias={saveAlias} timeConfig={timeConfig} dataTransactionRemittance={dataTransactionRemittance}
      formRefreshRateRemittance={formRefreshRateRemittance} rateChangeRemittance={rateChangeRemittance} toggleSpreadMargin={toggleSpreadMargin} valasRefreshInterval={valasRefreshInterval}
    />;
  }
}


const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params, shouldSendSmsOtp) => {
    if (isNewPayee || shouldSendSmsOtp) {
      return dispatch(getTransRefNumAndOTPNavigate('transfer', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('transfer', amount, isOwnAccount, routeName, params));
  },
  transfer: (values, payee, resData, isValas, currencyRate) => dispatch(transfer(values, payee, 'remmitance', resData, isValas, currencyRate)),
  showFavorite: (billerName, subsNumber) => () => dispatch(showFavoriteTransfer(billerName, subsNumber)),
  removeFavorite: (billerName, subsNumber) => () => dispatch(removeFavorite(billerName, subsNumber)),
  saveAlias: () => dispatch(saveAlias()),
});

const mapStateToProps = (state) => ({
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  isLogin: !isEmpty(result(state, 'user', {})),
  favoriteBill: result(state, 'billerDescFav.isFavorite', ''),
  billerFavorite: result(state, 'billerFavorite', {}),
  ownAccount: result(state, 'accounts', {}),
  timeConfig: result(state, 'timeConfig', {}),
  tokenConfig: result(state, 'config.tokenConfig', []),
  formRefreshRateRemittance: result(state, 'form.remittanceTransferConfirmation.values.refreshRateRemittanceValue', {}),
  toggleSpreadMargin: result(state, 'config.toggleSpreadMargin', true),
  valasRefreshInterval: result(state, 'config.valasRefreshInterval', 0),
});

const connectedRemittanceTransferConfirmation = connect(mapStateToProps, mapDispatchToProps)(RemittanceTransferConfirmationPage);
export default connectedRemittanceTransferConfirmation;