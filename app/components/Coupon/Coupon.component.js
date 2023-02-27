import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './Card.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import {language} from '../../config/language';
import {currencyFormatter} from '../../utils/transformer.util';
import moment from 'moment';
import size from 'lodash/size';
import CashbackLabel from '../../assets/images/LabelCashback.png';
import truncate from 'lodash/truncate';
import SpecialLable from '../../assets/images/eventLable.png';

class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    id: PropTypes.number,
    voucher: PropTypes.object,
    renderListItemLable: PropTypes.bool,
    renderUseCoupon: PropTypes.func,
    renderCouponDetailTransaction: PropTypes.func,
    isAvailable: PropTypes.bool,
    renderListItemCurrentLanguage: PropTypes.string,
    redeemCounter: PropTypes.number,
    expiredDateString: PropTypes.string,
    createdDateString: PropTypes.string,
  }
  renderUseCoupon = () => {
    const {voucher, id} = this.props;
    const amount = result(voucher, 'amount', '0');
    const endTime = result(voucher, 'endTime', '');
    const modifierType = result(voucher, 'modifierType', '');
    const fixAmount = modifierType === 'percent' ? amount.toString() + '%' : currencyFormatter(amount);
    const ownership = result(voucher, 'ownership', '');
    this.props.renderUseCoupon(id, fixAmount, endTime, ownership);
  }

  renderDetailCoupon = () => {
    const {voucher, id, expiredDateString, createdDateString} = this.props;
    const ownership = result(voucher, 'ownership', '');
    const codebillerListStatus = result(voucher, 'voucherProperties.mode', '');
    const codebillerList = codebillerListStatus === 'blacklist' ? '0' : result(voucher, 'voucherProperties.billerCodes.0', '0');
    const subendDate = moment(expiredDateString).format('YYYY/MM/DD');
    const subenewDate = moment(createdDateString).format('YYYY/MM/DD');
    const startTimeMod = result(voucher, 'startTime', 0).toString();
    const endTimeMod = result(voucher, 'endTime', 0).toString();
    const maxAmount = result(voucher, 'maxAmount', 0);
    const minAmount = result(voucher, 'minAmount', 0);
    const shortDesc = result(voucher, 'shortDesc', '');
    const currency = result(voucher, 'currency', '');
    this.props.renderCouponDetailTransaction(id, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, shortDesc, currency);
  }

  render
  render () {
    const {voucher, renderListItemCurrentLanguage, redeemCounter = 0, expiredDateString, createdDateString} = this.props;
    const amount = result(voucher, 'amount', '0');
    const modifierType = result(voucher, 'modifierType', '');
    const fixAmount = modifierType === 'percent' ? amount.toString() + '%' : currencyFormatter(amount);
    const totalMultiLang = size(result(voucher, 'multiLanguageDescription', {}));
    const description = totalMultiLang === 0 ? result(voucher, 'description', '') : renderListItemCurrentLanguage === 'id' ? result(voucher, 'multiLanguageDescription.id', '') : result(voucher, 'multiLanguageDescription.en', '');
    const newSubtitle = truncate(description, {length: '85', omission: '...'});
    const shortDesc = result(voucher, 'shortDesc', '');
    const reedemCounterText = redeemCounter > 1 ? language.COUPON_COUNTER_MANY : language.COUPON_COUNTER_ONCE;
    const fixRedeemCount = redeemCounter.toString();
    const currency = result(voucher, 'currency', '');
    const cashbackDetail = currency === 'simaspoin' ? language.GENERIC__SIMAS_POIN : language.GENERIC__CASHBACK_RP;
    return (
      <View style={styles.square}>
        <View>
          <Touchable onPress={this.renderDetailCoupon}>
            <View style={styles.padding}>
              <View style={styles.box}>

                <View style={styles.justifyContentTop}>
                  <View style={styles.fieldRowTopnCounter}>
                    <View>
                      <Text style={styles.alignTextCouponRed}>{fixAmount} <Text style={styles.alignTextCoupon}>{cashbackDetail}</Text></Text>
                    </View>
                  </View>
                  <View style={styles.countCoupon}>
                    <Text style={styles.textCouponCounter}>{fixRedeemCount} {reedemCounterText}</Text>
                  </View>
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
                    </View>
                  }
                </View>
                <View style={styles.termConditionfield}>
                  <Text style={styles.termtext}>
                    {newSubtitle}
                  </Text>
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
                      <Text style={styles.subsubheaderText}>{createdDateString} - {expiredDateString}</Text>
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
