import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {formatBillDetails} from '../../utils/transformer.util';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import styles from './WaterBillSummary.component.style';
import {language} from '../../config/language';
import truncate from 'lodash/truncate';
import Card from '../Card/Card.component';
import TabCoupon from '../Coupon/CouponTabPurchase.component';

export default class WaterBillSummary extends Component {

  remove=() => {
    this.props.removeCoupon();
  }
  render () {
    const {invalid, accountNo = {}, areaCode = {}, handleSubmit, couponUse, goToCoupon, confirmationDisplay} = this.props;
    const confirmation = formatBillDetails(confirmationDisplay);
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  style={[styles.horizontalSpacing, styles.tabBarMargin, styles.background]}>
        <Text style={styles.titleText}>{language.WATER_BILL__PAYMENT_SUMMARY}</Text>
        <Card style={styles.cardStyle}>
          <View>
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.WATER_BILL__PAYING_FROM}</Text></View>
              <View style={styles.halfWidthRow}>
                <View style={styles.halfWidth}><Text
                  style={styles.rightAlign}>{accountNo.accountType}</Text></View>
                <View style={styles.halfWidth}><Text
                  style={styles.rightAlign}>{accountNo.accountNumber}</Text></View>
              </View>
            </View>
            {!isEmpty(areaCode) &&
              <View style={styles.row}>
                <View style={styles.halfWidth}><Text style={styles.leftAlign}>Area Code</Text></View>
                <View style={styles.halfWidth}><Text
                  style={styles.rightAlign}>{areaCode.id}</Text></View>
              </View>
            }
            {map(confirmation, (value, k) => (
              <View key={k} style={styles.row}>
                <View style={styles.halfWidth}><Text style={styles.leftAlign}>{k}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.rightAlign}>{value}</Text></View>
              </View>)
            )
            }
          </View>
        </Card>
        <View style={styles.verticalSpacing}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>

          <TabCoupon goToCoupon={goToCoupon}  couponUse={newSubtitle} removeCoupon={this.remove}/>


          <SinarmasButton onPress={handleSubmit} disabled={invalid}>
            <Text style={buttonLargeTextStyle}>{language.WATER_BILL__BUTTON_CONFIRM}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

WaterBillSummary.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  areaCode: PropTypes.object,
  accountNo: PropTypes.object,
  onEasyPinClose: PropTypes.func,
  onEasyPinSubmit: PropTypes.func,
  resendBillPayOTP: PropTypes.func,
  authToggle: PropTypes.bool,
  invalid: PropTypes.bool,
  triggerAuth: PropTypes.func,
  transRefNum: PropTypes.string,
  config: PropTypes.array,
  userId: PropTypes.number,
  userMobileNumber: PropTypes.string,
  confirmationDisplay: PropTypes.array,
  totalAmount: PropTypes.number,
  bill: PropTypes.object,
  bankCharge: PropTypes.number,
  goToCoupon: PropTypes.func,
  removeCoupon: PropTypes.func,
  couponUse: PropTypes.string,
};
