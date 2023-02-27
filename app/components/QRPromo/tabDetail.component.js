import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text} from 'react-native';
import {language} from '../../config/language';
import moment from 'moment';
import styles from './QRPromoDetail.styles';
import {currencyFormatter, getDayName} from '../../utils/transformer.util';

class tabDetail extends React.Component {
  static propTypes = {
    promo: PropTypes.object,
  }

  render () {
    const {promo = {}} = this.props;
    const amountText = 'Rp ' + currencyFormatter(promo.amountPerPoint);
    const discountText = promo.rewardType === 'CASH' ? 'Rp ' + currencyFormatter(promo.discountAmount) : promo.discountAmount + '%';
    const subtitle2_1 = promo.expenseType === 'MONEY' ? language.QR_PROMO__SUBTITLE_2_1_MONEY : language.QR_PROMO__SUBTITLE_2_1_VISIT;
    const subtitle2_2 = promo.expenseType === 'MONEY' ? language.QR_PROMO__SUBTITLE_2_2_MONEY : language.QR_PROMO__SUBTITLE_2_2_VISIT;
    const maxRedeemText = promo.maxRedeem ? promo.maxRedeem + ' ' + language.QR_PROMO__TIMES_A_DAY : language.QR_PROMO__UNLIMITED;
    const discountSubtitle = subtitle2_1 + ' ' + amountText + ' ' + subtitle2_2;
    const showDate = promo.startDate === promo.endDate ? language.DAY__EVERY + getDayName(promo.startDate) : `${moment(promo.startDate).format('D MMMM YYYY')}${' - '}${ moment(promo.endDate).format('D MMMM YYYY')}`;
    return (
      <ScrollView>
        <View style={styles.detailContainer}>
          {
            promo.permanentPercentageDiscount === 0 ?
              <View style={styles.infoContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.promoAmountContainer}>
                    <Text style={styles.discountType}>{promo.loyaltyProgramType === 'POINTS' ? 'VOUCHER' : 'DISCOUNT'}</Text>
                    <Text style={styles.discountAmount}>{promo.loyaltyProgramType === 'POINTS' ? 'Rp ' + currencyFormatter(promo.discountAmount) : promo.permanentPercentageDiscount + '%'}</Text>
                  </View>
                  <View style={styles.qrTag}>
                    <Text style={styles.qrTagText}>{language.PAY_BY_QR__TAG}</Text>
                  </View>
                </View>
                <Text style={styles.detailsGrey}>{language.QR_PROMO__DETAIL}</Text>
                <View style={styles.additionalPaddingSmall}/>
                <Text style={styles.subtitle}>{language.QR_PROMO__SUBTITLE_1} {promo.pointPerExpense} {discountSubtitle}. {language.QR_PROMO__SUBTITLE_3} {promo.pointAmountForCoupon} {language.QR_PROMO__SUBTITLE_4} {discountText} {language.QR_PROMO__SUBTITLE_5}.</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.detailsGrey}>{promo.startDate === promo.endDate ? language.QR_PROMO__VALID_DAY : language.QR_PROMO__VALID_DATE}</Text>
                <View style={styles.additionalPaddingXS}/>
                <Text style={styles.details}>{showDate}</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.detailsGrey}>{language.QR_PROMO__MAXIMUM_REDEEM}</Text>
                <View style={styles.additionalPaddingXS}/>
                <Text style={styles.details}>{maxRedeemText}</Text>
              </View>
              :
              <View style={styles.infoContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.promoAmountContainer}>
                    <Text style={styles.discountType}>{promo.loyaltyProgramType === 'POINTS' ? 'VOUCHER' : 'DISCOUNT'}</Text>
                    <Text style={styles.discountAmount}>{promo.loyaltyProgramType === 'POINTS' ? 'Rp ' + currencyFormatter(promo.discountAmount) : promo.permanentPercentageDiscount + '%'}</Text>
                  </View>
                  <View style={styles.qrTag}>
                    <Text style={styles.qrTagText}>{language.PAY_BY_QR__TAG}</Text>
                  </View>
                </View>
                <Text style={styles.detailsGrey}>{language.QR_PROMO__DETAIL}</Text>
                <View style={styles.additionalPaddingSmall}/>
                <Text style={styles.subtitle}>{language.QR_PROMO__SUBTITLE_DISCOUNT_1} {promo.permanentPercentageDiscount}% {language.QR_PROMO__SUBTITLE_DISCOUNT_2}</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.detailsGrey}>{promo.startDate === promo.endDate ? language.QR_PROMO__VALID_DAY : language.QR_PROMO__VALID_DATE}</Text>
                <View style={styles.additionalPaddingXS}/>
                <Text style={styles.details}>{showDate}</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.detailsGrey}>{language.QR_PROMO__MINIMUM_TRANSACTION}</Text>
                <View style={styles.additionalPaddingXS}/>
                <Text style={styles.details}>Rp {currencyFormatter(promo.minTransAmountForDiscount)}</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.detailsGrey}>{language.QR_PROMO__MAXIMUM_DISCOUNT}</Text>
                <View style={styles.additionalPaddingXS}/>
                <Text style={styles.details}>Rp {currencyFormatter(promo.maxDiscountAmount)}</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.detailsGrey}>{language.QR_PROMO__MAXIMUM_REDEEM}</Text>
                <View style={styles.additionalPaddingXS}/>
                <Text style={styles.details}>{maxRedeemText}</Text>
              </View>
          }
        </View>
      </ScrollView>      
    );
  }
}

export default tabDetail;
