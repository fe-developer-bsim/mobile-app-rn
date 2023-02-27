import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FundTransferValasPayment.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {generateQRLabel} from '../../utils/transformer.util';


class FundTransferPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    checkboxChange: PropTypes.func,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    sendAccountNumber: PropTypes.string,
    amountChange: PropTypes.func,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    amountNormalise: PropTypes.func,
    currencyTarget: PropTypes.array,
    currencyRate: PropTypes.array,
  }

  onNextPress = () => {
    const {onNextPress = noop, currencyRate} = this.props;
    onNextPress(currencyRate);
  }

  render () {
    const {invalid, submitting, getSourceAcc, disabled, errors, formValues, currencyTarget, amountNormalise, currencyRate, payee} = this.props;
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const sendAccountType = result(formValues, 'myAccount.accountType', '');
    const sendAccountAvailableBalance = result(formValues, 'myAccount.balances.availableBalance', '');
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const checkCurrency = result(formValues, 'currency.name', '');
    const currency = result(payee, 'currency', '');
    const fromIDR = result(currencyRate, 'fromIDR', 0).toFixed(6);
    const toIDR = result(currencyRate, 'toIDR', 0);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.containerDiv}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{language.TRANSFER__TRANSFER_SET_AMOUNT}</Text>
            </View>
            <View style={styles.textInputAmount}>
              <View style={styles.rowLeft}>
                <Field
                  name='currency'
                  rightIcon='arrow'
                  component={SinarmasPickerLine}
                  labelKey='name'
                  itemList={generateQRLabel(currencyTarget)}
                  onValChange={amountNormalise}
                />
              </View>
              <View style={styles.rowRight}>
                <Field
                  name='amount'
                  placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                  format={Utils.formatFieldAmount}
                  normalize={Utils.normalizeAmount}
                  keyboardType='numeric'
                  component={SinarmasInput}
                  style={styles.inputStyleCenter}
                  maxLength={13}
                  textPosition='center'
                />
              </View>
            </View>
            <View style={styles.checkboxContainer}>
              { isEmpty(checkCurrency) ?
                <Text>{currencyRate.fromIDR === Infinity ? null : language.EXCHANGE__RATES_1_IDR + ' ' + fromIDR + ' ' + currency}</Text>
                :
                <Text>1 {checkCurrency} = {Utils.currencyFormatter(toIDR)} {language.DASHBOARD__ACCOUNT_IDR}</Text>
              }
            </View>
          </View>
          <View style={styles.greyLine} />

          <View style={styles.containerDiv}>
            <View style={styles.headerRow2}>
              <SimasIcon name={'wallet'} size={30} style={styles.walletIcon}/>
              <Text style={styles.title}>{language.GENERIC_BILLER__WALLET}</Text>
            </View>
            <Touchable onPress={getSourceAcc}>
              <View style={styles.sendAccountDetailContainer}>
                {
                  checkAcc ?
                    <View>
                      <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>
                    </View>
                    :
                    <View>
                      <Text style={styles.sendAccNumber}>{sendAccountNumber}</Text>
                      <Text style={styles.sendAccNameType}>{sendAccountName}</Text>
                      <Text style={styles.sendAccNameType}>{sendAccountType}</Text>
                      <Text style={styles.availableBalanceText}>{language.SEND__AVAILABLE_BALANCE}: Rp {Utils.balanceFormatter(sendAccountAvailableBalance)}</Text>
                    </View>
                }
                <SimasIcon name='more-menu' size={15} style={styles.black}/>
              </View>
            </Touchable>
            { errorText !== '' && errorTextLess === '' ?
              <View style={styles.row}>
                <SimasIcon name='input-error' style={styles.errIcon}/>
                <Text style={styles.redText}>{errorText}</Text>
              </View>
              :
              errorTextLess !== '' ?
                <View style={styles.row}>
                  <SimasIcon name='input-error' style={styles.errIcon}/>
                  <Text style={styles.redText}>{errorTextLess}</Text>
                </View>
                :
                null
            }
          </View>
          <View style={styles.greyLine} />
          <View style={styles.containerDiv}>
            <View>
              <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__ADDITIONAL}</Text>
            </View>
            <Field
              name='note'
              label={language.GENERIC_BILLER__DESCRIPTION}
              placeholder={language.HINTTEXT__DESCRIPTION}
              format={Utils.formatFieldNote}
              normalize={Utils.formatFieldNote}
              component={SinarmasInput}
              maxLength={16}
            />
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <SinarmasButton dtActionName='fundTransferValasPayment' disabled={invalid || submitting || disabled || isLessAmount} onPress={this.onNextPress} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>

    );
  }
}

export default FundTransferPayment;
