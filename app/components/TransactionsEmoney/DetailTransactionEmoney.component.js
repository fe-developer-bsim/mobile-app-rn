import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './DetailTransactionEmoney.style';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter, formatResultAmount} from '../../utils/transformer.util';
import moment from 'moment';

class DetailTransactionComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object
  }

  render () {
    const {navParams} = this.props;
    const detailData = result(navParams, 'detailData.data.detail', {});
    const codeTransaction = result(navParams, 'transactionCode', '');
    const debitAmount = result(navParams, 'debitAmount', '');
    const creditAmount = result(navParams, 'creditAmount', '');
    const dateTransaction = moment(result(detailData, 'bookingDate', '')).format('DD MMMM YYYY');
    const fromAccount = result(detailData, 'fromAccount', '');
    const toAccount = result(detailData, 'toAccount', '');
    const ownAccount = result(navParams, 'accountTransactions', {});
    const ownAmount = result(detailData, 'amount', '');
    const resultAmount = formatResultAmount(ownAmount);
    const detailNotes = result(detailData, 'narrative', '');
    const formaterZero = resultAmount.substring(0, resultAmount.length - 3);
    const amountFormatter = currencyFormatter(formaterZero);
    const transReference = result(detailData, 'transReference', '');
    
    return (
      <View keyboardShouldPersistTaps='handled'>
        <View style={styles.border}/>
        <View style={[styles.horizontalSpacing, styles.tabBarMarginMain, styles.background]}>
          {codeTransaction === '67' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_WITHDRAWAL}</Text></View>
            </View>}
          {codeTransaction === '68' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_BILLPAYMENT}</Text></View>
            </View>}
          {codeTransaction === '69' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_DEPOSIT}</Text></View>
            </View>}
          {codeTransaction === '70' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_PURCHASE}</Text></View>
            </View>}
          {codeTransaction === '66' &&
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_FUNDTRANSFER}</Text></View>
          </View>}
          {codeTransaction === '1105' &&
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_REFUND}</Text></View>
          </View>}
        </View>

        <View style={[styles.horizontalSpacing, styles.tabBarMargin, styles.background]}>
          <View style={styles.border}/>
          <View style={styles.row}>
            <View>
              <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TRANSACTION_ID}</Text></View>
              <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{transReference}</Text></View>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TIME}</Text></View>
              <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{dateTransaction}</Text></View>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TOTAL_AMOUNT}</Text></View>
              <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.currency} {amountFormatter}</Text></View>
            </View>
          </View>

          {creditAmount && codeTransaction === '66' ?
            <View style={styles.row}>
              <View>
                <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__FROM}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{fromAccount}</Text></View>
              </View>
            </View>
            :
            <View style={styles.row}>
              <View>
                <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__FROM}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{fromAccount}</Text></View>

              </View>
            </View>
          }
          {debitAmount && codeTransaction === '66' ?
            <View style={styles.row}>
              <View>
                <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TO}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{toAccount}</Text></View>
              </View>
            </View>
            : 
            <View style={styles.row}>
              <View>
                <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TO}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{toAccount}</Text></View>

              </View>
            </View>
          }
          <View style={styles.row}>
            <View>
              <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__DETAIL}</Text></View>
              <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{detailNotes}</Text></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DetailTransactionComponent;
