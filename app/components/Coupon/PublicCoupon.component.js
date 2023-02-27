import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './Card.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import {language} from '../../config/language';
import {currencyFormatter} from '../../utils/transformer.util';
import moment from 'moment';
import size from 'lodash/size';
import truncate from 'lodash/truncate';
import CashbackLabel from '../../assets/images/LabelCashback.png';
import LimitedLabel from '../../assets/images/LabelLimited.png';
import SpecialLable from '../../assets/images/eventLable.png';

class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    id: PropTypes.number,
    description: PropTypes.string,
    renderListItemLable: PropTypes.bool,
    renderUseCoupon: PropTypes.func,
    renderCouponDetailTransaction: PropTypes.func,
    isAvailable: PropTypes.bool,
    amount: PropTypes.number,
    endTime: PropTypes.number,
    minAmount: PropTypes.number,
    endDateString: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startDateString: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    modifierType: PropTypes.string,
    ownership: PropTypes.string,
    voucherProperties: PropTypes.object,
    startTime: PropTypes.number,
    maxAmount: PropTypes.number,
    renderListItemCurrentLanguage: PropTypes.string,
    multiLanguageDescription: PropTypes.object,
    shortDesc: PropTypes.string,
    currency: PropTypes.string
  }
  renderUseCoupon = () => {
    const {id, modifierType, endTime, amount, ownership} = this.props;
    const fixAmount = modifierType === 'percent' ? amount.toString() + '%' : currencyFormatter(amount);
    this.props.renderUseCoupon(id, fixAmount, endTime, ownership);
  }

  renderDetailCoupon = () => {
    const {id, ownership, voucherProperties, endTime = '', startDateString, endDateString, startTime = '', maxAmount, minAmount, shortDesc, currency} = this.props;
    const codebillerListStatus = result(voucherProperties, 'mode', '');
    const codebillerList = codebillerListStatus === 'blacklist' ? '0' : result(voucherProperties, 'billerCodes.0', '0');
    const colecctionDate = {endDateString, startDateString};
    const endDatesub = result(colecctionDate, 'endDateString', 0).toString();
    const startDatesub = result(colecctionDate, 'startDateString', 0).toString();
    const subendDate = moment(endDatesub).format('YYYY/MM/DD');
    const subenewDate = moment(startDatesub).format('YYYY/MM/DD');
    const startTimeMod = startTime.toString();
    const endTimeMod = endTime.toString();
    this.props.renderCouponDetailTransaction(id, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, shortDesc, currency);
  }

  render () {
    const {amount, renderListItemCurrentLanguage, description, multiLanguageDescription, endDateString, startDateString, modifierType, shortDesc = '', currency} = this.props;
    const totalMultiLang = size(multiLanguageDescription);
    const descriptionFront = totalMultiLang === 0 ? description : renderListItemCurrentLanguage === 'id' ? result(multiLanguageDescription, 'id', '') : result(multiLanguageDescription, 'en', '');
    const newSubtitle = truncate(descriptionFront, {length: '85', omission: '...'});
    const colecctionDate = {endDateString, startDateString};
    const endDatesub = result(colecctionDate, 'endDateString', 0).toString();
    const startDatesub = result(colecctionDate, 'startDateString', 0).toString();
    const fixAmount = modifierType === 'percent' ? amount.toString() + '%' : currencyFormatter(amount);
    const cashbackDetail = currency === 'simaspoin' ? language.GENERIC__SIMAS_POIN : language.GENERIC__CASHBACK_RP;
    return (
      <View style={styles.square}>
        <View>
          <Touchable onPress={this.renderDetailCoupon}>
            <View style={styles.padding}>
              <View style={styles.boxPublic}>

                <View style={styles.justifyContentTop}>
                  <View style={styles.fieldRowTop}>
                    <Text style={styles.alignTextCouponRed}>{fixAmount} <Text style={styles.alignTextCoupon}>{cashbackDetail}</Text></Text>
                  </View>
                  <View style={styles.countCoupon}>
                    <Text style={styles.textCouponCounter}>1 {language.COUPON_COUNTER_ONCE}</Text>
                  </View>
                </View>
                <View style={styles.cashBorder}>
                  <View style={styles.paddingImage}>
                    <Image source={LimitedLabel} style={styles.limitedLabelstyle}/>
                  </View>
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
                <View style={styles.termConditionfield}>
                  <Touchable onPress={this.renderDetailCoupon}>
                    <Text style={styles.termtext}>
                      {newSubtitle}
                    </Text>
                  </Touchable>
                </View>
                <View style={styles.fieldRowTopBorder}>
                  <View style={styles.lineOne}/>
                  <View style={styles.linecenter}/>
                  <View style={styles.lineTwo}/>
                </View>
                <View style={styles.justifyContentSecond}>
                  <View style={styles.fieldRow}>
                    <SimasIcon name='time-black' style={styles.validTime} size={40}/>
                    <View style={styles.textValid}>
                      <Text style={styles.subsubheaderText}>{language.GENERIC__VALID_DATE_TITLE}:</Text>
                      <Text style={styles.subsubheaderText}>{startDatesub} - {endDatesub}</Text>
                    </View>
                  </View>
                  <Touchable onPress={this.renderDetailCoupon} style={styles.fieldRowTop}>
                    <View style={styles.widthButton}/>
                    <SimasIcon name='arrow' style={styles.arrowIcon} size={15}/>
                  </Touchable>
                </View>

              </View>
              <View style={styles.circleOne}/>
              <View style={styles.circleTwo}/>
            </View>
          </Touchable>
        </View>

        <View />
      </View>
    );
  }
}

export default Card;
