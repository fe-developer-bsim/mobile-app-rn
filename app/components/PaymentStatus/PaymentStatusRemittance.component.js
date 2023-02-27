import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking, Platform, ScrollView} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './PaymentStatusRemittance.styles';
import SimobiPlus from '../../assets/images/simobiplus.png';
import {SinarmasButton} from '../FormComponents';
import {noop, isEmpty, result, toUpper} from 'lodash';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, removeDot, formatForexAmountPaymentStatus, formatFieldAmount} from '../../utils/transformer.util';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import trx_icon from '../../assets/images/trx_icon.png';
import FromNew from '../../assets/images/FromNew.png';
import LinearGradient from 'react-native-linear-gradient';
import LuckyImage from '../../assets/images/IconBoxLuckyDip.png';
import Touchable from '../Touchable.component';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {connect} from 'react-redux';
import {autoSaveFeedBackChecklist} from '../../state/thunks/onboarding.thunks';
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
    Linking.canOpenURL('http://.bit.ly/simobiplus').
      then((supported) => {
        if (supported) {
          Linking.openURL('http://bit.ly/simobiplus');
        } else {
          Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
        }
      }).
      catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  };

  call = () => {
    Linking.canOpenURL('tel:1500153').
      then((supported) => {
        if (supported) {
          Linking.openURL('tel:1500153');
        } else {
          Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
        }
      }).
      catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  };

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
        const nameFile = Math.floor(
          date.getTime() + date.getSeconds() / 2
        );
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
  };

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
        url:
          Platform.OS === 'ios'
            ? 'file://' + uri
            : 'data:image/png;base64,' + uri
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
  };

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  };

  closeLogin = () => {
    const {isBillPayBeforeLogin, onCloseLogin} = this.props;
    onCloseLogin(isBillPayBeforeLogin);
  };

  closeLoginHHH = () => {
    const {isBillPayBeforeLogin, goToHHHBeforeLogin} = this.props;
    goToHHHBeforeLogin(isBillPayBeforeLogin);
  };

  render () {
    const {type = 'SUCCESS', isLKD, accountFrom = {}, transactionDate = new Date(), transactionType = '', onClose = noop, isClosingTd, responseMessage, isManageCc = false, rawDataDetailList, resData, initialDeposit, isBillPayBeforeLogin, isValas, currencyValas, resDataTrf, isFundTransfer, transactionId = '', isNoFund, currentLanguage = {}, isLuckyDipActive, goToHHH} = this.props;
    const txDate = moment(transactionDate).format('DD MMM YYYY, hh:mm A');
    const account = isEmpty(accountFrom) ? '' : accountFrom.productType + ', ' + accountFrom.accountNumber + ', ' + accountFrom.name;
    const title = type === 'SUCCESS' ? language.PAYMENT_STATUS__REVAMP_SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : type === 'LKDFAILED' ? language.LKD__PAYMENT_STATUS + language.PAYMENT_STATUS__FAILED : transactionType + language.PAYMENT_STATUS__FAILED;
    const titleTrans = type === 'SUCCESS' && isFundTransfer === 'yes' ? language.SCREEN__TRANSACTION_SUCCESS_NEW : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : transactionType + language.PAYMENT_STATUS__FAILED;
    const isRecurring = result(rawDataDetailList, '[3].key', '').split('__')[1] === 'RECURRING';
    const totalAmountTransfer = isRecurring ? (parseInt(removeDot(result(rawDataDetailList, '[7].value', ''))) + parseInt(removeDot(result(rawDataDetailList, '[6].value', ''))))
      : (parseInt(removeDot(result(rawDataDetailList, '[5].value', ''))) + parseInt(removeDot(result(rawDataDetailList, '[4].value', ''))));
    const realTotalAmount = String(totalAmountTransfer);
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    const exchangeRate = result(resDataTrf, 'exchangeRate', '');
    const equivalent = result(resDataTrf, 'equivalent');
    const feeOUR = result(resDataTrf, 'fee');
    const totalAmountRemittance = result(resDataTrf, 'totalAmountView', '');
    const totalAmountInput = result(resData, 'transferTransaction.amountCredit', '');
    const currencyRemmitance = result(resDataTrf, 'currencyRemmitance', '');
    const lang = result(currentLanguage, 'id', '') === 'en';
    return (
      <View style={styles.containerUtama}>
        <ScrollView>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options} style={styles.flexGrey}>
            {type === 'SUCCESS' && isFundTransfer === 'yes' && !isRecurring  ?
            
            /* ADD THIS IF SUCCESS */
              <View>
                <View style={styles.backgroundColorPink}/>
                <View style={styles.marginTop}>
                  <Text style={styles.tittleTrf}>{language.TRANSACTION__SUCCESS}</Text>
                </View>
                <View style={styles.containerBannerWhite}>
                  <View style={styles.containerLeft}>
                    <View style={styles.paddingBox}>
                      <View style={styles.iconSuccess}>
                        <SimasIcon name={'success-circle'} style={styles.logoSuccessIcon} size={30}/>
                        <Text style={styles.bankTitle}>{language.REMITTANCE__PAYMENT_STATUS_SUCCESSFUL}</Text>
                      </View>
                      <View style={styles.transNumber}>
                        <Text style={styles.transrefnumSuccess}>{language.PAYMENT_STATUS__NO_TRANS} {transactionId}</Text>
                      </View>
                      <View style={styles.greyLine} />
                      <Text style={styles.receiptTextSuccess}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                      <View style={styles.containerAmount}>
                        {
                          result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER'  ?
                            (<View>
                              {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                <View style={[styles.row, styles.mv5]}>
                                  <Text style={styles.accNoNewOne}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                  <Text style={[styles.accNoNewOne, styles.robotoNew]}>{currencyRemmitance} {formatFieldAmount(totalAmountInput)}</Text>
                                </View> : <View style={styles.rowItem}/>}
                              <View> 
                                {isEmpty(exchangeRate) ?
                                  null :
                                  <View style={styles.row}>
                                    <Text style={styles.accNoNewOne}>{language.EXCHANGE__RATES_PAYMENT_SCREEN} </Text>
                                    <Text style={[styles.accNoNewOne, styles.robotoNew]}>{exchangeRate}</Text>
                                  </View>
                                }
                                <View style={styles.row}>
                                  <Text style={styles.accNoNewOne}>{language.REMITTANCE__EXCHANGE_RATES_EQUIVALENT_PAYMENT_SCREEN}</Text>
                                  <Text style={[styles.accNoNewOne, styles.robotoNew]}>{equivalent}</Text>
                                </View>
                              </View> 
                              {result(rawDataDetailList, '[4].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                <View style={[styles.row, styles.mv5]}>
                                  <Text style={styles.accNoNewOne}>{language.CARDLESSWITHDRAWAL__FEES} {'(OUR)'}</Text>
                                  <Text style={[styles.accNoNewOne, styles.robotoNew]}>{isValas ? `${currencyValas} ${formatForexAmountPaymentStatus(removeDot(result(rawDataDetailList, '[4].value', '').split('\n')[0]), currencyValas)}` : feeOUR}</Text>
                                </View> : <View style={styles.rowItem}/>}
                              <View style={styles.labelSpacing} />
                              <View style={styles.borderTop} />
                              {result(rawDataDetailList, '[5].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                <View style={[styles.row, styles.mv5]}>
                                  <Text style={styles.accNoNewOne}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                  <Text style={[styles.accNo, styles.robotoNew]}>{totalAmountRemittance}</Text>
                                </View> : <View style={styles.rowItem}/>}
                
                              <View style={styles.labelSpacing} />
                            </View>) 
                            :
                            null}
                      </View>

                      {/* DATE FOR CARDLESSWITHDRAWAL AND TRANSFER */}
                      {result(rawDataDetailList, '[2].key', '').split('__')[1] === 'INITIATION_DATE' ?
                        <View style={styles.button2}>
                          <Text style={styles.dateTextNew}>{lang ? 'On ' : null}{result(rawDataDetailList, '[2].value', '')}</Text>
                        </View> : <View style={styles.rowItem} />}

                      {result(rawDataDetailList, '[0].key', '').split('__')[1] === 'TRANSFER_FROM' ?
                        <View style={styles.rowAlignSuccessFrom}>
                          <View style={styles.rightItemContainer}>
                            <Image source={FromNew} style={styles.imgIconFrom}/>
                          </View>
                          <View>
                            <Text style={styles.sendAccNameType}>{account.split(', ')[2]}</Text>
                            <Text style={styles.sendAccNumber}>{account.split(', ')[1]}</Text>
                            <Text style={styles.sendAccType}>{account.split(', ')[0]}</Text>
                          </View>
                        </View> : null}
                      {isClosingTd === 'yes' ? null : result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER' ?
                        <View style={styles.dotContainer}>
                          <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                        </View>
                        : null}
                      {result(rawDataDetailList, '[1].key', '').split('__')[1] === 'TRANSFER_TO' ? (
                        <View style={styles.rowAlignSuccess}>
                          <View>
                            <Image source={trx_icon} style={styles.imgIconSend}/>
                          </View>
                          <View>
                            <Text style={styles.sendAccNameType}>{toUpper(result(resDataTrf, 'receiverName', ''))}</Text>
                            <Text style={styles.sendAccNumber}>{result(resDataTrf, 'creditAccountNumber', '')}</Text>
                            <Text style={styles.sendAccType}>{result(resDataTrf, 'bankName', '')}</Text>
                          </View>
                        </View>) : null
                      }

                      <View style={styles.spaceContainer} />
                      <View style={styles.borderTop} />
                      <View style={styles.middleContainerBot}>
                        <View style={styles.helpContainerSuccess}>
                          <Text style={styles.transactionRevamp}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
                        </View>
                        <View>
                          <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                          <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              : null}

            {/* EXCEPT SUCCESS IS BELOW */}
            {type === 'SUCCESS' && isFundTransfer === 'yes' && !isRecurring  ? 
              null :
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
                  : null
                }
                <View>
                  <View style={styles.titleContainer}>
                    { isRecurring || isFundTransfer === 'PENDING' ?
                      <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                      :
                      type === 'SUCCESS' ? 
                        null :
                        <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                    }
                    { isRecurring || isFundTransfer === 'PENDING' ?
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
                      <View style={styles.mainTitle}>
                        { type === 'SUCCESS' && !isManageCc && isRecurring ?
                          <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS__PENDING}</Text>
                          :
                          type === 'SUCCESS' && isFundTransfer === 'yes' ?
                            null
                            :
                            type === 'SUCCESS' && isFundTransfer === 'PENDING' ?
                              <Text style={styles.mainTitleText}>{titleTrans}</Text>
                              :
                              <Text style={styles.mainTitleText}>{title}</Text>
                        }

                        { type === 'SUCCESS' && !isManageCc && isRecurring || type === 'SUCCESS' && isFundTransfer === 'PENDING' ?
                          <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text> :
                          type === 'SUCCESS' && !isManageCc && !isLKD ?
                            <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__SUCCESSFUL}</Text> :
                            type === 'PENDING' && !isManageCc ?
                              <Text style={styles.successText}>{transactionType} {language.PAYMENT_STATUS__IN_PROCESS}</Text> :
                              type === 'SUCCESS' && isManageCc && !isLKD ?
                                <Text style={styles.successText}>{transactionType} {language.MANAGE__CREDIT_CARD} {language.PAYMENT_STATUS__SUCCESSFUL}</Text>
                                : null}
                        {
                          type === 'SUCCESS' && isLKD ?
                            <Text style={styles.successText}>{language.LKD__PAYMENT_STATUS} {language.PAYMENT_STATUS__SUCCESSFUL}</Text>
                            : null }
                        {
                          isNoFund ?
                            <Text style={styles.successText}>{language.RESPONSE_MESSAGE__RC_51}</Text>
                            : null }

                        { isRecurring || isFundTransfer === 'PENDING' ?
                          transactionId !== '' ?
                            <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transactionId}</Text>
                            : <Text/>
                          :
                          type === 'SUCCESS' ? null :
                            transactionId !== '' ?
                              <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transactionId}</Text>
                              : <Text/>
                        }
                      </View>
                    </View>

                    <View>
                      { type === 'SUCCESS' && !isManageCc && isRecurring ?
                        <SimasIcon name={'pending-circle'} style={styles.logoFail} size={50}/>
                        :
                        type === 'SUCCESS' && initialDeposit !== '0' && isFundTransfer === 'yes'  || type === 'SUCCESS' && initialDeposit !== '0' ?
                          null
                          :
                          type === 'SUCCESS' && isFundTransfer === 'PENDING' ?
                            <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                            :
                            type === 'PENDING' ?
                              <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                              :
                              <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                      }
                    </View>
                  </View>
                </View>
                <View style={styles.borderGreyTop}/>
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
                            { isRecurring || type === 'PENDING' && isFundTransfer === 'yes' || isFundTransfer === 'PENDING' || type === 'PENDING' ?
                              <View style={styles.middleContainerMid}>
                                <Text style={styles.receiptText}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                              </View> : null
                            }
                            <View style={styles.amount}>
                              { responseMessage ?
                                <View style={styles.responseView}>
                                  <Text style={styles.detailKey}>{responseMessage}</Text>
                                </View>
                         
                                : null
                              }
                            </View>
                            <View style={styles.sourceAccountContainer}>
                              {
                                type === 'PENDING' || isRecurring || isFundTransfer === 'PENDING' ?
                                  <View style={styles.borderMid} />
                                  : null
                              }
                            </View>
                          </View>
                          <View style={styles.middleContainerMiddle}>
                            {
                              result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER' &&  result(rawDataDetailList, '[3].key', '').split('__')[1] === 'RECURRING' ?
                                (<View style={styles.detailContainer}>
                                  {result(rawDataDetailList, '[7].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__TOTAL}</Text>
                                      <Text style={styles.largeText}>{totalAmountRemittance}</Text>
                                    </View> : <View style={styles.rowItem}/>}
                                  {result(rawDataDetailList, '[7].key', '').split('__')[1] === 'TRANSFER_AMOUNT' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                                      <Text>{currencyRemmitance} {formatFieldAmount(totalAmountInput)}</Text>
                                    </View> : <View style={styles.rowItem}/>}
                                  {isEmpty(exchangeRate) ?
                                    null :
                                    <View style={styles.row}>
                                      <Text style={styles.blackText}>{language.EXCHANGE__RATES_PAYMENT_SCREEN} </Text>
                                      <Text>{exchangeRate}</Text>
                                    </View>
                                  }
                                  <View style={styles.row}>
                                    <Text style={styles.blackText}>{language.EXCHANGE__RATES_EQUIVALENT_PAYMENT_SCREEN}</Text>
                                    <Text>{equivalent}</Text>
                                  </View>
                                  {result(rawDataDetailList, '[6].key', '').split('__')[1] === 'TRANSFER_FEE' ?
                                    <View style={[styles.row, styles.mv5]}>
                                      {/* <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'('} {result(rawDataDetailList, '[6].value', '').split('\n')[1]} {')'}</Text> */}
                                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES} {'(OUR)'}</Text>
                                      <Text>{isValas ? `${currencyValas} ${formatForexAmountPaymentStatus(removeDot(result(rawDataDetailList, '[4].value', '').split('\n')[0]), currencyValas)}` : feeOUR}</Text>
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
                                        <Text style={[styles.accNo, styles.roboto]}>{result(resDataTrf, 'creditAccountNumber', '')}</Text>
                                        <Text style={[styles.products, styles.roboto]}>{result(resDataTrf, 'bankName', '')}</Text>
                                        <Text style={[styles.products, styles.roboto]}>{toUpper(result(resDataTrf, 'receiverName', ''))}</Text>
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
                                : type === 'PENDING' && result(rawDataDetailList, '[0].key', '').split('__')[0] === 'TRANSFER'  ?
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
                <View>
                  <View style={styles.middleContainerBoth}>
                    {
                      isRecurring || isFundTransfer === 'PENDING' ?
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
                      <View>
                        <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                        <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                      </View>
                      :
                      isFundTransfer === 'PENDING' ?
                        <View>
                          <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                          <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                        </View>
                        :
                        null
                    }
                  </View>

                </View>
              </View>}
            { isRecurring || type === 'PENDING' || isFundTransfer === 'PENDING' ? null :
              type === 'SUCCESS' ?
                <View>
                  {initialDeposit === '0' ?
                    <View>
                      <Text style={styles.help}>{language.PAYMENT_STATUS__DOWNLOAD} <Text style={styles.redText} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
                    </View>
                    :
                    <View>
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
          </ViewShot>
          <View style={type === 'FAILED' || isRecurring ? styles.mainTitleCheckBoxWhite : styles.mainTitleCheckBoxGrey}>
            <View style={styles.autoSaveReceipt}>
              <View style={styles.autoSaveBorder}>
                <Touchable>
                  <CheckBox
                    onChange={this.toogleCheckbox}
                    uncheckedImage={RedCheckBox}
                    checkedImage={UnCheckBox}
                    label={language.AUTO_SAVE_RECEIPT}
                    checkboxStyle={styles.checkboxStyle}
                    labelStyle={styles.checkboxLabel}
                    checked={!this.state.checked} // somehow checked value is reversed
                  />
                </Touchable>
                <View>
                  <Text style={styles.tncTxt}>{language.AUTO_SAVE_DESCRIPTION}</Text>
                </View>
              </View>
            </View>
          </View>
          {
            isRecurring || type === 'PENDING' || isFundTransfer === 'PENDING' ?
              <View style={styles.buttonContainerbot}>
                <View style={styles.button}>
                  <SinarmasButton buttonType='bw' onPress={this.screenCapture} text={language.PAYMENT_STATUS__SHARE}/>
                </View>
                <View style={styles.button}>
                  <SinarmasButton onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
                </View>
              </View>
              :
              type === 'SUCCESS' ?
                null :
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <SinarmasButton onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
                  </View>
                </View>
          }
          { type === 'SUCCESS' && isFundTransfer === 'yes' && !isRecurring ?
            <View style={styles.buttonContainerbotNew}>
              <View style={styles.button}>
                <SinarmasButton buttonType='aw' onPress={this.screenCapture}>
                  <View style={styles.buttonShare}>
                    <SimasIcon name={'sharebutton'} style={styles.iconShare} size={20} />
                    <Text style={styles.buttonShareText}>{language.PAYMENT_STATUS__SHARE}</Text>
                  </View>
                </SinarmasButton>
              </View>
              <View style={styles.button}>
                <SinarmasButton style={styles.doneButton} onPress={isBillPayBeforeLogin ? this.closeLogin : onClose} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
              </View>
            </View>
            : 
            null}
        </ScrollView>
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
  isValas: PropTypes.bool,
  currencyValas: PropTypes.string,
  resDataTrf: PropTypes.object,
  isNoFund: PropTypes.string,
  currentLanguage: PropTypes.object,
  isLuckyDipActive: PropTypes.string,
  goToHHHBeforeLogin: PropTypes.func,
  goToHHH: PropTypes.func,
  autoSaveCek: PropTypes.func,
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
  transfer: PropTypes.bool,
  billPay: PropTypes.bool,
  saving: PropTypes.bool,
  isMultiSil: PropTypes.string,
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
