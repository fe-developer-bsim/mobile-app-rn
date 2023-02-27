import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Linking, Platform, ImageBackground, Image} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './NewPaymentStatusRevamp.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {noop, result, map} from 'lodash';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, getDayName, toTitleCase, formatBillDetails} from '../../utils/transformer.util';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import bG from '../../assets/images/backgroud_rev.png';
import {isEmpty} from 'lodash';
import Collapsible from 'react-native-collapsible';
import Touchable from '../../components/Touchable.component';
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
    width: 0,
    summaryCollapsed: true,
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
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
    const {transactionDate = new Date(), navigation, onClose = noop, accountFrom, resData, type, transactionType = '', transactionId, etaxData, etaxPaymentData} = this.props;
    const paramsData = result(navigation, 'state.params', {});
    const isCashout = result(paramsData, 'data.isCashout', true);
    const sourceAccNumber = result(accountFrom, 'accountNumber', '');
    const sourceAccName = result(accountFrom, 'name', '');
    const sourceAccProduct = result(accountFrom, 'productType', '');
    const amount = parseInt(result(resData, 'transferTransaction.amount', ''));
    const feeCout = result(resData, 'bankCharge', '').toString();
    const feeTrf = result(resData, 'transferTransaction.bankCharge', '').toString();
    const fee = isCashout ? feeCout : feeTrf;
    const transRefNum = isCashout ?  result(paramsData, 'resDataTrf.transactionReferenceNumber', '') : result(paramsData, 'resDataTrf.transRefNum', '');
    const transNumRrn = transRefNum.substring(transRefNum.length - 12, transRefNum.length);
    const showTime = getDayName(transactionDate) + ', ' + moment().format('DD MMM YYYY');
    const showTimeTop = moment().format('DD MMM YYYY, hh:mm A');
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    const isEtax = result(etaxData, 'isEtax', '');
    const etaxNonDJPList = formatBillDetails(result(resData, 'result.displayList', []));
    const isTaxDJP = result(etaxData, 'dataConfirmation.isDJP', true);
    const etaxResult = result(etaxPaymentData, 'bpMap', {});
    const tglJamBayar = result(etaxResult, 'tglJamBayar', ' -- ');
    const tglBuku = result(etaxResult, 'tglBuku', ' -- ');
    const kodeCabangBank = result(etaxResult, 'kodeCabangBank', ' -- ');
    const ntbNtp = result(etaxResult, 'ntbNtp', ' -- ');
    const ntpn = result(etaxResult, 'ntpn', ' -- ');
    const stan = result(etaxResult, 'stan', ' -- ');
    const summaryIconStyle = this.state.summaryCollapsed ? styles.iconCollapsedStyle : styles.accordionIcon;
    const amountQrTrf = result(resData, 'transferTransaction.amount', '');
    const amountQrCashout = parseInt(result(paramsData, 'data.data.amountVal', ''));
    const amountVal = isCashout ? amountQrCashout : amountQrTrf;
    const total = isCashout ? (parseInt(amountVal) + parseInt(fee)) : (parseInt(amount) + parseInt(fee));
    const targetAccObject = result(paramsData, 'data.resData.transferTransaction.targetAccountObject', {});
    const targetAccNumber = result(targetAccObject, 'accountNumber', '');
    const jsonData = result(paramsData, 'data.jsonDt', {});
    const merchantName = result(jsonData, '59', '');
    const targetName =  isCashout ? merchantName : result(targetAccObject, 'name', '');
    const notes = result(paramsData, 'data.resData.transferTransaction.description', '');
    const title = type === 'SUCCESS' ? language.GENERIC__SUCCESSFUL : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : type === 'LKDFAILED' ? language.LKD__PAYMENT_STATUS + language.PAYMENT_STATUS__FAILED : transactionType + language.PAYMENT_STATUS__FAILED;
    const transactionTittle = isEtax ? language.ETAX_SUCCESSFUL_TRANSACATION_TITLE : transactionType;
    const merchantLocation = result(jsonData, '60', '');
    const mpan = result(jsonData, '40.01', '');
    const status = type === 'SUCCESS' ? language.GENERIC__SUCCESSFUL : type === 'PENDING' ? language.GENERIC__IN_PROCESS : type === 'FAILED' ? language.GENERIC__FAILED : '';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <ImageBackground source={bG} style={styles.imageSummary} />

        <View style={styles.tes} >

          <View style={styles.containerTransfer}>
            <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>

              <View style={styles.containerBanner}>
                <View style={styles.containerLeft}>
                  <View style={styles.titleContainer}>
                    <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                    <Text style={styles.transactionDate}>{showTimeTop}</Text>
                  </View>
                  <View style={styles.targetAcc}>
                    <SimasIcon name={type === 'SUCCESS' ? 'success-circle' : 'pending-circle'} size={50} style={ type === 'SUCCESS' ? styles.headerIcon : styles.logoPending}/>
                    {
                      isEtax ? 
                        <Text style={styles.targetName}>{transactionTittle} {title}</Text>
                        :
                        <Text style={styles.targetName}>{isCashout ? language.QRCASHOUT_SUCCESS_TITLE : language.QRTRANSFER_SUCCESS_TITLE}{status}</Text>
                    }
                    <View style={styles.transactionNumberContainer}>
                      <Text style={styles.transactionNumber}>{language.PAYMENT_STATUS__NO_TRANS} {isEtax ? transactionId : transRefNum}</Text>
                    </View>
                  </View>
                  <View style={styles.blueLine} />
                  <Text style={styles.receipt}>{isEtax ? language.E_TAX_RECEIPT_PAYMENT_DATA : language.PAYMENT_STATUS__RECEIPT}</Text>

                  {
                    isEtax ?
                      <View> 
                        <View style={styles.accNumberContainer}>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.DATE__TIME_SUCCESS} {language.ALFACART_CHECKOUT_PAYMENT_TITTLE}</Text>
                            <Text style={styles.textAmountNormalRight}>{tglJamBayar}</Text>
                          </View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.E_TAX_RECEIPT_BOOK_DATE}</Text>
                            <Text style={styles.textAmountNormalRight}>{tglBuku}</Text>
                          </View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.E_TAX_RECEIPT_BRANCH_CODE}</Text>
                            <Text style={styles.textAmountNormalRight}>{kodeCabangBank}</Text>
                          </View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.E_TAX_RECEIPT_NTB}</Text>
                            <Text style={styles.textAmountNormalRight}>{ntbNtp}</Text>
                          </View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.E_TAX_RECEIPT_NTPN}</Text>
                            <Text style={styles.textAmountNormalRight}>{ntpn}</Text>
                          </View>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.E_TAX_RECEIPT_STAN}</Text>
                            <Text style={styles.textAmountNormalRight}>{stan}</Text>
                          </View>
                        </View>
                        <Touchable style={styles.collapsibleContainer} onPress={this.summaryCollapse}>
                          <Text style={styles.receipt}>{language.E_TAX_RECEIPT_DEPOSIT_DATA}</Text>
                          <View style={summaryIconStyle} >
                            <SimasIcon name={'chevron'} size={20} style={[styles.collapsibleButton]}/>
                          </View>                        
                        </Touchable> 
                        {
                          isTaxDJP ?
                            <View style={this.state.summaryCollapsed ? styles.accNumberContainerCollapsible : styles.accNumberContainer}>

                              <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>

                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_GENERATE_IDBILLING_SUBHEAD}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.idBilling}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX__FORM_ONE_NPWP}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.npwp}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.GENERIC__NAME}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.nama}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.FORM__ADDRESS}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.alamat}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>NOP</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.nop}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAXPAYER_TAXTYPE_HINT}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.jenisPajak}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAXPAYER_DEPOSITTYPE_HINT}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.jenisSetoran}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAX_PERIOD_SUB}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.dateStart} - {etaxData.values.dateEnd}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAX_YEAR_PICKER}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.tahunPajak}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAX_REGULARITY_NUMBER}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.nomorKetetapan}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAX_DEPOSIT_AMOUNT}</Text>
                                  <Text style={styles.textAmountNormalRight}>Rp {currencyFormatter(etaxData.values.jumlahSetor)}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.ETAX_TAX_COUNTED_AMOUNT}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.terbilang} Rupiah</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                  <Text style={styles.textAmountNormal}>{language.TRANSFER__NOTES}</Text>
                                  <Text style={styles.textAmountNormalRight}>{etaxData.values.berita}</Text>
                                </View>
                              </Collapsible>
                            </View> 
                            : 
                            <View>
                              <View style={this.state.summaryCollapsed ? styles.accNumberContainerCollapsible : styles.accNumberContainer}>
                                <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                                  {map(etaxNonDJPList, (value, k) => {
                                    const nullValue = value === null || value === '';
                                    return (
                                      !nullValue && <View key={k}>
                                        <View style={styles.amountContainer}>
                                          <View><Text style={styles.textAmountNormal}>{toTitleCase(k)}</Text></View>
                                          <View><Text style={styles.textAmountNormalRight}>{value}</Text></View>
                                        </View>
                                      </View>
                                    ); 
                                  }
                                  )}
                                </Collapsible>
                              </View> 
                            </View>
                        }                         
                        

                      </View> :
                      <View>
                        <View style={styles.accNumberContainer}>
                          <View style={styles.amountContainer}>
                            <Text style={styles.textAmountNormal}>{language.QR_GPN__WITHDRAWAL_AMOUNT}</Text>
                            <Text style={styles.textAmountNormal}>{language.CGV__RP} {currencyFormatter(amountVal)}</Text>
                          </View>
                          <View style={styles.amountContainer2}>
                            <Text style={styles.textAmountNormal}>{language.QR_GPN__FEE}</Text>
                            <Text style={styles.textAmountNormal}>{language.CGV__RP} {isEmpty(fee) || fee === null ? '0' : currencyFormatter(fee)}</Text>
                          </View>
                          <View style={styles.greyLineBold} />
                          <View style={styles.amountContainer3}>
                            <Text style={styles.textAmountNormal}>{language.RECURRING__TOTAL}</Text>
                            <Text style={styles.textAmountBold}>{language.CGV__RP} {currencyFormatter(total)}</Text>
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
                              isCashout ? 
                                null :
                                <Text style={styles.sendAccNumber}>{targetAccNumber}</Text>
                            }
                            <Text style={styles.sendAccName}>{toTitleCase(targetName)}</Text>
                          </View>
                        </View>
                        <View style={styles.blueLine} />
                        <View style={styles.extraPadding}>
                          {
                            isCashout ?
                              <View>
                                <View style={styles.mInfoContainer}>
                                  <Text style={styles.smallGreyNote}>{language.PAYMENT_STATUS__RRN_TRANS} : </Text>
                                  <Text style={styles.mInfoText}>{transNumRrn}</Text>
                                </View>
                                <View style={styles.mInfoContainer}>
                                  <Text style={styles.smallGreyNote}>Merchant Location : </Text>
                                  <Text style={styles.mInfoText}>{merchantLocation}</Text>
                                </View>
                                <View style={styles.mInfoContainer}>
                                  <Text style={styles.smallGreyNote}>Merchant Name : </Text>
                                  <Text style={styles.mInfoText}>{merchantName}</Text>
                                </View>
                                <View style={styles.mInfoContainer}>
                                  <Text style={styles.smallGreyNote}>Merchant PAN : </Text>
                                  <Text style={styles.mInfoText}>{mpan}</Text>
                                </View>
                              </View> 
                              : 
                              <View>
                                <Text style={styles.transactionDetailsHeader}>{language.DETAIL_TRANSACTION__HEADER}</Text>
                                <View style={styles.mInfoContainer}>
                                  <Text style={styles.smallGreyNote}>{language.PAYMENT_STATUS__RRN_TRANS} :</Text>
                                  <Text style={styles.mInfoText}>{transNumRrn}</Text>
                                </View>
                                <View style={styles.blueLine} />
                                <Text style={styles.methodExplanation}>{language.TRANSFER__METHOD_FOOTER}</Text>
                              </View>
                          }
                          <Text style={styles.smallGreyNote}>{language.QR_GPN__WITHDRAWAL_NOTE}</Text>
                          <Text style={styles.smallGreyNote}>{notes}</Text>
                          <View style={styles.callText}><Text style={styles.smallGreyNote}>{language.PAYMENT_STATUS__NEED_HELP} </Text><Text style={styles.smallGreyCall} onPress={this.call}> {language.CGV__CALL}</Text></View>
                          <Text style={styles.smallGreyText}>{language.PAYMENT_STATUS__HELP_01}</Text>
                          <Text style={styles.smallGreyText}>{language.PAYMENT_STATUS__HELP_02}</Text>

                        </View>
                      </View>
                  }




                  

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
  etaxData: PropTypes.object,
  etaxPaymentData: PropTypes.object,
  saveImageEtax: PropTypes.func
};

export default CreditCardFinalizeForm;
