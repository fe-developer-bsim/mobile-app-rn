import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {resendBillPayOTP, confirmActivateCreditCard} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {requestBlockCreditCard as requestBlockCreditCardThunk, getCreditCardDetail as getCreditCardDetailThunk, getCreditCardHistory, downloadCreditCardHistory, GetTxnManage, getNotifSettings, getExistingDataNew, GetTxnManageStatus} from '../../state/thunks/creditCardManage.thunks';
import noop from 'lodash/noop';
import CreditCardManage from '../../components/CreditCardManageJourney/CreditCardManage.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {Linking} from 'react-native';
import {getCcHistoryUrl} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';


const formConfig = {
  form: 'CreditCardManageForm',
};

const ConnectedForm = reduxForm(formConfig)(CreditCardManage);

class CreditCardManagePage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    confirmBlockCreditCard: PropTypes.func,
    requestBlockCreditCard: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    moveTo: PropTypes.func,
    toCreditCardTrxManage: PropTypes.func,
    selectedAccount: PropTypes.object,
    confirmCreatePINreditCard: PropTypes.func,
    goToAddressList: PropTypes.func,
    navigateToConvert: PropTypes.func,
    navigageToTransactionManagement: PropTypes.func,
    downloadStatement: PropTypes.func,
    formValues: PropTypes.object,
    lang: PropTypes.string,
    iPass: PropTypes.string,
    dispatch: PropTypes.func,
    getCreditCardDetail: PropTypes.func,
    getNotifSettings: PropTypes.func,
    gettxnManage: PropTypes.func,
    navigateToConfirm: PropTypes.func,
    navigateToConfirm1: PropTypes.func,
    GetTxnManageStatus: PropTypes.func,
    flag: PropTypes.object,
    enableCCcashAdvance: PropTypes.string,
  }

  static defaultProps = {
    transRefNum: ''
  }

  state = {
    creditCardDetail: {}
  }

  componentDidMount () {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.GetTxnManageStatus(selectedAccount);
  }

  goToCreditCardOptionInput = (menu) => () => {
    const {navigation} = this.props;
    const account = result(navigation, 'state.params.selectedAccount');
    this.props.navigation.navigate('CreditCardManageInput', {account, ...menu});

  }

  _navigateToConvert = () => {
    const {navigation} = this.props;
    const account = result(navigation, 'state.params.selectedAccount');
    this.props.navigateToConvert(account);
  }

  _goToTransManage = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.gettxnManage(selectedAccount);
  }

  _downloadEStatement = (month) => {
    const {navigation, iPass, lang} = this.props;
    const accountNumber = result(navigation, 'state.params.selectedAccount.accountNumber');
    const url = getCcHistoryUrl(accountNumber, iPass, lang, month);
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL);
      }
    });
  }

  navigateToCCCashAdvance = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.getCreditCardDetail(selectedAccount);
  }

  navigateToNotifSettings = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.getNotifSettings(selectedAccount);
  }

  navigateToConfirmActivate = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.navigateToConfirm1(selectedAccount);
  }

  _navigateToConvert = () => {
    const {navigation} = this.props;
    const account = result(navigation, 'state.params.selectedAccount');
    this.props.navigateToConvert(account);
  }

  _goToTransManage = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.gettxnManage(selectedAccount);
  }


  navigateToCCCashAdvance = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.getCreditCardDetail(selectedAccount);
  }

  navigateToNotifSettings = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.getNotifSettings(selectedAccount);
  }

  render () {
    const {navigation = {}, confirmBlockCreditCard = noop, requestBlockCreditCard = noop,
      resendBillPayOTP, transRefNum, userId, userMobileNumber, moveTo, formValues, confirmCreatePINreditCard = noop, toCreditCardTrxManage, goToAddressList, flag, enableCCcashAdvance} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');

    return (
      <ConnectedForm
        gotoCreditCardChangeLimit={this.gotoCreditCardChangeLimit} selectedAccount={selectedAccount}
        confirmBlockCreditCard={confirmBlockCreditCard} requestBlockCreditCard={requestBlockCreditCard}
        resendBillPayOTP={resendBillPayOTP}
        goToCreditCardOptionInput={this.goToCreditCardOptionInput}
        navigateToConvert={this._navigateToConvert}
        navigageToTransactionManagement={this._goToTransManage}
        transRefNum={transRefNum}
        userId={userId}
        userMobileNumber={userMobileNumber}
        moveTo={moveTo}
        toCreditCardTrxManage={toCreditCardTrxManage}
        confirmCreatePINreditCard={confirmCreatePINreditCard}
        goToAddressList={goToAddressList}
        formValues={formValues}
        creditCardDetail={this.state.creditCardDetail}
        navigateToCCCashAdvance={this.navigateToCCCashAdvance}
        navigateToNotifSettings={this.navigateToNotifSettings}
        navigateToConfirm={this.navigateToConfirmActivate}
        flag={flag}
        enableCCcashAdvance={enableCCcashAdvance}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum'),
  userId: result(state, 'user.profile.customer.id', 0),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  eStatementOption: result(state, 'config.ccDownloadEstatement'),
  formValues: result(state, 'form.CreditCardManageForm.values', {}),
  lang: result(state, 'currentLanguage.id', 'id'),
  iPass: result(state, 'user.ipassport', ''),
  flag: result(state, 'creditCardTrxManageReducer'),
  enableCCcashAdvance: result(state, 'config.enableCCcashAdvance', ''),
});

const mapDispatchToProps = (dispatch) => ({
  confirmBlockCreditCard: (selectedAccount, isChangePin) => dispatch(NavigationActions.navigate({routeName: 'CreditCardManageDetail', params: {selectedAccount, isChangePin}})),
  requestBlockCreditCard: (accountNumber) => dispatch(requestBlockCreditCardThunk(accountNumber)),
  confirmCreatePINreditCard: (selectedAccount, isChangePin) => dispatch(NavigationActions.navigate({routeName: 'CreditCardManageCreatePin', params: {selectedAccount, isChangePin}})),
  resendBillPayOTP: () => dispatch(resendBillPayOTP('cc')),
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}})),
  toCreditCardTrxManage: () => dispatch(NavigationActions.navigate({routeName: 'CreditCardTrxManage'})),
  goToAddressList: (selectedAccount) => dispatch(getExistingDataNew(selectedAccount)),
  navigateToConvert: (selectedAccount) => {
    dispatch(getCreditCardHistory(selectedAccount));
  },
  gettxnManage: (selectedAccount) => dispatch(GetTxnManage(selectedAccount)),
  GetTxnManageStatus: (selectedAccount) => dispatch(GetTxnManageStatus(selectedAccount)),
  downloadStatement: (selectedAccount, month) => {
    dispatch(downloadCreditCardHistory(selectedAccount, month));
  },
  getCreditCardDetail: (selectedAccount) => dispatch(getCreditCardDetailThunk(selectedAccount)),
  getNotifSettings: (selectedAccount) => dispatch(getNotifSettings(selectedAccount)),
  navigateToConfirm1: (selectedAccount) => {
    dispatch(confirmActivateCreditCard(selectedAccount));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardManagePage);
