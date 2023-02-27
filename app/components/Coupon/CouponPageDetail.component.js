import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './CouponPage.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import size from 'lodash/size';
import {SinarmasButton} from '../FormComponents';
import CashbackLabel from '../../assets/images/LabelCashback.png';
import LimitedLabel from '../../assets/images/LabelLimited.png';
import SpecialLable from '../../assets/images/eventLable.png';
import moment from 'moment';

class Transactions extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    detailVoucher: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToUseCoupon: PropTypes.func,
    isAvailable: PropTypes.bool,
    goToUseCouponFromView: PropTypes.func,
    ownership: PropTypes.string,
    shortDesc: PropTypes.string,
    subendDate: PropTypes.string,
    subenewDate: PropTypes.string,
    currency: PropTypes.string
  }
  render () {
    const {detailVoucher, currentLanguage, goToUseCoupon, isAvailable, currency, goToUseCouponFromView, ownership, shortDesc = '', subendDate, subenewDate} = this.props;
    const amount = result(detailVoucher, 'amount', 0);
    const endDate = ownership === 'public' ? result(detailVoucher, 'endDateString', '').toString() : moment(subendDate).format('DD MMM YYYY');
    const startDate = ownership === 'public' ? result(detailVoucher, 'startDateString', '').toString() : moment(subenewDate).format('DD MMM YYYY');
    const totalMultiLang = size(result(detailVoucher, 'multiLanguageDescription', {}));
    const description = totalMultiLang === 0 ? result(detailVoucher, 'description', '') : currentLanguage === 'id' ? result(detailVoucher, 'multiLanguageDescription.id', '') : result(detailVoucher, 'multiLanguageDescription.en', '');
    const modifierType = result(detailVoucher, 'modifierType', '');
    const fixAmount = modifierType === 'percent' ? amount.toString() + '%' : currencyFormatter(amount);
    const startTime = result(detailVoucher, 'startTime', 0).toString();
    const startTimeNew = startTime.substring(0, 2) + ':' + startTime.substring(2, 4);
    const endTime = result(detailVoucher, 'endTime', 0).toString();
    const endTimeNew = endTime.substring(0, 2) + ':' + endTime.substring(2, 4);
    const cashbackDetail = currency === 'simaspoin' ? language.GENERIC__SIMAS_POIN : language.GENERIC__CASHBACK_RP;
    const subDescription = currency === 'simaspoin' ? language.GENERIC__SUBTITLE_DESCRIPTION_ONE + ' ' + fixAmount + ' ' + language.GENERIC__SUBTITLE_DESCRIPTION_TWO : language.GENERIC__SUBTITLE_DESCRIPTION_ONE_CASHBACK + ' ' + fixAmount + ' ' +  language.GENERIC__SUBTITLE_DESCRIPTION_TWO_CASHBACK;
    return (
      <ScrollView style={styles.containerDetail}>
        <View style={styles.whiteBox}>

          <View style={styles.justifyContentTop}>
            <View style={styles.fieldRowTop}>
              <Text style={styles.alignTextCouponRed}>{fixAmount} <Text style={styles.alignTextCoupon}>{cashbackDetail}</Text></Text>
            </View>
            {ownership === 'public' ?  
              <Image source={LimitedLabel} style={styles.limitedLabelstyle}/> :
              <View/>
            }
          </View>
          <View style={styles.cashBorder}>
            <Image source={CashbackLabel} style={styles.cashBacklabel}/>
            {shortDesc === null ? 
              null :
              <View style={styles.paddingHor}>
                <Image source={SpecialLable} style={styles.speciallabel}/>
                <View style={styles.absolutView}>
                  <Text style={styles.absoluteText}>{shortDesc}</Text>
                </View>
              </View>}
          </View>
          <View style={styles.headerDetail}>
            <Text style={styles.subheaderText}>{subDescription}</Text>
          </View>
          <View style={styles.headerBorder}/>
          <View style={styles.headerTimeAndTerm}>
            <Text style={styles.subheaderTextDetailBold}>{language.GENERIC__VALID_TIME}</Text>
            <Text style={styles.subheaderTextDetail}>{startDate} - {endDate}</Text>
            <Text style={styles.subheaderTextDetailBold}>{language.GENERIC__TIMES_CONDITION}</Text>
            {startTime === '0' && endTime === '2359' ?
              <Text style={styles.subheaderTextDetail}>{language.GENERIC__ALL_DAY}</Text> : startTime === '0' ?
                <Text style={styles.subheaderTextDetail}>00:00 - {endTimeNew}</Text>
                :
                <Text style={styles.subheaderTextDetail}>{startTimeNew} - {endTimeNew}</Text>
            }
   
          </View>
          <View style={styles.headerBorder}/>
          <View style={styles.headerTimeAndTerm}>
            <Text style={styles.subheaderTextDetailTerm}>{language.GENERIC__TERM_AND_CONDITION}</Text>
            <Text style={styles.subheaderTextDetail}>{description}</Text>
          </View>
        </View>
        <View style={styles.buttonUseDetail}>
          {isAvailable ? 
            <SinarmasButton onPress={goToUseCouponFromView}>
              <Text style={styles.useButtonDetail}>{language.GENERIC__USE_COUPON}</Text>
            </SinarmasButton> :
            <SinarmasButton onPress={goToUseCoupon}>
              <Text style={styles.useButtonDetail}>{language.GENERIC__USE_COUPON}</Text>
            </SinarmasButton>}
        </View>
      </ScrollView>
    );
  }
}

export default Transactions;
