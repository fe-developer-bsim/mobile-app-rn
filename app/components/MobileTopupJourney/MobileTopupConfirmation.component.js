import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter, checkAdminBank} from '../../utils/transformer.util';
import result from 'lodash/result';
import {language} from '../../config/language';
import styles from './MobileTopupConfirmation.style';
import truncate from 'lodash/truncate';
import TabCoupon from '../Coupon/CouponTabPurchase.component';

class MobileTopupConfirmation extends Component {
  static propTypes = {
    myAccount: PropTypes.object,
    biller: PropTypes.object,
    handleSubmit: PropTypes.func,
    topupAmount: PropTypes.object,
    mobileNo: PropTypes.string,
    confirmationDisplay: PropTypes.object,
    goToCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    removeCoupon: PropTypes.func
  }
  remove = () => {
    this.props.removeCoupon();
  }

  render () {
    const {confirmationDisplay = {}, biller, handleSubmit, myAccount, goToCoupon, couponUse} = this.props;
    const amount = result(confirmationDisplay, 'amountNumber', 0);
    const mobileNoBack = result(confirmationDisplay, 'subscriberNoInput', '');
    const adminBankBack = checkAdminBank(result(confirmationDisplay, 'totalBankCharge', 0));
    const total = result(confirmationDisplay, 'totalAmountDebited', 0);
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.containerContent} style={styles.container}>
        <Text style={styles.title}>{language.MOBILE_TOPUP__PAYMENT_SUMMARY}</Text>
        <Text style={styles.headerSubtext}>{language.MOBILE_TOPUP__PAYMENT_SUMMARY_SUBTITLE}</Text>
        <View style={styles.summaryContainer}>
          <View style ={styles.summaryArea}>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.MOBILE_TOPUP__PAYING_FROM}</Text></View>
              <View style={styles.halfWidth}>
                <View style={styles.rowItemRight}>
                  <Text style={styles.rightItemHeader}>{result(myAccount, 'accountType', 'NIL')}</Text>
                  <Text style={styles.rightItemText}>{result(myAccount, 'accountNumber', 'NIL')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.MOBILE_TOPUP__PAYING_TO}</Text></View>
              <View style={styles.halfWidth}><View style={styles.rowItemRight}><Text style={styles.rightItemHeader}>{result(biller, 'name', '')}</Text></View></View>
            </View>
            <View>
              <View style={styles.rowItem}>
                <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.MOBILE_TOPUP__PHONE_NUMBER}</Text></View>
                <View style={styles.halfWidth}>
                  <View style={styles.halfWidth}><View style={styles.rowItemRight}><Text style={styles.rightItemHeader}>{mobileNoBack}</Text></View></View>
                </View>
              </View>
              <View style={styles.rowItem}>
                <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.MOBILE_TOPUP__TOPUP_AMOUNT}</Text></View>
                <View style={styles.halfWidth}><View style={styles.rowItemRight}><Text style={styles.rightItemHeader}>{currencyFormatter(amount)}</Text></View></View>
              </View>
              <View style={styles.rowItem}>
                <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.MOBILE_TOPUP__TOPUP_ADMINFEE}</Text></View>
                <View style={styles.halfWidth}><View style={styles.rowItemRight}><Text style={styles.rightItemHeader}>{currencyFormatter(adminBankBack)}</Text></View></View>
              </View>
              <View style={styles.rowItem}>
                <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{language.MOBILE_TOPUP__TOPUP_TOTAL}</Text></View>
                <View style={styles.halfWidth}><View style={styles.rowItemRight}><Text style={styles.rightItemHeader}>{currencyFormatter(total)}</Text></View></View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          
          <TabCoupon goToCoupon={goToCoupon}  couponUse={newSubtitle} removeCoupon={this.remove}/>
            

          
          <SinarmasButton text={language.MOBILE_TOPUP__CONFIRM_BUTTON} onPress={handleSubmit}/>
        </View>
      </ScrollView>
    );
  }
}

export default MobileTopupConfirmation;
