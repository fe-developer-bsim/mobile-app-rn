import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRConfirmPage.styles';
import {SinarmasButton} from '../FormComponents';
import {noop} from 'lodash/noop';
import truncate from 'lodash/truncate';
import {language} from '../../config/language';
import result from 'lodash/result';
import {wrapMethodInFunction, currencyFormatter, toTitleCase, getCurrencyQr, formatForexAmount, getCurrencyNameQR, checkShariaAccount} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import TabCoupon from '../Coupon/CouponTabPurchaseRevamp.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import bG from '../../assets/images/backgroud_rev.png';
import {Toast} from '../../utils/RNHelpers.util.js';

class QRInvoice extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    defaultAccount: PropTypes.object,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    goToCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    removeCoupon: PropTypes.func,
    checkCoupon: PropTypes.func,
    isLogin: PropTypes.bool,
    currency: PropTypes.string
  }

  state = {
    disabled: false,
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
  }

  onModalSubmit = () => {
    this.setState({disabled: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  remove=() => {
    this.props.removeCoupon();
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  expand = () => {
    this.setState({showExpand: !this.state.showExpand});
  }

  goToCoupon=() => {
    const {navigation, checkCoupon, currency} = this.props;
    const amountVal = Number(result(navigation, 'state.params.data.amountVal', 0));
    const accountIdCoupon = result(navigation, 'state.params.data.accountNo.id', '');
    const billerCode = '123456';
    const navParams = result(navigation, 'state.params', {});
    const isSyariah = checkShariaAccount(result(navParams, 'data.accountNo', {})) && currency !== 'simaspoin';
    if (isSyariah) {
      Toast.show(language.COUPON__ERROR_MESSAGE_SYARIAH, Toast.LONG);
    } else {
      checkCoupon(amountVal, billerCode, accountIdCoupon);
    }

  }

  render () {
    const {couponUse, navigation, submitting, isLogin, ...reduxFormProps} = this.props;
    const {invalid = false} = reduxFormProps;
    const navParams = result(navigation, 'state.params');
    const isCrossBorder = result(navParams, 'isCrossBorder', false);
    const amountVal = Number(result(navigation, 'state.params.data.amountVal', 0));
    const tipAmountManual = Number(result(navParams, 'data.tipAmountManual', 0));
    const tag57 = Number(result(navParams, 'jsonDt.57', ''));
    const isNaNTip = isNaN(tipAmountManual);
    const tip = ((isNaNTip || tag57 > 0) ? (amountVal * tag57) / 100 : tipAmountManual);

    const total = (Number(tip) + Number(amountVal));
    const merchantName = result(navParams, 'jsonDt.59', '');
    const bankNameTo = result(navParams, 'data.bankAcc.bankName', '');
    const showDetailAmt = this.state.summaryCollapsed;
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
    const currencyCode = result(navParams, 'jsonDt.53', '');
    const currencyLabel = getCurrencyQr(currencyCode);
    const currencyName = getCurrencyNameQR(currencyCode);
    const getcrossBorderTotalAmt = result(navParams, 'resulData.convertedAmountIDRFee', '').replace(/([.])+/g, ',');
    const formatTotalIdr = formatForexAmount(getcrossBorderTotalAmt, 'IDR');
    const getconversionRate = result(navParams, 'resulData.conversionRateFee', '').replace(/([.])+/g, ',');
    const formatRateIdr = formatForexAmount(getconversionRate, 'IDR');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <ImageBackground source={bG} style={styles.imageSummary} />
        <View style={styles.tes} >
          <View style={styles.containerTransfer}>
            <View style={styles.containerBanner}>
              <View style={styles.containerLeft}>
                <View style={styles.targetAcc}>
                  <View style={styles.textAcc}>
                    <Text style={styles.targetName}>Amount</Text>
                  </View>
                </View>
                <View style={styles.accNumberContainer}>
                  <View style={styles.accNumber}>
                    <View style={styles.currencyContainer}>
                      <Text style={styles.currencyText}>{currencyLabel}</Text>
                    </View>
                    <View>
                      {
                        isCrossBorder ?
                          <Text style={styles.amountText}>{formatForexAmount(total, 'THB')}</Text>
                          :
                          <Text style={styles.amountText}>{currencyFormatter(total)}</Text>
                      }
                    </View>
                    <View>
                      <SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/>
                    </View>
                  </View>
                  
                  <View>
                    <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                      <View style={[styles.greyLine, styles.mt10]} />
                      <View style={styles.row}>
                        <Text style={styles.robotoLight}>{language.GENERIC_BILLER__AMOUNT_TXT}</Text>
                        {
                          isCrossBorder ?
                            <Text style={styles.robotoLight}>{formatForexAmount(amountVal, 'THB')} {currencyName}</Text>
                            :
                            <Text style={styles.robotoLight}>Rp {currencyFormatter(amountVal)}</Text>
                        }
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.robotoLight}>{language.QR_GPN_GIVE_MANUAL_TIPS}</Text>
                        {
                          isCrossBorder ?
                            <Text style={styles.robotoLight}>{tip === null || tip === 0 ? '0' : formatForexAmount(tip, 'THB')} {currencyName}</Text>
                            :
                            <Text style={styles.robotoLight}>Rp {tip === null || tip === 0 ? '0' : currencyFormatter(tip)}</Text>
                        }
                      </View>
                    </Collapsible>
                  </View>
                </View>
               
              
                <View style={styles.labelSpacing} />
                <View style={styles.senderDetail}>
                  <View style={styles.sofCard}>                            
                    <SimasIcon name={'new_card'} size={17} style={styles.iconRed}/>
                  </View>
                  <View style={styles.rightItemContainer}>
                    {
                      isLogin ?
                        <View>
                          <Text style={styles.sendAccNumber}>{result(navParams, 'data.accountNo.accountNumber', 'NIL')}</Text>
                          <Text style={styles.sendAccName}>{toTitleCase(result(navParams, 'data.accountNo.name', 'NIL'))}</Text>
                          <Text style={styles.sendAccType}>{result(navParams, 'data.accountNo.productType', 'NIL')}</Text>
                        </View>
                        :
                        <View>
                          <Text style={styles.sendAccNumber}>{result(navParams, 'data.accountNo.accountNumber', 'NIL')}</Text>
                          <Text style={styles.sendAccName}>{toTitleCase(result(navParams, 'data.accountNo.name', 'NIL'))}</Text>
                          <Text style={styles.sendAccType}>{result(navParams, 'data.accountNo.productType', 'NIL')}</Text>
                        </View>
                    }
                    
                  </View>
                </View>
                <View style={styles.dotContainer}>
                  <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                  <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                </View>
                
                <View style={styles.payeeDetail}>
                  <View style={styles.sofCard}>                            
                    <SimasIcon name={'new-send'} size={35} style={styles.iconBlue}/>
                  </View>
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.sendAccName}>{toTitleCase(merchantName)}</Text>
                    {
                      isCrossBorder ? 
                        null :
                        <Text style={styles.sendAccType}>{toTitleCase(bankNameTo)}</Text>
                    }
                  </View>
                </View>
              </View>
              {
                isCrossBorder ? 
                  null :
                  <View style={styles.transferDetail}>
                    <TabCoupon goToCoupon={this.goToCoupon} couponUse={newSubtitle} removeCoupon={this.remove}/>
                  </View>
              }
              <View>
                <Text style={styles.paymentDetails}> {toTitleCase(language.ALFACART_CHECKOUT_PAYMENT_DETAILS)}</Text>
              </View>
              {
                isCrossBorder ?
                  <View style={styles.transferDetail}>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Exchange Rate</Text>
                      <Text style={styles.textDetailRight}>1 {currencyName} = {formatRateIdr} IDR</Text>
                    </View>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Amount</Text>
                      <Text style={styles.textDetailRight}>{formatForexAmount(amountVal, 'THB')} {currencyName}</Text>
                    </View>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeftEqu}>Total Equivalent to</Text>
                      <Text style={styles.textDetailLeftEqu}>{formatTotalIdr} IDR</Text>
                    </View>
                    <View style={styles.greyLineBold2} />
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Total</Text>
                      <Text style={styles.textDetailRightTotal}>{formatForexAmount(total, 'THB')} {currencyName}</Text>
                    </View>
                  </View>
                  : 
                  <View style={styles.transferDetail}>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Amount</Text>
                      <Text style={styles.textDetailLeft}>Rp. {currencyFormatter(amountVal)}</Text>
                    </View>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>{language.QR_GPN_GIVE_MANUAL_TIPS}</Text>
                      <Text style={styles.textDetailLeft}>Rp {tip === 0 || tip === null ? '0' : currencyFormatter(tip)}</Text>
                    </View>
                    <View style={styles.greyLineBold2} />
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Total</Text>
                      <Text style={styles.textDetailLeft}>Rp. {currencyFormatter(total)}</Text>
                    </View>
                  </View>
              }
              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text></View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomSpacing}>
          <SinarmasButton style={styles.btnConfirm} onPress={this.onModalSubmit} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.QR_GPN__MERCHANT_BTN}</Text>
          </SinarmasButton>
        </View> 
      </KeyboardAwareScrollView>      
    );
  }
}


export default QRInvoice;
