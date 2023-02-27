import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text} from 'react-native';
import styles from './TokenHistory.component.style';
import {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import {result, map} from 'lodash';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {language} from '../../config/language';
import {formatForexAmount} from '../../utils/transformer.util';
import moment from 'moment';


class TokenHistory extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    data: PropTypes.object,
    tokenPaymentDetail: PropTypes.func,
    expiredInvoice: PropTypes.func,
    setCarouselReferenceFor: PropTypes.func,
    activeTab: PropTypes.string,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar/>)

  render () {
    const {data, tokenPaymentDetail, expiredInvoice} = this.props;
    const {pendingInvoiceList = {}, successInvoiceList = {}, expiredInvoiceList = {}, refundInvoiceList = {}} = data;
    const pendingInvoice = isEmpty(pendingInvoiceList) ? {} : pendingInvoiceList.map(function (value) {
      const exDate = result(value, 'expiredDate', '');
      const expiredDate = moment(exDate).format('YYYY-MM-DD HH:mm');
      const getTime = expiredDate.substring(11, 16);
      const o = Object.assign({}, value);
      o.dateExpired = expiredDate;
      o.hours = getTime;
      return o;
    });
    const newPendingInvoice = isEmpty(pendingInvoice) ? {} : pendingInvoice.sort(function (a, b) {
      return moment(b.dateExpired) - moment(a.dateExpired);
    });
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerTab} contentContainerStyle={styles.scrollContainer}>
          {
            !isEmpty(pendingInvoiceList) || !isEmpty(successInvoiceList) || !isEmpty(expiredInvoiceList) ?
              <Text style={styles.historyTitle}>{language.TOKEN_HISTORY_TITLE}</Text>
              : null
          }
          {
            isEmpty(pendingInvoiceList) && isEmpty(successInvoiceList) && isEmpty(expiredInvoiceList) ?
              <View>
                <View style={styles.activityContainer}>
                  <Text style={styles.errorText}>{language.PAY_BILLS__HISTORY_NOTHING}</Text>
                </View>
              </View>
              :
              map(newPendingInvoice, (value, k) => {
                const invoiceNumber = result(value, 'invoiceNumber', '');
                const merchantName = result(value, 'merchantName', '');
                const expiredDate = moment(result(value, 'dateExpired', '')).format('Do MMMM, YYYY');
                const hours = result(value, 'hours', '');
                const totalAmount = result(value, 'amount', '');
                return (
                  <View key={k} style={styles.listView}>
                    <Touchable onPress={tokenPaymentDetail(invoiceNumber)}>
                      <View style={styles.rowCenter}>
                        <View style={styles.pendingTopTextContainer}>
                          <Text style={styles.textInvoiceNumberPending}>{merchantName} </Text>
                        </View>
                        <View>
                          <Text style={styles.textPending}>{language.TOKEN_PENDING}</Text>
                        </View>
                      </View>
                      <View style={styles.rowCenter}>
                        <Text style={styles.textTotalAmount}>{language.GENERIC_BILLER__AMOUNT_TXT}</Text>
                        <Text style={styles.textTotalAmount}>{language.CGV__RP} {formatForexAmount(totalAmount)}</Text>
                      </View>
                      <View style={styles.rowCenter}>
                        <Text style={styles.textDate}>{language.TOKEN_DUE_DATE} {expiredDate} {hours}</Text>
                      </View>
                    </Touchable>
                  </View>
                );
              }
              )
          }
          {
            map(successInvoiceList, (value, k) => {
              const merchantName = result(value, 'merchantName', '');
              const totalAmount = result(value, 'amount', '');
              const exDate = result(value, 'transactionDate', '');
              const expiredDate = moment(exDate).format('MMMM Do, YYYY');
              const fee = result(value, 'transCharge', 0);

              return (
                <View key={k} style={styles.listView}>
                  <View style={styles.rowCenter}>
                    <View style={styles.pendingTopTextContainer}>
                      <Text style={styles.textInvoiceNumberPending}>{merchantName} </Text>
                    </View>
                    <View>
                      <Text style={styles.textSucces}>{language.TOKEN_DONE}</Text>
                    </View>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.textTotalAmount}>{language.GENERIC_BILLER__AMOUNT_TXT}</Text>
                    <Text style={styles.textTotalAmount}>{language.CGV__RP} {formatForexAmount(totalAmount)}</Text>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.textTotalAmount}>{language.GENERIC_BILLER__FEE_TXT}</Text>
                    <Text style={styles.textTotalAmount}>{language.CGV__RP} {formatForexAmount(fee)}</Text>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.textDate}>{language.TOKEN_PAYMENT_DONE} {expiredDate}</Text>
                  </View>
                </View>
              );
            }
            )
          }
          {
            map(refundInvoiceList, (value, k) => {
              const merchantName = result(value, 'merchantName', '');
              const totalAmount = result(value, 'totalAmount', '');
              const exDate = result(value, 'transactionDate', '');
              const expiredDate = moment(exDate).format('MMMM Do, YYYY');
                    
              return (
                <View key={k} style={styles.listView}>
                  <View style={styles.rowCenter}>
                    <View style={styles.pendingTopTextContainer}>
                      <Text style={styles.textInvoiceNumberPending}>{merchantName} </Text>
                    </View>
                    <View>
                      <Text style={styles.textRefund}>{language.TOKEN_REFUND}</Text>
                    </View>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.textTotalAmount}>{language.CGV__RP} {formatForexAmount(totalAmount)}</Text>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.textDate}>{language.TOKEN_PAYMENT_REFUND} {expiredDate}</Text>
                  </View>
                </View>
              );
            }
            )
          }
          {
            map(expiredInvoiceList, (value, k) => {
              const merchantName = result(value, 'merchantName', '');
              const totalAmount = result(value, 'totalAmount', '');
              const exDate = result(value, 'expiredDate', '');
              const expiredDate = moment(exDate).format('MMMM Do, YYYY hh:mm');
              const formatDate = moment(exDate).format('YYYY/MM/DD hh:mm');
              return (
                <View key={k} style={styles.listView}>
                  <Touchable onPress={expiredInvoice(formatDate)}>
                    <View style={styles.rowCenter}>
                      <View style={styles.pendingTopTextContainer}>
                        <Text style={styles.textInvoiceNumberPending}>{merchantName} </Text>
                      </View>
                      <View>
                        <Text style={styles.textEx}>{language.TOKEN_EXPIRED}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <Text style={styles.textTotalAmount}>{language.CGV__RP} {formatForexAmount(totalAmount)}</Text>
                    </View>
                    <View style={styles.rowCenter}>
                      <Text style={styles.textDate}>{language.TOKEN_DUE_DATE} : {expiredDate}</Text>
                    </View>
                  </Touchable>
                </View>
              );
            }
            )
          }
        </ScrollView>
      </View>
    );
  }
}
export default TokenHistory;
