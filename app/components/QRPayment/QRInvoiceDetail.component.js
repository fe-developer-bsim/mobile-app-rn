import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './QRInvoiceDetail.component.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton, SinarmasPicker, RadioButton, SinarmasInput} from '../FormComponents';
import {Text, View} from 'react-native';
import result from 'lodash/result';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {currencySymbol, currencyFormatter, generateAccountLabel, getUnformattedAccountAmount, normalizeAmount, formatFieldAmount, balanceFormatter} from '../../utils/transformer.util';

class QRInvoiceDetail extends Component {
  static propTypes = {
    QRInvoice: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    setTipAmount: PropTypes.func,
    tipSelection: PropTypes.array,
    checkTipAmount: PropTypes.func,
    inputTipDisabled: PropTypes.bool,
    invalid: PropTypes.bool,
    userMobileNumber: PropTypes.string,
    tipDisplay: PropTypes.number,
    tipManualChange: PropTypes.func,
    addCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    selectedCoupon: PropTypes.number,
    couponList: PropTypes.array,
    couponLength: PropTypes.number,
    addCouponDisabled: PropTypes.bool,
    removeCouponDisabled: PropTypes.bool,
    couponAmount: PropTypes.number,
    totalCouponAmount: PropTypes.number,
    couponOvercharge: PropTypes.bool,
    totalAmount: PropTypes.number,
    discount: PropTypes.number,
    tipEnabled: PropTypes.bool,
    discountAmount: PropTypes.string,
    couponCurrency: PropTypes.string,
    couponType: PropTypes.string,
  }


  render () {
    const {QRInvoice, accounts, formValues, checkTipAmount, inputTipDisabled, invalid, handleSubmit, addCoupon, removeCoupon,
      selectedCoupon, couponLength, addCouponDisabled, removeCouponDisabled,
      couponAmount, totalCouponAmount, couponOvercharge, totalAmount, discount, tipEnabled,
      discountAmount, tipSelection, couponCurrency, couponType} = this.props;
    const amount = currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' ' + currencyFormatter(result(QRInvoice, 'content.amount', 0));
    const receiver = result(QRInvoice, 'content.receiver', '');
    const availableBalance = getUnformattedAccountAmount(result(formValues, 'accountNo', {}));

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

            {
              couponLength > 0 &&
              <View style={styles.rowItem}>
                <View style={styles.halfWidthRow}><Text style={styles.blackMediumText}>{language.PAY_BY_QR__COUPON} ({selectedCoupon})</Text></View>
                <View style={styles.halfWidthRow}>
                  <View style={styles.rowItemRight}>
                    <View style={styles.rightItemContainer}>
                      {
                        couponType === 'PERCENT' &&
                        <Text style={styles.redItalicLargeText}>{couponAmount}%</Text>
                      }
                      <Text style={styles.greenLargeText}> - {couponCurrency} {currencyFormatter(totalCouponAmount)}</Text>
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
                    <Text style={styles.redLargeText}>{currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' ' + currencyFormatter(totalAmount)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.greyLineFull}/>

        {
          couponLength > 0 &&
          <View>
            <View style={styles.summaryContainer}>
              <View style={styles.couponTitle}>
                <Text>
                  <Text style={styles.qrCouponTitle}>{language.PAY_BY_QR__COUPON_TITLE} </Text>
                  <Text style={styles.qrCouponTitleBold}>{couponLength} {language.PAY_BY_QR__COUPON_TITLE_COUPONS}</Text>
                </Text>
              </View>
              <View/>
              <View style={styles.couponTitleContainer}>
                <Text style={styles.blackMediumText}>{language.PAY_BY_QR__COUPON_USE_COUPONS}</Text>
                <Text style={styles.greenSmallText}>{selectedCoupon} {language.PAY_BY_QR__SELECTED}</Text>
              </View>
              <View style={styles.containerBorder}>
                <View style={styles.qrCouponContainer}>
                  <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                      <SimasIcon name={'qr-coupon'} size={130} style={styles.qrIcon}/>
                    </View>
                    <View style={styles.icon}>
                      <Text style={styles.qrIconText}>{1}x</Text>
                    </View>
                  </View>
                  <View style={styles.qrAmountContainer}>
                    <Text style={styles.qrAmountText}>{couponType === 'CASH' ? couponCurrency + ' ' + currencyFormatter(couponAmount) : couponAmount + '% ' + language.PAY_BY_QR__DISCOUNT}</Text>
                  </View>
                </View>
                <View style={styles.qrCouponBackBackground}>
                  <Touchable onPress={removeCoupon} disabled={removeCouponDisabled}>
                    <View style={styles.couponPadding}>
                      <Text style={removeCouponDisabled ? styles.couponButtonDisabled : styles.couponButton}>-</Text>
                    </View>
                  </Touchable>
                  <Text style={styles.couponText}>
                    <Text style={styles.selectedCouponText}>
                      {selectedCoupon}
                    </Text>
                    <Text style={styles.couponAmountText}>
                     / {couponLength}
                    </Text>
                  </Text>
                  <Touchable onPress={addCoupon} disabled={addCouponDisabled || couponOvercharge}>
                    <View style={styles.couponPadding}>
                      <Text style={addCouponDisabled || couponOvercharge ? styles.couponButtonDisabled : styles.couponButton}>+</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
              <Text style={styles.redSmallText}>{language.PAY_BY_QR__OVER_COUPON}</Text>
            </View>

            <View style={styles.greyLineFull}/>
          </View>
        }

        <View style={styles.summaryContainer}>
          <Text style={styles.titleText}>{language.SERVICE__PAY_FROM}</Text>
          <Field
            name='accountNo'
            rightIcon='arrow'
            component={SinarmasPicker}
            placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
            labelKey='display'
            itemList={generateAccountLabel(accounts)} />
          <Text style={styles.availableBalanceText}>{language.GENERIC_BILLER__AVAILABLE_BALANCE} : Rp {balanceFormatter(availableBalance)}</Text>
        </View>
        <View style={styles.greyLineFull}/>
        {tipEnabled &&
          <View>
            <View style={styles.summaryContainer}>
              <Text style={styles.titleText}>{language.PAY_BY_QR__TIP_AMOUNT}</Text>
              <Field
                name='tipAmount'
                component={RadioButton}
                onChange={checkTipAmount}
                options={tipSelection}
                renderItem={true}
              />
              <Field
                name='tipAmountManual'
                label={language.LABEL__INPUT_TIP}
                placeholder={language.HINTTEXT__TIP}
                maxLength={13}
                format={formatFieldAmount}
                normalize={normalizeAmount}
                component={SinarmasInput}
                keyboardType='phone-pad'
                disabled={inputTipDisabled}
              />
            </View>
            <View style={styles.greyLineFull}/>
          </View>
        }
        <View style={styles.buttonContainer}>
          <SinarmasButton disabled={invalid} onPress={handleSubmit}>
            <Text style={styles.nextButton}>{language.SERVICE__PAY_NOW}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRInvoiceDetail;
