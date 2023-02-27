import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRInvoice.styles';
import {SinarmasButton, RadioButton, SinarmasInputBoxNew} from '../FormComponents';
import {language} from '../../config/language';
import {result, isEmpty, noop} from 'lodash';
import {Field} from 'redux-form';
import {toTitleCase, getCurrencyQr, formatForexAmount} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {getSourceAccountRadioButton} from '../../utils/middleware.util';
import merchantIcon from '../../assets/images/dimo_home.png';
import bG from '../../assets/images/backgroud_rev.png';
import * as Utils from '../../utils/transformer.util';

class QRInvoice extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navParams: PropTypes.object,
    inputTipDisabled: PropTypes.bool,
    submitting: PropTypes.bool,
    thisState: PropTypes.object,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    moreInfoBL: PropTypes.func,
    isAutoSwitchToogle: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    checkSyaAcc: PropTypes.func,
    enableCCsof: PropTypes.string,
    accountsCC: PropTypes.array,
    enableQrCCsof: PropTypes.string,
  }

  state = {
    inquiryData: {}
  }

  render () {
    const {navParams, accounts, formValues, submitting, accountsCC, enableQrCCsof, ...reduxFormProps} = this.props;
    const {handleSubmit = noop, invalid = false} = reduxFormProps;
    const jasonData = (result(navParams, 'data', {}));
    const isCrossBorder = result(jasonData, '58', '') !== 'ID';
    const qrAmount = result(jasonData, '54', '');
    const getconversionRate = qrAmount.replace(/([.])+/g, ',');
    const amountMPM = formatForexAmount(getconversionRate, 'IDR');
    const amount = isCrossBorder ? (Number(result(jasonData, '54', ''))).toFixed(2) : amountMPM;
    const merchantName = result(jasonData, '59', '');
    const emptyAcc = isEmpty(result(formValues, 'accountNo', {}));
    const accountListCB = getSourceAccountRadioButton(accounts);
    const accountListMPM = getSourceAccountRadioButton(accounts);
    const accountListCC = getSourceAccountRadioButton(accountsCC);
    const disableAmount = !isEmpty(result(jasonData, '54', ''));
    const currencyCode = result(jasonData, '53', '');
    const currencyLabel = getCurrencyQr(currencyCode);
    const checkAmount = Number(result(formValues, 'amountVal', ''));
    const errorDecimal = isNaN(checkAmount);
    const invalidAmount = checkAmount < 0 || checkAmount === 0;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <ImageBackground source={bG} style={styles.imageSummary} />
        <View style={styles.tes} >
          <View style={styles.containerTransfer}>
            <View style={styles.containerBanner}>
              <View style={styles.containerLeft}>
                <View style={styles.targetAcc}>

                  <View style={styles.merchIcon}>
                    <Image source={merchantIcon} style={styles.merchantSize}/>
                  </View>

                  <View style={styles.textAcc}>
                    <Text>Merchant's Name</Text>
                    <Text style={styles.targetName}>{toTitleCase(merchantName)}</Text>
                  </View>

                </View>
                <View style={styles.accNumberContainer}>
                  <View style={styles.accNumber}>
                    <View style={styles.currencyContainer}>
                      <Text style={styles.currencyText}>{currencyLabel}</Text>
                    </View>
                    <View>
                      <Text style={styles.amountField}>Amount</Text>
                      <View style={styles.amountRight}>
                        {
                          disableAmount ?
                            <View style={styles.disableAmount}>
                              <Text style={styles.textAmount}>{amount}</Text>
                            </View>
                            :
                            isCrossBorder ?
                              <Field
                                name='amountVal'
                                placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                                normalize={Utils.normalizeAmountCrossBorder}
                                component={SinarmasInputBoxNew}
                                KeyboardType='number-pad'
                                isInputAmount={true}
                                borderOff={true}
                                disabled={disableAmount}
                              />
                              :
                              <Field
                                name='amountVal'
                                placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                                format={Utils.formatFieldAmount}
                                normalize={Utils.normalizeAmount}
                                component={SinarmasInputBoxNew}
                                KeyboardType='number-pad'
                                isInputAmount={true}
                                borderOff={true}
                                disabled={disableAmount}
                              />
                        }
                      </View>
                    </View>
                    {
                      isEmpty(result(jasonData, '54', '')) || result(jasonData, '54', '') === '' ?
                        <SimasIcon name='edit-amount' size={27} /> : null
                    }

                  </View>

                </View>
                {
                  invalidAmount && !errorDecimal ? <View style={styles.errorContainer}>
                    <SimasIcon name='input-error' style={styles.errIcon}/>
                    <Text style={styles.errorText}>{language.QR_CROSSBORDER_LOW_AMOUNT}</Text>
                  </View> :
                    errorDecimal ? <View style={styles.errorContainer}>
                      <SimasIcon name='input-error' style={styles.errIcon}/>
                      <Text style={styles.errorText}>{language.QR_CROSSBORDER_DECIMAL_ERR}</Text>
                    </View>
                      : null
                }
              </View>
              <View>
                <View style={styles.sourceAccTitle}>
                  <Text style={styles.sourceAccText}>{language.AUTODEBIT__LIST_ACCOUNT}</Text>
                </View>
                <View style={styles.containerLeftSourceAcc}>
                  <ScrollView enableOnAndroid={true} nestedScrollEnabled={true}>
                    {
                      isCrossBorder ?
                        <Field name='accountNo' component={RadioButton} options={accountListCB} isSourceAccountQRTrf={true}/>
                        : enableQrCCsof === 'TRUE' ?
                          <Field name='accountNo' component={RadioButton} options={accountListCC} isSourceAccountQRTrf={true}/>
                          :
                          <Field name='accountNo' component={RadioButton} options={accountListMPM} isSourceAccountQRTrf={true}/>
                    }
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || emptyAcc || invalidAmount || errorDecimal} >
            <Text style={styles.buttonLargeTextStyle}>{language.BUTTON__START}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default QRInvoice;
