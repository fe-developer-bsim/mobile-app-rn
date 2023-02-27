import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {cardVerticalSpacingStyle, buttonLargeTextStyle} from '../../styles/common.styles';
import noop from 'lodash/noop';
import {Field} from 'redux-form';
import styles from './CreditCardManageConfirmation.style';
import {language} from '../../config/language';
import SmsOtpModal from '../SmsOtp/SmsOtpModal.component';
import result from 'lodash/result';
import {formatFieldAmount, creditCardNumberFormat} from '../../utils/transformer.util';

class CreditCardManageConfirmation extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    isConnected: PropTypes.bool,
    resendOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    confirmCreditCardOption: PropTypes.func,
    requestCreditCardOption: PropTypes.func,
    valuesData: PropTypes.object,
    confirmCreditCardChangeLimit: PropTypes.func,
    requestCreditCardChangeLimit: PropTypes.func,
    userMobileNumber: PropTypes.string,
    moveTo: PropTypes.func
  }

  state = {
    otpToggle: false,
    containerHeightStyle: {minHeight: 0},
  }

  hideModal = () => this.setState({otpToggle: false})

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: true};
    moveTo('AuthDashboard', params);
  }

  onConfirmCreditCardManage = () => {
    const {confirmCreditCardOption = noop, valuesData, confirmCreditCardChangeLimit = noop} = this.props;
    return result(valuesData, 'label') === 'ChangeLimit' ? confirmCreditCardChangeLimit().then(this.showModal) : confirmCreditCardOption().then(this.showModal);
  }

  onModalSubmit = () => {
    this.setState({otpToggle: false}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      setTimeout(() => {
        const {requestCreditCardOption = noop, valuesData, requestCreditCardChangeLimit = noop} = this.props;
        result(valuesData, 'label') === 'ChangeLimit' ? requestCreditCardChangeLimit(valuesData) : requestCreditCardOption(valuesData);
      }, 500);
    });
  };

  render () {
    const {isConnected, resendOTP = noop, transRefNum = '', valuesData, userMobileNumber} = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.containerContent} style={styles.container}>
        <Text style={styles.titleText}>{language.CREDIT_CARD_MANAGE__CONFIRMATION_TITLE}</Text>
        <Text style={styles.subtext}>{language.CREDIT_CARD_MANAGE__CONFIRMATION_SUBTITLE}</Text>
        <View style={styles.summaryContainer}>
          <View style ={styles.summaryArea}>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD_MANAGE__CONFIRMATION_CREDIT_CARD_NAME}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{result(valuesData, 'creditCardName')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD_MANAGE__CONFIRMATION_CREDIT_CARD_BIRTH_DATE}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{result(valuesData, 'creditCardBirth')}</Text></View>
              </View>
            </View>
            {
              result(valuesData, 'label') === 'ChangeLimit' ?
                <View style={styles.rowItem}>
                  <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD_MANAGE__INPUT_CREDIT_CARD_CHANGE_LIMIT}</Text></View>
                  <View style={styles.halfWidth}>
                    <View style={styles.rowItemRight}>
                      <Text style={styles.rightItemHeader}>{formatFieldAmount(result(valuesData, 'limit'))}</Text>
                    </View>
                  </View>
                </View> :
                <View>
                  <View style={styles.rowItem}>
                    <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD_MANAGE__INPUT_CREDIT_CARD_MENU}</Text></View>
                    <View style={styles.halfWidth}>
                      <View style={styles.rowItemRight}>
                        <Text style={styles.rightItemHeader}>{result(valuesData, 'menu')}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD_MANAGE__INPUT_CREDIT_CARD_CHANGE_STATUS}</Text></View>
                    <View style={styles.halfWidth}>
                      <View style={styles.rowItemRight}>
                        <Text style={styles.rightItemHeader}>{result(valuesData, 'status.label')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
            }
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.CREDIT_CARD_MANAGE__CONFIRMATION_CREDIT_CARD_ACCOUNT_NO}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{creditCardNumberFormat(result(valuesData, 'account.accountNumber'))}</Text></View>
              </View>
            </View>
          </View>
        </View>
        <View style={cardVerticalSpacingStyle}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton onPress={this.onConfirmCreditCardManage} disabled={!isConnected}>
            <Text style={buttonLargeTextStyle}>{language.CREDIT_CARD_MANAGE__CONFIRMATION_CREDIT_CARD_BUTTON}</Text>
          </SinarmasButton>
        </View>
        <Field name='smsOtp' component={SmsOtpModal} visible={this.state.otpToggle} userMobileNumber={userMobileNumber} transRefNum={transRefNum}
          onClose={this.hideModal} submitHandler={this.onModalSubmit} resendOTP={resendOTP}/>
      </ScrollView>
    );
  }
}

export default CreditCardManageConfirmation;
