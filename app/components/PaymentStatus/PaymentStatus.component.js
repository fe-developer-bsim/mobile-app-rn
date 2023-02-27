import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import noop from 'lodash/noop';
import moment from 'moment';
import styles from './PaymentStatus.styles';
import {language} from '../../config/language';
import Icon from '../../assets/fonts/SimasIcon';
import {theme} from '../../styles/core.styles';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import map from 'lodash/map';
import {Bar} from 'react-native-progress';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';

class PaymentStatus extends Component {

  static propTypes = {
    type: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    transactionId: PropTypes.string,
    onClose: PropTypes.func,
    transactionType: PropTypes.string,
    details: PropTypes.string,
    amount: PropTypes.string,
    transactionDate: PropTypes.string,
    displayList: PropTypes.object,
    maturityDate: PropTypes.string,
    dataDetailList: PropTypes.object,
    qrStatus: PropTypes.object,
    errorText: PropTypes.string,
    logoutFunc: PropTypes.func,
    logout: PropTypes.bool,
    transferTime: PropTypes.string,
    scheduledTime: PropTypes.string,

  }

  render () {
    const {
      type = 'LOADING', displayList = {}, dataDetailList = {}, heading = '', subheading = '', details = '', amount = '', transactionType = '',
      transactionId = '', transactionDate = new Date(), onClose = noop, maturityDate = '', qrStatus = {}, errorText, logout = false,
      logoutFunc} = this.props;
    const assetMap = {
      get SUCCESS () {
        return {title: `${language.GENERIC__SUCCESSFUL}!`,
          iconName: 'success',
          styles: styles.successIcon};
      },
      get FAILED () {
        return {title: `${language.GENERIC__FAILED}!`,
          iconName: 'failure',
          styles: styles.failureIcon};
      },
      get LOADING () {
        return {title: `${language.GENERIC__IN_PROCESS}!`};
      }
    };
    const couponProgress = isEmpty(qrStatus) ? 0 : result(qrStatus, 'pointsBalance', 0) / result(qrStatus, 'pointAmountForCoupon', 0);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{transactionType}</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.detailContainer}>
            <View style={styles.middleContainer}><Text style={styles.status}>{transactionType} {assetMap[type].title}</Text></View>
            {type === 'LOADING' ?
              <ActivityIndicator size={theme.spinnerSizeLarge} animating color={styles.spinnerColor} /> :
              <Icon size={100} style={assetMap[type].styles} name={assetMap[type].iconName}/>
            }
            <View style={styles.middleContainer}>
              {
                errorText &&
                <View style={styles.errorContainer}><Text style={styles.errorText}>{errorText}</Text></View>
              }
              <View style={styles.textContainer}><Text style={styles.heading}>{heading}</Text></View>
              <View style={styles.textContainer}><Text style={styles.subHeading}>{subheading || ''}</Text></View>
              <View style={styles.textContainer}><Text style={styles.subHeading}>{details || ''}</Text></View>
              <View style={styles.textContainer}><Text style={styles.amount}>{amount || ''}</Text></View>
              <View style={styles.textContainer}><Text style={styles.subHeadingCustom}>Transaction ID: <Text style={styles.subHeading}>{transactionId || language.GENERIC__NOT_AVAILABLE}</Text> </Text></View>



              {type !== 'LOADING' &&
              <View style={styles.contentWidth}>
                <View style={styles.textContainer}>
                  <Text style={styles.subHeadingCustom}>{`${language.GENERIC__TIME}${' : '}${moment(transactionDate).format('D MMM YYYY, h:mm a')}`}</Text>
                </View>
              </View>
              }
            </View>
            <View style={styles.middleContainer}>
              {maturityDate !== '' &&
                <View>
                  <Text style={styles.bottomText}>{language.PAYMENT__STATUS_ON_TIME_DEPOSIT}</Text>
                  <Text style={styles.bottomText}>{language.PAYMENT__STATUS_ON_TIME_DEPOSIT_SUBTITLE}</Text>
                  <Text style={styles.bottomText}>{`${language.TIME_DEPOSIT__MATURITY_DATE}${': '}${moment(maturityDate).format('D MMM YYYY, h:mm a')}`}</Text>
                </View>
              }
            </View>
            {
              !isEmpty(qrStatus) &&
              <View>
                <View style={styles.greyLineFull}/>
                <View style={styles.middleContainer}>
                  <View style={styles.textContainer}><Text style={styles.couponPointGet}>{language.PAY_BY_QR__YOU_GOT}</Text></View>
                  <View style={styles.pointContainer}><Text style={styles.greenXXlText}>{result(qrStatus, 'pointsGenerated', 0)}</Text></View>
                  <View style={styles.textContainer}><Text style={styles.couponPoints}>{language.PAY_BY_QR__POINTS}</Text></View>
                  <View style={styles.pointsBarContainer}>
                    <Bar progress={couponProgress} width={200} borderColor={styles.greenProgress} unfilledColor={styles.greyProgress} color={styles.greenProgress}/>
                  </View>
                  <View style={styles.textContainer}><Text style={styles.couponPoints}>{result(qrStatus, 'pointsBalance', 0)}/{result(qrStatus, 'pointAmountForCoupon', 0)} {language.PAY_BY_QR__POINTS_GET_COUPON}</Text></View>
                  {
                    result(qrStatus, 'couponsGenerated', 0) > 0 &&
                    <View>
                      <View style={styles.couponGainedTextContainer}><Text style={styles.couponGetBlack}><Text style={styles.couponGet}>{result(qrStatus, 'couponsGenerated', 0)}x {language.PAY_BY_QR__COUPON}</Text> {language.PAY_BY_QR__GAINED}</Text></View>
                      <View style={styles.additionalPadding}/>
                      <View style={styles.textContainer}><Text style={styles.couponPoints}>{language.PAY_BY_QR__COUPON_HAVE}</Text></View>
                      <View style={styles.couponContainer}>
                        <View style={styles.iconContainer}>
                          <View style={styles.icon}>
                            <SimasIcon name={'qr-coupon'} size={100} style={styles.qrIcon}/>
                          </View>
                          <View style={styles.icon}>
                            <Text style={styles.qrIconText}>{result(qrStatus, 'couponsBalance', 0)}x</Text>
                          </View>
                        </View>
                        <View style={styles.couponValueContainer}>
                          <View style={styles.couponValueText}>
                            <Text style={styles.qrIconAmount}>{result(qrStatus, 'rewardType', '') === 'CASH' ? 'Rp ' + currencyFormatter(result(qrStatus, 'couponValue', 0)) : result(qrStatus, 'couponValue', 0) + '% ' + language.PAY_BY_QR__DISCOUNT}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                </View>
              </View>
            }

            {!isEmpty(dataDetailList) || !isEmpty(displayList)  ?
              <View>
                <View style={styles.greyLineFull}/>
                <View style={styles.middleContainer}>
                  <View style={styles.textContainer}><Text style={styles.transactionDetails}>Transaction Details</Text></View>
                </View>
              </View>
              :
              null
            }

            <View style={styles.middleContainer}>
              {map(dataDetailList, (value, k) => (
                (!isEmpty(dataDetailList) ?
                  (value ?
                    <View key={k} style={styles.row}>
                      <View style={styles.halfWidth}><Text style={styles.lightText}>{language[k]}</Text></View>
                      <View style={styles.halfWidth}><Text style={styles.boldCard}>{value}</Text></View>
                    </View>
                    :
                    <View key={k} style={styles.row}>
                      <View><Text style={styles.lightText}>{language[k]}</Text></View>
                    </View>
                  )
                  :
                  null
                )
              )
              )}
            </View>

            <View style={styles.middleContainer}>
              {map(displayList, (value, k) => (
                (value ?
                  <View key={k} style={styles.row}>
                    <View style={styles.halfWidth}><Text style={styles.lightText}>{k}</Text></View>
                    <View style={styles.halfWidth}><Text style={styles.boldCard}>{value}</Text></View>
                  </View>
                  :
                  <View key={k} style={styles.row}>
                    <View><Text style={styles.lightText}>{k}</Text></View>
                  </View>
                )
              )
              )}
            </View>

          </View>
          {logout ?
            <View style={styles.bottomContainer}>
              <SinarmasButton onPress={logoutFunc} disabled={type === 'LOADING'}>
                <Text style={buttonLargeTextStyle}>{language.PROFILE__LOGOUT_BUTTON}</Text>
              </SinarmasButton>
            </View>
            :
            <View style={styles.bottomContainer}>
              <SinarmasButton onPress={onClose} disabled={type === 'LOADING'}>
                <Text style={buttonLargeTextStyle}>{language.SERVICE__OK_BUTTON}</Text>
              </SinarmasButton>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

export default PaymentStatus;
