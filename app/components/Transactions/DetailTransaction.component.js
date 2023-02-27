import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './DetailTransaction.style';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter, formatResultAmount, checkMinus, formatForexAmountMiniStatement} from '../../utils/transformer.util';

class DetailTransactionComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object
  }

  render () {
    const {navParams} = this.props;
    const detailData = result(navParams, 'detailData.data.detail', {});
    const codeTransaction = result(navParams, 'transactionCode', '');
    const statementId = result(navParams, 'statementId', '');
    const dateTransaction = result(detailData, 'Booking Date', '');
    const fromAccount = result(detailData, 'FROM Account', '');
    const formattedFromAccount = fromAccount.split('~').filter((data) => data !== '').join('\n');
    const toAccount = result(detailData, 'TO Account', '');
    const formattedToAccount = toAccount.split('~').filter((data) => data !== '').join('\n');
    const ownAccount = result(navParams, 'accountTransactions', {});
    const ownAmount = result(detailData, 'Amount', '');
    const resultAmount = formatResultAmount(ownAmount);
    const detailNotes = result(detailData, 'Narrative', '');
    const formaterZero = resultAmount.substring(0, resultAmount.length - 3);
    const amountFormatter = currencyFormatter(formaterZero);
    const isMinus = checkMinus(ownAmount);
    return (
      <View keyboardShouldPersistTaps='handled'>
        <View style={[styles.horizontalSpacing, styles.tabBarMarginMain, styles.background]}>
          {codeTransaction === '0202' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_SKN}</Text></View>
            </View>}
          {codeTransaction === '0213' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_TRANSFER}</Text></View>
            </View>}
          {codeTransaction === '0852' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_BILL_PAYMENT}</Text></View>
            </View>}
          {codeTransaction === '0268' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                { isMinus ?
                  <Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_ATM_TRANSFER_OUT}</Text>
                  :
                  <Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_ATM_TRANSFER_IN}</Text>
                }</View>
            </View>}
          {codeTransaction === '0832' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_RTGS}</Text></View>
            </View>}
          {codeTransaction === '0220' && 
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_REMITTANCE_IN}</Text></View>
            </View>}
          {codeTransaction === '0210' && 
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_REMITTANCE_OUT}</Text></View>
            </View>}
          {(codeTransaction === '0837' || codeTransaction === '0838') && 
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_RTGS_IN}</Text></View>
            </View>}
          {(codeTransaction === '0241' || codeTransaction === '0243') &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_SKN_IN}</Text></View>
            </View>}
          {codeTransaction === '0125' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_BIFAST_OUT}</Text></View>
            </View>}
          {codeTransaction === '0126' &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.title}>{language.DETAIL_TRANSACTION__TITLE_BIFAST_IN}</Text></View>
            </View>}
        </View>

        <View style={[styles.horizontalSpacing, styles.tabBarMargin, styles.background]}>
          <View style={styles.border}/>
          <View style={styles.row}>
            <View>
              <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TRANSACTION_ID}</Text></View>
              <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{statementId}</Text></View>
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
              <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.currency} {ownAccount.currency === 'IDR' ? amountFormatter : formatForexAmountMiniStatement(resultAmount, ownAccount.currency)}</Text></View>
            </View>
          </View>
          { fromAccount === '' && toAccount === '' ?
            <View>
              {
                codeTransaction === '0202' || codeTransaction === '0213' || codeTransaction === '0832' || codeTransaction === '0852' || codeTransaction === '0837' || codeTransaction === '0838' || codeTransaction === '0241' || codeTransaction === '0243' || codeTransaction === '0220' || codeTransaction === '0210' || codeTransaction === '0125' || codeTransaction === '0126' ?
                  <View style={styles.row}>
                    <View>
                      <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__FROM}</Text></View>
                      {formattedFromAccount ? <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{formattedFromAccount}</Text></View>
                        : <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.name}{'\n'}{ownAccount.accountNumber}</Text></View>}
                    </View>
                  </View>
                  :
                  <View style={styles.row}>
                    <View>
                      <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__FROM}</Text></View>
                      {isMinus ? <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.name}{'\n'}{ownAccount.accountNumber}</Text></View>
                        : <View style={styles.halfWidth}><Text style={styles.bottomAlign}>-</Text></View>}
                    </View>
                  </View>
              }
            </View>
            :
            <View>
              {
                codeTransaction === '0202' || codeTransaction === '0213' || codeTransaction === '0832' || codeTransaction === '0852' || codeTransaction === '0837' || codeTransaction === '0838' || codeTransaction === '0241' || codeTransaction === '0243' || codeTransaction === '0220' || codeTransaction === '0210' || codeTransaction === '0125' || codeTransaction === '0126' ?
                  <View style={styles.row}>
                    <View>
                      <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__FROM}</Text></View>
                      {formattedFromAccount ? <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{formattedFromAccount}</Text></View>
                        : <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.name}{'\n'}{ownAccount.accountNumber}</Text></View>}
                    </View>
                  </View>
                  :
                  <View style={styles.row}>
                    <View>
                      <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__FROM}</Text></View>
                      {isMinus ? <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.name}{'\n'}{ownAccount.accountNumber}</Text></View>
                        : <View style={styles.halfWidth}><Text style={styles.bottomAlign}>-</Text></View>}
                    </View>
                  </View>
              }
              {
                codeTransaction === '0202' || codeTransaction === '0213' || codeTransaction === '0832' || codeTransaction === '0837' || codeTransaction === '0838' || codeTransaction === '0241' || codeTransaction === '0243' || codeTransaction === '0220' || codeTransaction === '0210' || codeTransaction === '0125' || codeTransaction === '0126' ?
                  <View style={styles.row}>
                    <View>
                      <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TO}</Text></View>
                      {formattedToAccount ? <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{formattedToAccount}</Text></View>
                        : <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.name}{'\n'}{ownAccount.accountNumber}</Text></View>}
                    </View>
                  </View>
                  : codeTransaction === '0268' ?
                    <View style={styles.row}>
                      <View>
                        <View style={styles.halfWidth}><Text style={styles.leftAlign}>{language.DETAIL_TRANSACTION__TO}</Text></View>
                        {isMinus ? <View style={styles.halfWidth}><Text style={styles.bottomAlign}>-</Text></View>
                          : <View style={styles.halfWidth}><Text style={styles.bottomAlign}>{ownAccount.name}{'\n'}{ownAccount.accountNumber}</Text></View>}
                      </View>
                    </View>
                    :
                    null
              }
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
