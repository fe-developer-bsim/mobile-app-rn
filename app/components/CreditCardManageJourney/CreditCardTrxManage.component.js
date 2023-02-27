import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './CreditCardManage.style';
import {language} from '../../config/language';
import {Field} from 'redux-form';
import SmsOtpModal from '../SmsOtp/SmsOtpModal.component';
import {Alert} from '../../utils/RNHelpers.util.js';
import noop from 'lodash/noop';
import NavListItem from '../NavListItem/NavListItem.component';
import result from 'lodash/result';

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
    moveTo: PropTypes.func
  }

  state = {
    otpToggle: false,
  }

  hideModal = () => this.setState({otpToggle: false})

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: true};
    moveTo('AuthDashboard', params);

  }

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

  onConfirmBlockCreditCard = () => {
    const {confirmBlockCreditCard = noop, selectedAccount} = this.props;
    return Alert.alert(language.DASHBOARD__BLOCK_CREDIT_CARD_CONFIRM_TITLE, `${language.DASHBOARD__BLOCK_CREDIT_CARD_CONFIRM_MESSAGE}: ${result(selectedAccount, 'accountNumber')}`, [{
      text: language.GENERIC__CANCEL
    }, {
      text: language.DASHBOARD__YES_BLOCK_CREDIT_CARD,
      onPress: () => {
        confirmBlockCreditCard().then(this.showModal);
      }
    }]);
  }

  render () {
    const {transRefNum = '', resendBillPayOTP = noop, goToCreditCardOptionInput = noop, userId,
      userMobileNumber} = this.props;
    return (
      <View style={styles.navItemsContainer}>
        <NavListItem
          theme='plain'
          label={language.DASHBOARD__CREDIT_CARD_INT_TRX}
          onPress={
            goToCreditCardOptionInput({
              label: 'TrxInt',
              title: `${language.DASHBOARD__CREDIT_CARD_INT_TRX}`,
              subtitle: `${language.CREDIT_CARD_MANAGE__CREDIT_CARD_INT_TRX_SUBTITLE}`,
              successTitle: language.CREDIT_CARD_MANAGE__CREDIT_CARD_OPTION_SUCCESS,
              successMessage: language.CREDIT_CARD_MANAGE__CREDIT_CARD_INT_TRX_SUCCESS_MESSAGE,
              menu: language.DASHBOARD__CREDIT_CARD_INT_TRX
            })
          }
        />
        <NavListItem
          theme='plain'
          label={language.DASHBOARD__CREDIT_CARD_ECOMERCE}
          onPress={
            goToCreditCardOptionInput({
              label: 'ECommerce',
              title: `${language.DASHBOARD__CREDIT_CARD_ECOMERCE}`,
              subtitle: `${language.CREDIT_CARD_MANAGE__CREDIT_CARD_ECOMERCE_SUBTITLE}`,
              successTitle: language.CREDIT_CARD_MANAGE__CREDIT_CARD_OPTION_SUCCESS,
              successMessage: language.CREDIT_CARD_MANAGE__CREDIT_CARD_ECOMERCE_SUCCESS_MESSAGE,
              menu: language.DASHBOARD__CREDIT_CARD_ECOMERCE
            })
          }
        />
        <NavListItem
          theme='plain'
          label={language.DASHBOARD__CREDIT_CARD_WITHDRAWAL}
          onPress={
            goToCreditCardOptionInput({
              label: 'CashDrawal',
              title: `${language.DASHBOARD__CREDIT_CARD_WITHDRAWAL}`,
              subtitle: `${language.CREDIT_CARD_MANAGE__CREDIT_CARD_WITHDRAWAL_SUBTITLE}`,
              successTitle: language.CREDIT_CARD_MANAGE__CREDIT_CARD_OPTION_SUCCESS,
              successMessage: language.CREDIT_CARD_MANAGE__CREDIT_CARD_WITHDRAWAL_SUCCESS_MESSAGE,
              menu: language.DASHBOARD__CREDIT_CARD_WITHDRAWAL
            })
          }
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
      </View>
    );
  }
}

export default CreditCardManage;
