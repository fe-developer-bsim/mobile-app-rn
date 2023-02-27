import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {language} from '../../config/language';
import Bar from 'react-native-progress/Bar';
import moment from 'moment';
import styles from './tabCoupon.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, countCoupons} from '../../utils/transformer.util';

class tabDetail extends React.Component {
  static propTypes = {
    promo: PropTypes.object,
  }

  renderCoupon = (coupon) => {
    const {promo = {}} = this.props;
    return (
      <View style={styles.borderedView}>
        <View style={styles.infoContainer}>
          <View style={styles.couponContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>
                <SimasIcon name={'qr-coupon'} size={100} style={styles.qrIcon}/>
              </View>
              <View style={styles.iconText}>
                <Text style={styles.qrIconText}>{coupon.value.length}x</Text>
              </View>
            </View>
            <View style={styles.couponValueContainer}>
              <View style={styles.couponValueText}>
                <Text style={styles.qrIconAmount}>{result(promo, 'rewardType', '') === 'CASH' ? 'Rp ' + currencyFormatter(result(promo, 'discountAmount', 0)) : result(promo, 'discountAmount', 0) + '% ' + language.PAY_BY_QR__DISCOUNT}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.pointsBarContainer}>
          <Text>{language.QR_PROMO__COUPON_VALID}</Text>
          <Text style={styles.couponPoints}>{moment(parseInt(coupon.key)).format('D MMMM YYYY')}</Text>
        </View>
      </View>
    );
  }

  render () {
    const {promo = {}} = this.props;
    const coupons = countCoupons(result(promo, 'fidelitizInfo.coupons', []));
    const couponProgress = result(promo, 'fidelitizInfo.balance', 0) / result(promo, 'pointAmountForCoupon', 0);
    return (
      <View style={styles.container}>
        <View style={styles.borderInfoContainer}>
          <View style={styles.borderedView}>
            <View style={styles.couponContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.icon}>
                  <SimasIcon name={'qr-coupon'} size={100} style={styles.qrIcon}/>
                </View>
              </View>
              <View style={styles.couponValueContainer}>
                <View style={styles.couponValueText}>
                  <Text style={styles.qrIconAmount}>{result(promo, 'rewardType', '') === 'CASH' ? 'Rp ' + currencyFormatter(result(promo, 'discountAmount', 0)) : language.PAY_BY_QR__DISCOUNT + result(promo, 'discountAmount', 0) + '% ' + language.PAY_BY_QR__DISCOUNT}</Text>
                </View>
              </View>
            </View>
            <View style={styles.pointsBarContainer}>
              <Bar progress={couponProgress} width={200} borderColor={styles.greenProgress} unfilledColor={styles.greyProgress} color={styles.greenProgress}/>
              <View style={styles.textContainer}><Text style={styles.couponPoints}>{result(promo, 'fidelitizInfo.balance', 0)}/{result(promo, 'pointAmountForCoupon', 0)} {language.PAY_BY_QR__POINTS_GET_COUPON}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.additionalPadding}/>
        <View style={styles.borderInfoContainer}>

          {isEmpty(coupons) ?
            <View style={styles.titleTextContainer}><Text style={styles.couponDontHave}>{language.PAY_BY_QR__COUPON_DONT_HAVE}</Text></View>
            :
            <View>
              <View style={styles.titleTextContainer}><Text style={styles.couponHave}>{language.PAY_BY_QR__COUPON_HAVE}</Text></View>
              {coupons.map(this.renderCoupon)}
            </View>
          }
        </View>
      </View>
    );
  }
}

export default tabDetail;
