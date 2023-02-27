import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import styles from './UltraVoucherPaymentStatus.styles';
import {Toast} from '../../utils/RNHelpers.util';
import SimobiPlus from '../../assets/images/simobiplus.png';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import ViewShot from 'react-native-view-shot';
import {result, isEmpty, noop} from 'lodash';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class PaymentStatus extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    onCheckout: PropTypes.func,
    orderNumber: PropTypes.string,
    status: PropTypes.string,
    email: PropTypes.string,
    storeName: PropTypes.string,
    transRefNum: PropTypes.string,
    date: PropTypes.string,
    day: PropTypes.string,
    time: PropTypes.string,
    total: PropTypes.string,
    description: PropTypes.string,
    totalItems: PropTypes.string,
    voucherRedeemAmount: PropTypes.string,
    voucherCurrency: PropTypes.string,
    note: PropTypes.string,
    sourceAccount: PropTypes.object,
    resultData: PropTypes.object,
    voucherValidity: PropTypes.bool,
    goToOrderHistory: PropTypes.func
  }

  state = {
    height: 0,
    width: 0
  }

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
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
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
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
  goToOrderHistory = () => {
    const {goToOrderHistory, storeName} = this.props;
    goToOrderHistory(storeName);
  }
  render () {
    const {
      status = '', resultData = {}, orderNumber, storeName,
      onClose = noop, date = '', transRefNum = '', totalItems, day,
      total = 0, sourceAccount = {}, email, description, time,
      voucherRedeemAmount, voucherValidity, voucherCurrency, note,
    } = this.props;
    const sourceAccNumber = result(sourceAccount, 'accountNumber', '');
    const sourceAccType = result(sourceAccount, 'accountType', '');
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };
    const voucherAmountView = voucherCurrency === 'simaspoin' ? voucherRedeemAmount + ' ' + language.GENERIC__SIMAS_POIN : 'Rp ' + voucherRedeemAmount;
    const questionsMapping = {
      'ULTRA VOUCHER': language.ULTRA_VOUCHER__QUESTIONS,
      'ALFAMART': language.ALFAMART__QUESTIONS,
      'ALFACART': language.ALFAMART__QUESTIONS,
      'UNIPIN': language.UNIPIN__QUESTIONS,
    };
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.contentContainerStyle}>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
            {
              status === 'SUCCESS' || status === 'PENDING' ?
                <View style={styles.topContainer}>
                  <View style={styles.header}>
                    <View style={styles.flex1}>
                      <Text style={Platform.OS === 'android' ? styles.status : styles.statusIOS}>{status === 'SUCCESS' ? language.ULTRA_VOUCHER__HEADER_SUCCESS : status === 'PENDING' ? language.ULTRA_VOUCHER__HEADER_PENDING : language.ULTRA_VOUCHER__HEADER_STATUS}</Text>
                    </View>
                  </View>

                  <View style={styles.whiteBoxContainer}>
                    <View style={styles.contentHeader}>
                      <View style={styles.logoAndDateContainer}>
                        <Image source={SimobiPlus} style={styles.simobiLogo} resizeMode={'contain'} />
                        <Text>{date}, {time}</Text>
                      </View>
                      <SimasIcon
                        name={status === 'SUCCESS' || status === 'PENDING' ? 'success-circle' : 'fail-circle'}
                        style={status === 'SUCCESS' ||  status === 'PENDING' ? styles.logoSuccess : styles.logoFail}
                        size={50}
                      />
                      <Text style={styles.contentHeaderStatus}>{status === 'SUCCESS' ? language.ULTRA_VOUCHER__STATUS_SUCCESS : status === 'PENDING' ? language.ULTRA_VOUCHER__STATUS_IN_PROCESS : language.ULTRA_VOUCHER__STATUS_FAILED}</Text>
                      {transRefNum === '' || transRefNum === null ?
                        null :
                        <View style={styles.refnumContainer}>
                          <Text style={styles.transRefNum}>{language.GENERIC__TRANSACTION_ERROR} {transRefNum}</Text>
                        </View>
                      }
                    </View>
                    <View style={styles.greyLine} />
                    {
                      isEmpty(resultData) ?
                        null
                        :
                        <View>
                          <Text style={styles.detailHeader}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                          <View style={styles.detailContainer}>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailText}>{language.ALFACART_ORDER__NUMBER_SCREEN}</Text>
                              <Text style={styles.detailValueText}>{orderNumber}</Text>
                            </View>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailText}>{language.ULTRA_VOUCHER__PURCHASE_DATE}</Text>
                              <Text style={styles.detailValueText}>{day}, {date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailText}>{language.GENERIC__FORM_EMAIL}</Text>
                              <Text style={styles.detailValueText}>{email}</Text>
                            </View>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailText}>{language.ALFACART_STORE__NAME_PAYMENT}</Text>
                              <Text style={styles.detailValueText}>{storeName}</Text>
                            </View>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailText}>{language.ULTRA_VOUCHER__TOTAL_ITEMS}</Text>
                              <Text style={styles.detailValueText}>{totalItems} items</Text>
                            </View>
                            <View style={styles.detailRow}>
                              <Text style={styles.detailText}>{language.PAYMENT_STATUS__SOURCE_ACCOUNT}</Text>
                              <Text style={styles.detailValueText}>{sourceAccType}{'\n'}{sourceAccNumber}</Text>
                            </View>
                            <View style={styles.greyLine} />
                            <View style={styles.detailRow}>
                              <Text style={styles.totalText}>{language.GENERIC__GRAND_TOTAL}</Text>
                              <Text style={styles.totalValueText}>Rp {total}</Text>
                            </View>
                            {voucherValidity ?
                              <View style={styles.detailRow}>
                                <Text style={styles.detailText}>{language.GENERIC__TITLE_COUPON}</Text>
                                <Text style={styles.detailValueText}>{voucherAmountView}</Text>
                              </View>
                              : null
                            }
                          </View>
                        </View>
                    }
                    <Text style={styles.detailFooterTextGrey}>{questionsMapping[storeName.toUpperCase()]}</Text>
                    <View style={styles.greyLine} />

                    <View style={styles.footerContainer}>
                      {
                        isEmpty(resultData) ? 
                          null :
                          <View>
                            <Text style={styles.noteText}>{language.RECURRING__MESSAGE}</Text>
                            {
                              isEmpty(description) ? 
                                null :
                                <Text style={styles.noteValueText}>{description}</Text>
                            }
                            <Text style={styles.additionalInfo}>{note}</Text>
                          </View>
                      }

                      <Text style={styles.noteText}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.footerTextRed} onPress={this.call}>1500 153</Text></Text>
                      {
                        isEmpty(resultData) ?
                          null
                          :
                          <Text style={styles.footerTextGrey}>{language.CGV__HELP_03}</Text>
                      }
                    </View>
                  </View>
                </View>
                :
                // kalau status payment failed (tampilan lama)
                <View style={styles.failContainer}>
                  <View style={styles.logoAndDateContainerFail}>
                    <Image source={SimobiPlus} resizeMode={'contain'} />
                    <Text>{date}, {time}</Text>
                  </View>

                  <View style={styles.titleContainerFail}>
                    <Text style={styles.titleFail}>{language.ALFACART_CHECKOUT_PAYMENT_TITTLE}{'\n'}{language.QR_GPN__MERCHANT_FAILED}</Text>
                    <SimasIcon name={'fail-circle'} size={50} style={styles.logoFail} />
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.textBlack}>{language.PAYMENT_STATUS__ID_TRANS}</Text>
                    <Text style={styles.textBlack}>{transRefNum}</Text>
                  </View>

                  <View style={styles.dashedLine} />

                  <Text style={styles.noteTextFail}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.footerTextRed} onPress={this.call}>1500 153</Text></Text>

                  <View style={styles.button}>
                    <SinarmasButton onPress={onClose}>
                      <Text style={styles.doneButtonText}>{language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}</Text>
                    </SinarmasButton>
                  </View>
                </View>
            }

          </ViewShot>
          {status === 'SUCCESS' || status === 'PENDING' ?
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <SinarmasButton style={styles.doneButton} onPress={this.goToOrderHistory}>
                  {/* <Image source={shareIcon} style={styles.shareIcon}/> */}
                  <Text style={styles.doneButtonText}>{language.SIMAS_CATALOG__GOTOORDERHISTORY}</Text>
                </SinarmasButton>
              </View>
              <View style={styles.button}>
                <SinarmasButton onPress={onClose} style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>{language.BUTTON__BACK_TO_HOME}</Text>
                </SinarmasButton>
              </View>
            </View>
            :
            null
          }
        </ScrollView>
      </View>
    );
  }
}

export default PaymentStatus;
