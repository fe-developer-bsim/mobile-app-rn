import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './RemittanceTransferPayment.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {SinarmasButton, RadioButtonSourceAcc, SinarmasInputBoxPaymentRevamp} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import {getDataAccountList} from '../../utils/middleware.util';
import filter from 'lodash/filter';
import trx_icon from '../../assets/images/trx_icon.png';
import {ScrollView} from 'react-native-gesture-handler';
import {formatFieldAmount, normalizeAmount} from '../../utils/transformer.util';

class RemittanceTransferPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    checkboxChange: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    sendAccountNumber: PropTypes.string,
    amountChange: PropTypes.func,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    amountNormalise: PropTypes.func,
    currencyTarget: PropTypes.array,
    currencyRate: PropTypes.array,
    accountsTransfer: PropTypes.array,
    getAmount: PropTypes.func,
    exchangeCurrency: PropTypes.object,
    toogleRemittance: PropTypes.bool,
  }


  onNextPress = () => {
    const {onNextPress = noop, currencyRate} = this.props;
    onNextPress(currencyRate);
  }

  render () {
    const {invalid, submitting, disabled, errors, currencyTarget, payee, getAmount, accountList, exchangeCurrency, toogleRemittance} = this.props;
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const totalAmountView = result(exchangeCurrency, 'totalAmountView', '');
    const currencyAccountFrom = result(exchangeCurrency, 'currencyAccountFrom', '');
    const currencyRemmitance = result(exchangeCurrency, 'currencyRemmitance', '');
    const feeRateDisplay = result(exchangeCurrency, 'getConvertAmountFee.feeRateDisplay', '');
    const equivalenRateDisplay = result(exchangeCurrency, 'getConvertAmountTransaction.equivalenRateDisplay', '');
    const currencyRateDisplay = result(exchangeCurrency, 'getConvertAmountTransaction.currencyRateDisplay', '');
    let accountListFilter = [];
    if (toogleRemittance === true) {
      accountListFilter = filter(accountList, (acc) => acc.currency === currencyTarget);
    } else {
      if (currencyTarget === 'USD' || currencyTarget === 'IDR') {
        accountListFilter = filter(accountList, (acc) => acc.currency === 'IDR' || acc.currency === 'EUR' || acc.currency === 'JPY' || acc.currency === 'CNY' || acc.currency === 'AUD' || acc.currency === 'SGD' || acc.currency === 'NZD' || acc.currency === 'USD');
      } else {
        accountListFilter = filter(accountList, (acc) => acc.currency === currencyTarget || acc.currency === 'IDR' || acc.currency === 'USD');
      }
    }
    const accountListDisplay = getDataAccountList(accountListFilter, []);
    
    const isExchangeCurrency = isEmpty(exchangeCurrency.totalAmountView);
    return (
      <View style={styles.containerUtama}>
        <ScrollView style={styles.flexGrey}>
          <View style={styles.backgroundColorPink}/>
          <View style={styles.containerBannerWhite}>
            <View style={styles.rowInformation}>
              <View style={styles.paddingBox}>
                <View style={styles.containerHistory}>
                  <Image source={trx_icon} style={styles.imgIcon}/>
                  <View style={styles.containerAcc}>
                    <Text style={styles.subNo}>{result(payee, 'name')}</Text>
                    <Text style={styles.subtext}>{result(payee, 'accountNumber')} - {result(payee, 'bank')}</Text>
                  </View>
                </View>
                <View style={styles.accNumberContainer}>
                  <View style={styles.textInputAmountValas}>
                    <View style={styles.rowLeft}>
                      <Text style={styles.subtextCurrencyLabel}>{language.REMITTANCE__CURRENCY}</Text>
                      <Text style={styles.CurrencyText}>{currencyTarget}</Text>
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={styles.subtext}>{language.REMITTANCE__AMOUNT}</Text>
                      <Field
                        name='amount'
                        placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                        format={formatFieldAmount}
                        normalize={normalizeAmount}
                        keyboardType='numeric'
                        component={SinarmasInputBoxPaymentRevamp}
                        style={styles.inputStyleCenter}
                        maxLength={13}
                        textPosition='center'
                        errorDisable={true}
                        isRevamp={true}
                        isNoteRevamp={true}
                        typeField={'amount'}
                        theme='primary'
                        onEndEditing={getAmount}
                      />
                    </View>
                  </View>
                </View>
                {currencyAccountFrom === currencyRemmitance &&  !isEmpty(currencyAccountFrom) && !isEmpty(currencyRemmitance) ?
                  null
                  :
                  <View style={styles.detailTransactionText}>
                    <Text style={styles.colorDetailText}>{language.REMITTANCE__EXCHANGE_RATE}</Text>
                    {isEmpty(currencyRateDisplay) ?
                      <Text style={styles.colorDetailText}>{'--'}</Text>
                      :
                      <Text style={styles.colorDetailText}>{currencyRateDisplay}</Text>
                    }
                  </View>
                }
                <View style={styles.detailTransactionText}>
                  <Text style={styles.colorDetailText}>{language.REMITTANCE__EQUIVALENT_TO}</Text>
                  {isEmpty(equivalenRateDisplay) ?
                    <Text style={styles.colorDetailText}>{'--'}</Text>
                    :
                    <Text style={styles.colorDetailText}>{equivalenRateDisplay}</Text>
                  }
                </View>
                <View style={styles.detailTransactionText}>
                  <Text style={styles.colorDetailText}>{language.REMITTANCE__FEE_OUR}</Text>
                  {isEmpty(feeRateDisplay) ?
                    <Text style={styles.colorDetailText}>{'--'}</Text>
                    :
                    <Text style={styles.colorDetailText}>{feeRateDisplay}</Text>
                  }
                </View>
                <View style={styles.containerGreyline}>
                  <View style={styles.greyLine} />
                </View>
                <View style={styles.detailTransactionTextDebited}>
                  <Text style={styles.colorDetailTextDebited}>{language.REMITTANCE__AMOUNT_DEBITED}</Text>
                  {isEmpty(totalAmountView) ?
                    <Text style={styles.colorDetailTextDebited}>{'--'}</Text>
                    :
                    <Text style={styles.colorDetailTextDebited}>{totalAmountView}</Text>
                  }
                </View>
              </View>
            </View>
          </View>
          <View style={styles.paddingBoxTwo}>
            <View style={styles.containerDivSchedule} />
            <View style={styles.containerDiv}>
              <View style={styles.headerRowNotice}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                <Text style={styles.textExplanation}>{language.REMITTANCE_TRANSFER_PAYMENT_NOTICE}</Text>
              </View>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{language.REMINTTANCE_SOURCE_ACCOUNT}</Text>
              </View>
              <View style={styles.sendAccountDetailContainer1}>
                <Field name='myAccount'
                  component={RadioButtonSourceAcc}
                  options={accountListDisplay}
                  onChange={getAmount}
                />
              </View>
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
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <SinarmasButton style={styles.button} disabled={invalid || submitting || disabled || isLessAmount || isExchangeCurrency} onPress={this.onNextPress} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </View>
    );
  }
}

export default RemittanceTransferPayment;

