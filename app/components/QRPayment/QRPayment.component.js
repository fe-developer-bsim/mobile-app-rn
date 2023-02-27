import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './QRPayment.component.style';
import noop from 'lodash/noop';
import {SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import isArray from 'lodash/isArray';
import Authenticate from '../../components/PaymentHelpers/Authenticate.component';
import {currencyFormatter} from '../../utils/transformer.util';

class QRPayment extends Component {

  static propTypes = {
    accountList: PropTypes.array,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    invoice: PropTypes.array,
    formValues: PropTypes.object,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    authToggle: false
  }

  showModal = () => {
    const {triggerAuth, invoice = []} = this.props;
    triggerAuth(invoice[3]);
    this.setState({authToggle: true});
  }

  onModalClose = () => {
    this.setState({authToggle: false});
  }

  onModalSubmit = () => {
    this.setState({otpToggle: false}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      setTimeout(() => {
        const {handleSubmit = noop} = this.props;
        handleSubmit();
      }, 500);
    });
  };

  render () {
    const {invalid, submitting, accountList = [],
      invoice = [], formValues, userId, transRefNum, config, resendBillPayOTP,
      userMobileNumber} = this.props;
    const availableBalance = Utils.getUnformattedAccountAmount(formValues['myAccount']);
    const amount = isArray(invoice) && invoice.length !== 0 ? invoice[3] : NaN;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.card}>
          <View style={styles.qrStyle}>
            <Text style={styles.title}>{`${language.PAY_BY_QR__PAYMENT_PAGE_TITLE}${isArray(invoice) && invoice.size !== 0 && invoice[1]}`}</Text>
            <View style={styles.formContainer}>
              <View>
                {isArray(invoice) && invoice.size !== 0 &&
                  <View>
                    <View style={styles.row}>
                      <View style={styles.halfWidth}><Text>{language.PAY_BY_QR__PRICE}</Text></View>
                      <View style={styles.halfWidth}><Text style={styles.right}>{`${'IDR '}${currencyFormatter(invoice[2])}`}</Text></View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.halfWidth}><Text>{language.PAY_BY_QR__DISCOUNT}</Text></View>
                      <View style={styles.halfWidth}><Text style={styles.right}>{`${'IDR '}${currencyFormatter(invoice[4])}`}</Text></View>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.row}>
                      <View style={styles.halfWidth}><Text>{language.PAY_BY_QR__TOTAL}</Text></View>
                      <View style={styles.halfWidth}><Text style={styles.right}>{`${'IDR '}${currencyFormatter(invoice[3])}`}</Text></View>
                    </View>
                  </View>
                }
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.qrStyle}>
            <Text style={styles.title}>{language.TRANSFER__YOUR_ACCOUNT}</Text>

            <Field name='myAccount'
              component={SinarmasPicker}
              autocomplete={false}
              rightIcon={accountList.length > 0 ? 'arrow' : null}
              itemList={Utils.generateAccountLabel(accountList)}
              label='Account'
              placeholder={language.TRANSFER__SELECT_ACCOUNT_PLACEHOLDER}
              labelKey='display'/>
            <Text style={styles.availableBalanceText}>{language.SERVICE__AVAILABLE_BALANCE} : Rp {Utils.balanceFormatter(availableBalance)}</Text>
          </View>
        </View>

        <View style={styles.button}>
          <SinarmasButton disabled={invalid || submitting} onPress={this.showModal} text={language.SERVICE__NEXT_BUTTON} />
        </View>
        <View>
          <Authenticate userId={userId} transRefNum={transRefNum} fieldEasypin='easyPin' fieldOTP='smsOtp' config={config} visible={this.state.authToggle}
            onClose={this.onModalClose} submitHandler={this.onModalSubmit} resendOTP={resendBillPayOTP} amount={Number(amount)} userMobileNumber={userMobileNumber}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRPayment;
