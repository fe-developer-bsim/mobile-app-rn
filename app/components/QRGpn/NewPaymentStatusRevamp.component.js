import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Linking, Platform, ImageBackground, Image} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './NewPaymentStatusRevamp.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {noop, result} from 'lodash';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, getDayName, toTitleCase, formatForexAmount, getCurrencyNameQR} from '../../utils/transformer.util';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import bG from '../../assets/images/backgroud_rev.png';
import SimobiPlus from '../../assets/images/simobiplus.png';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}


class CreditCardFinalizeForm extends Component {
  openStoreURL = () => {
    Linking.canOpenURL('http://.bit.ly/simobiplus').then((supported) => {
      if (supported) {
        Linking.openURL('http://bit.ly/simobiplus');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  call = () => {
    Linking.canOpenURL('tel:1500153').then((supported) => {
      if (supported) {
        Linking.openURL('tel:1500153');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  state = {
    height: 0,
    width: 0
  }

  capturePayment = () => {
    this.refs.viewShot.capture().then((uri) => {
      const options = {
        title: language.PAYMENT_STATUS__SHARE_WITH,
        url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
      };
      Share.open(options);
    });
  }


  screenCapture = () => {
    if (Platform.OS === 'android') { 
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    }
  }

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  }

  closeLogin = () => {
    const {isBillPayBeforeLogin, onCloseLogin} = this.props;
    onCloseLogin(isBillPayBeforeLogin);
  }

  render () {
    const {transactionDate = new Date(), navigation, onClose = noop, accountFrom, resultData, status, mPan, merchantId} = this.props;
    const paramsData = result(navigation, 'state.params', {});
    const isCashout = result(paramsData, 'data.isCashout', true);
    const isCrossBorder = result(paramsData, 'data.isCrossBorder', false);
    const sourceAccNumber = result(accountFrom, 'accountNumber', '');
    const sourceAccName = result(accountFrom, 'name', '');
    const sourceAccProduct = result(accountFrom, 'productType', '');
    const transRefNum = result(resultData, 'transRefNum', '');
    const showTime = getDayName(transactionDate) + ', ' + moment().format('DD MMM YYYY');
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    const amountVal = Number(result(paramsData, 'data.data.amountVal', ''));
    const tipAmountManual = Number(result(paramsData, 'data.data.tipAmountManual', 0));
    const tag57 = Number(result(paramsData, 'data.jsonDt.57', ''));
    const isNaNTip = isNaN(tipAmountManual);
    const tip = ((isNaNTip || tag57 > 0) ? (amountVal * tag57) / 100 : tipAmountManual);
    const date = moment().format('DD MMM YYYY, hh:mm A');
    const total = (Number(tip) + Number(amountVal));
    const targetAccObject = result(paramsData, 'data.resData.transferTransaction.targetAccountObject', {});
    const targetAccNumber = result(targetAccObject, 'accountNumber', '');
    const jsonData = result(paramsData, 'data.jsonDt', {});
    const merchantName = result(jsonData, '59', '');
    const merchantLocation = result(jsonData, '60', '');
    const terminalId = result(jsonData, '62.07', '') || merchantId;
    const mpan = mPan;
    const targetName =  isCashout ? merchantName : result(targetAccObject, 'name', '');
    const statusTrx = status === 'SUCCESS' ? language.PAYMENT_STATUS__SUCCESSFUL : language.GENERIC__IN_PROCESS;
    const currencyCode = result(jsonData, '53', '');
    const currencyName = getCurrencyNameQR(currencyCode);
    const referenceNumber = status === 'PENDING' ? result(resultData, 'rrn', '') : result(resultData, 'referenceId', '');
    const customerPan = result(resultData, 'customerPan', '');
    const getcrossBorderTotalAmt = result(paramsData, 'data.resulData.convertedAmountIDRFee', '').replace(/([.])+/g, ',');
    const formatTotalIdr = formatForexAmount(getcrossBorderTotalAmt, 'IDR');
    const getconversionRate = result(paramsData, 'data.resulData.conversionRateFee', '').replace(/([.])+/g, ',');
    const formatRateIdr = formatForexAmount(getconversionRate, 'IDR');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <ImageBackground source={bG} style={styles.imageSummary} />
        {
          Platform.OS === 'android' ?
            <View style={styles.transactionStatus}>
              {
                status === 'SUCCESS' ?  <Text style={styles.transactionStatusText}>{language.QRCROSSBORDER_PAYMENT_HEADER_SUCCESS}</Text> 
                  : <Text style={styles.transactionStatusText}>{language.QRCROSSBORDER_PAYMENT_HEADER_PENDING}</Text> 
              }
            </View>
            :
            null
        }
        
        <View style={styles.tes} >
          <View style={styles.containerTransfer}>
            <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
              <View style={styles.containerBanner}>
                
                <View style={styles.containerLeft}>
                  <View style={styles.iconTopContainer}>
                    <Image source={SimobiPlus} style={styles.mainTitleLogo}/>

                    <Text style={styles.transactionDate}>{date}</Text>
                  </View>
                  <View style={styles.targetAcc}>
                    <SimasIcon name={status === 'SUCCESS' ? 'success-circle' : 'pending-circle'} size={50} style={ status === 'SUCCESS' ? styles.headerIcon : styles.logoPending}/>
                    <Text style={styles.targetName}>{language.GENERATE_CODE__PAYMENT} {statusTrx}</Text>
                    <View style={styles.transactionNumberContainer}>
                      <Text style={styles.transactionNumber}>{language.DETAIL_TRANSACTION__TRANSACTION_ID} : {isCrossBorder ? transRefNum : transRefNum}</Text>
                    </View>
                  </View>
                  <View style={styles.blueLine} />
                  <Text style={styles.receipt}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                  <View style={styles.accNumberContainer}>
                    {
                      isCrossBorder ?
                        <View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>Exchange Rate</Text>
                            <Text style={styles.textAmountNormal}>1 {currencyName} = {formatRateIdr} IDR</Text>
                          </View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.QR_GPN__WITHDRAWAL_AMOUNT}</Text>
                            <Text style={styles.textAmountNormal}>{formatForexAmount(amountVal, 'THB')} {currencyName}</Text>
                          </View> 
                        </View> 
                        : null
                    }
                    <View style={styles.amountContainer2}>
                      <Text style={styles.textAmountNormal}>{ isCrossBorder ? 'Total Equivalent to ' : language.QR_GPN__FEE}</Text>
                      {
                        isCrossBorder ?
                          <Text style={styles.textAmountNormal}>{formatTotalIdr} IDR</Text>
                          :                      
                          <Text style={styles.textAmountNormal}>{language.CGV__RP} {tip === 0 || tip === null ? '0' : currencyFormatter(tip)}</Text>
                      }
                    </View>
                    <View style={styles.greyLineBold} />
                    <View style={styles.amountContainer3}>
                      <Text style={styles.textAmountNormal}>{language.RECURRING__TOTAL}</Text>
                      {
                        isCrossBorder ?
                          <Text style={styles.textAmountBold}>{formatForexAmount(total, 'THB')} {currencyName}</Text>
                          :
                          <Text style={styles.textAmountBold}>{language.CGV__RP} {currencyFormatter(total)}</Text>
                      }
                      
                    </View>
                  </View>
                
                  <View style={styles.timeInitiate}>

                    <Text style={styles.timeInitiateText}>On {showTime}</Text>
  
                  </View>
                  <View style={styles.labelSpacing} />
                  <View style={styles.senderDetail}>
                    <View style={styles.sofCard}>                            
                      <SimasIcon name={'new_card'} size={17} style={styles.iconRed}/>
                    </View>
                    <View style={styles.rightItemContainer}>
                      <View>
                        {/* <Text style={styles.sendAccNumber}>{result(navParams, 'data.sourceAcc.accountNumber', 'NIL')}</Text>
                          <Text style={styles.sendAccName}>{toTitleCase(result(navParams, 'data.sourceAcc.name', 'NIL'))}</Text>
                          <Text style={styles.sendAccType}>{result(navParams, 'data.sourceAcc.productType', 'NIL')}</Text> */}
                        <Text style={styles.sendAccNumber}>{sourceAccNumber}</Text>
                        <Text style={styles.sendAccName}>{toTitleCase(sourceAccName)}</Text>
                        <Text style={styles.sendAccType}>{sourceAccProduct}</Text>
                      </View>
                    
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
                      {
                        isCashout ? null 
                          : <Text style={styles.sendAccNumber}>{targetAccNumber}</Text>
                      }
                      <Text style={styles.sendAccName}>{toTitleCase(targetName)}</Text>
                    </View>
                  </View>
                  <View style={styles.blueLine} />
                  <Text style={styles.receipt}>{language.CREDIT_CARD__TRANSACION_DETAILS}</Text>
                  <View style={styles.extraPadding}>
                    {
                      <View>
                        <View style={styles.mInfoContainer}>
                          <Text style={styles.smallGreyNote}>{language.PAYMENT_STATUS__RRN_TRANS}</Text>
                          <Text style={styles.mInfoTextBottom}>{referenceNumber}</Text>
                        </View>
                        <View style={styles.mInfoContainer}>
                          <Text style={styles.smallGreyNote}>Customer Pan</Text>
                          <Text style={styles.mInfoTextBottom}>{customerPan}</Text>
                        </View>
                        <View style={styles.mInfoContainer}>
                          <Text style={styles.smallGreyNote}>Merchant Location</Text>
                          <Text style={styles.mInfoTextBottom}>{merchantLocation}</Text>
                        </View>
                        <View style={styles.mInfoContainer}>
                          <Text style={styles.smallGreyNote}>Merchant Name</Text>
                          <Text style={styles.mInfoTextBottom}>{toTitleCase(merchantName)}</Text>
                        </View>
                        <View style={styles.mInfoContainer}>
                          <Text style={styles.smallGreyNote}>Merchant PAN</Text>
                          <Text style={styles.mInfoTextBottom}>{mpan}</Text>
                        </View>
                        <View style={styles.mInfoContainer}>
                          <Text style={styles.smallGreyNote}>Terminal Id</Text>
                          <Text style={styles.mInfoTextBottom}>{terminalId}</Text>
                        </View>
                      </View> 
                    }             
                    <View style={styles.extraPadding} />       
                    <View style={styles.blueLine} />
                    <View style={styles.extraPadding} />
                    <View style={styles.callText}><Text style={styles.smallGreyNote}>{language.PAYMENT_STATUS__NEED_HELP} </Text><Text style={styles.smallGreyCall} onPress={this.call}> {language.CGV__CALL}</Text></View>
                    <Text style={styles.smallGreyText}>{language.PAYMENT_STATUS__HELP_01}</Text>
                    <Text style={styles.smallGreyText}>{language.PAYMENT_STATUS__HELP_02}</Text>

                  </View>
                </View>
              </View>
            </ViewShot>

          </View>

        </View>

        {/* </ImageBackground> */}
        <View style={styles.bottomSpacing}>
          <SinarmasButton style={styles.btnShare} onPress={this.screenCapture}>
            <Text style={styles.buttonLargeTextStyleShare}>{language.PAYMENT_STATUS__SHARE}</Text>
          </SinarmasButton>
          <SinarmasButton style={styles.btnConfirm} onPress={onClose}>
            <Text style={styles.buttonLargeTextStyle}>{language.CGV__DONE}</Text>
          </SinarmasButton>
        </View> 
        
      </KeyboardAwareScrollView>
    );
  }
}

CreditCardFinalizeForm.propTypes = {
  displayList: PropTypes.array,
  dataDetailList: PropTypes.array,
  transactionId: PropTypes.string,
  amount: PropTypes.string,
  accountFrom: PropTypes.object,
  transactionDate: PropTypes.string,
  transactionType: PropTypes.string,
  onClose: PropTypes.func,
  token: PropTypes.string,
  status: PropTypes.string,
  qrStatus: PropTypes.object,
  isClosingTd: PropTypes.string,
  responseMessage: PropTypes.string,
  isManageCc: PropTypes.bool,
  rawDataDetailList: PropTypes.array,
  resultData: PropTypes.object,
  accountTo: PropTypes.object,
  isGenericBiller: PropTypes.string,
  isSaving: PropTypes.string,
  couponStatusPayment: PropTypes.string,
  initialDeposit: PropTypes.string,
  isSilEmFund: PropTypes.string,
  isFundTransfer: PropTypes.string,
  isQrPayment: PropTypes.string,
  onCloseLogin: PropTypes.func,
  onCloseLanding: PropTypes.func,
  isBillPayBeforeLogin: PropTypes.bool,
  isLKD: PropTypes.string,
  navigation: PropTypes.object,
  emoneyAccounts: PropTypes.array,
  custPoin: PropTypes.string,
  generalCode: PropTypes.string,
  isValas: PropTypes.bool,
  currencyValas: PropTypes.string,
  resDataTrf: PropTypes.object,
  mPan: PropTypes.string,
  merchantId: PropTypes.string
};

export default CreditCardFinalizeForm;
