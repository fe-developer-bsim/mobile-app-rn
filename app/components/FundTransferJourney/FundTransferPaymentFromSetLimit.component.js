import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FundTransferPaymentFromSetLimit.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine, SinarmasInputBox} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {generateQRLabel, wrapMethodInFunction} from '../../utils/transformer.util';


class FundTransferPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    sendAccountNumber: PropTypes.string,
    amountChange: PropTypes.func,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    isOwnAccount: PropTypes.bool,
    currencyRate: PropTypes.array,
    currencyTarget: PropTypes.array,
    amountNormalise: PropTypes.number,
    isSetLimit: PropTypes.func,    
    payeeSinarmasBank: PropTypes.object,  
    populateConfigData: PropTypes.func,
    bankSinarmas: PropTypes.func,     
    handleSubmit: PropTypes.func,
    
  }


  onNextPress = () => {
    const {onNextPress = noop, currencyRate = []} = this.props;
    onNextPress(currencyRate);
  }

  render () {
    const {invalid, submitting, getSourceAcc, disabled, errors, formValues, currencyRate, currencyTarget, amountNormalise, handleSubmit = noop} = this.props;
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const sendAccountType = result(formValues, 'myAccount.accountType', '');
    const sendAccountAvailableBalance = result(formValues, 'myAccount.balances.availableBalance', '');
    const sendAccountCurrency = result(formValues, 'myAccount.currency', '');
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const isSubmit = isLessAmount;
    const currency = result(currencyRate, 'currency', '');
    let isValas = false;
    const currencyIndicator = result(currencyRate, 'currencyIndicator', '');
    const currencySource = result(currencyRate, 'currencySource', '');
    const currencyObject = result(currencyRate, 'currencyObject[0]', '');
    const spreadBuyRate = result(currencyObject, 'spreadBuyRate', 0);
    const spreadSellRate = result(currencyObject, 'spreadSellRate', 0);
    const spreadBuyRateUSD = result(currencyObject, 'spreadBuyRateUSD', 0);
    const spreadSellRateUSD = result(currencyObject, 'spreadSellRateUSD', 0);

    if (!isEmpty(currency) && !isEmpty(sendAccountCurrency)) {
      if (currency !== 'IDR' && sendAccountCurrency !== 'IDR') {
        isValas = true;
      } else if (currency !== 'IDR' && sendAccountCurrency === 'IDR') {
        isValas = true;
      } else if (currency === 'IDR' && sendAccountCurrency !== 'IDR') {
        isValas = true;
      } else if (currency === 'IDR' && sendAccountCurrency === 'IDR') {
        isValas = false;
      }
    } else {
      isValas = false;
    }
    let currencyDisplay = '';
    if (currency !== 'IDR' && currency !== 'USD') {
      if (currencySource === 'IDR') {
        currencyDisplay = `1 ${currency} = ${spreadSellRate} ${currencySource}`;
      } else if (currencySource === 'USD') {
        // special case
        if (currency === 'SGD' || currency === 'CNY' || currency === 'JPY') {
          currencyDisplay = `1 ${currencySource} = ${spreadBuyRateUSD} ${currency}`;
        } else {
          currencyDisplay = `1 ${currency} = ${spreadSellRateUSD} ${currencySource}`;
        }
      } else if (currencySource === currency) {
        currencyDisplay = null;
      }
    } else if (currency === 'USD') {
      if (currencySource !== 'USD' && currencySource !== 'IDR') {
        if (currencySource === 'SGD' || currencySource === 'CNY' || currencySource === 'JPY') {
          currencyDisplay = `1 ${currency} = ${spreadSellRateUSD} ${currencySource}`;
        } else {
          currencyDisplay = `1 ${currencySource} =  ${spreadBuyRateUSD} ${currency}`;
        }
      } else if (currencySource === 'IDR') {
        currencyDisplay = `1 ${currency} =  ${spreadSellRate} ${currencySource}`;
      } else if (currencySource === 'USD') {
        currencyDisplay = null;
      }
    } else if (currency === 'IDR') {
      if (currencySource !== 'USD' && currencySource !== 'IDR') {
        currencyDisplay = `1 ${currencySource} =  ${spreadBuyRate} ${currency}`;
      } else if (currencySource === 'IDR') {
        currencyDisplay = null;
      } else if (currencySource === 'USD') {
        currencyDisplay = `1 ${currencySource} = ${spreadBuyRate} ${currency}`;
      }
    } else {
      currencyDisplay = null;
    }
    
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.containerDiv}>
            <View style={styles.headerRow}>
              <SimasIcon name={'amount'} size={30} style={styles.headerIcon} />
              <Text style={styles.title}>{language.TRANSFER__TRANSFER_SET_AMOUNT}</Text>
            </View>
            {isValas ?
              <View>
                {currencyIndicator === 'fullValas' || currencyIndicator === 'halfValas' ? 
                  <View style={styles.textInputAmountValas}>
                    <View style={styles.rowLeft}>
                      <Field
                        name='currency'
                        rightIcon='arrow'
                        component={SinarmasPickerLine}
                        labelKey='name'
                        itemList={generateQRLabel(currencyTarget)}
                        onValChange={amountNormalise}
                        arrowPickerStyle={styles.picker}
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
                        label={''}
                        errorDisable={true}
                      />
                    </View>
                    <View>
                      <SimasIcon name={'edit-amount'} size={25} style={styles.icon} />
                    </View>
                  </View>
                  : currencyIndicator === 'sameValas' ?
                    <View style={styles.textInputAmount}>
                      <Field
                        name='amount'
                        placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                        format={Utils.formatFieldAmount}
                        normalize={Utils.normalizeAmount}
                        keyboardType='numeric'
                        component={SinarmasInputBox}
                        iconName={'edit-amount'}
                        leftIcon={Utils.currencyInitial(currency)}
                        textPosition='center'
                        maxLength={13}
                      />
                    </View>
                    :
                    <View style={styles.textInputAmount}>
                      <Field
                        name='amount'
                        placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                        format={Utils.formatFieldAmount}
                        normalize={Utils.normalizeAmount}
                        keyboardType='numeric'
                        component={SinarmasInputBox}
                        iconName={'edit-amount'}
                        leftIcon='Rp'
                        textPosition='center'
                        maxLength={13}
                      />
                    </View> 
                }
              </View> :
              <View style={styles.textInputAmount}>
                <Field
                  name='amount'
                  placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                  format={Utils.formatFieldAmount}
                  normalize={Utils.normalizeAmount}
                  keyboardType='numeric'
                  component={SinarmasInputBox}
                  iconName={'edit-amount'}
                  leftIcon='Rp'
                  textPosition='center'
                  maxLength={13}
                />
              </View>
            }
            <View style={styles.checkboxContainer} />
            {!isEmpty(currencyDisplay) ?
              <View style={styles.exchangeRates}>
                <Text>{language.DRAWER__EXCHANGE_RATES}</Text>
                <Text>{currencyDisplay}</Text>
              </View>
              : null
            }
          </View>
          <View style={styles.greyLine} />

          <View style={styles.containerDiv}>
            <View style={styles.headerRow}>
              <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
              <Text style={styles.title}>{language.GENERIC_BILLER__WALLET}</Text>
            </View>
            <Touchable onPress={getSourceAcc}>
              <View style={styles.sendAccountDetailContainer}>               
                <View>
                  <Text style={styles.sendAccNumber}>{sendAccountNumber}</Text>
                  <Text style={styles.sendAccNameType}>{sendAccountName}</Text>
                  <Text style={styles.sendAccNameType}>{sendAccountType}</Text>
                  <Text style={styles.availableBalanceText}>{language.SEND__AVAILABLE_BALANCE}: {sendAccountCurrency} {Utils.currencyFormatter(sendAccountAvailableBalance)}</Text>
                </View>
                <SimasIcon name='more-menu' size={15} style={styles.black} />
              </View>
            </Touchable>
            {
              errorText !== '' && errorTextLess === '' ?
                <View style={styles.row}>
                  <SimasIcon name='input-error' style={styles.errIcon} />
                  <Text style={styles.redText}>{errorText}</Text>
                </View>
                :
                errorTextLess !== '' ?
                  <View style={styles.row}>
                    <SimasIcon name='input-error' style={styles.errIcon} />
                    <Text style={styles.redText}>{errorTextLess}</Text>
                  </View>
                  : null
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
          <SinarmasButton disabled={invalid || submitting || disabled || isSubmit} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>

    );
  }
}

export default FundTransferPayment;
