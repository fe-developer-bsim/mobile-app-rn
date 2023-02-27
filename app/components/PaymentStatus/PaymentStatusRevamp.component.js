import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking, Platform} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './PaymentStatusRevamp.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimobiPlus from '../../assets/images/simobiplus.png';
import {SinarmasButton} from '../FormComponents';
import {map, noop, isEmpty, result} from 'lodash';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, getDayName, removeDot, wrapMethodInFunction, copyToCLipboard, formatForexAmountPaymentStatus} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import SuccesIcon from '../../assets/images/successicon.png';
import Poin from '../../assets/images/poin.png';
import LayeredIcon from '../LayeredIcon/LayeredIcon.component';
import {formatFieldAmount, formatForexAmount, formatFieldAmountWithDecimalValasPaymentStatus} from '../../utils/transformer.util';
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
    const {isFundTransfer, isBillPayBeforeLogin, isGenericBiller, isValas, isMultiSil} = this.props;
    const {transfer, billPay, saving} = this.props;
    const checked = isFundTransfer ? transfer : isValas ? transfer : isMultiSil ? billPay : isBillPayBeforeLogin ? billPay : isGenericBiller ? billPay : saving;
    if (checked === true) {
      this.goToGalery();
    } else {
      null;
    }
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
    checked: this.props.isFundTransfer ? this.props.transfer : this.props.isValas ? this.props.transfer : this.props.isBillPayBeforeLogin ? this.props.billPay : this.props.isGenericBiller ? this.props.billPay : this.props.isMultiSil ? this.props.billPay : this.props.saving,
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
    const {isFundTransfer, isBillPayBeforeLogin, isGenericBiller, isSaving, isValas, transfer, billPay, saving, isMultiSil} = this.props;
    const type = {isFundTransfer, isBillPayBeforeLogin, isGenericBiller, isSaving, isValas, isMultiSil};

    const checked = !this.state.checked;
    this.setState({checked: checked});
    const isAutoSave = checked;
    isFundTransfer || isValas ? transfer === isAutoSave : isBillPayBeforeLogin || isGenericBiller || isMultiSil ? billPay === isAutoSave : saving === isAutoSave;

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
    const {type = 'SUCCESS', transactionId = '', displayList, isFundTransfer, isLKD, goToHHH, isLuckyDipActive,
      amount, accountFrom = {}, transactionDate = new Date(), transactionType = '', onClose = noop,
      token = '', qrStatus = {}, isClosingTd, responseMessage, isManageCc = false, rawDataDetailList,
      dataDetailList, resData, accountTo, isGenericBiller, isSaving, couponStatusPayment,
      initialDeposit, isSilEmFund, isBillPayBeforeLogin, isUseSimas, emoneyAccounts, navigation, custPoin, generalCode,
      isValas, currencyValas, resDataTrf, currencyObject, isSilIdrUsd, isMultiSil, inputPolis, currencyAcc, infoPolis, custPoinCurrenncy, isNoFund, isStarInvestama, infoPolisStarInvestama,
      displayListShopee, isAutodebitRegis, autoDebitStartDate, autoDebitDate} = this.props;
    const txDate = moment(transactionDate).format('DD MMM YYYY, hh:mm A');
    const account = isEmpty(accountFrom) ? '' : accountFrom.accountType + ', ' + accountFrom.accountNumber + ', ' + accountFrom.name;
    const tdAccount = accountFrom.newAccountNumber;
    const title = type === 'SUCCESS' ? language.PAYMENT_STATUS__REVAMP_SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : type === 'LKDFAILED' ? language.LKD__PAYMENT_STATUS + language.PAYMENT_STATUS__FAILED : transactionType + language.PAYMENT_STATUS__FAILED;
    const titleTrans = type === 'SUCCESS' && isFundTransfer === 'yes' ? language.SCREEN__TRANSACTION_SUCCESS : type === 'SUCCESS' && isFundTransfer === 'PENDING' ? language.PAYMENT_STATUS__PENDING : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : transactionType + language.PAYMENT_STATUS__FAILED;
    const titleMultiSil = type === 'SUCCESS' && isMultiSil === 'yes' ? language.SCREEN__TRANSACTION_SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : transactionType + language.PAYMENT_STATUS__FAILED;
    const amountNumBiller = result(resData, 'amountNumber', 0);
    const bankChargeBiller = result(resData, 'totalBankCharge', 0);
    const showTime = getDayName(transactionDate) + ', ' + moment().format('DD MMM YYYY');
    const accNoBiller = accountFrom.accountNumber;
    const accNameBiller = accountFrom.name;
    const accProdType = accountFrom.productType;
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
    const numberEspaj = result(inputPolis, 'trx_id', '');
    const infoPolisCurrency = result(infoPolis, 'mataUang', '');
    const polisNumber = result(infoPolis, 'nomorPolis', '');
    const realTotalAmount = String(totalAmountTransfer);
    const titleOpeningSimasTara = type === 'SUCCESS' && isSaving === 'SimasTara' ? language.SCREEN__OPENING_SIMAS_TARA_SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : transactionType + language.PAYMENT_STATUS__FAILED;
    const accSavingEmail = result(accountTo, 'email', '');
    const accSavingMaturityDate = result(accountTo, 'maturityDate', '');
    const txMaturityDate = accSavingMaturityDate;
    const periodSimasTara = result(accountTo, 'accountPeriod', '') / 12;
    const interestRateSimasTara = result(accountTo, 'interestRate', '');
    const titleTransStarInvestama = type === 'SUCCESS' && isStarInvestama === 'yes' ? language.SCREEN__TRANSACTION_SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : transactionType + language.PAYMENT_STATUS__FAILED;    
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
    const currencyRate = result(resDataTrf, 'currencyRate', '');
    const targetCurrency = result(resData, 'transferTransaction.targetCurrency', '');
    const debitCurrency = result(resData, 'transferTransaction.debitCurrency', '');
    const amountInCreditCurrDisplay = result(resData, 'transferTransaction.amountInCreditCurrDisplay', '');
    const amountInDebitCurrDisplay = result(resData, 'transferTransaction.amountInDebitCurrDisplay', '');
    const currencyIndicator = result(currencyObject, 'currencyIndicator', '');
    const currencyDeterminant = result(currencyObject, 'currencyDeterminant', '');
    let equivalent = '';
    if (currencyDeterminant === debitCurrency && debitCurrency !== 'IDR') {
      equivalent = `${targetCurrency === 'IDR' ? 'Rp' : targetCurrency} ${formatFieldAmountWithDecimalValasPaymentStatus(amountInCreditCurrDisplay, targetCurrency)}`;
    } else if (currencyDeterminant === debitCurrency && debitCurrency === 'IDR') {
      equivalent = `${targetCurrency === 'IDR' ? 'Rp' : targetCurrency} ${formatForexAmount(amountInCreditCurrDisplay, targetCurrency)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency === 'IDR') {
      equivalent = `${debitCurrency === 'IDR' ? 'Rp' : debitCurrency} ${formatFieldAmount(amountInDebitCurrDisplay, debitCurrency)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency !== 'IDR') {
      equivalent = `${debitCurrency === 'IDR' ? 'Rp' : debitCurrency} ${formatFieldAmountWithDecimalValasPaymentStatus(amountInDebitCurrDisplay, debitCurrency)}`;
    }
    const polisNumberStarInvestama = result(infoPolisStarInvestama, 'nomorPolis', '');
    const buttonDtAction = 'Payment Status ' + type;
    
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView  style={styles.columnContainer}
          extraHeight={120} bounces={false}>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
            <View style={styles.middleContainerTop}>
              { type === 'SUCCESS' || type === 'PENDING' ?
                <View>
                  {initialDeposit !== '0' ? 
                    null
                    :
                    <View style={styles.buttonContainer}>
                      <View style={styles.button}>
                        <SinarmasButton onPress={onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
                      </View>
                    </View>
                  }
                </View>
                : 
                null
              }
              <View>
                <View style={styles.titleContainer}>
                  { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ?
                    <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                    :
                    type === 'SUCCESS' ? 
                      null :
                      <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                  }
                  { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ?
                    <View>
                      <Text style={styles.transactionDate}>{txDate}</Text>
                    </View>
                    :
                    type === 'SUCCESS' ? 
                      null :
                      <View>
                        <Text style={styles.transactionDate}>{txDate}</Text>
                      </View>
                  }
                </View>

                <View style={[styles.row, styles.ph20]}>
                  <View style={styles.columnHeader}>
                    { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ? null :
                      type === 'SUCCESS' ?
                        <Image source={SimobiPlus} style={styles.mainTitleLogoSuccess}/>
                        : null
                    }

                    <View style={styles.mainTitle}>
                      { type === 'SUCCESS' && !isManageCc && isRecurring ?
                        <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS__PENDING}</Text>
                        :
                        type === 'SUCCESS' && isFundTransfer === 'yes' ?
                          <Text style={styles.mainTitleText2}>{titleTrans}</Text>
                          :
                          type === 'SUCCESS' && generalCode !== '' ?
                            <Text style={styles.mainTitleText2}>{title}</Text>
                            :
                            type === 'SUCCESS' && isSaving === 'SimasTara' ?
                              <Text style={styles.mainTitleText2}>{titleOpeningSimasTara}</Text>
                              :
                              type === 'SUCCESS' && isStarInvestama === 'yes' ? 
                                <Text style={styles.mainTitleText2}>{titleTransStarInvestama}</Text>
                                :
                                type === 'SUCCESS' && isFundTransfer === 'PENDING' ?
                                  <Text style={styles.mainTitleText}>{titleTrans}</Text>
                                  :
                                  type === 'SUCCESS' && isMultiSil === 'yes' ?
                                    <Text style={styles.mainTitleTextSil}>{titleMultiSil}</Text>
                                    :
                                    <Text style={styles.mainTitleText}>{title}</Text>
                      }

                      { type === 'SUCCESS' && !isManageCc && isRecurring  ?
                        <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text> :
                        type === 'SUCCESS' && !isManageCc && !isLKD && generalCode === '' && isGenericBiller === 'yes' ?
                          <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__SUCCESSFUL}</Text> :
                          type === 'PENDING' && !isManageCc ?
                            <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text> :
                            type === 'SUCCESS' && isFundTransfer === 'PENDING' ?
                              <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text> :
                              type === 'SUCCESS' && isManageCc && !isLKD ?
                                <Text style={styles.successText}>{transactionType} {language.MANAGE__CREDIT_CARD} {language.PAYMENT_STATUS__SUCCESSFUL}</Text> :
                                type === 'SUCCESS' && isMultiSil === 'yes' ?
                                  <Text style={styles.successTextSil}>{transactionType} {language.PAYMENT_STATUS__SUCCESSFUL_SIL}</Text> :
                                  type === 'SUCCESS' && isStarInvestama === 'yes' ? 
                                    <Text style={styles.successTextSil}>{transactionType} {language.PAYMENT_STATUS__SUCCESSFUL_STAR_INVESTAMA}</Text> :
                                    null}
                      {
                        type === 'SUCCESS' && isLKD ?
                          <Text style={styles.successText}>{language.LKD__PAYMENT_STATUS} {language.PAYMENT_STATUS__SUCCESSFUL}</Text>
                          : null }
                      {
                        isNoFund ?
                          <Text style={styles.successText}>{language.RESPONSE_MESSAGE__RC_51}</Text>
                          : null }

                      { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ?
                        transactionId !== '' ?
                          <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transactionId}</Text>
                          : <Text/>
                        :
                        type === 'SUCCESS' ? null :
                          transactionId !== '' ?
                            <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transactionId}</Text>
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
                  </View>

                  <View>
                    { type === 'SUCCESS' && !isManageCc && isRecurring ?
                      <SimasIcon name={'pending-circle'} style={styles.logoFail} size={50}/>
                      :
                      type === 'SUCCESS' && initialDeposit !== '0' && isFundTransfer === 'yes' ?
                        <View>
                          <Image source={SuccesIcon} style={styles.logoSuccess}/>
                          <View style={styles.headerButtonContainer}>
                            <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture}/>
                            <Touchable dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose}>
                              <SimasIcon name={'close-black'} style={styles.close} size={15}/>
                            </Touchable>
                          </View>
                        </View>
                        :
                        type === 'SUCCESS' && initialDeposit !== '0' && isGenericBiller === 'yes' && generalCode !== '' ?
                          <View>
                            <Image source={SuccesIcon} style={styles.logoSuccess}/>
                            <View style={styles.headerButtonContainer}>
                              <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture}/>
                              <Touchable dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose}>
                                <SimasIcon name={'close-black'} style={styles.close} size={15}/>
                              </Touchable>
                            </View>
                          </View>
                          :
                          type === 'SUCCESS' && isSaving === 'SimasTara' ?
                            <View>
                              <Image source={SuccesIcon} style={styles.logoSuccess}/>
                              <View style={styles.headerButtonContainer}>
                                <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture}/>
                                <SimasIcon dtActionName={buttonDtAction} name={'close-black'} style={styles.close} size={15} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose}/>
                              </View>
                            </View>
                            :
                            type === 'SUCCESS' && isStarInvestama === 'yes' ?
                              <View>
                                <Image source={SuccesIcon} style={styles.logoSuccess}/>
                                <View style={styles.headerButtonContainer}>
                                  <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture}/>
                                  <SimasIcon dtActionName={buttonDtAction} name={'close-black'} style={styles.close} size={15} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose}/>
                                </View>
                              </View>
                              :
                              type === 'SUCCESS' && isFundTransfer === 'PENDING' ?
                                <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                                :
                                type === 'SUCCESS'  && isMultiSil === 'yes' ?
                                  <View>
                                    <Image source={SuccesIcon} style={styles.logoSuccess}/>
                                    <View style={styles.headerButtonContainer}>
                                      <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture}/>
                                      <SimasIcon dtActionName={buttonDtAction} name={'close-black'} style={styles.close} size={15} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose}/>
                                    </View>
                                  </View>
                                  :
                                  type === 'SUCCESS' && initialDeposit !== '0' && generalCode === '' ?
                                    <SimasIcon name={'success-circle'} style={styles.logoSuccessIcon} size={50}/>
                                    :
                                    type === 'PENDING' ?
                                      <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                                      :
                                      <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                    }
                  </View>
                </View>
              </View>
              <View>
                { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ?
                  <View style={styles.borderGreyTop}/>
                  :
                  type === 'SUCCESS' ? 
                    null :
                    <View style={styles.borderGreyTop}/>
                }
              </View>

              { !isEmpty(qrStatus) &&
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
                        <Text style={styles.noDepositText}>{language.SAVING__ACCOUNT_NO_DEPOSIT}</Text>
                      </View>
                      :
                      <View>
                        <View>
                          { isRecurring || type === 'PENDING' && isFundTransfer === 'yes' || isFundTransfer === 'PENDING' ?
                            <View style={styles.middleContainerMid}>
                              <Text style={styles.receiptText}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                            </View>
                            :
                            type === 'SUCCESS' && generalCode === '' && isGenericBiller === 'yes' || type === 'PENDING' && generalCode === '' && isGenericBiller === 'yes' || type === 'PENDING' && generalCode !== '' && isGenericBiller === 'yes' ?
                              <View style={styles.middleContainerMid}>
                                <Text style={styles.receiptText}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                              </View>
                              : 
                              null
                          }
                          <View style={styles.amount}>
                            { responseMessage ?
                              <View style={styles.responseView}>
                                <Text style={styles.detailKey}>{responseMessage}</Text>
                              </View>
                              : isClosingTd === 'yes' ?
                                <View style={styles.amountContainer} >
                                  <Text style={styles.amountTitle}>{transactionType}</Text>
                                  <Text style={styles.amountText}>{amount}</Text>
                                </View>
                                : type === 'SUCCESS' && isGenericBiller === 'yes' && generalCode !== '' ?
                                  <View>
                                    <View>
                                      {isUseSimas ?
                                        <View>
                                          <Text>{language.TOTAL__AMOUNT}</Text>
                                          <View style={styles.simas}>
                                            <Text style={styles.amountBill2}>{currencyFormatter(totalAmount)} </Text>
                                            <Image source={Poin} style={styles.poinPayment}/>
                                          </View>
                                        </View>
                                        :
                                        <View>
                                          <Text>{language.TOTAL__AMOUNT}</Text>
                                          <Text style={styles.amountBill2}>Rp {currencyFormatter(totalAmount)}</Text>
                                        </View>
                                      }

                                    </View>
                                    <View style={styles.payment}>
                                      <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                    </View>
                                    {
                                      isUseSimas ?
                                        <View>
                                          <View style={styles.row}>
                                            <Text style={styles.black}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                            <View style={styles.rowSimasPoin}>
                                              <Text style={[styles.accNo, styles.roboto]}>{currencyFormatter(amountNumBiller)}</Text>
                                              <Image source={Poin} style={styles.poinColapsibleRev}/>
                                            </View>
                                          </View>

                                          <View style={styles.row}>
                                            <Text style={styles.black}>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                            <View style={styles.rowSimasPoin}>
                                              <Text style={[styles.accNo, styles.roboto]}>{currencyFormatter(bankChargeBiller)}</Text>
                                              <Image source={Poin} style={styles.poinColapsibleRev}/>
                                            </View>
                                          </View>
                                        </View>
                                        :
                                        <View>
                                          <View style={styles.row}>
                                            <Text style={styles.black}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                            <Text style={[styles.accNo, styles.roboto]}>Rp {currencyFormatter(amountNumBiller)}</Text>
                                          </View>
                                          <View style={styles.row}>
                                            <Text style={styles.black}>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                            <Text style={[styles.accNo, styles.roboto]}>Rp {currencyFormatter(bankChargeBiller)}</Text>
                                          </View>
                                        </View>
                                    }


                                    { !isEmpty(custPoin) && custPoinCurrenncy === 'simaspoin' ?
                                      <View style={styles.row}>
                                        <Text style={styles.black}>{language.QR_GPN_GIVE_MANUAL_CASHBACK}</Text>
                                        <Text style={[styles.accNo, styles.roboto]}>{custPoin} <Image source={Poin} style={styles.poinImage} /></Text>
                                      </View> : !isEmpty(custPoin) ?
                                        <View style={styles.row}>
                                          <Text style={styles.black}>{language.QR_GPN_GIVE_MANUAL_CASHBACK}</Text>
                                          <Text style={[styles.accNo, styles.roboto]}>Rp {custPoin}</Text>
                                        </View>
                                        : null
                                    }
                                    <View style={styles.from}>
                                      <Text>{language.GENERIC_PAY_FROM}</Text>
                                      <View>
                                        {
                                          isUseSimas ?
                                            <View style={styles.rowAlign}>
                                              <View>
                                                <Text style={[styles.accNo, styles.roboto]}>{accNameBiller}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                                              </View>
                                            </View> :
                                            <View style={styles.rowAlign}>
                                              <View>
                                                <Text style={[styles.accNo, styles.roboto]}>{accNameBiller}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{accProdType} {accNoBiller}</Text>
                                              </View>
                                            </View>
                                        }
                                        <View>
                                          <View style={styles.sento} />
                                          <Text>{language.GENERIC_PAY_SENT}</Text>
                                          <View>
                                            <View style={styles.type}>
                                              <Text style={[styles.accNo, styles.roboto]}>{transactionType}</Text>
                                              <Text style={[styles.product, styles.roboto]}>{subsNumber}</Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                  : isGenericBiller === 'yes' && generalCode === '' ?
                                    <View>
                                      <View style={styles.borderTop} />
                                      {
                                        isUseSimas ?
                                          <View>
                                            <View style={[styles.rowSimas, styles.mv5]}>
                                              <Text>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                              <View style={styles.simas}>
                                                <Text style={styles.amountBill}>{currencyFormatter(totalAmount)}</Text>
                                                <Image source={Poin} style={styles.poinColapsible}/>
                                              </View>
                                            </View>
                                            <View style={styles.row}>
                                              <Text>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                              <View style={styles.rowSimasPoin}>
                                                <Text>{currencyFormatter(amountNumBiller)}</Text>
                                                <Image source={Poin} style={styles.poinColapsible}/>
                                              </View>
                                            </View>
                                            <View style={styles.row}>
                                              <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                              <View style={styles.rowSimasPoin}>
                                                <Text>{currencyFormatter(bankChargeBiller)}</Text>
                                                <Image source={Poin} style={styles.poinColapsible}/>
                                              </View>
                                            </View>
                                          </View>

                                          :
                                          <View>
                                            <View style={[styles.row, styles.mv5]}>
                                              <Text>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                              <Text style={styles.amountBill}>Rp {currencyFormatter(totalAmount)}</Text>
                                            </View>
                                            <View style={[styles.row, styles.mv5]}>
                                              <Text>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                              <Text>Rp {currencyFormatter(amountNumBiller)}</Text>
                                            </View>
                                            <View style={[styles.row, styles.mv5]}>
                                              <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                              <Text>Rp {currencyFormatter(bankChargeBiller)}</Text>
                                            </View>
                                          </View>
                                      }



                                      <View style={styles.borderTop} />
                                    </View>
                                    : type === 'PENDING' && isGenericBiller === 'yes' && generalCode !== '' ?
                                      <View>
                                        <View style={styles.borderTop} />
                                        <View style={[styles.row, styles.mv5]}>
                                          <Text>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                          <Text style={styles.amountBill}>Rp {currencyFormatter(totalAmount)}</Text>
                                        </View>
                                        <View style={[styles.row, styles.mv5]}>
                                          <Text>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                          <Text>Rp {currencyFormatter(amountNumBiller)}</Text>
                                        </View>
                                        <View style={[styles.row, styles.mv5]}>
                                          <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                                          <Text>Rp {currencyFormatter(bankChargeBiller)}</Text>
                                        </View>
                                        <View style={styles.borderTop} />
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
                                              <Text>{language.OPEN_NEW_ACCOUNT__CONFIRM_INITIAL_DEPOSIT}</Text>
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
                                            : type === 'SUCCESS' && isSaving === 'SimasTara' ?
                                              <View>
                                                <View>
                                                  <Text>{language.SIMAS_TARA_INITIAL_PLACEMENT}</Text>
                                                  <Text style={styles.amountBill2}>{amount}</Text>
                                                </View>
                                                <View style={styles.payment}>
                                                  <Text>{language.SIMAS_TARA_SAVINGS_DETAIL}</Text>
                                                </View>

                                                { !isEmpty(custPoin) && custPoinCurrenncy === 'simaspoin' ?
                                                  <View style={styles.row}>
                                                    <Text style={styles.black}>{language.QR_GPN_GIVE_MANUAL_CASHBACK}</Text>
                                                    <Text style={[styles.accNo, styles.roboto]}>{custPoin} <Image source={Poin} style={styles.poinImage} /></Text>
                                                  </View> : !isEmpty(custPoin) ?
                                                    <View style={styles.row}>
                                                      <Text style={styles.black}>{language.QR_GPN_GIVE_MANUAL_CASHBACK}</Text>
                                                      <Text style={[styles.accNo, styles.roboto]}>Rp {custPoin}</Text>
                                                    </View>
                                                    : null
                                                }
                                                <View>
                                                  <View style={styles.rowAlign}>
                                                    <View>
                                                      <Text>{language.PAGE__SIMAS_TARA_SUMMARY_EMAIL}</Text>
                                                      <Text style={[styles.accNo, styles.roboto]}>{accSavingEmail}</Text>
                                                    </View>
                                                  </View>
                                                  <View style={styles.rowAlign}>
                                                    <View>
                                                      <Text>{language.PAGE__SIMAS_TARA_SIMULATION_SOURCE_ACC}</Text>
                                                      <Text style={[styles.accNo, styles.roboto]}>{accProdType} - {accNoBiller}</Text>
                                                    </View>
                                                  </View>
                                                  <View style={styles.rowAlign}>
                                                    <View>
                                                      <Text>{language.PAGE__SIMAS_TARA_SIMULATION_PERIOD}</Text>
                                                      <Text style={[styles.accNo, styles.roboto]}>{periodSimasTara} {language.SIMAS_TARA_PERIOD_YEAR}</Text>
                                                    </View>
                                                  </View>
                                                  <View style={styles.rowAlign}>
                                                    <View>
                                                      <Text>{language.PAGE__SIMAS_TARA_SIMULATION_MATURITY_DATE}</Text>
                                                      <Text style={[styles.accNo, styles.roboto]}>{moment(txMaturityDate).format('DD MMMM YYYY')}</Text>
                                                    </View>
                                                  </View>
                                                  <View style={[styles.rowAlign, {paddingBottom: 50}]}>
                                                    <View>
                                                      <Text>{language.SIMAS_TARA_RATE}</Text>
                                                      <Text style={[styles.accNo, styles.roboto]}>{interestRateSimasTara}% p.a.</Text>
                                                    </View>
                                                  </View>
                                                </View>
                                              </View>
                                              : null
                            }
                          </View>
                          <View style={styles.sourceAccountContainer}>
                            { isClosingTd === 'yes' ?
                              <View>
                                <Text style={styles.sourceAccount}>{language.PAYMENT_STATUS__TD_ACCOUNT} - <Text style={styles.account}>{tdAccount}</Text></Text>
                              </View>
                              : isGenericBiller === 'yes' && generalCode === '' ?
                                <View style={styles.ph15}>
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
                                            <Text style={[styles.accNo, styles.roboto]}>{accNameBiller}</Text>
                                            :
                                            <View>
                                              <Text style={[styles.accNo, styles.roboto]}>{accNoBiller}</Text>
                                              <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                            </View>
                                        }
                                        <Text style={[styles.product, styles.roboto]}>{accProdType}</Text>
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
                                        <Text style={[styles.accNo, styles.roboto]}>{subsNumber}</Text>
                                        <Text style={[styles.product, styles.roboto]}>{transactionType}</Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                : type === 'PENDING' && isGenericBiller === 'yes' && generalCode !== '' ?
                                  <View style={styles.ph15}>
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
                                              <Text style={[styles.accNo, styles.roboto]}>{accNameBiller}</Text>
                                              :
                                              <View>
                                                <Text style={[styles.accNo, styles.roboto]}>{accNoBiller}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                              </View>
                                          }
                                          <Text style={[styles.product, styles.roboto]}>{accProdType}</Text>
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
                                          <Text style={[styles.accNo, styles.roboto]}>{subsNumber}</Text>
                                          <Text style={[styles.product, styles.roboto]}>{transactionType}</Text>
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
                                                  null :
                                                  <Text style={[styles.accNo, styles.roboto]}>{accNoBiller}</Text>
                                              }
                                              <Text style={[styles.product, styles.roboto]}>{accNameBiller}</Text>
                                              <Text style={[styles.product, styles.roboto]}>{accProdType}</Text>
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
                                                <Text style={[styles.accNo, styles.roboto]}>{language.INQUIRY__SIL_KAP}</Text>
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
                                        : account === '' ?
                                          null
                                          :
                                          null
                            }
                            { isRecurring ?
                              type === 'SUCCESS' && couponStatusPayment !== '' ?
                                null :
                                <View style={styles.borderMid} />
                              : null
                            }
                            {
                              isGenericBiller === 'yes' && generalCode === '' || type === 'PENDING' ?
                                <View style={styles.borderMid} />
                                :
                                null
                            }
                          </View>
                        </View>
                        {type === 'SUCCESS' && couponStatusPayment !== '' && generalCode === ''  && isGenericBiller === 'yes' ?
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

                        <View style={styles.middleContainerMiddle}>
                          {
                            result(rawDataDetailList, '[0].key', '').split('__')[0] === 'CARDLESSWITHDRAWAL' ?
                              (<View>
                                {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'WITHDRAWAL_AMOUNT' ?
                                  <View>
                                    <Text>{language.TOTAL__AMOUNT}</Text>
                                    <Text style={styles.amountBill2}>Rp. {result(rawDataDetailList, '[5].value', '')}</Text>
                                  </View> : <View style={styles.rowItem}/>}
                                {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'WITHDRAWAL_AMOUNT' ?
                                  <View>
                                    <View style={styles.payment}>
                                      <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                    </View>
                                    <View style={styles.row}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                      <Text style={[styles.accNo, styles.roboto]}>Rp. {result(rawDataDetailList, '[5].value', '')}</Text>
                                    </View>
                                  </View> : <View style={styles.rowItem}/>}
                                {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'FEES' ?
                                  <View style={[styles.row]}>
                                    <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                    <Text style={[styles.accNo, styles.roboto]}>Rp. {result(rawDataDetailList, '[4].value', '').split('\n')[0]}</Text>
                                  </View> : <View style={styles.rowItem}/>}
                                <View style={styles.labelSpacing} />

                                {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'WITHDRAWAL_FROM' ?
                                  <View>
                                    <View>
                                      <Text>{language.GENERIC_PAY_FROM}</Text>
                                    </View>
                                    <View style={styles.type}>
                                      <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[2]}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]} {account.split(', ')[1]}</Text>
                                    </View>
                                  </View> : <View style={styles.rowItem} />}
                                {isClosingTd === 'yes' ? 
                                  null :
                                  <View style={styles.rowAlign} />}
                                {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'WITHDRAWAL_USING' ? (
                                  <View>
                                    <View>
                                      <Text>{language.GENERIC_PAY_SENT}</Text>
                                    </View>
                                    <View style={styles.line}>
                                      <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]} {result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                    </View>
                                  </View>
                                ) :
                                  <View style={styles.rowItem}/>
                                }

                              </View>)
                              :
                              result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER' &&  result(rawDataDetailList, '[3].key', '').split('__')[1] === 'RECURRING' ?
                                (<View style={styles.detailContainer}>
                                  {result(rawDataDetailList, '[7].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                      <Text style={styles.largeText}>{isValas ? `${currencyValas === 'IDR' ? 'Rp' : currencyValas} ${formatForexAmountPaymentStatus(totalAmountTransfer, currencyValas)}` : `Rp. ${currencyFormatter(totalAmountTransfer)}`}</Text>
                                    </View> : <View style={styles.rowItem}/>}
                                  {result(rawDataDetailList, '[7].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                      <Text>{isValas ? `${currencyValas === 'IDR' ? 'Rp' : currencyValas} ${formatForexAmountPaymentStatus(result(rawDataDetailList, '[7].value', ''), currencyValas)} ` : `Rp. ${result(rawDataDetailList, '[7].value', '')}`}</Text>
                                    </View> : <View style={styles.rowItem}/>}
                                  {result(rawDataDetailList, '[6].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[6].value', '').split('\n')[1]} {')'}</Text>
                                      <Text>{isValas ? `${currencyValas === 'IDR' ? 'Rp' : currencyValas} ${formatForexAmountPaymentStatus(result(rawDataDetailList, '[6].value', '').split('\n')[0], currencyValas)}` :  `Rp. ${result(rawDataDetailList, '[6].value', '').split('\n')[0]}`}</Text>
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
                                        <Text style={[styles.products, styles.roboto]}>{account.split(', ')[0]}</Text>
                                        <Text style={[styles.products, styles.roboto]}>{account.split(', ')[2]}</Text>
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
                                        <Text style={[styles.products, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]}</Text>
                                        <Text style={[styles.products, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
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
                                          <Text style={styles.summaryDetail}>{result(rawDataDetailList, '[3].value', '') === null ? <Text>-</Text> : <Text>{result(rawDataDetailList, '[3].value', '')}x</Text>} </Text>
                                        </View>
                                      </View>
                                    </View> :
                                    <View style={styles.rowItem}/>
                                  }
                                  {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TIME' ?
                                    <View>
                                      <View>
                                        <View style={styles.summaryDetailContainer}>
                                          <Text style={styles.detailTitle}>{language.TRANSFER__TIME}</Text>
                                          <Text style={styles.summaryDetail}>{result(rawDataDetailList, '[4].value', '-')}</Text>
                                        </View>
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
                                : isFundTransfer === 'PENDING' && result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER'  ?
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
                                  type === 'SUCCESS' && result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER'  ?
                                    (<View>
                                      {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                        <View>
                                          <Text>{language.TOTAL__AMOUNT }</Text>
                                          <Text style={styles.amountBill2}>{isValas ? `${currencyValas === 'IDR' ? 'Rp' : currencyValas} ${formatForexAmountPaymentStatus(totalAmountTransfer, currencyValas)}` : `Rp. ${currencyFormatter(totalAmountTransfer)}` }</Text>
                                        </View> : <View style={styles.rowItem}/>}
                                      {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                        <View>
                                          <View style={styles.payment}>
                                            <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                          </View>
                                          <View style={styles.row}>
                                            <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                            <Text style={[styles.accNo, styles.roboto]}>{isValas ? `${currencyValas === 'IDR' ? 'Rp' : currencyValas} ${formatForexAmountPaymentStatus(removeDot(result(rawDataDetailList, '[5].value', '')), currencyValas)}` : `Rp. ${result(rawDataDetailList, '[5].value', '')}`}</Text>
                                          </View>
                                        </View> : <View style={styles.rowItem}/>}
                                      {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                        <View style={styles.row}>
                                          <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                          <Text style={[styles.accNo, styles.roboto]}>{isValas ? `${currencyValas === 'IDR' ? 'Rp' : currencyValas} ${formatForexAmountPaymentStatus(removeDot(result(rawDataDetailList, '[4].value', '').split('\n')[0]), currencyValas)}` : `Rp. ${result(rawDataDetailList, '[4].value', '').split('\n')[0]}`}</Text>
                                        </View> : <View style={styles.rowItem}/>}
                                      {isValas ?
                                        <View>
                                          {currencyIndicator !== 'sameValas' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.EXCHANGE__RATES_PAYMENT_SCREEN} </Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{currencyRate}</Text>
                                            </View>
                                            : null
                                          }
                                          {currencyIndicator !== 'sameValas' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.EXCHANGE__RATES_EQUIVALENT_PAYMENT_SCREEN}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{equivalent}</Text>
                                            </View>
                                            : null
                                          }
                                        </View> : null
                                      }

                                      {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                        null : <View style={styles.rowItem} />}
                                      <View style={styles.labelSpacing} />
                                      {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                        <View>
                                          <View>
                                            <Text>{language.GENERIC_PAY_FROM}</Text>
                                          </View>
                                          <View style={styles.type}>
                                            <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[2]}</Text>
                                            <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]} {account.split(', ')[1]}</Text>
                                          </View>
                                        </View> : <View style={styles.rowItem} />}
                                      {isClosingTd === 'yes' ? 
                                        null :
                                        <View style={styles.rowAlign} />}
                                      {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                        <View>
                                          <View>
                                            <Text>{language.GENERIC_PAY_SENT}</Text>
                                          </View>
                                          <View style={styles.line}>
                                            <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[0]}</Text>
                                            <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[1]} {result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                          </View>
                                        </View>) :
                                        <View style={styles.rowItem}/>
                                      }
                                    </View>)
                                    :
                                    result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TOPUPSIL'  ?
                                      (<View>
                                        {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                          <View>
                                            <Text>{language.TOTAL__AMOUNT }</Text>
                                            <Text style={styles.amountBill2}>{result(rawDataDetailList, '[6].value', 'IDR')}  {result(rawDataDetailList, '[5].value', '')}</Text>
                                          </View> : <View style={styles.rowItem}/>}
                                        {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                          <View>
                                            <View style={styles.payment}>
                                              <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                            </View>
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[6].value', 'IDR')} {result(rawDataDetailList, '[5].value', '')}</Text>
                                            </View>
                                          </View> : <View style={styles.rowItem}/>}
                                        {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                          <View style={styles.row}>
                                            <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                            <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[6].value', 'IDR')} {result(rawDataDetailList, '[4].value', '').split('\n')[0]}</Text>
                                          </View> : <View style={styles.rowItem}/>}
                                        {infoPolisCurrency === 'IDR' && currencyAcc === 'USD' ?
                                          result(rawDataDetailList, '[7].key', '').split('__')[1] === 'EXCHANGE_RATE' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.SIL__MULTI_BUY_EXCHANGE}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[7].value', '')}</Text>
                                            </View> : <View style={styles.rowItem}/>
                                          : null
                                        }
                                        {infoPolisCurrency === 'USD' && currencyAcc === 'IDR' ?
                                          result(rawDataDetailList, '[7].key', '').split('__')[1] === 'EXCHANGE_RATE' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.SIL__MULTI_EXCHANGE_SALE}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[7].value', '')}</Text>
                                            </View> : <View style={styles.rowItem}/>
                                          : null
                                        }
                                        {infoPolisCurrency === 'IDR' && currencyAcc === 'USD' ?
                                          result(rawDataDetailList, '[8].key', '').split('__')[1] === 'EQUIVALEN_TO' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.SIL__MULTI_EQUIVALENT}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{currencyAcc} {formatForexAmountPaymentStatus(result(rawDataDetailList, '[8].value', ''), currencyAcc)}</Text>
                                            </View> : <View style={styles.rowItem}/>
                                          : null
                                        }
                                        {infoPolisCurrency === 'USD' && currencyAcc === 'IDR' ?
                                          result(rawDataDetailList, '[8].key', '').split('__')[1] === 'EQUIVALEN_TO' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.SIL__MULTI_EQUIVALENT}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{currencyAcc} {currencyFormatter(result(rawDataDetailList, '[8].value', ''))}</Text>
                                            </View> : <View style={styles.rowItem}/>
                                          : null
                                        }
                                        {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                          null : <View style={styles.rowItem} />}
                                        <View style={styles.labelSpacing} />
                                        {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                          <View>
                                            <View>
                                              <Text>{language.GENERIC_PAY_FROM}</Text>
                                            </View>
                                            <View style={styles.type}>
                                              <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[2]}</Text>
                                              <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]} {account.split(', ')[1]}</Text>
                                            </View>
                                          </View> : <View style={styles.rowItem} />}
                                        {isClosingTd === 'yes' ? 
                                          null :
                                          <View style={styles.rowAlign} />}
                                        {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                          <View>
                                            <View>
                                              <Text>{language.GENERIC_PAY_SENT}</Text>
                                            </View>
                                            <View style={styles.line}>
                                              {infoPolisCurrency === 'USD' ?
                                                <Text style={[styles.accNo, styles.roboto]}>{'SIMAS INVESTA LINK'}</Text>
                                                :
                                                <Text style={[styles.accNo, styles.roboto]}>{'SMART INVESTA LINK'}</Text>
                                              }
                                              <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                            </View>
                                          </View>) :
                                          <View style={styles.rowItem}/>
                                        }
                                      </View>)
                                      :
                                      result(rawDataDetailList, '[0].key', '').split('__')[0] === 'NBSIL'  ?
                                        (<View>
                                          {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                            <View>
                                              <Text>{language.TOTAL__AMOUNT }</Text>
                                              <Text style={styles.amountBill2}>{result(rawDataDetailList, '[6].value', 'IDR')}  {result(rawDataDetailList, '[5].value', '')}</Text>
                                            </View> : <View style={styles.rowItem}/>}
                                          {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                            <View>
                                              <View style={styles.payment}>
                                                <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                              </View>
                                              <View style={styles.row}>
                                                <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                                <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[6].value', 'IDR')} {result(rawDataDetailList, '[5].value', '')}</Text>
                                              </View>
                                            </View> : <View style={styles.rowItem}/>}
                                          {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                            <View style={styles.row}>
                                              <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                              <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[6].value', 'IDR')} {result(rawDataDetailList, '[4].value', '').split('\n')[0]}</Text>
                                            </View> : <View style={styles.rowItem}/>}
                                          {isSilIdrUsd === 'IDR' && currencyAcc === 'USD' ?
                                            result(rawDataDetailList, '[7].key', '').split('__')[1] === 'EXCHANGE_RATE' ?
                                              <View style={styles.row}>
                                                <Text style={styles.blackText}>{language.SIL__MULTI_BUY_EXCHANGE}</Text>
                                                <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[7].value', '')}</Text>
                                              </View> : <View style={styles.rowItem}/>
                                            : null
                                          }
                                          {isSilIdrUsd === 'USD' && currencyAcc === 'IDR' ?
                                            result(rawDataDetailList, '[7].key', '').split('__')[1] === 'EXCHANGE_RATE' ?
                                              <View style={styles.row}>
                                                <Text style={styles.blackText}>{language.SIL__MULTI_EXCHANGE_SALE}</Text>
                                                <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[7].value', '')}</Text>
                                              </View> : <View style={styles.rowItem}/>
                                            : null
                                          }
                                          {isSilIdrUsd === 'IDR' && currencyAcc === 'USD' ?
                                            result(rawDataDetailList, '[8].key', '').split('__')[1] === 'EQUIVALEN_TO' ?
                                              <View style={styles.row}>
                                                <Text style={styles.blackText}>{language.SIL__MULTI_EQUIVALENT}</Text>
                                                <Text style={[styles.accNo, styles.roboto]}>{currencyAcc} {formatForexAmountPaymentStatus(result(rawDataDetailList, '[8].value', ''), currencyAcc)}</Text>
                                              </View> : <View style={styles.rowItem}/>
                                            : null
                                          }
                                          {isSilIdrUsd === 'USD' && currencyAcc === 'IDR' ?
                                            result(rawDataDetailList, '[8].key', '').split('__')[1] === 'EQUIVALEN_TO' ?
                                              <View style={styles.row}>
                                                <Text style={styles.blackText}>{language.SIL__MULTI_EQUIVALENT}</Text>
                                                <Text style={[styles.accNo, styles.roboto]}>{currencyAcc} {formatForexAmountPaymentStatus(result(rawDataDetailList, '[8].value', ''), currencyAcc)}</Text>
                                              </View> : <View style={styles.rowItem}/>
                                            : null
                                          }
                                          {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                            null : <View style={styles.rowItem} />}
                                          <View style={styles.labelSpacing} />
                                          {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                            <View>
                                              <View>
                                                <Text>{language.GENERIC_PAY_FROM}</Text>
                                              </View>
                                              <View style={styles.type}>
                                                <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[2]}</Text>
                                                <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]} {account.split(', ')[1]}</Text>
                                              </View>
                                            </View> : <View style={styles.rowItem} />}
                                          {isClosingTd === 'yes' ? 
                                            null :
                                            <View style={styles.rowAlign} />}
                                          {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                            <View>
                                              <View>
                                                <Text>{language.GENERIC_PAY_SENT}</Text>
                                              </View>
                                              <View style={styles.line}>
                                                {isSilIdrUsd === 'USD' ?
                                                  <Text style={[styles.accNo, styles.roboto]}>{'SIMAS INVESTA LINK'}</Text>
                                                  :
                                                  <Text style={[styles.accNo, styles.roboto]}>{'SMART INVESTA LINK'}</Text>
                                                }
                                                <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                              </View>
                                            </View>) :
                                            <View style={styles.rowItem}/>
                                          }
                                        </View>)
                                        :
                                        result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TOPUPSTARINVESTAMA'  ?
                                          (<View>
                                            {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                              <View>
                                                <Text>{language.TOTAL__AMOUNT }</Text>
                                                <Text style={styles.amountBill2}>{result(rawDataDetailList, '[6].value', 'IDR')}  {result(rawDataDetailList, '[5].value', '')}</Text>
                                              </View> : <View style={styles.rowItem}/>}
                                            {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                              <View>
                                                <View style={styles.payment}>
                                                  <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                                </View>
                                                <View style={styles.row}>
                                                  <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                                  <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[6].value', 'IDR')} {result(rawDataDetailList, '[5].value', '')}</Text>
                                                </View>
                                              </View> : <View style={styles.rowItem}/>}
                                            {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                              <View style={styles.row}>
                                                <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[4].value', '').split('\n')[1]} {')'}</Text>
                                                <Text style={[styles.accNo, styles.roboto]}>{result(rawDataDetailList, '[6].value', 'IDR')} {result(rawDataDetailList, '[4].value', '').split('\n')[0]}</Text>
                                              </View> : <View style={styles.rowItem}/>}
                                            {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                                              null : <View style={styles.rowItem} />}
                                            <View style={styles.labelSpacing} />
                                            {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                                              <View>
                                                <View>
                                                  <Text>{language.GENERIC_PAY_FROM}</Text>
                                                </View>
                                                <View style={styles.type}>
                                                  <Text style={[styles.accNo, styles.roboto]}>{account.split(', ')[2]}</Text>
                                                  <Text style={[styles.product, styles.roboto]}>{account.split(', ')[0]} {account.split(', ')[1]}</Text>
                                                </View>
                                              </View> : <View style={styles.rowItem} />}
                                            {isClosingTd === 'yes' ? 
                                              null :
                                              <View style={styles.rowAlign} />}
                                            {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                                              <View>
                                                <View>
                                                  <Text>{language.GENERIC_PAY_SENT}</Text>
                                                </View>
                                                <View style={styles.line}>
                                                  <Text style={[styles.accNo, styles.roboto]}>{'STAR PREMIUM DOLLAR'}</Text>
                                                  <Text style={[styles.product, styles.roboto]}>{result(rawDataDetailList, '[1].value', '').split('\n')[2]}</Text>
                                                </View>
                                              </View>) :
                                              <View style={styles.rowItem}/>
                                            }
                                          </View>)
                                          :
                                          generalCode === '' && isGenericBiller === 'yes' ?
                                            (<View style={styles.detailContainer}>
                                              {map(displayList, (value, k) => (
                                                (value ?
                                                  <View>
                                                    <View key={k} style={styles.detail}>
                                                      <Text style={styles.billHeader}>{k}</Text>
                                                      <Text style={styles.robotoBold}>{value}</Text>
                                                    </View>
                                                  </View>
                                                  :
                                                  <View key={k} style={styles.detail}>
                                                    <Text style={styles.detailKey}>{k}</Text>
                                                  </View>
                                                ))
                                              )}
                                              {map(dataDetailList, (value, k) => (
                                                (value ?
                                                  <View>
                                                    <View key={k} style={styles.detail}>
                                                      <Text style={styles.billHeader}>{language[k]}</Text>
                                                      <Text style={styles.robotoBold}>{value}</Text>
                                                    </View>
                                                  </View>
                                                  :
                                                  <View key={k} style={styles.detail}>
                                                    <Text style={styles.detailKey}>{language[k]}</Text>
                                                  </View>
                                                )))}
                                            </View>)
                                            : result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER'  ?
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
                                              null
                          }
                        </View>
                      </View>
                    }
                  </View>
                  : null
                }
              </View>
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ? null :
                type === 'SUCCESS' ?
                  <View style={styles.border}/>
                  : null
              }
              <View>
                { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ? null :
                  type === 'SUCCESS' ?
                    <View style={styles.ph15}>
                      <Text>{language.SUCCESS__TRANSACTION_DETAIL} </Text>
                    </View>
                    : null
                }
              </View>
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ? null :
                type === 'SUCCESS' ?
                  <View style={styles.transdetail}>
                    <Text style={[styles.roboto]}>{language.DATE__TIME_SUCCESS}</Text>
                    <Text style={ [styles.time, styles.roboto]}>{txDate}</Text>
                  </View>
                  : null
              }
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ? null :
                type === 'SUCCESS' ?
                  transactionId !== '' ?
                    <View style={styles.transdetailId} >
                      <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__ID_TRANS} </Text>
                      <Text style={[styles.time, styles.roboto]}>{transactionId}</Text>
                    </View>
                    : <Text/> : null
              }
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') ? null :
                type === 'SUCCESS' && isMultiSil === 'yes' && isSilIdrUsd !== '' ?
                  <View style={styles.transdetailId}>
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__NO_ESPAJ}</Text>
                    <Text style={ [styles.time, styles.roboto]}>{numberEspaj}</Text>
                  </View>
                  : null
              }
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') ? null :
                type === 'SUCCESS' && isMultiSil === 'yes' && infoPolisCurrency !== '' ?
                  <View style={styles.transdetailId}>
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__NO_ESPAJ}</Text>
                    <Text style={ [styles.time, styles.roboto]}>{polisNumber}</Text>
                  </View>
                  : null
              }
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') ? null :
                type === 'SUCCESS' && isStarInvestama === 'yes' ?
                  <View style={styles.transdetailId}>
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__NO_ESPAJ}</Text>
                    <Text style={ [styles.time, styles.roboto]}>{polisNumberStarInvestama}</Text>
                  </View>
                  : null
              }
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') ? null :
                type === 'SUCCESS' && generalCode === 'Telkomsel Prepaid'  || generalCode === 'Telkomsel Postpaid' ?
                  (<View style={styles.detailContainerInfo}>
                    {map(displayList, (value, k) => (
                      (value ?
                        <View>
                          <View key={k} style={styles.detailTelkom}>
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
                  </View>)
                  : null
              }
              {result(rawDataDetailList, '[3].key', '').split('__')[1] === 'NOTES' && type === 'SUCCESS' && isFundTransfer === 'yes' || result(rawDataDetailList, '[3].key', '').split('__')[1] === 'NOTES' && type === 'SUCCESS' && isFundTransfer === 'yes' ?
                <View>
                  <View>
                    <View style={styles.transdetailId}>
                      <Text style={styles.detailTitles}>{language.CARDLESSWITHDRAWAL__NOTES}</Text>
                      <Text style={styles.summaryDetails}>{result(rawDataDetailList, '[3].value', '-')}</Text>
                    </View>
                  </View>
                </View> :
                <View style={styles.rowItem}/>
              }
              {
                isAutodebitRegis && !isEmpty(autoDebitDate) ?
                  <View style={styles.transdetailId}>
                    <Text style={[styles.roboto]}>{language.AUTODEBIT__LIST_EDIT_DATE_LABEL}</Text>
                    <Text style={ [styles.time, styles.roboto]}>{autoDebitDate}{language.AUTODEBIT__LABEL_DATE_AUTODEBIT3}</Text>
                  </View> 
                  : null
              }
              {
                isAutodebitRegis && !isEmpty(autoDebitStartDate) ?
                  <View style={styles.transdetailId}>
                    <Text style={[styles.roboto]}>{language.AUTODEBIT__LABEL_DATE_AUTODEBIT2}</Text>
                    <Text style={ [styles.time, styles.roboto]}>{autoDebitStartDate}</Text>
                  </View>
                  : null
              }

              <View>
                <View style={styles.middleContainerBoth}>
                  {
                    isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ?
                      <View style={styles.helpContainer}>
                        <Text style={styles.transaction}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
                      </View>
                      :
                      type === 'SUCCESS' ? 
                        null :
                        <View style={styles.helpContainer}>
                          <Text style={styles.transaction}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
                        </View>
                  }
                  {isRecurring || type === 'PENDING' ?
                    <View style={styles.pb30}>
                      <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                      <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                    </View>
                    :
                    type === 'SUCCESS' && generalCode === '' && isGenericBiller === 'yes'  || isFundTransfer === 'PENDING' ?
                      <View>
                        <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                        <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                      </View>
                      :
                      null
                  }

                </View>
                { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || isFundTransfer === 'PENDING' ?
                  null
                  :
                  type === 'SUCCESS' ?
                    <View style={styles.borderBottom}/>
                    :
                    null
                }

              </View>
              { isRecurring || (generalCode === '' && isGenericBiller === 'yes') || type === 'PENDING' || isFundTransfer === 'PENDING' ? null :
                type === 'SUCCESS' ?
                  <View>
                    {initialDeposit === '0' ?
                      <View>
                        <Text style={styles.help}>{language.PAYMENT_STATUS__DOWNLOAD} <Text style={styles.redText} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
                      </View>
                      :
                      <View>
                        <View>
                          <Text style={styles.receipt}>{language.PAYMENT_STATUS__NEW_SUCCESS}</Text>
                        </View>
                        <View style={styles.paddingHHHBanner}>
                          {isLuckyDipActive === 'INACTIVE' || isLuckyDipActive === 'inactive' ? 
                            null :
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
                          }
                        </View>
                      </View>
                    }
                  </View>
                  : null}
            </View>
          </ViewShot>

          <View style={styles.mainTitleCheckBox}>
            <View style={styles.containtextExplanation}>
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
                      dtActionName='Save Receipt'
                    />
                  </View>
                  <View>
                    <Text style={styles.tncTxt}>{language.AUTO_SAVE_DESCRIPTION}</Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          {
            isRecurring || (generalCode === '' && isGenericBiller === 'yes' && type === 'SUCCESS') || type === 'PENDING' || isFundTransfer === 'PENDING' ?
              <View style={styles.buttonContainerbot}>
                <View style={styles.button}>
                  <SinarmasButton buttonType='bw' onPress={this.screenCapture} text={language.PAYMENT_STATUS__SHARE}/>
                </View>
                <View style={styles.button}>
                  <SinarmasButton dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
                </View>
              </View>
              :
              type === 'SUCCESS' ? 
                null :
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <SinarmasButton dtActionName={buttonDtAction} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
                  </View>
                </View>
          }
        </KeyboardAwareScrollView>
      </View>
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
  isUseSimas: PropTypes.bool,
  isValas: PropTypes.bool,
  currencyValas: PropTypes.string,
  resDataTrf: PropTypes.object,
  currencyObject: PropTypes.object,
  inputPolis: PropTypes.object,
  infoPolis: PropTypes.object,
  isSilIdrUsd: PropTypes.string,
  isMultiSil: PropTypes.string,
  currencyAcc: PropTypes.string,
  custPoinCurrenncy: PropTypes.string,
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
  isStarInvestama: PropTypes.string,
  infoPolisStarInvestama: PropTypes.object,
  isAutodebitRegis: PropTypes.bool,
  autoDebitStartDate: PropTypes.string, 
  autoDebitDate: PropTypes.string,
  displayListShopee: PropTypes.array,
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
