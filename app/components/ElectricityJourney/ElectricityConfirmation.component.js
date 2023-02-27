import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {formatBillDetails, currencyFormatter, checkAdminBank} from '../../utils/transformer.util';
import map from 'lodash/map';
import {language} from '../../config/language';
import styles from './ElectricityConfirmation.style';
import result from 'lodash/result';
import truncate from 'lodash/truncate';
import Card from '../Card/Card.component';
import {buttonLargeTextStyle, contentContainerStyle} from '../../styles/common.styles';
import TabCoupon from '../Coupon/CouponTabPurchase.component';

export default class ElectricityConfirmation extends Component {
  static propTypes = {
    billDetails: PropTypes.object,
    handleSubmit: PropTypes.func,
    denomination: PropTypes.object,
    isPrepaidBiller: PropTypes.bool,
    accountNo: PropTypes.object,
    biller: PropTypes.object,
    confirmationDisplay: PropTypes.array,
    confirmationDisplayTop: PropTypes.object,
    removeCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    goToCoupon: PropTypes.func,
  }

  remove=() => {
    this.props.removeCoupon();
  }

  render () {
    const {billDetails = {}, confirmationDisplay = [], denomination = {}, goToCoupon, isPrepaidBiller = false, couponUse, accountNo = {},
      biller = {}, handleSubmit, confirmationDisplayTop = {}} = this.props;
    const billAmount = isPrepaidBiller ? denomination.value : billDetails.billAmount;
    const confirmation = formatBillDetails(confirmationDisplay);
    const amount = result(confirmationDisplayTop, 'amountNumber', 0);
    const adminBankBack = checkAdminBank(result(confirmationDisplayTop, 'totalBankCharge', 0));
    const total = result(confirmationDisplayTop, 'totalAmountDebited', 0);
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  style={contentContainerStyle}>
        <Text style={styles.titleText}>{language.ELECTRICITY__PAYMENT_SUMMARY}</Text>
        {(isPrepaidBiller)
        && <Card>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightText}>{language.DETAIL__AMOUNT}</Text></View>
            <View style={styles.halfWidth}><Text style={styles.boldCard}>Rp {currencyFormatter(amount)}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightText}>{language.DETAIL__BANK_CHARGE}</Text></View>
            <View style={styles.halfWidth}><Text style={styles.boldCard}>Rp {currencyFormatter(adminBankBack)}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightText}>{language.DETAIL__TOTAL_AMOUNT_DEBITED}</Text></View>
            <View style={styles.halfWidth}><Text style={styles.boldCard}>Rp {currencyFormatter(total)}</Text></View>
          </View>
        </Card>
        }
        <Card>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightText}>{language.WATER_BILL__PAYING_FROM}</Text></View>
            <View style={styles.halfWidthRow}>
              <View style={styles.halfWidth}><Text
                style={styles.boldRight}>{accountNo.accountType}</Text></View>
              <View style={styles.halfWidth}><Text
                style={styles.lightRight}>{accountNo.accountNumber}</Text></View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightText}>{language.WATER_BILL__PAYING_TO}</Text></View>
            <View style={styles.halfWidth}><Text
              style={styles.boldRight}>{biller.name}</Text></View>
          </View>
          <View>
            {map(confirmation, (value, k) => (
              <View key={k} style={styles.row}>
                <View style={styles.halfWidth}><Text style={styles.lightText}>{k}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.boldCard}>{value}</Text></View>
              </View>)
            )}

            {(isPrepaidBiller)
              ? <View style={styles.row}>
                <View style={styles.halfWidth}><Text style={styles.lightText}>{language.ELECTRICITY__TOPUP_AMOUNT}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.boldCard}>Rp {currencyFormatter(billAmount)}</Text></View>
              </View>
              : <View/>
            }
          </View>
        </Card>
        <View style={styles.buttonStylePadding}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>

          <TabCoupon goToCoupon={goToCoupon}  couponUse={newSubtitle} removeCoupon={this.remove}/>
          <SinarmasButton onPress={handleSubmit}>
            <Text style={buttonLargeTextStyle}>{language.ELECTRICITY__CONFIRM_PAYMENT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>


    );
  }
}
