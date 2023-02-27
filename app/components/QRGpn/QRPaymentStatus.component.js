import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Linking} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './QRPaymentStatus.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import split from 'lodash/split';
import {currencyFormatter, getDayName} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';
import SimobiPlus from '../../assets/images/simobiplus.png';
import PropTypes from 'prop-types';
import moment from 'moment';
import LayeredIcon from '../LayeredIcon/LayeredIcon.component';
import LinearGradient from 'react-native-linear-gradient';
import LuckyImage from '../../assets/images/IconBoxLuckyDip.png';

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
    goToHHH: PropTypes.func,
    goToHHHBeforeLogin: PropTypes.func,
    isLuckyDipActive: PropTypes.string
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

  closeLoginHHH = () => {
    const {isBillPayBeforeLogin, goToHHHBeforeLogin} = this.props;
    goToHHHBeforeLogin(isBillPayBeforeLogin);
  }
  render () {
    const {navigation, status, accountTo,  accountFrom = {}, resultData = {}, onClose, date, onCloseLogin, onCloseLanding, isBillPayBeforeLogin, couponStatusPayment, isLuckyDipActive, goToHHH} = this.props;
    const merchantName = result(navigation, 'state.params.jsonData.59', '');
    let accountNumber = result(accountFrom, 'accountNumber');
    let accountName = result(accountFrom, 'name');
    const productType = result(accountFrom, 'productType');    
    const transRefNum = result(resultData, 'billPaymentMap.transactionReferenceNumber', '');
    const currentDate = new Date();
    const showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const amount = Number(result(resultData, 'amountNumber', 0));
    const tips = Number(result(resultData, 'tipAmount', 0));
    const amountFee = (Number(amount) + Number(tips));

    let divideAccount = [];

    if (isBillPayBeforeLogin) {
      if (accountFrom) {
        divideAccount = split(accountFrom, '•');
        accountNumber = isBillPayBeforeLogin ? divideAccount[0] : accountNumber;
        accountName = isBillPayBeforeLogin ? divideAccount[1] : accountName;
      }
    }

    

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
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <View style={styles.topContainer}>
              <View style={styles.logoContainer}>
                <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                <Text style={styles.date}>{date}</Text>
              </View>
              <View style={styles.header}>
                <View style={styles.flex1}>
                  {status === 'SUCCESS' ? <Text style={styles.status}>{language.QR__TRANSACTION_SUCCESS}</Text> : null}
                  <Text style={styles.description}>{language.QR__REDEEM_SUCCESS}</Text>
                  <Text style={styles.description}>{merchantName} {status === 'SUCCESS' ? language.GENERIC__SUCCESSFUL : status === 'PENDING'  ? language.QR__TRANSACTION_PENDING : language.QR__REDEEM_FAILED}</Text>
                </View>
                { status === 'SUCCESS' ?
                  <SimasIcon name={'success-circle'} style={styles.logoSuccess} size={50}/>
                  : status === 'PENDING'   ?
                    <SimasIcon name={'success-circle'} style={styles.logoSuccess} size={50}/>
                    :
                    <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                }
              </View>
              {transRefNum === '' || transRefNum === null ? 
                null :
                <View style={styles.refnumContainer}>
                  <Text style={styles.transRefNum}>{language.TRANSFERSTATUS__TRANSACTION_ID}: {transRefNum}</Text>
                </View>
              }
            </View>
            {
              isEmpty(resultData) ?
                null
                :
                <View style={styles.middleContainer}>
                  <View style={styles.titleContainer}><Text style={styles.total}>{language.PAYMENT_STATUS__RECEIPT}</Text></View>
                  <View style={styles.borderTop} />
                  <View style={styles.totalContainer}>
                    <Text style={styles.total}>{language.PAY_QRPAYMENT__TITLE}</Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.totalAmount}>Rp {currencyFormatter(amountFee)}</Text>
                    </View>
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.total}>{language.QR_GPN__WITHDRAWAL_AMOUNT}</Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.total}>Rp {currencyFormatter(resultData.amountNumber)}</Text>
                    </View>
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.total}>{language.QR_GPN_GIVE_MANUAL_TIPS}</Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.total}>Rp {currencyFormatter(resultData.tipAmount)}</Text>
                    </View>
                  </View>
                  <View style={styles.borderTop} />
                  <View style={styles.timeInitiate}>
                    <Text style={styles.timeInitiateText}>On {showTime}</Text>
                  </View>
                  <View style={styles.senderDetail}>
                    <SimasIcon name={'wallet'} size={30} style={styles.walletIcon}/>
                    <View style={styles.rightItemContainer}>
                      <Text style={styles.sendAccNumber}>{accountNumber}</Text>
                      <Text style={styles.sendAccNameType}>{accountName}</Text>
                      <Text style={styles.sendAccNameType}>{productType}</Text>
                    </View>
                  </View>

                  <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>

                  <View style={styles.payeeDetail}>
                    <SimasIcon name={'sendto'} size={30} style={styles.profileIcon}/>
                    <View style={styles.rightItemContainer}>
                      <Text style={styles.sendAccNumber}>{merchantName}</Text>
                      <Text style={styles.sendAccNameType}>{accountTo}</Text>
                    </View>
                  </View>
                </View>
            }
            <View style={styles.borderTopCoupon} />  
            {status === 'SUCCESS' && couponStatusPayment !== '' ?
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
          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <Text style={styles.footerTextGrey}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.footerTextRed} onPress={this.call}>1500 153</Text></Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerTextGrey}>{language.PAYMENT_STATUS__DOWNLOAD} <Text style={styles.footerTextRed} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
            </View>
            <View style={styles.footerItem}>
              {
                isEmpty(resultData) ?
                  null
                  :
                  <Text style={styles.footerTextGrey}>{language.PAYMENT_STATUS__LEGAL}</Text>
              }
              <Text style={styles.footerTextGrey}>{language.PAYMENT_STATUS__SEND_EMAIL}</Text>
            </View>
            {status === 'SUCCESS' || status === 'PENDING' ?
              <View>
                <View style={styles.buttonContainer}>
                  <SinarmasButton onPress={isBillPayBeforeLogin ? onCloseLogin : onClose} text={language.SERVICE__OK_BUTTON}/>
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
              <View style={styles.buttonContainer}>
                <SinarmasButton onPress={isBillPayBeforeLogin ? onCloseLanding : onClose} text={language.SERVICE__OK_BUTTON}/>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PaymentStatus;
