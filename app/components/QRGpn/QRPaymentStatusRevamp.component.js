import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './QRPaymentStatusRevamp.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {currencyFormatter, getDayName, toTitleCase} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';
import SimobiPlus from '../../assets/images/simobiplus.png';
import PropTypes from 'prop-types';
import SuccesIcon from '../../assets/images/successicon.png';
import PendingIcon from '../../assets/images/pendingTransaction.png';
import Poin from '../../assets/images/poin.png';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import ViewShot from 'react-native-view-shot';
import moment from 'moment';
import Touchable from '../Touchable.component';

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


const mapStateToProps = (state) => ({
  checked: result(state, 'autoSave.checked', false),
  QR: result(state, 'autoSave.QR', false),
});

const mapDispatchToProps = (dispatch) => ({
  autoSaveCek: (isAutoSave, checked, type) => dispatch(autoSaveFeedBackChecklist(isAutoSave, checked, type))
});

class PaymentStatus extends Component {
  static propTypes = {
    status: PropTypes.string,
    resultData: PropTypes.object,
    fullName: PropTypes.string,
    onClose: PropTypes.func,
    transRefNum: PropTypes.string,
    date: PropTypes.string,
    navigation: PropTypes.object,
    accountTo: PropTypes.string,
    accountFrom: PropTypes.string,
    merchantName: PropTypes.object,
    isBillPayBeforeLogin: PropTypes.bool,
    onCloseLogin: PropTypes.func,
    onCloseLanding: PropTypes.func,
    couponStatusPayment: PropTypes.string,
    defaultAccount: PropTypes.object,
    data: PropTypes.object,
    navParams: PropTypes.object,
    custPoin: PropTypes.string,
    paymentStatusData: PropTypes.object,
    goToSplitBill: PropTypes.func,
    isLogin: PropTypes.bool,
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
    isQR: PropTypes.bool,
    QR: PropTypes.bool,
    isNoFund: PropTypes.string,
    goToHHH: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    goToHHHBeforeLogin: PropTypes.func
  }

  componentDidMount = () => {
    const {QR, isQR} = this.props;
    const checked = isQR ? QR : null;
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
    checked: this.props.QR,
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
    const {autoSaveCek, isQR, QR} = this.props;
    const type = {isQR};

    const checked = !this.state.checked;
    this.setState({checked: checked});
    const isAutoSave = checked;
    isQR ? QR === isAutoSave : null;

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

  closeLoginHHH = () => {
    const {isBillPayBeforeLogin, goToHHHBeforeLogin} = this.props;
    goToHHHBeforeLogin(isBillPayBeforeLogin);
  }

  render () {
    const {navigation, status, accountTo,  accountFrom = {}, resultData = {}, onClose, date,
      onCloseLogin, isBillPayBeforeLogin, custPoin, transRefNum, paymentStatusData, custPoinCurrenncy, isNoFund, goToSplitBill, isLuckyDipActive, goToHHH} = this.props;
    const merchantName = result(navigation, 'state.params.jsonData.59', '');
    const merchantLocation = result(navigation, 'state.params.jsonData.60', '');
    const accountNumber = isEmpty(accountFrom) ? result(navigation, 'state.params.data.data.accountNo.accountNumber') : result(accountFrom, 'accountNumber', '');
    const accountName = isEmpty(accountFrom) ? result(navigation, 'state.params.data.data.accountNo.name') : result(accountFrom, 'name', '');
    const productType = isEmpty(accountFrom) ? result(navigation, 'state.params.data.data.accountNo.productType') : result(accountFrom, 'productType', '');
    const amount = Number(result(resultData, 'amountNumber', 0));
    const tips = Number(result(resultData, 'tipAmount', 0));
    const amountFee = (Number(amount) + Number(tips));
    const failedCrossBorderRRN = result(paymentStatusData, 'failedRRN', '');
    const transRefRrn = transRefNum;
    const transNumRrn = failedCrossBorderRRN !== '' ? failedCrossBorderRRN : transRefRrn.substring(transRefRrn.length - 12, transRefRrn.length);
    const currentDate = new Date();
    const showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    let accountNumberPending = result(paymentStatusData, 'merchantName.accountNumber', '');
    let accountNamePending = result(paymentStatusData, 'accountFrom.name');
    const accountToPending = result(paymentStatusData, 'accountTo', '');
    const productTypePending = result(paymentStatusData, 'accountFrom.productType', '');
    const amountPending = Number(result(paymentStatusData, 'resultData.amountNumber', 0));
    const tipsPending = Number(result(paymentStatusData, 'resultData.tipAmount', 0));
    const amountFeePending = (Number(amountPending) + Number(tipsPending));
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    const customerPan = result(resultData, 'billPaymentMap.bpMap.customerPan', '');
    const merchantPan = result(resultData, 'billPaymentMap.bpMap.merchantPan', '');
    const terminalId = result(resultData, 'billPaymentMap.bpMap.terminalId', '');
    const trimTerminalId = terminalId.trim();
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.contentContainerStyle}>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
            <View style={styles.middleContainerTop}>
              <View style={styles.titleContainer}>
                { status === 'SUCCESS' || status === 'PENDING_RC68' ? 
                  null :
                  <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                }

                {status === 'SUCCESS' || status === 'PENDING_RC68' ? 
                  null :
                  <View>
                    <Text style={styles.transactionDate}>{date}</Text>
                  </View>

                }
              </View>
              <View style={[styles.row, styles.ph20]}>
                <View style={styles.columnHeader}>
                  { status === 'PENDING' ? null :
                    status === 'SUCCESS' || status === 'PENDING_RC68' ?
                      <View>
                        <Image source={SimobiPlus} style={styles.mainTitleLogoSuccess}/>
                      </View>
                      : null
                  }

                  <View style={styles.mainTitle}>
                    { status === 'SUCCESS'  ?
                      <Text style={styles.mainTitleText2}>{language.SCREEN__QR_SUCCESS}</Text>
                      : status === 'PENDING_RC68' ?
                        <Text style={styles.mainTitleText2}>{language.PAYMENT_STATUS__PENDINGRC68}</Text>
                        :
                        status === 'PENDING' ?
                          <View>
                            <Text style={styles.mainTitleText}>{language.PAYMENT_STATUS__PENDING}</Text>
                            <Text style={styles.mainTitleTextQr}>{language.QR__TRANSACTION_PENDING} {merchantName}</Text>
                          </View>
                          :
                          <View>
                            <Text style={styles.mainTitleText}>{language.QR__REDEEM_SUCCESS}</Text>
                            <Text style={styles.mainTitleText}>{merchantName} {language.QR__REDEEM_FAILED}</Text>
                          </View>
                    }
                    { isNoFund ?
                      <View style={styles.refnumContainer}>
                        <Text style={styles.transRefNum}>{language.RESPONSE_MESSAGE__RC_51}</Text>
                      </View> : null
                    }
                    { status === 'SUCCESS' || status === 'PENDING_RC68' ? null :
                      transRefNum === '' || transRefNum === null ? 
                        null :
                        <View style={styles.refnumContainer}>
                          <Text style={styles.transRefNum}>{language.PAYMENT_STATUS__NO_TRANS} {transRefNum}</Text>
                        </View>
                    }
                    { status === 'SUCCESS'  || status === 'PENDING_RC68' ? 
                      null :
                      transNumRrn === '' || transNumRrn === null ? 
                        null :
                        <View style={styles.refnumContainer}>
                          <Text style={styles.transRefNum}>{language.PAYMENT_STATUS__RRN_TRANS2} {transNumRrn}</Text>
                        </View>
                    }
                  </View>
                </View>
                {status === 'SUCCESS' ?
                  <View>
                    <Image source={SuccesIcon} style={styles.logoSuccess} />
                    <View style={styles.headerButtonContainer}>
                      <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture} />
                      <SimasIcon name={'close-black'} style={styles.close} size={15} onPress={isBillPayBeforeLogin ? onCloseLogin : onClose} />
                    </View>
                  </View>
                  : status === 'PENDING_RC68' ?
                    <View>
                      <Image source={PendingIcon} style={styles.logoPendingNew} />
                      <View style={styles.headerButtonContainer}>
                        <SimasIcon name={'export'} style={styles.share} onPress={this.screenCapture} />
                        <SimasIcon name={'close-black'} style={styles.close} size={15} onPress={isBillPayBeforeLogin ? onCloseLogin : onClose} />
                      </View>
                    </View>                
                    : status === 'PENDING' ?
                      <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                      :
                      <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                }
              </View>
              <View>
                {status === 'SUCCESS' || status === 'PENDING_RC68' ? 
                  null :
                  <View style={styles.borderGreyTop}/>
                }
              </View>
              <View>
                {status === 'SUCCESS' || status === 'PENDING' || status === 'PENDING_RC68' ?
                  <View>
                    <View>
                      <View style={styles.amount}>
                        { status === 'SUCCESS' || status === 'PENDING_RC68' ?
                          <View>
                            <View>
                              <Text>{language.TOTAL__AMOUNT}</Text>
                              <Text style={styles.amountBill2}>Rp {currencyFormatter(amountFee)}</Text>
                            </View>
                            <View style={styles.payment}>
                              <View style={styles.containerPayment}>
                                <Text>{language.GENERIC_PAY_DETAIL}</Text>
                                <View>
                                  <Touchable onPress={goToSplitBill(amountFee)}>
                                    <Text style={styles.splitBillText}>{language.SPLITBILL__BUTTON}</Text>
                                  </Touchable>
                                </View>
                              </View>
                            </View>
                            <View style={styles.row}>
                              <Text style={styles.black}>{language.QR_GPN__WITHDRAWAL_AMOUNT}</Text>
                              <Text style={[styles.accNo, styles.roboto]}>Rp {currencyFormatter(resultData.amountNumber)}</Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={styles.black}>{language.QR_GPN_GIVE_MANUAL_TIPS}</Text>
                              <Text style={[styles.accNo, styles.roboto]}>Rp {currencyFormatter(resultData.tipAmount)}</Text>
                            </View>
                            { !isEmpty(custPoin) ?
                              <View style={styles.row}>
                                <Text style={styles.black}>{language.QR_GPN_GIVE_MANUAL_CASHBACK}</Text>
                                {custPoinCurrenncy === 'simaspoin' ?
                                  <View style={styles.rowShort}>
                                    <Text style={[styles.accNo, styles.roboto]}>{custPoin} </Text>
                                    <Image source={Poin}style={styles.poinImage}/>
                                  </View> :
                                  <View style={styles.rowShort}>
                                    <Text style={[styles.accNo, styles.roboto]}>Rp {custPoin} </Text>
                                  </View>
                                }
                              </View>
                              : null
                            }

                            <View style={styles.from}>
                              <Text>{language.GENERIC_PAY_FROM}</Text>
                              <View>
                                <View style={styles.rowAlign}>
                                  <View>
                                    <Text style={[styles.accNo, styles.roboto]}>{accountName}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{customerPan}</Text>
                                    <Text style={[styles.product, styles.roboto]}>{productType} {accountNumber}</Text>
                                  </View>
                                </View>
                                <View>
                                  <View style={styles.sento} />
                                  <Text>{language.GENERIC_PAY_SENT}</Text>
                                  <View>
                                    <View style={styles.type}>
                                      <Text style={[styles.accNo, styles.roboto]}>{merchantName} - {toTitleCase(merchantLocation)}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{merchantPan}</Text>
                                      <Text style={[styles.product, styles.roboto]}>{accountTo}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          : 
                          <View>
                            <View style={styles.titleContainer}><Text style={styles.receiptText}>{language.PAYMENT_STATUS__RECEIPT}</Text></View>
                            <View style={styles.borderTop} />
                            <View style={styles.totalContainer}>
                              <Text style={styles.total}>{language.PAY_QRPAYMENT__TITLE}</Text>
                              <View style={styles.amountContainer}>
                                <Text style={styles.totalAmount}>Rp {currencyFormatter(amountFeePending)}</Text>
                              </View>
                            </View>
                            <View style={styles.totalContainer}>
                              <Text style={styles.total}>{language.QR_GPN__WITHDRAWAL_AMOUNT}</Text>
                              <View style={styles.amountContainer}>
                                <Text style={styles.total}>Rp {currencyFormatter(amountPending)}</Text>
                              </View>
                            </View>
                            <View style={styles.totalContainer}>
                              <Text style={styles.total}>{language.QR_GPN_GIVE_MANUAL_TIPS}</Text>
                              <View style={styles.amountContainer}>
                                <Text style={styles.total}>Rp {currencyFormatter(tipsPending)}</Text>
                              </View>
                            </View>
                            <View style={styles.borderTop} />
                            <View style={styles.timeInitiate}>
                              <Text style={styles.timeInitiateText}>On {showTime}</Text>
                            </View>
                            <View style={styles.senderDetail}>
                              <SimasIcon name={'wallet'} size={30} style={styles.walletIcon}/>
                              <View style={styles.rightItemContainer}>
                                <Text style={styles.sendAccNumber}>{accountNumberPending}</Text>
                                { accountNamePending === '' ? 
                                  null :
                                  <Text style={styles.sendAccNameType}>{accountNamePending}</Text>
                                }
                                { productTypePending === '' ? 
                                  null :
                                  <Text style={styles.sendAccNameType}>{productTypePending}</Text>
                                }
                              </View>
                            </View>
                            <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                            <View style={styles.payeeDetail}>
                              <SimasIcon name={'sendto'} size={30} style={styles.profileIcon}/>
                              <View style={styles.rightItemContainer}>
                                <Text style={styles.sendAccNumber}>{merchantName}</Text>
                                <Text style={styles.sendAccNameType}>{accountToPending}</Text>
                              </View>
                            </View>
                          </View>
                        }
                      </View>
                    </View>
                  </View>
                  : null}
              </View>

              {status === 'SUCCESS' || status === 'PENDING_RC68' ?
                <View style={styles.border}/>
                : null
              }

              {status === 'SUCCESS' || status === 'PENDING_RC68' ?
                <View style ={styles.ph15}>
                  <Text>{language.SUCCESS__TRANSACTION_DETAIL} </Text>
                </View>
                : null
              }

              {status === 'SUCCESS' || status === 'PENDING_RC68' ?
                <View style={styles.transdetail}>
                  <Text style={[styles.roboto]}>{language.DATE__TIME_SUCCESS}</Text>
                  <Text style={ [styles.time, styles.roboto]}>{date}</Text>
                </View>
                : null
              }
              { status === 'SUCCESS' || status === 'PENDING_RC68' ?
                transRefNum !== '' || transRefNum !== null ?
                  <View style={styles.transdetailId} >
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__ID_TRANS} </Text>
                    <Text style={[styles.trans, styles.roboto]}>{transRefNum}</Text>
                  </View>
                  : null : <Text/>
              }
              { status === 'SUCCESS' || status === 'PENDING_RC68' ?
                transNumRrn !== '' || transNumRrn !== null ?
                  <View style={styles.transdetailId} >
                    <Text style={[styles.roboto]}>{language.PAYMENT_STATUS__RRN_TRANS} </Text>
                    <Text style={[styles.trans, styles.roboto]}>{transNumRrn}</Text>
                  </View>
                  : null : <Text/>
              }

              { status === 'SUCCESS' || status === 'PENDING_RC68' ?
                transNumRrn !== '' || transNumRrn !== null ?
                  <View style={styles.transdetailId} >
                    <Text style={[styles.roboto]}>{language.QR_PAYMENT_STATUS_TERMINAL_ID} </Text>
                    <Text style={[styles.trans, styles.roboto]}>{trimTerminalId}</Text>
                  </View>
                  : null : <Text/>
              }

              <View style={styles.middleContainerBoth}>
                {status === 'SUCCESS' || status === 'PENDING_RC68' ? 
                  null :
                  <View>
                    <View style={styles.helpContainer}>
                      <Text style={styles.transaction}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
                    </View>
                    <View style={styles.helpContainer}>
                      <Text style={styles.transaction}>{language.PAYMENT_STATUS__DOWNLOAD} <Text style={styles.redText} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
                    </View>
                  </View>
                }
              </View>
              {status === 'SUCCESS' ?
                <View>
                  <View>
                    <View style={styles.borderBottom}/>
                    <View>
                      <Text style={styles.receipt}>{language.PAYMENT_STATUS__NEW_SUCCESS}</Text>
                    </View>
                  </View>
                  {isLuckyDipActive === 'INACTIVE' || isLuckyDipActive === 'inactive' ? 
                    null :
                    <View style={styles.paddingHHH}>
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
                  }
                </View>
                :
                null
              }
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
                    />
                  </View>
                  <View>
                    <Text style={styles.tncTxt}>{language.AUTO_SAVE_DESCRIPTION}</Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          {status === 'SUCCESS'  ? null :
            status === 'PENDING' || status === 'PENDING_RC68' ?
              <View style={styles.buttonContainerbot}>
                <View style={styles.button}>
                  <SinarmasButton buttonType='bw' onPress={this.screenCapture} text={language.PAYMENT_STATUS__SHARE}/>
                </View>
                <View style={styles.button}>
                  <SinarmasButton onPress={isBillPayBeforeLogin ? onCloseLogin : onClose} text={language.SERVICE__OK_BUTTON}/>
                </View>
              </View>
              :
              <View style={styles.buttonContainer}>
                <SinarmasButton onPress={isBillPayBeforeLogin ? onCloseLogin : onClose} text={language.SERVICE__OK_BUTTON}/>
              </View>
          }
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatus);

