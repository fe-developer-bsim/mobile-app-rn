import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './GetLoanDetails.styles';
import moment from 'moment';
import {currencyFormatter, generateLoanStatus} from '../../utils/transformer.util';
import result from 'lodash/result';

class GetLoanDetails extends React.Component {
  static propTypes = {
    accountInfo: PropTypes.object,
    serverTime: PropTypes.string,
  }
  render () {
    const {accountInfo = {}, serverTime} = this.props;
    const diff = moment(serverTime).diff(moment(accountInfo.tgl_tunggakan), 'days');
    const typeOfLoan = result(accountInfo, 'typeOfLoan', '');
    const status = result(accountInfo, 'loanStatus', '');
    const checkStatus = status === 'LOAN_SUCCESS' || status === 'SUCCESS_REPAY' || status === 'OVERDUE' ? '1' : '0';
    const repayDateString = checkStatus === '1' ? moment.unix(result(accountInfo, 'repayTime', '') / 1000).format('D MMM YYYY') : 'TBA';
    const loanDateString = checkStatus === '1' ? moment.unix(result(accountInfo, 'loanTime', '') / 1000).format('D MMM YYYY') : 'TBA';
    return (
      <View style={styles.container}>
        { typeOfLoan === 'PGO' ? 
          <View>
            <Text style={styles.headerTitle}>{language.DASHBOARD__LOAN_DETAILS}</Text>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.PGO__DISPLAY_GET_LOAN}</Text>
              </View>
              <Text style={styles.value}>{loanDateString}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.PGO__DISPLAY_REPAYMENT_DATE}</Text>
              </View>
              <Text style={styles.value}>{repayDateString}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.PGO__VIRTUAL_ACCOUNT}</Text>
              </View>
              <Text style={styles.value}>{accountInfo.va}</Text>
            </View>
          </View> :
          <View>
            <Text style={styles.headerTitle}>{language.DASHBOARD__LOAN_DETAILS}</Text>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{accountInfo.channeling_company === 'SIMAS_KASBON' ? language.LOAN_KASBON__TOTAL_AMOUNT : language.LOAN__MONTHLY_PAYMENT}</Text>
              </View>
              <Text style={styles.value}>Rp {currencyFormatter(accountInfo.monthly_payment)}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{accountInfo.channeling_company === 'SIMAS_KASBON' ? language.LOAN_KASBON__PAYMENT_DATE : language.LOAN__PAYMENT_DATE}</Text>
              </View>
              <Text style={styles.value}>{moment(accountInfo.nextduedate).format('D MMM YYYY')}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{accountInfo.channeling_company === 'SIMAS_KASBON' ? language.LOAN_KASBON__PAYMENT_ACCOUNT : language.LOAN__PAYMENT_ACCOUNT}</Text>
              </View>
              <Text style={styles.value}>{accountInfo.norekdebet}</Text>
            </View>
            {accountInfo.tunggakan_pokok !== '' ?
              <View>
                <Text style={styles.headerTitle}>{language.LOAN_KASBON__PASTDUE}</Text>
                <View style={styles.borderBottomRow}>
                  <View style={styles.newTitleContainer}>
                    <Text style={styles.title}>{accountInfo.channeling_company === 'SIMAS_KASBON' ? language.LOAN_KASBON__DUE_AMOUNT : language.LOAN__DUE_AMOUNT}</Text>
                  </View>
                  <Text style={styles.value}>Rp {currencyFormatter(accountInfo.tunggakan_pokok)}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <View style={styles.newTitleContainer}>
                    <Text style={styles.title}>{language.LOAN_KASBON__INTEREST}</Text>
                  </View>
                  <Text style={styles.value}>Rp {currencyFormatter(accountInfo.tunggakan_bunga)}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <View style={styles.newTitleContainer}>
                    <Text style={styles.title}>{language.LOAN_KASBON__DUE_DATE}</Text>
                  </View>
                  <Text style={styles.value}>{moment(accountInfo.tgl_tunggakan).format('D MMM YYYY')}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <View style={styles.newTitleContainer}>
                    <Text style={styles.title}>{language.LOAN__TRANSACTION_CODE}</Text>
                  </View>
                  <Text style={styles.value}>{diff + language.LOAN__DAYS}</Text>
                </View>
                <View style={styles.greyLineFull}/>
              </View>
              :
              null
            }
            <Text style={styles.headerTitle}>{language.LOAN_KASBON__OTHER_DETAILS}</Text>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.LOAN__DRAWDOWN_DATE}</Text>
              </View>
              <Text style={styles.value}>{moment(accountInfo.drawdown_date).format('D MMM YYYY')}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.LOAN__STATUS}</Text>
              </View>
              <Text style={styles.value}>{generateLoanStatus(accountInfo.kolekbsim)}</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

export default GetLoanDetails;