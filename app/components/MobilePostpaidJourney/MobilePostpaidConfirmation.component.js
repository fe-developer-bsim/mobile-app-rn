import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import map from 'lodash/map';
import {currencyFormatter, formatBillDetails, checkAdminBank} from '../../utils/transformer.util';
import {language} from '../../config/language';
import result from 'lodash/result';
import styles from './MobilePostpaidConfirmation.styles';
import truncate from 'lodash/truncate';
import Card from '../Card/Card.component';
import TabCoupon from '../Coupon/CouponTabPurchase.component';

class MobilePostpaidConfirmation extends React.Component {
  static propTypes = {
    billDetails: PropTypes.object,
    mobileNo: PropTypes.string,
    handleSubmit: PropTypes.func,
    confirmationDisplay: PropTypes.array,
    confirmationDisplayTop: PropTypes.object,
    selectedAccount: PropTypes.object,
    goToCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    removeCoupon: PropTypes.func,
  }

  remove=() => {
    this.props.removeCoupon();
  }

  render () {
    const {handleSubmit, confirmationDisplay = [], confirmationDisplayTop = {}, couponUse, goToCoupon} = this.props;

    const bills = formatBillDetails(confirmationDisplay);
    const amount = result(confirmationDisplayTop, 'amountNumber', 0);
    const adminBankBack = checkAdminBank(result(confirmationDisplayTop, 'totalBankCharge', 0));
    const total = result(confirmationDisplayTop, 'totalAmountDebited', 0);
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  style={styles.container}>
        <Card>
          <View style={styles.itemContainer}>
            <Text>{language.MOBILE_POSTPAID__AMOUNT}</Text>
            <Text style={styles.largeText}>Rp {currencyFormatter(amount)}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text>{language.MOBILE_POSTPAID__ADMINFEE}</Text>
            <Text style={styles.largeText}>Rp {currencyFormatter(adminBankBack)}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text>{language.MOBILE_POSTPAID__TOTAL_AMOUNT}</Text>
            <Text style={styles.largeText}>Rp {currencyFormatter(total)}</Text>
          </View>
        </Card>
        <Card>
          {map(bills, (value, i) => (
            <View key={i} style={styles.detailsContainer}>
              <View style={styles.flex1}><Text style={styles.boldText}>{i}</Text></View>
              <View style={styles.flex1}><Text style={styles.rightText}>{value}</Text></View>
            </View>))
          }
        </Card>
        <View style={styles.bottomContainer}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>

          <TabCoupon goToCoupon={goToCoupon}  couponUse={newSubtitle} removeCoupon={this.remove}/>
          <SinarmasButton onPress={handleSubmit}>
            <Text style={styles.buttonStyle}>{language.MOBILE_POSTPAID__CONFIRM_PAYMENT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

export default MobilePostpaidConfirmation;
