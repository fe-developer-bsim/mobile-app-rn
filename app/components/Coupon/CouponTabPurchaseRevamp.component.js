import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CouponPageRevamp.styles';
import {language} from '../../config/language';
import truncate from 'lodash/truncate';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import LayeredIcon from '../LayeredIcon/LayeredIcon.component';

class Transactions extends React.Component {
  static propTypes = {
    goToCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,    
  }

  render () {
    const {couponUse, goToCoupon, removeCoupon} = this.props;
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
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
    const couponNotAplied = [
      {
        iconName: 'red-coupon_01',
        iconStyle: {color: '#E30717'},
        iconSize: 40
      },
      {
        iconName: 'red-coupon_02',
        iconStyle: {color: 'rgba(255,0, 0, 0.2)'},
        iconSize: 40
      }
    ];
    const backGroundColor = couponUse !== '' ? styles.rowAmountCouponUse : styles.rowAmountCoupon;
    return (
      <View style={backGroundColor}>
        <View style={styles.rowCou}>
          {couponUse !== ''  ? 
            <View style={styles.iconWidth}>
              <LayeredIcon layers={couponAplied}/>
            </View>
            :
            <Touchable onPress={goToCoupon} style={styles.iconWidth}>
              <LayeredIcon layers={couponNotAplied}/> 
            </Touchable>
          }
          {couponUse !== '' ? 
            <Text style={styles.couponTextUse}>{language.COUPON_YOU_GOT} {newSubtitle}</Text>
            :
            <Touchable onPress={goToCoupon}>
              <Text style={styles.couponText}>{language.GENERIC_BILLER__COUPON}</Text>
            </Touchable>
          }
        </View>
        {couponUse !== '' ?
          <View style={styles.closeBlack}>
            <Touchable onPress={removeCoupon}>
              <SimasIcon name={'close-black'} size={15} />
            </Touchable>
          </View>
          :
          null
        }
      </View>
    );
  }
}

export default Transactions;
