import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './QRConfirmation.component.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {Text, View} from 'react-native';
import result from 'lodash/result';
import {language} from '../../config/language';
import {currencySymbol, currencyFormatter} from '../../utils/transformer.util';

class QRConfirmation extends Component {
  static propTypes = {
    QRInvoice: PropTypes.object,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    invalid: PropTypes.bool,
    tipDisplay: PropTypes.number,
    selectedCoupon: PropTypes.number,
    couponCurrency: PropTypes.string,
    totalAmountWithTip: PropTypes.number,
    totalCouponAmount: PropTypes.number,
    couponAmount: PropTypes.number,
    discount: PropTypes.number,
    discountAmount: PropTypes.string,
    couponType: PropTypes.string,
    tipAmount: PropTypes.number,
  }

  render () {
    const {QRInvoice, handleSubmit, selectedCoupon, couponCurrency, totalAmountWithTip, totalCouponAmount, couponAmount,
      discount, discountAmount, couponType, tipAmount} = this.props;
    const value = result(this.props, 'value', {});
    const amount = currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' ' + currencyFormatter(result(QRInvoice, 'content.amount', 0));
    const receiver = result(QRInvoice, 'content.receiver', '');

    const dispayTipAmount = currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' ' + currencyFormatter(tipAmount);
    const payingFrom = result(value, 'accountNo', {});

    const displayTotalAmount = currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' ' + currencyFormatter(totalAmountWithTip);

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.summaryContainer}>
          <Text style={styles.titleText}>{language.PAY_BY_QR__PAY_ON}{receiver}</Text>
          <View>
            <View style={styles.rowItem}>
              <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.PAY_BY_QR__PRICE}</Text></View>
              <View style={styles.halfWidthRow}>
                <View style={styles.rowItemRight}>
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.blackLargeText}>{amount}</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
          <View>
            {discount > 0 &&
            <View style={styles.rowItem}>
              <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.PAY_BY_QR__DISCOUNT}</Text></View>
              <View style={styles.halfWidthRow}>
                <View style={styles.rowItemRight}>
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.redItalicLargeText}>{discount}%</Text>
                    <Text style={styles.blackLargeText}> - {discountAmount}</Text>
                  </View>
                </View>
              </View>
            </View>
            }
            {selectedCoupon > 0 &&
            <View style={styles.rowItem}>
              <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.PAY_BY_QR__COUPON} ({selectedCoupon})</Text></View>
              <View style={styles.halfWidthRow}>
                <View style={styles.rowItemRight}>
                  <View style={styles.rightItemContainer}>
                    {
                      couponType === 'PERCENT' &&
                      <Text style={styles.redItalicLargeText}>{couponAmount}%</Text>
                    }
                    <Text style={styles.blackLargeText}>- {couponCurrency} {currencyFormatter(totalCouponAmount)}</Text>
                  </View>
                </View>
              </View>
            </View>
            }
            {
              tipAmount !== 0 &&
              <View style={styles.rowItem}>
                <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.PAY_BY_QR__TIP}</Text></View>
                <View style={styles.halfWidthRow}>
                  <View style={styles.rowItemRight}>
                    <View style={styles.rightItemContainer}>
                      <Text style={styles.blackLargeText}>{dispayTipAmount}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }
            <View style={styles.greyLine}/>
            <View style={styles.rowItem}>
              <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.PAY_BY_QR__TOTAL_PRICE}</Text></View>
              <View style={styles.halfWidthRow}>
                <View style={styles.rowItemRight}>
                  <View>
                    <Text style={styles.redLargeText}>{displayTotalAmount}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.greyLineFull}/>

        <View style ={styles.summaryArea}>
          <View style={styles.rowItem}>
            <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.GENERIC_BILLER__PAYING_FROM}</Text></View>
            <View style={styles.halfWidthRow}>
              <View style={styles.rowItemRight}>
                <Text style={styles.blackLargeText}>{result(payingFrom, 'accountType', 'NIL')}</Text>
                <Text style={styles.blackLargeText}>{result(payingFrom, 'accountNumber', 'NIL')}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.greyLineFull}/>

        <View style={styles.buttonContainer}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton onPress={handleSubmit}>
            <Text style={styles.nextButton}>{language.SERVICE__PAY_NOW}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRConfirmation;
