import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking, Platform} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './PaymentStatusNew.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimobiPlus from '../../assets/images/simobiplus.png';
import {SinarmasButton} from '../FormComponents';
import {map, noop, isEmpty, result, upperFirst} from 'lodash';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, getDayName, removeDot, wrapMethodInFunction, copyToCLipboard, formatForexAmount} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import LayeredIcon from '../LayeredIcon/LayeredIcon.component';
import Poin from '../../assets/images/poin.png';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {connect} from 'react-redux';
import {autoSaveFeedBackChecklist} from '../../state/thunks/onboarding.thunks';
import LinearGradient from 'react-native-linear-gradient';
import LuckyImage from '../../assets/images/IconBoxLuckyDip.png';
import CameraRoll from '@react-native-community/cameraroll';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class CreditCardFinalizeForm extends Component {

  componentDidMount = () => {
    const {isBillPayBeforeLogin, isGenericBiller} = this.props;
    const {billPay, saving} = this.props;
    const checked = isBillPayBeforeLogin ? billPay : isGenericBiller ? billPay : saving;
    if (checked === true) {
      this.goToGalery();
    } else {
      null;
    }
  }

  openKustodianURL = () => {
    Linking.canOpenURL('https://akses.ksei.co.id/').then((supported) => {
      if (supported) {
        Linking.openURL('https://akses.ksei.co.id/');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

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
    width: 0,
    checked: this.props.isBillPayBeforeLogin ? this.props.billPay : this.props.isGenericBiller ? this.props.billPay : this.props.saving,
  }

  capturePic = () => {
    this.refs.viewShot.capture().then((uri) => {
      const image = uri;
      if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(image, 'photo');
      } else {
        const date = new Date();
        const nameFile = Math.floor(date.getTime() + date.getSeconds() / 2);
        const dirs = RNFetchBlob.fs.dirs;
        const path = `${dirs.DownloadDir}/${nameFile}.png`;
        RNFS.writeFile(path, image, 'base64').then(() => {});
      }
    });
  }

  goToGalery = () => {
    if (Platform.OS === 'android') { 
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePic();
            }
          });
        } else {
          this.capturePic();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePic();
            }
          });
        } else {
          this.capturePic();
        }
      });
    }
    
  }

  toogleCheckbox= () => {
    const {autoSaveCek} = this.props;
    const {isBillPayBeforeLogin, isSaving, isGenericBiller, billPay, saving} = this.props;
    const type = {isBillPayBeforeLogin, isGenericBiller, isSaving};

    const checked = !this.state.checked;
    this.setState({checked: checked});
    const isAutoSave = checked;
    isBillPayBeforeLogin || isGenericBiller ? billPay === isAutoSave : saving === isAutoSave;

    this.props.saveAutoSaveFunc({isAutoSave: isAutoSave, checked: checked});
    autoSaveCek(isAutoSave, checked, type);
    checked ? this.goToGalery() : null;

    const message = this.state.checked ? language.AUTO_SAVE_TOAST_FALSE : language.AUTO_SAVE_TOAST_TRUE;
    Toast.show(message, Toast.SHORT);
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

  closeLoginHHH = () => {
    const {isBillPayBeforeLogin, goToHHHBeforeLogin} = this.props;
    goToHHHBeforeLogin(isBillPayBeforeLogin);
  }

  

  render () {
    const {type = 'SUCCESS', transactionId = '', displayList, isLKD, isLuckyDipActive, goToHHH,
      amount, accountFrom = {}, transactionDate = new Date(), transactionType = '', onClose = noop, token = '', qrStatus = {}, isClosingTd, isManageCc = false,
      rawDataDetailList, dataDetailList, resData, accountTo, isGenericBiller, isSaving, couponStatusPayment, initialDeposit, onCloseLanding, isBillPayBeforeLogin,
      isSilEmFund, emoneyAccounts, navigation, isUseSimas, inputPolis, isSilIdrUsd, sourceAcc = {}, isPushBilling, isPushBillingFailed, txId, merchName,
      isBuyReksadana, isSellReksadana, item, totalFee, isResponseUnit, detailPortfolio, isNoFund, goToSplitBill, isSplitBill,
      savingProductType, currencySavingValas, formValuesSavingValas, displayListShopee, pushBillTransacation, isNewBiller, nomorPolis, alokasiPremi, billerCode,
      isAutodebitRegis, autoDebitStartDate, autoDebitDate, registerAutodebitOnly,  isClosingAccount, accNameHolder = '', openingDate = '', closingDate = '', 
      accClosing = '', accTypeSaving} = this.props;
    const trxId = result(inputPolis, 'trx_id', '');
    const transRefNum = result(navigation, 'state.params.payload.transRefNum', '');
    const txDate = moment(transactionDate).format('D MMM YYYY, h:mm a');
    const account = isEmpty(accountFrom) ? '' : accountFrom.accountType + ', ' + accountFrom.accountNumber + ', ' + accountFrom.name;
    const tdAccount = accountFrom.newAccountNumber;
    const title = type === 'SUCCESS' ? language.PAYMENT_STATUS__SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : type === 'LKDFAILED' ? language.LKD__PAYMENT_STATUS + language.PAYMENT_STATUS__FAILED ? type === 'FAILED' : language.PAYMENT_STATUS__FAILED : transactionType + language.PAYMENT_STATUS__FAILED;
    const amountNumBiller = result(resData, 'amountNumber', 0);
    const bankChargeBiller = isNewBiller === true ?  result(resData, 'totalBankCharge', 0) : result(resData, 'bankCharge', 0);
    const showTime = getDayName(transactionDate) + ', ' + moment().format('DD MMM YYYY');
    const accNoBiller = accountFrom.accountNumber;
    const accNameBiller = accountFrom.name;
    const accProdType = accountFrom.productType;
    const accNo = sourceAcc.accountNumber;
    const accName = sourceAcc.name;
    const accType = sourceAcc.productType;
    const accSavingNo = result(accountTo, 'newAccountNumber', '');
    const accSavingName = result(accountTo, 'customerName', '');
    const accSavingProduct = result(accountTo, 'productName', '');
    const subsNumber = result(resData, 'subscriberNoInput', '');
    const totalAmount = result(resData, 'amount', '');
    const amountTotal = result(navigation, 'state.params.resData.data.totalAmount', '');
    const feeLKD = result(navigation, 'state.params.resData.data.fee', '');
    const amountLKD = result(navigation, 'state.params.resData.data.amount', '');
    const isRecurring = result(rawDataDetailList, '[3].key', '').split('__')[1] === 'RECURRING';
    const totalAmountTransfer = isRecurring ? (parseInt(removeDot(result(rawDataDetailList, '[7].value', ''))) + parseInt(removeDot(result(rawDataDetailList, '[6].value', ''))))
      : (parseInt(removeDot(result(rawDataDetailList, '[5].value', ''))) + parseInt(removeDot(result(rawDataDetailList, '[4].value', ''))));
    const realTotalAmount = String(totalAmountTransfer);
    const totalFeeMathRound = parseInt(Math.round(totalFee));
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    const totalEarnings = parseInt(Math.round(isResponseUnit * NABPerUnit));
    const totalearning = parseInt(Math.round(totalEarnings - totalFee));
    const fundCurrency = result(detailPortfolio, 'portfolio.0.Fund_Currency', '');
    const isTypeCurrency = fundCurrency === 'IDR' ? 'Rp' : '$';
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    const couponAplied = [
      {
        iconName: 'green-coupon_01',
        iconStyle: {color: '#4ED07D'},
        iconSize: 40
      },
      {
        iconName: 'green-coupon_02',
        iconStyle: {color: 'rgba(0, 128, 0, 0.2)'},
        iconSize: 40
      }
    ];
    const hideAmount = registerAutodebitOnly && amountNumBiller === 1;
    const currencyAccFromSavingValas = result(accountFrom, 'currency', '');
    const checkCurrencyAccFromSavingValas = !isEmpty(result(accountFrom, 'currency', ''));
    const exchangeRate = result(formValuesSavingValas, 'exchangeRateDisplay', '');
    const intialDepositAmountValas = result(formValuesSavingValas, 'initialDepositDisplay', '');
    const equivalenTo = result(formValuesSavingValas, 'equivalenRateDisplay', '');
    const pushBillAmount = result(pushBillTransacation, 'amount', 0);
    const pushBillTotalAmt = result(pushBillTransacation, 'totalAmount', 0);
    const pushBillFee = result(pushBillTransacation, 'transCharge', 0);
    const isLionMentari = billerCode === '710110';
    const buttonDtAction = 'Payment Status' + type;
    return (
      <KeyboardAwareScrollView style={styles.columnContainer}
        extraHeight={120} bounces={false}>
        <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
          <View style={styles.upperWrapper}>
            <View style={styles.titleContainer}>
              <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
              <Text style={styles.transactionDate}>{txDate}</Text>
            </View>
            <View style={[styles.row, styles.ph20]}>
              <View style={styles.mainTitle}>
                {
                  type === 'SUCCESS' && !isManageCc && isRecurring ?
                    <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS__PENDING}</Text>
                    :
                    type === 'FAILED' && isPushBilling && !isPushBillingFailed ?
                      <Text style={styles.mainTitleText}>{language.TITLE__ERROR_TRANSACTION_PAGE}</Text>
                      :
                      type === 'FAILED' && isPushBillingFailed ?
                        <Text style={styles.mainTitleText}>{title}</Text>
                        :
                        type === 'SUCCESS' && registerAutodebitOnly ?
                          <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS_AUTODEBIT_REGIST_SUCCESS}</Text>
                          :
                          type === 'FAILED' && registerAutodebitOnly ?
                            <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS_AUTODEBIT_REGIST_FAILED}</Text>
                            :
                            type === 'PENDING' && isSilEmFund === 'yes' ?
                              <Text style={styles.mainTitleText}>{language.SIL__EMERGENCY_FUND_HEADING_ON_PROCESS}</Text>
                              :
                              type === 'SUCCESS' && !isManageCc && isRecurring ?
                                <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS__PENDING}</Text>
                                :
                                type === 'FAILED' && isPushBilling && !isPushBillingFailed ?
                                  <Text style={styles.mainTitleText}>{language.TITLE__ERROR_TRANSACTION_PAGE}</Text>
                                  :
                                  type === 'FAILED' && isPushBillingFailed ?
                                    <Text style={styles.mainTitleText}>{title}</Text>
                                    :
                                    type === 'PENDING' && isSilEmFund === 'yes' ?
                                      <Text style={styles.mainTitleText}>{language.SIL__EMERGENCY_FUND_HEADING_ON_PROCESS}</Text>
                                      :
                                    // ClosingAccount
                                      type === 'FAILED' && isClosingAccount ? 
                                        <Text style={styles.mainTitleText1}>{language.TITLE__ERROR_TRANSACTION_PAGE}</Text>
                                        : 
                                        <Text style={styles.mainTitleText}>{title}</Text>
                }

                { type === 'SUCCESS' && !isManageCc && isRecurring ?
                  <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text>
                  : type === 'SUCCESS' && !isManageCc && !isLKD ?
                    <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__SUCCESSFUL}</Text>
                    : type === 'PENDING' && isSilEmFund === 'yes' ?
                      <Text style={styles.successText}>{transactionType} {language.SIL__EMERGENCY_FUND_RESULT_ON_PROCESS}</Text>
                      : type === 'PENDING' && !isManageCc ?
                        <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text>
                        : type === 'FAILED' && isPushBilling && !isPushBillingFailed ?
                          <Text style={styles.successText}>{transactionType} {language.TOKEN_PAYMENT_ISEXPIRED}</Text>
                          : type === 'SUCCESS' && isManageCc && !isLKD ?
                            <Text style={styles.successText}>{transactionType} {language.MANAGE__CREDIT_CARD} {language.PAYMENT_STATUS__SUCCESSFUL}</Text>
                            : type === 'FAILED' && isNoFund ?
                              <Text style={styles.successText}>{transactionType} {language.RESPONSE_MESSAGE__RC_51}</Text>
                              :
                              type === 'FAILED' && isPushBillingFailed ?
                                null
                                :
                                null}
                {
                  type === 'SUCCESS' && isLKD ?
                    <Text style={styles.successText}>{language.LKD__PAYMENT_STATUS} {language.PAYMENT_STATUS__SUCCESSFUL}</Text>
                    : null }
                {
                  transactionId !== '' ?
                    <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transactionId}</Text>
                    : <Text/>
                }
                {
                  transRefNum !== '' ?
                    <Text style={styles.transrefnumLKD}>{language.PAYMENT_STATUS__NO_TRANS} {transRefNum}</Text>
                    : <Text/>
                }
                {
                  trxId !== '' ?
                    <Text style={styles.transrefnumSIL}>{language.PAYMENT_STATUS__NO_ESPAJ} {trxId}</Text>
                    : <Text/>
                }
                { transactionType === 'ShopeePay payment' && type === 'PENDING' ? 
                  <View>
                    {map(displayListShopee, (value, k) => (
                      (value === 'Order id' ?
                        <Text style={styles.transrefnumShopeepay}>{language.PAYMENT__STATUS_ORDER_ID} {k}</Text>
                        : null)))
                    }
                  </View>
                  : null
                }

              </View>
              {
                type === 'FAILED' && isPushBilling ?
                  <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                  :
                  type === 'SUCCESS' && !isManageCc && isRecurring ?
                    <SimasIcon name={'pending-circle'} style={styles.logoFail} size={50}/>
                    :
                    type === 'SUCCESS' ?
                      <SimasIcon name={'success-circle'} style={styles.logoSuccess} size={50}/>
                      :
                      type === 'PENDING' ?
                        <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                        :
                        <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
              }
            </View>
          </View>
          <View>
            <View style={styles.borderGreyTop}/>
          </View>

          {
            !isEmpty(qrStatus) &&
            <View>
              <View style={styles.middleContainer}>
                <SimasIcon name={'coupon-disc'} size={30} style={styles.qrIcon}/>
                <View style={styles.couponGainedTextContainer}><Text style={styles.couponGetBlack}><Text style={styles.couponGet}>{result(qrStatus, 'couponsGenerated', 0)}x {language.PAY_BY_QR__COUPON}</Text> {language.PAY_BY_QR__GAINED}</Text></View>
              </View>
              <View style={styles.middleContainer}>
                <Text style={styles.couponPointGet}>{language.PAY_BY_QR__YOU_GOT}</Text>
                <Text style={styles.XXlText}>{result(qrStatus, 'pointsGenerated', 0)}</Text>
                <Text style={styles.couponPoints}>{language.PAY_BY_QR__POINTS}</Text>
                <View style={styles.pointsBarContainer}>
                  <View style={[styles.greenProgress, {flex: result(qrStatus, 'pointsBalance', 0)}]}/>
                  <View style={[styles.greyProgress, {flex: result(qrStatus, 'pointAmountForCoupon', 0) - result(qrStatus, 'pointsBalance', 0)}]}/>
                </View>
                <Text style={styles.couponPointGet}>{result(qrStatus, 'pointsBalance', 0)}/{result(qrStatus, 'pointAmountForCoupon', 0)} {language.PAY_BY_QR__POINTS_GET_COUPON}</Text>
                {
                  result(qrStatus, 'couponsGenerated', 0) > 0 &&
                  <View>
                    <View style={styles.additionalPadding}/>
                    <Text style={styles.couponPointGet}>{language.PAY_BY_QR__COUPON_HAVE}</Text>
                    <View style={styles.couponContainer}>
                      <View style={styles.iconContainer}>
                        <Text style={styles.qrIconAmount}>(<Text style={styles.qrIconText}>{result(qrStatus, 'couponsBalance', 0)}x</Text>) </Text>
                        <SimasIcon name={'coupon-disc'} size={30} style={styles.qrIcon}/>
                        <Text style={styles.qrIconAmount}> {result(qrStatus, 'rewardType', '') === 'CASH' ? 'Rp ' + currencyFormatter(result(qrStatus, 'couponValue', 0)) : result(qrStatus, 'couponValue', 0) + '% ' + language.PAY_BY_QR__DISCOUNT}</Text>
                      </View>
                    </View>
                  </View>
                }
              </View>
            </View>
          }

          {token === '' ?
            null :
            <View style={styles.tokenContainer}>
              <View style={styles.ph20}>
                <Text style={styles.detailKey}>{language.PAYMENT_STATUS__ELECTRICITY_TOKEN}</Text>
                <View style={styles.titleContainer}>
                  <Text style={styles.token}>{token}</Text>
                  <Touchable onPress={wrapMethodInFunction(copyToCLipboard, token)}>
                    <Text style={styles.copy}>
                      {language.CREATE_ACCOUNT__COPY}
                    </Text>
                  </Touchable>
                </View>
              </View>
            </View>

          }

          <View>
            {type === 'SUCCESS' || type === 'PENDING' ?
              <View>
                {initialDeposit === '0' ?
                  <View style={styles.noResiContainerTop}>
                    <Text style={styles.noDepositText}>{type === 'PENDING' ? language.SAVING__ACCOUNT_INTERCORE_PENDING : language.SAVING__ACCOUNT_NO_DEPOSIT}</Text>
                  </View>
                  :
                  <View>
                    <View style={styles.middleContainerTop}>
                      <View style={styles.containerReceiptBill}>
                        {            
                          isClosingAccount ?    
                            <View>
                              <Text style={styles.receiptTextClosing}>{language.CLOSE__SAVING_ACCOUNT_SAVING_DETAIL}</Text>
                            </View>
                            : 
                            <View>
                              <Text style={styles.receiptText}> {language.PAYMENT_STATUS__RECEIPT}</Text>
                            </View>
                        }
                        {transactionType === 'Transfer' && !isSplitBill ?
                          <View>
                            <Touchable onPress={goToSplitBill}>
                              <Text style={styles.splitBillText}>{language.SPLITBILL__BUTTON}</Text>
                            </Touchable>
                          </View>
                          : null
                        }
                      </View>
          
                      { savingProductType === 'savingValas' && checkCurrencyAccFromSavingValas && currencySavingValas !== currencyAccFromSavingValas && initialDeposit !== '0' ?
                        <View style={styles.paddingExchangeRateValas}>
                          <View style={styles.containerConvertSavingValas}>
                            <View style={styles.titleContainerConvertValas}>
                              <Text style={styles.titleConvertValas}>{language.SIMAS_VALAS_EXCHANGE_RATE}</Text>
                            </View>
                            <Text style={styles.valueConvertValas}>{exchangeRate}</Text>
                          </View>
                          <View style={styles.containerConvertSavingValas}>
                            <View style={styles.titleContainerConvertValas}>
                              <Text style={styles.titleConvertValas}>{language.SIMAS_VALAS_INITIAL_DEPOSIT_AMOUNT}</Text>
                            </View>
                            <Text style={styles.valueConvertValas}>{intialDepositAmountValas}</Text>
                          </View>
                          <View style={styles.containerConvertSavingValas}>
                            <View style={styles.titleContainerConvertValas}>
                              <Text style={styles.titleConvertValas}>{language.SIMAS_VALAS_EQUIVALEN_TO}</Text>
                            </View>
                            <Text style={styles.valueConvertValas}>{equivalenTo}</Text>
                          </View>
                        </View>
                        : null
                      }
                      {
                        isClosingTd === 'yes' ?
                          <View style={styles.amountContainer} >
                            <Text style={styles.amountTitle}>{transactionType}</Text>
                            <Text style={styles.amountText}>{amount}</Text>
                          </View>
                          : isGenericBiller === 'yes' ?
                            <View>
                              <View style={styles.borderTop} />
                              { isUseSimas ?
                                <View style={[styles.rowSimas, styles.mv5]}>
                                  <Text>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                  <View style={styles.simas}>
                                    <Text style={styles.amountBill}>{currencyFormatter(totalAmount)}</Text>
                                    <Image source={Poin} style={styles.poinColapsible}/>
                                  </View>
                                </View>
                                : hideAmount ? 
                                  null :
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                    <Text style={styles.amountBill}>Rp {currencyFormatter(totalAmount)}</Text>
                                  </View>
                              }
                              {
                                isUseSimas ?
                                  null
                                  :
                                  <View>
                                    { hideAmount ? 
                                      null :
                                      <View style={[styles.row, styles.mv5]}>
                                        <Text>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                        <Text>Rp {currencyFormatter(amountNumBiller)}</Text>
                                      </View>
                                    }
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                      <Text>Rp {currencyFormatter(bankChargeBiller)}</Text>
                                    </View>
                                  </View>
                              }
                              <View style={styles.borderTop} />
                            </View>
                            : isPushBilling === 'yes' ?
                              <View style={styles.containerPushBill}>
                                <View style={styles.amountContainerPushBill}>
                                  <View style={styles.amountMiddleContainerPushBill}>
                                    <Text style={styles.amountTitle}>{transactionType} {merchName}</Text>
                                    <Text style={styles.amountBillSmall}>Rp {currencyFormatter(pushBillAmount)}</Text>
                                  </View>
                                  <View style={styles.amountMiddleContainerPushBill}>
                                    <Text style={styles.amountTitle}>Fee</Text>
                                    <Text style={styles.amountBillSmall}>Rp {currencyFormatter(pushBillFee)}</Text>
                                  </View>
                                </View>
                                <View style={styles.totalAmountPushBill}>
                                  <Text style={styles.amountTitle}>Total</Text>
                                  <Text style={styles.amountBillSmall}>Rp {currencyFormatter(pushBillTotalAmt)}</Text>
                                </View>
                              </View>
                              : isLKD === 'yes' ?
                                <View>
                                  <View style={styles.borderTop} />
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text>{language.LKD__SUCCESS_TOTAL_WITHDRAW}</Text>
                                    <Text style={styles.amountBill}>Rp {currencyFormatter(amountTotal)}</Text>
                                  </View>
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text>{language.DETAIL__AMOUNT}</Text>
                                    <Text style={styles.amountFee}>Rp {currencyFormatter(amountLKD)}</Text>
                                  </View>
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                    <Text style={styles.amountFee}>Rp {currencyFormatter(feeLKD)}</Text>
                                  </View>
                                  <View style={styles.borderTop} />
                                </View>
                                : isSaving === 'yes' ?
                                  <View>
                                    <View style={styles.borderTop} />
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={savingProductType === 'savingValas' ? styles.styleTotalConvertValas : null}>{savingProductType === 'savingValas' ? language.SIMAS_VALAS_TOTAL : language.OPEN_NEW_ACCOUNT__CONFIRM_INITIAL_DEPOSIT}</Text>
                                      <Text style={styles.amountBill}>{amount}</Text>
                                    </View>
                                    <View style={styles.borderTop} />
                                  </View>
                                  : isSilEmFund === 'yes' ?
                                    <View>
                                      <View style={styles.borderTop} />
                                      <View style={[styles.row, styles.mv5]}>
                                        <Text>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                        <Text style={styles.amountBill}>{amount}</Text>
                                      </View>
                                      <View style={styles.borderTop} />
                                    </View>
                                    : isBuyReksadana === 'yes' ?
                                      <View>
                                        <View style={styles.borderTop} />
                                        <View style={[styles.row, styles.mv5]}>
                                          <Text>{language.CARDLESSWITHDRAWAL__TOTAL_AMOUNT}</Text>
                                          <Text style={styles.amountBill}>{amount}</Text>
                                        </View>
                                        <View style={[styles.row, styles.mv5]}>
                                          <Text>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                          <Text>{currencyFormatter}{amount}</Text>
                                        </View>
                                        <View style={[styles.row, styles.mv5]}>
                                          <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                          <Text>{currencyFormatter(bankChargeBiller)}</Text>
                                        </View>
                                        <View style={styles.borderTop} />
                                      </View>
                                      : isSellReksadana === 'yes' ?
                                        <View>
                                          <View style={styles.borderTop} />
                                          <View style={[styles.row, styles.mv5]}>
                                            <Text>{language.CARDLESSWITHDRAWAL__TOTAL_EARNINGS}</Text>
                                            <Text style={styles.amountBill}>{isTypeCurrency} {currencyFormatter(totalearning)}</Text>
                                          </View>
                                          <View style={[styles.row, styles.mv5]}>
                                            <Text>{language.CARDLESSWITHDRAWAL__EARNINGS}</Text>
                                            <Text>{isTypeCurrency} {currencyFormatter(totalEarnings)}</Text>
                                          </View>
                                          <View style={[styles.row, styles.mv5]}>
                                            <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                            <Text>{isTypeCurrency} {currencyFormatter(totalFeeMathRound)}</Text>
                                          </View>
                                          <View style={styles.borderTop} />
                                        </View>
                                        :
                                        // closing account 
                                        isClosingAccount === 'yes' ?
                                          <View style={styles.middleContainerMiddle}>
                                            <View style={styles.labelSpacing} />
                                            <View style={styles.containerClosing}>
                                              <Text style={styles.closingNameTxt}>{language.DASHBOARD__CARD_NUMBER}</Text>
                                              <Text style={styles.closingDetailsTxt}>{accClosing}</Text>
                                            </View>
                                            <View style={styles.borderTopSoft} />
                                            <View style={styles.containerClosing}>
                                              <Text style={styles.closingNameTxt}>{language.GENERIC__NAME}</Text>
                                              <Text style={styles.closingDetailsTxt}>{accNameHolder}</Text>
                                            </View>
                                            <View style={styles.borderTopSoft} />
                                            <View style={styles.containerClosing}>
                                              <Text style={styles.closingNameTxt}>{language.CLOSE__SAVING_ACCOUNT_TYPE_SAVING}</Text>
                                              <Text style={styles.closingDetailsTxt}>{accTypeSaving}</Text>
                                            </View>
                                            <View style={styles.borderTopSoft} />
                                            <View style={styles.containerClosing}>
                                              <Text style={styles.closingNameTxt}>{language.CLOSE__SAVING_ACCOUNT_OPEN_DATE}</Text>
                                              <Text style={styles.closingDetailsTxt}>{openingDate}</Text>
                                            </View>
                                            <View style={styles.borderTopSoft} />
                                            <View style={styles.containerClosing}>
                                              <Text style={styles.closingNameTxt}>{language.CLOSE__SAVING_ACCOUNT_CLOSE_DATE}</Text>
                                              <Text style={styles.closingDetailsTxt}>{closingDate}</Text>
                                            </View>
                                          </View>
                                          : 
                                          null
                      }

                      <View style={styles.sourceAccountContainer}>
                        { isClosingTd === 'yes' ?
                          <View>
                            <Text style={styles.sourceAccount}>{language.PAYMENT_STATUS__TD_ACCOUNT} - <Text style={styles.account}>{tdAccount}</Text></Text>
                          </View>
                          : isGenericBiller === 'yes' ?
                            <View>
                              <View>
                                <Text style={styles.dateText}>{showTime}</Text>
                              </View>
                              <View style={styles.labelSpacing} />
                              <View>
                                <View style={styles.rowAlign}>
                                  <View>
                                    <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                                  </View>
                                  <View>
                                    {
                                      isUseSimas ?
                                        <View>
                                          <Text style={[styles.accNo, styles.roboto]}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                        </View>
                                        :
                                        <View>
                                          <Text style={[styles.accNo, styles.roboto]}>{accNoBiller}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{accProdType}</Text>
                                        </View>
                                    }
                                  </View>
                                </View>
                                <View>
                                  <SimasIcon name={'more-menu'} size={25} style={[styles.more]}/>
                                </View>
                                <View style={styles.rowAlign}>
                                  <View>
                                    <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
                                  </View>
                                  <View style={{flex: 1}}>
                                    <Text style={[styles.accNo, styles.roboto]}>{subsNumber}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{transactionType}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            : isPushBilling === 'yes' ?
                              <View>
                                <View>
                                  <Text style={styles.dateText}>{showTime}</Text>
                                </View>
                                <View style={styles.labelSpacing} />
                                <View>
                                  <View style={styles.rowAlign}>
                                    <View>
                                      <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                                    </View>
                                    <View>
                                      <Text style={[styles.accNo, styles.roboto]}>{accNo}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{accName}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{accType}</Text>
                                    </View>
                                  </View>
                                  <View>
                                    <SimasIcon name={'more-menu'} size={25} style={[styles.more]}/>
                                  </View>
                                  <View style={styles.rowAlign}>
                                    <View>
                                      <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
                                    </View>
                                    <View>
                                      <Text style={[styles.product, styles.roboto]}>{merchName}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              : isLKD === 'yes' ?
                                <View>
                                  <View>
                                    <Text style={styles.dateText}>{showTime}</Text>
                                  </View>
                                  <View style={styles.labelSpacing} />
                                  <View>
                                    <View style={styles.rowAlign}>
                                      <View>
                                        <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                                      </View>
                                      <View>
                                        <Text style={[styles.accNo, styles.roboto]}>{result(emoneyAccounts, 'accountNumber', '')}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{result(emoneyAccounts, 'name', '')}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{result(emoneyAccounts, 'accountType', '')}</Text>

                                      </View>
                                    </View>
                                  </View>
                                </View>
                                : isSaving === 'yes' ?
                                  <View>
                                    <View>
                                      <View style={styles.rowAlign}>
                                        <View>
                                          <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                                        </View>
                                        <View>
                                          {
                                            isUseSimas ?
                                              <View>
                                                <Text style={[styles.accNo, styles.roboto]}>{accProdType}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                              </View>
                                              :
                                              <View>
                                                <Text style={[styles.accNo, styles.roboto]}>{accNoBiller}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{accProdType}</Text>
                                              </View>
                                          }
                                        </View>
                                      </View>
                                      <View>
                                        <SimasIcon name={'more-menu'} size={25} style={[styles.more]}/>
                                      </View>
                                      <View style={styles.rowAlign}>
                                        <View>
                                          <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
                                        </View>
                                        <View>
                                          <Text style={[styles.accNo, styles.roboto]}>{accSavingNo}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{accSavingName}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{accSavingProduct}</Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                  : isSilEmFund === 'yes' ?
                                    <View>
                                      <View>
                                        <Text style={styles.dateText}>{showTime}</Text>
                                      </View>
                                      <View style={styles.labelSpacing} />
                                      <View>
                                        <View style={styles.rowAlign}>
                                          <View>
                                            <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                                          </View>
                                          <View>
                                            <Text style={[styles.accNo, styles.roboto]}>{nomorPolis}</Text>
                                            <Text style={[styles.product, styles.roboto]}>{language.INQUIRY__SIL_KAP}</Text>
                                            <Text style={[styles.product, styles.roboto]}>{alokasiPremi}</Text>
                                          </View>
                                        </View>
                                        <View>
                                          <SimasIcon name={'more-menu'} size={25} style={[styles.more]}/>
                                        </View>
                                        <View style={styles.rowAlign}>
                                          <View>
                                            <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
                                          </View>
                                          <View>
                                            <Text style={[styles.accNo, styles.roboto]}>{accSavingNo}</Text>
                                            <Text style={[styles.product, styles.roboto]}>{accSavingName}</Text>
                                            <Text style={[styles.product, styles.roboto]}>{accSavingProduct}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                    : isBuyReksadana === 'yes' ?
                                      <View>
                                        <View>
                                          <Text style={styles.dateText}>{showTime}</Text>
                                        </View>
                                        <View style={styles.labelSpacing} />
                                        <View>
                                          <View style={styles.rowAlign}>
                                            <View>
                                              <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]} />
                                            </View>
                                            <View>
                                              <Text style={[styles.accNo, styles.roboto]}>{accNoBiller}</Text>
                                              <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                              <Text style={[styles.product, styles.roboto]}>{accProdType}</Text>
                                            </View>
                                          </View>
                                          <View>
                                            <SimasIcon name={'more-menu'} size={25} style={[styles.more]} />
                                          </View>
                                          <View style={styles.rowAlign}>
                                            <View>
                                              <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]} />
                                            </View>
                                            <View>
                                              <Text style={[styles.accNo, styles.roboto]}>{result(item, 'summaryPortfolio.Fund_Name', 'NIL')}</Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                      : isSellReksadana === 'yes' ?
                                        <View>
                                          <View>
                                            <Text style={styles.dateText}>{showTime}</Text>
                                          </View>
                                          <View style={styles.labelSpacing} />
                                          <View>
                                            <View style={styles.rowAlign}>
                                              <View>
                                                <SimasIcon name={'purchase'} size={30} style={[styles.purchaseSell, styles.mr10]} />
                                              </View>
                                              <View>
                                                <Text style={[styles.accNo, styles.roboto]}>{result(item, 'summaryPortfolio.Fund_Name', '')}</Text>
                                              </View>
                                            </View>

                                            <View>
                                              <SimasIcon name={'more-menu'} size={25} style={[styles.moreMen]} />
                                            </View>

                                            <View style={styles.rowAlign}>
                                              <View>
                                                <SimasIcon name={'wallet'} size={30} style={[styles.walletSell, styles.mr10]} />
                                              </View>
                                              <View>
                                                <Text style={[styles.sendAccNumber, styles.roboto]}>{result(accountFrom, 'accountNumber', '')}</Text>
                                                <Text style={[styles.sendAccNameType, styles.roboto]}>{result(accountFrom, 'name', '')}</Text>
                                                <Text style={[styles.sendAccNameType, styles.roboto]}>{result(accountFrom, 'productType', '')}</Text>
                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                        : account === '' ?
                                          null
                                          :
                                          null
                        }
                      </View>

                      {type === 'SUCCESS' && couponStatusPayment !== '' ? 
                        null :
                        <View style={styles.borderTop} />
                      }

                      {type === 'SUCCESS' && couponStatusPayment !== '' ?
                        <View style={styles.paddingCoupon}>
                          <View style={styles.backgroundColorCouponUse}>
                            <View style={styles.rowCou}>
                              <View style={styles.iconWidth}>
                                <LayeredIcon layers={couponAplied}/>
                              </View>
                              <Text style={styles.couponTextUse}>{language.COUPON_YOU_GOT} {couponStatusPayment}</Text>
                            </View>
                          </View>
                        </View>
                        : null}
                    </View>

                    {
                      isPushBilling === 'yes' ?
                        <View style={styles.middleContainerMiddle}>
                          <View>
                            <Text style={[styles.accNo, styles.roboto]}>{language.TOKEN_PAYMENT}</Text>
                            <Text style={[styles.product, styles.roboto]}>{merchName}</Text>
                          </View>
                          <View style={styles.labelSpacing} />
                          <View>
                            <Text style={[styles.accNo, styles.roboto]}>{language.TOKEN_PAYMENT} No.</Text>
                            <Text style={[styles.product, styles.roboto]}>{txId}</Text>
                          </View>
                          <View style={styles.labelSpacing} />
                          <View>
                            <Text style={[styles.accNo, styles.roboto]}>{language.GENERIC__NAME}</Text>
                            <Text style={[styles.product, styles.roboto]}>{upperFirst(accName)}</Text>
                          </View>
                          <View style={styles.labelSpacing} />
                          <View>
                            <Text style={[styles.accNo, styles.roboto]}>{language.SERVICE__PAYMENT_AMOUNT}</Text>
                            <Text style={[styles.product, styles.roboto]}>Rp {currencyFormatter(amount)}</Text>
                          </View>
                        </View>
                        : null
                    }

                    <View style={styles.middleContainerMiddle}>
                      {
                        result(rawDataDetailList, '[0].key', '').split('__')[0] === 'CARDLESSWITHDRAWAL' ?
                          (<View style={styles.detailContainer}>
                            {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'WITHDRAWAL_AMOUNT' ?
                              <View style={[styles.row, styles.mv5]}>
                                <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                <Text style={styles.largeText}>Rp. {result(rawDataDetailList, '[5].value', '')}</Text>
                              </View> : <View style={styles.rowItem}/>}
                            {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'WITHDRAWAL_AMOUNT' ?
                              <View style={[styles.row, styles.mv5]}>
                                <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                <Text>Rp. {result(rawDataDetailList, '[5].value', '')}</Text>
                              </View> : <View style={styles.rowItem}/>}
                            {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'FEES' ?
                              <View style={[styles.row, styles.mv5]}>
                                <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                <Text>Rp. {result(rawDataDetailList, '[4].value', '').split('\n')[0]}</Text>
                              </View> : <View style={styles.rowItem}/>}
                            <View style={styles.borderTop}/>
                            {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                              <View>
                                <Text style={styles.dateText}>{result(rawDataDetailList, '[2].value', '')}</Text>
                              </View> : <View style={styles.rowItem} />}
                            <View style={styles.labelSpacing} />

                            {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'WITHDRAWAL_FROM' ?
                              <View style={styles.rowAlign}>
                                <View>
                                  <SimasIcon name='wallet' size={30} style={[styles.wallet, styles.mr10]}/>
                                </View>
                                <View>
                                  <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[1]}</Text>
                                  <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]}</Text>
                                  <Text style={[styles.product, styles.roboto]}>{account.split(', ')[2]}</Text>
                                </View>
                              </View> : <View style={styles.rowItem} />}
                            {isClosingTd === 'yes' ? 
                              null :
                              <View style={styles.rowAlign}>
                                <SimasIcon name='more-menu' size={20} style={[styles.more]}/>
                              </View>}
                            {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'WITHDRAWAL_USING' ? (
                              <View style={styles.rowAlign}>
                                <View>
                                  <SimasIcon name='sendto' size={30} style={[styles.purchase, styles.mr10]}/>
                                </View>
                                <View>
                                  <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                  <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]}</Text>
                                  <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
                                </View>
                              </View>
                            ) :
                              <View style={styles.rowItem}/>
                            }
                            <View style ={styles.summaryArea}/>
                            {result(rawDataDetailList, '[3].key', '').split('__')[1] === 'NOTES' ?
                              <View>
                                <View>
                                  <View style={styles.summaryDetailContainer}>
                                    <Text style={styles.detailTitle}>{language.CARDLESSWITHDRAWAL__NOTES}</Text>
                                    <Text style={styles.summaryDetail}>{result(rawDataDetailList, '[3].value', '-')}</Text>
                                  </View>
                                </View>
                              </View> :
                              <View style={styles.rowItem}/>
                            }
                          </View>)
                          :
                          result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER' &&  result(rawDataDetailList, '[3].key', '').split('__')[1] === 'RECURRING' ?
                            (<View style={styles.detailContainer}>
                              {result(rawDataDetailList, '[7].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                <View style={[styles.row, styles.mv5]}>
                                  <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                  <Text style={styles.largeText}>Rp. {
                                    currencyFormatter(realTotalAmount)
                                  }</Text>
                                </View> : <View style={styles.rowItem}/>}
                              {result(rawDataDetailList, '[7].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                <View style={[styles.row, styles.mv5]}>
                                  <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                  <Text>Rp. {result(rawDataDetailList, '[7].value', '')}</Text>
                                </View> : <View style={styles.rowItem}/>}
                              {result(rawDataDetailList, '[6].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                <View style={[styles.row, styles.mv5]}>
                                  <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[6].value', '').split('\n')[1]} {')'}</Text>
                                  <Text>Rp. {result(rawDataDetailList, '[6].value', '').split('\n')[0]}</Text>
                                </View> : <View style={styles.rowItem}/>}
                              <View style={styles.borderTop}/>
                              {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                <View>
                                  <Text style={styles.dateText}>{result(rawDataDetailList, '[2].value', '')}</Text>
                                </View> : <View style={styles.rowItem} />}
                              <View style={styles.labelSpacing} />
                              {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                <View style={styles.rowAlign}>
                                  <View>
                                    <SimasIcon name='wallet' size={30} style={[styles.wallet, styles.mr10]}/>
                                  </View>
                                  <View>
                                    <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[1]}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{account.split(', ')[2]}</Text>
                                  </View>
                                </View> : <View style={styles.rowItem} />}
                              {isClosingTd === 'yes' ? 
                                null :
                                <View style={styles.rowAlign}>
                                  <SimasIcon name='more-menu' size={20} style={[styles.more]}/>
                                </View>}
                              {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                <View style={styles.rowAlign}>
                                  <View>
                                    <SimasIcon name='sendto' size={30} style={[styles.purchase, styles.mr10]}/>
                                  </View>
                                  <View>
                                    <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
                                  </View>
                                </View>
                              ) :
                                <View style={styles.rowItem}/>
                              }
                              <View style ={styles.summaryArea}/>
                              {result(rawDataDetailList, '[3].key', '').split('__')[1] === 'RECURRING' ?
                                <View>
                                  <View>
                                    <View style={styles.summaryDetailContainer}>
                                      <Text style={styles.detailTitle}>{language.TRANSFER__RECURRING}</Text>
                                      <Text style={styles.summaryDetail}>{result(rawDataDetailList, '[3].value', '-')}x</Text>
                                    </View>
                                  </View>
                                </View> :
                                <View style={styles.rowItem}/>
                              }
                              {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TIME' ?
                                <View>
                                  <View style={styles.detail}>
                                    <Text style={styles.billHeader}>{language.AUTODEBIT__LIST_EDIT_DATE_LABEL}</Text>
                                    <Text style={styles.roboto}>{autoDebitDate}{language.AUTODEBIT__LABEL_DATE_AUTODEBIT3}</Text>
                                  </View>
                                </View> :
                                <View style={styles.rowItem}/>
                              }
                              {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'NOTES' ?
                                <View>
                                  <View>
                                    <View style={styles.summaryDetailContainer}>
                                      <Text style={styles.detailTitle}>{language.CARDLESSWITHDRAWAL__NOTES}</Text>
                                      <Text style={styles.summaryDetail}>{result(rawDataDetailList, '[5].value', '-')}</Text>
                                    </View>
                                  </View>
                                </View> :
                                <View style={styles.rowItem}/>
                              }
                            </View>)
                            :
                            result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER'  ?
                              (<View style={styles.detailContainer}>
                                {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                    <Text style={styles.largeText}>Rp. {currencyFormatter(realTotalAmount)}</Text>
                                  </View> : <View style={styles.rowItem}/>}
                                {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                    <Text>Rp. {result(rawDataDetailList, '[5].value', '')}</Text>
                                  </View> : <View style={styles.rowItem}/>}
                                {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                  <View style={[styles.row, styles.mv5]}>
                                    <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                    <Text>Rp. {result(rawDataDetailList, '[4].value', '').split('\n')[0]}</Text>
                                  </View> : <View style={styles.rowItem}/>}
                                <View style={styles.borderTop}/>
                                {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                  <View>
                                    <Text style={styles.dateText}>{result(rawDataDetailList, '[2].value', '')}</Text>
                                  </View> : <View style={styles.rowItem} />}
                                <View style={styles.labelSpacing} />
                                {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                  <View style={styles.rowAlign}>
                                    <View>
                                      <SimasIcon name='wallet' size={30} style={[styles.wallet, styles.mr10]}/>
                                    </View>
                                    <View>
                                      <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[1]}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{account.split(', ')[2]}</Text>
                                    </View>
                                  </View> : <View style={styles.rowItem} />}
                                {isClosingTd === 'yes' ? 
                                  null :
                                  <View style={styles.rowAlign}>
                                    <SimasIcon name='more-menu' size={20} style={[styles.more]}/>
                                  </View>}
                                {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                  <View style={styles.rowAlign}>
                                    <View>
                                      <SimasIcon name='sendto' size={30} style={[styles.purchase, styles.mr10]}/>
                                    </View>
                                    <View>
                                      <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
                                    </View>
                                  </View>
                                ) :
                                  <View style={styles.rowItem}/>
                                }
                                <View style ={styles.summaryArea}/>
                                {result(rawDataDetailList, '[3].key', '').split('__')[1] === 'NOTES' ?
                                  <View>
                                    <View>
                                      <View style={styles.summaryDetailContainer}>
                                        <Text style={styles.detailTitle}>{language.CARDLESSWITHDRAWAL__NOTES}</Text>
                                        <Text style={styles.summaryDetail}>{result(rawDataDetailList, '[3].value', '-')}</Text>
                                      </View>
                                    </View>
                                  </View> :
                                  <View style={styles.rowItem}/>
                                }
                              </View>)
                              :
                              result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TOPUPSIL'  ?
                                (<View style={styles.detailContainer}>
                                  {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                      <Text style={styles.largeText}>{result(rawDataDetailList, '[6].value', 'IDR')} {formatForexAmount(realTotalAmount, result(rawDataDetailList, '[6].value', 'IDR'))}</Text>
                                    </View> : <View style={styles.rowItem}/>}
                                  <View style={styles.borderTop}/>
                                  {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                    <View>
                                      <Text style={styles.dateText}>{result(rawDataDetailList, '[2].value', '')}</Text>
                                    </View> : <View style={styles.rowItem} />}
                                  <View style={styles.labelSpacing} />
                                  {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                    <View style={styles.rowAlign}>
                                      <View>
                                        <SimasIcon name='wallet' size={30} style={[styles.wallet, styles.mr10]}/>
                                      </View>
                                      <View>
                                        <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[1]}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{account.split(', ')[2]}</Text>
                                      </View>
                                    </View> : <View style={styles.rowItem} />}
                                  {isClosingTd === 'yes' ? 
                                    null :
                                    <View style={styles.rowAlign}>
                                      <SimasIcon name='more-menu' size={20} style={[styles.more]}/>
                                    </View>}
                                  {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                    <View style={styles.rowAlign}>
                                      <View>
                                        <SimasIcon name='sendto' size={30} style={[styles.purchase, styles.mr10]}/>
                                      </View>
                                      <View>
                                        <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
                                      </View>
                                    </View>
                                  ) :
                                    <View style={styles.rowItem}/>
                                  }
                                  <View style ={styles.summaryArea}/>
                                </View>)
                                :
                                result(rawDataDetailList, '[0].key', '').split('__')[0] === 'NBSIL'  ?
                                  (<View style={styles.detailContainer}>
                                    {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                      <View style={[styles.row, styles.mv5]}>
                                        <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                        <Text style={styles.largeText}>{result(rawDataDetailList, '[6].value', 'IDR')} {formatForexAmount(realTotalAmount, result(rawDataDetailList, '[6].value', 'IDR'))}</Text>
                                      </View> : <View style={styles.rowItem}/>}
                                    <View style={styles.borderTop}/>
                                    {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                      <View>
                                        <Text style={styles.dateText}>{result(rawDataDetailList, '[2].value', '')}</Text>
                                      </View> : <View style={styles.rowItem} />}
                                    <View style={styles.labelSpacing} />
                                    {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                      <View style={styles.rowAlign}>
                                        <View>
                                          <SimasIcon name='wallet' size={30} style={[styles.wallet, styles.mr10]}/>
                                        </View>
                                        <View>
                                          <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[1]}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{account.split(', ')[2]}</Text>
                                        </View>
                                      </View>
                                      : <View style={styles.rowItem} />}
                                    {isClosingTd === 'yes' ? 
                                      null :
                                      <View style={styles.rowAlign}>
                                        <SimasIcon name='more-menu' size={20} style={[styles.more]}/>
                                      </View>}
                                    {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                      <View style={styles.rowAlign}>
                                        <View>
                                          <SimasIcon name='sendto' size={30} style={[styles.purchase, styles.mr10]}/>
                                        </View>
                                        <View>
                                          {isSilIdrUsd === 'USD' ?
                                            <Text style={[styles.accNo, styles.roboto]}> {'SMART INVESTA LINK'}</Text>
                                            :
                                            <Text style={[styles.accNo, styles.roboto]}> {'SMART INVESTA LINK'}</Text>
                                          }
                                        </View>
                                      </View>
                                    ) :
                                      <View style={styles.rowItem}/>
                                    }
                                    <View style ={styles.summaryArea}/>
                                  </View>) :
                                  (<View style={styles.detailContainer}>
                                    {map(displayList, (value, k) => (
                                      (value ?
                                        <View>
                                          <View key={k} style={styles.detail}>
                                            <Text style={styles.billHeader}>{k}</Text>
                                            <Text style={styles.roboto}>{value}</Text>
                                          </View>
                                        </View>
                                        :
                                        <View key={k} style={styles.detail}>
                                          <Text style={styles.detailKey}>{k}</Text>
                                        </View>
                                      ))
                                    )}
                        
                                    { isLionMentari ? null : 
                                      map(dataDetailList, (value, k) => (
                                        (value ?
                                          <View>
                                            <View key={k} style={styles.detail}>
                                              <Text style={styles.billHeader}>{language[k]}</Text>
                                              <Text style={styles.roboto}>{value}</Text>
                                            </View>
                                          </View>
                                          :
                                          <View key={k} style={styles.detail}>
                                            <Text style={styles.detailKey}>{language[k]}</Text>
                                          </View>
                                        )))}
                                    {
                                      isAutodebitRegis && !isEmpty(autoDebitDate) ?
                                        <View>
                                          <View style={styles.detail}>
                                            <Text style={styles.billHeader}>{language.AUTODEBIT__LABEL_DATE_AUTODEBIT}</Text>
                                            <Text style={styles.roboto}>{autoDebitDate}{language.AUTODEBIT__LABEL_DATE_AUTODEBIT3}</Text>
                                          </View>
                                        </View>
                                        : null
                                    }
                                    {
                                      isAutodebitRegis && !isEmpty(autoDebitStartDate) ?
                                        <View>
                                          <View style={styles.detail}>
                                            <Text style={styles.billHeader}>{language.AUTODEBIT__LABEL_DATE_AUTODEBIT2}</Text>
                                            <Text style={styles.roboto}>{autoDebitStartDate}</Text>
                                          </View>
                                        </View>
                                        : null
                                    }
                                  </View>)
                      }

                    </View>          
                  </View>
                }
              </View>
              : null}
          </View>

          <View>
            <View style={styles.greyLineBold} />
            <View style={styles.middleContainerEF}>
              {
                isSilEmFund === 'yes' && type === 'PENDING' ? 
                  <View style={styles.footerHours}>
                    <View style={styles.rowAtten}>
                      <View style={styles.footerIconAtten}><SimasIcon name={'caution-circle'} size={25} style={styles.footerIconConfirmHours}/></View>
                      <Text style={styles.textFooterAttenConfirmHours}>{language.INQUIRY__SIL_EMERGENCY_FUND_DISCLAMER}</Text>
                    </View>
                  </View>
                  :
                  null
              }
            </View>
           
            <View style={[styles.container]}>
              <View style={styles.bottomSpacing}>
                {
                  isBuyReksadana === 'yes' && type === 'PENDING'  || isBuyReksadana === 'yes' && type === 'SUCCESS'  || isSellReksadana === 'yes' && type === 'PENDING'  || isSellReksadana === 'yes' && type === 'SUCCESS' ?  
                    <View style={styles.containtextExplanation}>
                      <View>
                        <SimasIcon style={styles.explainIcon} name='caution-circle' size={24} />
                      </View>
                      <View>
                        <Text style={styles.textExplanation}>{language.SEKURITAS__PAYMENT_STATUS_TEXT} <Text style={styles.openLinkKustodian} onPress={this.openKustodianURL}>https://akses.ksei.co.id</Text></Text>
                      </View>
                    </View>
                    : 
                    null
                }
              </View>
            </View>
          </View>
          <View style={styles.middleContainerBot}>

            <View style={styles.helpContainer}>
              <Text style={styles.transaction}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
            </View>
            {type === 'SUCCESS' || type === 'PENDING' || type === 'FAILED' ?
              <View>
                {initialDeposit === '0' ?
                  <View>
                    <Text style={styles.help}>{language.PAYMENT_STATUS__DOWNLOAD} <Text style={styles.redText} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
                  </View>
                  : isBuyReksadana === 'yes' || isSellReksadana === 'yes' ?
                    <View>
                      <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                    </View>
                    :
                    <View>
                      <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                      <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                    </View>
                }
              </View>
              : null}
            {type === 'SUCCESS' || type === 'PENDING' || isLKD ? isLuckyDipActive === 'INACTIVE' || isLuckyDipActive === 'inactive' ? 
              null :
              <View style={styles.paddingaddBannerHHH}>
                <LinearGradient colors={['#7ECECC', '#30BEAF']} style={styles.linearGradient} locations={[0.2, 1, 1]}
                  start={{x: 0.0, y: -0.2}} end={{x: 1.0, y: 0.0}}>
                  <View style={[styles.luckyDipBox, styles.rowCenter]}>
                    <View style={styles.rowCenterLuckyDip}>
                      <View style={styles.width}>
                        <Image source={LuckyImage} style={styles.iconBoxLuckyDip}/>
                      </View>
                    </View>
                    <View style={styles.textBannerContainer}>
                      <Text style={styles.fontBannerHHH}>{language.STATUS_PAYMENT_BANNER_HHH_ONE}
                        <Text style={styles.fontBannerHHHTwo}>{language.STATUS_PAYMENT_BANNER_HHH_TWO}</Text>
                        <Text>{language.STATUS_PAYMENT_BANNER_HHH_THREE}</Text>
                        <Text onPress={isBillPayBeforeLogin ? this.closeLoginHHH : goToHHH} style={styles.fontBannerHHHFour}>
                          {language.STATUS_PAYMENT_BANNER_HHH_FOUR}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
              :
              null}
          </View>
        </ViewShot>
        <View style={styles.mainTitleCheckBox}>
          <View style={styles.containtextExplanationAutoSave}>
            <View style={styles.rowFieldAgreement}>
              <Touchable>
                <View>
                  <CheckBox
                    onChange={this.toogleCheckbox}
                    uncheckedImage={RedCheckBox}
                    checkedImage={UnCheckBox}
                    label={language.AUTO_SAVE_RECEIPT}
                    checkboxStyle={styles.checkboxStyle}
                    labelStyle={styles.checkboxLabel}
                    checked={!this.state.checked} // somehow checked value is reversed
                  />
                </View>
                <View>
                  <Text style={styles.tncTxt}>{language.AUTO_SAVE_DESCRIPTION}</Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
        {type === 'SUCCESS' || type === 'PENDING' || isLKD ?
          <View>
            {
              // closing account
              isClosingAccount ? 
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <SinarmasButton buttonType='bw' onPress={this.screenCapture} text={language.PAYMENT_STATUS__SHARE}/>
                  </View>
                  <View style={styles.button}>
                    <SinarmasButton onPress={onCloseLanding} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>                
                  </View>
                </View>
                : 
                initialDeposit !== '0' || isLKD ?
                  <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                      <SinarmasButton buttonType='bw' onPress={this.screenCapture} text={language.PAYMENT_STATUS__SHARE}/>
                    </View>
                    <View style={styles.button}>
                      <SinarmasButton dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>                
                    </View>
                  </View>
                  :
                  <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                      <SinarmasButton dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
                    </View>
                  </View>
            }
          </View>
          : 
          // closing account
          type === 'FAILED' && isClosingAccount ?
            <View style={styles.buttonContainer2}>
              <View style={styles.button}>
                <SinarmasButton onPress={onCloseLanding} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
              </View>
            </View>
            :
            <View style={styles.buttonContainer2}>
              <View style={styles.button}>
                <SinarmasButton dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? onCloseLanding : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
              </View>
            </View>
        }

      </KeyboardAwareScrollView>
    );
  }
}

CreditCardFinalizeForm.propTypes = {
  displayList: PropTypes.object,
  dataDetailList: PropTypes.object,
  transactionId: PropTypes.string,
  amount: PropTypes.string,
  accountFrom: PropTypes.object,
  transactionDate: PropTypes.string,
  transactionType: PropTypes.string,
  onClose: PropTypes.func,
  token: PropTypes.string,
  type: PropTypes.string,
  qrStatus: PropTypes.object,
  isClosingTd: PropTypes.string,
  responseMessage: PropTypes.string,
  isManageCc: PropTypes.bool,
  rawDataDetailList: PropTypes.array,
  resData: PropTypes.object,
  accountTo: PropTypes.object,
  isGenericBiller: PropTypes.string,
  isSaving: PropTypes.string,
  couponStatusPayment: PropTypes.string,
  initialDeposit: PropTypes.string,
  isSilEmFund: PropTypes.string,
  isPushBilling: PropTypes.string,
  isPushBillingFailed: PropTypes.string,
  merchName: PropTypes.string,
  sourceAcc: PropTypes.object,
  txId: PropTypes.string,
  onCloseLogin: PropTypes.func,
  onCloseLanding: PropTypes.func,
  isBillPayBeforeLogin: PropTypes.bool,
  isLKD: PropTypes.string,
  navigation: PropTypes.object,
  emoneyAccounts: PropTypes.array,
  goToSplitBill: PropTypes.func,
  isSplitBill: PropTypes.bool,
  isUseSimas: PropTypes.bool,
  inputPolis: PropTypes.string,
  isSilIdrUsd: PropTypes.string,
  isBuyReksadana: PropTypes.string,
  isSellReksadana: PropTypes.string,
  item: PropTypes.object,
  totalEarnings: PropTypes.string,
  totalFee: PropTypes.string,
  isResponseUnit: PropTypes.string,
  detailPortfolio: PropTypes.object,
  savingProductType: PropTypes.string,
  currencySavingValas: PropTypes.string,
  formValuesSavingValas: PropTypes.object,
  toogleCheckbox: PropTypes.func,
  checked: PropTypes.bool,
  autoSaveChecklist: PropTypes.bool,
  goToNextAutoSave: PropTypes.func,
  nav: PropTypes.object,
  goToGalery: PropTypes.func,
  getAutoSaveChecklist: PropTypes.func,
  saveAutoSaveFunc: PropTypes.func,
  isAutoSave: PropTypes.bool,
  cek: PropTypes.bool,
  autoSaveCek: PropTypes.func,
  transfer: PropTypes.bool,
  billPay: PropTypes.bool,
  saving: PropTypes.bool,
  isNoFund: PropTypes.bool,
  goToHHH: PropTypes.func,
  goToHHHBeforeLogin: PropTypes.func,
  isLuckyDipActive: PropTypes.string,
  isAutodebitRegis: PropTypes.bool,
  autoDebitStartDate: PropTypes.string, 
  autoDebitDate: PropTypes.string,
  registerAutodebitOnly: PropTypes.bool,
  displayListShopee: PropTypes.array,
  pushBillTransacation: PropTypes.object,
  isNewBiller: PropTypes.bool,
  nomorPolis: PropTypes.string,
  alokasiPremi: PropTypes.string,
  billerCode: PropTypes.string,
  isClosingAccount: PropTypes.string,
  accNameHolder: PropTypes.string,
  openingDate: PropTypes.string,
  closingDate: PropTypes.string,
  accClosing: PropTypes.string,
  accTypeSaving: PropTypes.string,
};

const mapStateToProps = (state) => ({
  checked: result(state, 'autoSave.checked', false),
  transfer: result(state, 'autoSave.transfer', false),
  billPay: result(state, 'autoSave.billPay', false),
  saving: result(state, 'autoSave.isSaving', false),
});

const mapDispatchToProps = (dispatch) => ({
  autoSaveCek: (isAutoSave, checked, type) => dispatch(autoSaveFeedBackChecklist(isAutoSave, checked, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardFinalizeForm);
