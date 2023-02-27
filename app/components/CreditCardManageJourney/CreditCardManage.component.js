import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './CreditCardManage.style';
import {language} from '../../config/language';
import {Field} from 'redux-form';
import SmsOtpModal from '../SmsOtp/SmsOtpModal.component';
import noop from 'lodash/noop';
import NavListItem from '../NavListItem/NavListItem.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {SinarmasAlert} from '../FormComponents';

class CreditCardManage extends React.Component {

  static propTypes = {
    goToCreditCardOptionInput: PropTypes.func,
    confirmBlockCreditCard: PropTypes.func,
    requestBlockCreditCard: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    handleSubmit: PropTypes.func,
    transRefNum: PropTypes.string,
    selectedAccount: PropTypes.object,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    moveTo: PropTypes.func,
    toCreditCardTrxManage: PropTypes.func,
    blockCreditCard: PropTypes.func,
    goCreatePin: PropTypes.func,
    confirmCreatePINreditCard: PropTypes.func,
    goToAddressList: PropTypes.func,
    hideSpinner: PropTypes.func,
    showSpinner: PropTypes.func,
    dispatch: PropTypes.func,
    navigateToConvert: PropTypes.func,
    navigageToTransactionManagement: PropTypes.func,
    downloadStatement: PropTypes.func,
    formValues: PropTypes.object,
    navigateToCCCashAdvance: PropTypes.func,
    navigateToNotifSettings: PropTypes.func,
    navigateToConfirm: PropTypes.func,
    flag: PropTypes.object,
    enableCCcashAdvance: PropTypes.string,
  }

  state = {
    otpToggle: false,
    isChangePin: true,
    isBlock: false,
    containerHeightStyle: {minHeight: 0},
    modalVisible: false
  }

  hideModal = () => this.setState({otpToggle: false})

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: true};
    moveTo('AuthDashboard', params);

  }

  toggleModalVisible = () => {
    const curr = this.state.modalVisible;
    this.setState({modalVisible: !curr});
  }

  goBack = () => {
    NavigationActions.back();
    this.setState({modalVisible: false});
  };

  onModalSubmit = () => {
    this.setState({otpToggle: false}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      setTimeout(() => {
        const {requestBlockCreditCard = noop, selectedAccount} = this.props;
        requestBlockCreditCard(selectedAccount);
      }, 500);
    });
  };

  goconfirmBlockCreditCard = () => {
    const {confirmBlockCreditCard = noop, selectedAccount} = this.props;
    confirmBlockCreditCard(selectedAccount);
  }

  goChangePin = () => {
    const {confirmCreatePINreditCard = noop, selectedAccount} = this.props;
    const isChangePin = this.state.isChangePin;
    confirmCreatePINreditCard(selectedAccount, isChangePin);
  }

  goToAddress = () => {
    const {goToAddressList = noop, selectedAccount} = this.props;
    goToAddressList(selectedAccount);
  }

  downloadEStatement = () => {
    const {formValues, downloadStatement} = this.props;
    const month = result(formValues, 'Periode.schmeId', 'currPeriod');
    downloadStatement(month);
    this.setState({modalVisible: false});
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  downloadEStatement = () => {
    const {formValues, downloadStatement} = this.props;
    const month = result(formValues, 'Periode.schmeId', 'currPeriod');
    downloadStatement(month);
    this.setState({modalVisible: false});
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  render () {
    const {transRefNum = '', resendBillPayOTP = noop, goToCreditCardOptionInput = noop, navigateToConvert = noop, userId, navigateToConfirm,
      userMobileNumber, selectedAccount, navigateToCCCashAdvance = noop, navigateToNotifSettings = noop, navigageToTransactionManagement, flag, enableCCcashAdvance} = this.props;
    const {containerHeightStyle, modalVisible} = this.state;
    const cardBase = result(selectedAccount, 'cardBase', '');
    const cardStatus = result(selectedAccount, 'cardStatus', '');
    // const inactive = cardBase === 'virtualCreditCard' && cardStatus === '0';
    // const statuscard = inactive ? 'soon' : 'new';
    const isCA = result(flag, 'flagCav', '');
    const statusCA = isCA === 'Y' ? 'new' : 'disable';
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}} style={[styles.container]}>
          <View style={styles.rightItemContainer}>
            <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_SERVICES}</Text>
            <View style={styles.containerLeft}>
              <NavListItem
                theme='VCC'
                label={language.DASHBOARD__CREDIT_CARD_BLOCK}
                onPress={this.goconfirmBlockCreditCard}
              />
              <NavListItem
                theme='VCC'
                label={language.DASHBOARD__CREDIT_CARD_CONVERT}
                onPress={navigateToConvert}
                status='new'
              />
              <NavListItem
                theme='VCC'
                label={language.DASHBOARD__CREDIT_CARD_LIMIT}
                onPress={
                  goToCreditCardOptionInput({
                    label: 'ChangeLimit',
                    title: language.DASHBOARD__CREDIT_CARD_LIMIT,
                    subtitle: language.CREDIT_CARD_MANAGE__CREDIT_CARD_CHANGE_LIMIT_SUBTITLE,
                    successTitle: language.CREDIT_CARD_MANAGE__CREDIT_CARD_CHANGE_LIMIT_SUCCESS,
                    successMessage: language.CREDIT_CARD_MANAGE__CREDIT_CARD_CHANGE_LIMIT_SUCCESS_MESSAGE,
                    menu: language.DASHBOARD__CREDIT_CARD_LIMIT
                  })
                }
              />
              { enableCCcashAdvance === 'TRUE'  ?
                <NavListItem
                  theme='VCC'
                  label={language.DASHBOARD__CREDIT_CARD_CASH}
                  onPress={navigateToCCCashAdvance}
                  status={statusCA}
                /> : null }
              {cardBase === 'virtualCreditCard' && cardStatus === '1' ?
                <NavListItem
                  theme='VCC'
                  label={language.DASHBOARD__CREDIT_REQUEST_CARD}
                  onPress={this.goToAddress}
                  status= 'new'
                /> : null}
              {cardBase === 'virtualCreditCard' && cardStatus === '0' ?
                <NavListItem
                  theme='VCC'
                  label={language.CREDITCARD__ACTIVATE_PRINTED_CARD}
                  onPress={navigateToConfirm}
                /> : null}
              {cardBase === 'physicalCreditCard' ?
                <NavListItem
                  theme='VCC'
                  label={language.DASHBOARD__CREDIT_CREATE_PIN}
                  onPress={this.goChangePin}
                /> : null}
              <NavListItem
                theme='VCCN'
                label={language.DASHBOARD__CREDIT_CARD_NOTIFICATION}
                onPress={navigateToNotifSettings}
                status='new'
              />
            </View>
          </View>

          <View style={styles.rightItemContainer}>
            <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_SETTINGS}</Text>
            <View style={styles.containerLeft}>
              <NavListItem
                theme='VCCN'
                label={language.DASHBOARD__CREDIT_CARD_MANAGEMENT}
                onPress={navigageToTransactionManagement}
              />
            </View>
          </View>

          <SinarmasAlert
            visible = {modalVisible}
            button1 = {language.MANAGE__CREDIT_CARD_STATEMENT_DOWNLOAD}
            button2 = {language.MANAGE__CREDIT_CARD_STATEMENT_CANCEL}
            heading1 = {language.MANAGE__CREDIT_CARD_STATEMENT_CHOOSE}
            onButton1Press = {this.downloadEStatement}
            onButton2Press = {this.goBack}
            image = 'ESTATEMENT'
            button2color = 'red'
            onClose = {this.goBack}
          />

          <Field
            name='smsOtp'
            component={SmsOtpModal}
            userId={userId}
            visible={this.state.otpToggle}
            transRefNum={transRefNum}
            onClose={this.hideModal}
            submitHandler={this.onModalSubmit}
            resendOTP={resendBillPayOTP}
            userMobileNumber={userMobileNumber}
          />

        </ScrollView>
      </View>
    );
  }
}

export default CreditCardManage;
