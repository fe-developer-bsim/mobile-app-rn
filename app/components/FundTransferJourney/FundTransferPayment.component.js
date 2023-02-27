import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView, ImageBackground} from 'react-native';
import styles from './FundTransferPayment.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine, SinarmasInputBox, SinarmasInputBoxNewSplitBill, RadioButtonAccSplitBill} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {generateQRLabel} from '../../utils/transformer.util';
import {getDataAccountListSplitBill} from '../../utils/middleware.util';
import iconRp from '../../assets/images/icon_rp.png';
import destinationIcon from '../../assets/images/destination_account.png';
import bG from '../../assets/images/backgroud_rev.png';


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
    isSplitBill: PropTypes.bool,
    isOwnAccount: PropTypes.bool,
    currencyRate: PropTypes.array,
    currencyTarget: PropTypes.array,
    amountNormalise: PropTypes.number,
    isSetLimit: PropTypes.func,    
    payeeSinarmasBank: PropTypes.object,
    populateConfigData: PropTypes.func,
    bankSinarmas: PropTypes.func,
    goSetPayee: PropTypes.func,
    transferType: PropTypes.string,
    currencyIDR: PropTypes.string,
    accountType: PropTypes.string,
    
  }


  onNextPress = () => {
    const {onNextPress = noop, currencyRate = []} = this.props;
    onNextPress(currencyRate);
  }

  render () {
    const {invalid, submitting, checkboxChange = noop, getSourceAcc, disabled, errors, formValues, currencyRate, currencyTarget, amountNormalise, isSplitBill, payee, accountList, goSetPayee, transferType, currencyIDR, accountType} = this.props;
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const sendAccountType = result(formValues, 'myAccount.accountType', '');
    const sendAccountAvailableBalance = result(formValues, 'myAccount.balances.availableBalance', '');
    const sendAccountCurrency = result(formValues, 'myAccount.currency', '');
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const isSubmit = isLessAmount;
    const splitBillAmount = result(formValues, 'amount', '');
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
    const isSchedule = isEmpty(sendAccountCurrency) ? false : isValas ? currencySource === currency ? null : false : null;
    const targetType = result(payee, 'targetType.code', '');
    const targetPayeeName = result(payee, 'name', '');
    const targetAccountNumber = result(payee, 'accountNumber', '');
    const targetBankName = targetType === 'inbanktransfer' ? result(payee, 'accountType', '') : result(payee, 'bank.bankName', '');
    const accountListDisplay =  getDataAccountListSplitBill(accountList);
    const transferTypeTracing = result(payee, 'transferType', '') === null || result(payee, 'transferType', '') === 'external' ? 'Other Bank' : result(payee, 'isBiFast', false) === true ? 'BiFast' : result(payee, 'transferType', '');
    const resultPayee = result(payee, 'isBiFast', false) === true ? 'Next Transfer ' + transferTypeTracing : 'Next Transfer ' + transferTypeTracing + ' 1';
    if (isSplitBill) {
      return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContentSplitBill} extraScrollHeight={100} enableOnAndroid={true}>
          <ImageBackground source={bG} style={styles.imageSummary} />
          <View style={styles.topContainerItem} > 
            <View style={styles.containerTransfer}>
              <View style={styles.containerBanner}>
                <View style={styles.containerLeft}>
                  <View style={styles.targetAcc}>
                    <View style={styles.backgroundIcon}>
                      {/* <SimasIcon name={'new-send'} style={styles.iconSplitBill} size={30} /> */}
                      <Image source={destinationIcon} style={styles.iconSplitBill} />
                    </View>
                    <View style={styles.targetPayee}>
                      <Text style={styles.targetPayeeName}>{targetPayeeName}</Text>
                      <Text style={styles.targetAccountNumber}>{targetAccountNumber} - {targetBankName}</Text>
                    </View>
                  </View>
                  <View style={styles.accNumberContainer}>
                    <View style={styles.billAmount}>
                      <View>
                        <Image source={iconRp} style={styles.newRpIcon} />
                        <Field
                          name='amount'
                          component={SinarmasInputBoxNewSplitBill}
                          style={styles.fieldAmount}
                          placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                          typeField={'amount'}
                          format={Utils.formatFieldAmount}
                          normalize={Utils.normalizeAmount}
                          keyboardType='numeric'
                          maxLength={13}
                          isAmountSplitBill={true}
                          label={language.SPLITBILL__AMOUNT}
                          disabled= {isSplitBill}
                        />
                      </View>
                    </View>
                    <View>
                      <Field
                        name='note'
                        label={language.GENERIC_BILLER__ADDITIONAL}
                        placeholder={language.GENERIC_BILLER__ADDITIONAL}
                        format={Utils.formatFieldNote}
                        normalize={Utils.formatFieldNote}
                        component={SinarmasInputBoxNewSplitBill}
                        maxLength={16}
                      />
                    </View>
                
                  </View>
            
              
              
                </View>
                <View>
                  <View style={styles.sourceAccTitle}>
                    <Text style={styles.sourceAccText}>{language.AUTODEBIT__LIST_ACCOUNT}</Text>
                  </View>
                  <View style={styles.containerLeftSourceAcc}>
                    <ScrollView enableOnAndroid={true} nestedScrollEnabled={true}>
                      <Field name='myAccount' component={RadioButtonAccSplitBill} options={accountListDisplay} isSourceAccount={true} warningText={errorText} transactionAmount={splitBillAmount}/>
                    </ScrollView>
                  </View> 
                </View>
              </View>
            </View>
          </View>
      
          <View style={styles.bottomSpacing}>
            <SinarmasButton disabled={invalid || submitting || disabled || isSubmit} onPress={this.onNextPress} text={language.SERVICE__NEXT_BUTTON} />
          </View>
        </KeyboardAwareScrollView> 
      );
    } else {
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
                    : 
                    currencyIndicator === 'sameValas' ?
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
              <View style={styles.checkboxContainer}>
                <Touchable disabled={true}>
                  <CheckBox
                    onChange={checkboxChange}
                    label={language.TRANSFER__SCHEDULE_TRANSFER}
                    labelStyle={styles.checkboxLabel}
                    checkboxStyle={styles.checkboxStyle}
                    uncheckedImage={UnCheckBox}
                    checkedImage={RedCheckBox}
                    checked={isSchedule}
                  />
                </Touchable>
              </View>
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
                        <Text style={styles.availableBalanceText}>{language.SEND__AVAILABLE_BALANCE}: {sendAccountCurrency} {Utils.currencyFormatter(sendAccountAvailableBalance)}</Text>
                      </View>
                  }
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
  
          { transferType === 'inbank' && currencyIDR === 'IDR' && sendAccountCurrency === 'IDR' && (sendAccountType !== 'emoneyAccount') && (sendAccountType !== 'Emoney Account') && (accountType !== 'emoneyAccount') && (accountType !== 'Emoney Account') && (accountType !== 'UnknownAccount') && (accountType !== 'Virtual Account') ? 
            <View style={styles.bottom}> 
              <View style={styles.boxedInfo}>
              
                <SimasIcon name='input-error' style={styles.alertSetLimit} size={20} />
                <View style={styles.rowSetLimit}>                    
                  <View><Text style={styles.blackTextSetLimit}> {language.VALIDATE__GREATER_THAN_MAX_SET_LIMIT1}  </Text></View>
                  <View><Text style={styles.redTextSetLimit} disabled={invalid || submitting || disabled || isSubmit} onPress={goSetPayee}>{language.VALIDATE__GREATER_THAN_MAX_SET_LIMIT2}</Text></View>
                </View>   
              </View>   
            </View>
            :
            null }    
  
          <View style={styles.buttonBottom}>
            <SinarmasButton dtActionName={resultPayee} disabled={invalid || submitting || disabled || isSubmit} onPress={this.onNextPress} text={language.SERVICE__NEXT_BUTTON} />
          </View>
        </KeyboardAwareScrollView>
  
      );
    }
  }
}

export default FundTransferPayment;
