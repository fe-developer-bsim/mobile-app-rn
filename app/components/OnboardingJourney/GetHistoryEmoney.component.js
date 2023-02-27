import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './GetHistoryEmoney.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {historyDateFormatter, currencySymbol, removeComma, balanceFormatter} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../../components/Touchable.component';

class GetTransactionHistory extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    hideIcon: PropTypes.bool,
    isSaving: PropTypes.bool,
    goToAllTransactions: PropTypes.func,
    accountNumber: PropTypes.string,
    sendMail: PropTypes.func,
  }

  renderItem = (data) => {
    const credit = result(data, 'credit');
    const description = result(data, 'description', '');
    const date = result(data, 'date', '');
    const currency = result(data, 'currency', '');
    const amount = result(data, 'amount', '');
    const parseAmount = removeComma(amount);
    const formattedAmount = parseInt(parseAmount);
    const transactionAmount = balanceFormatter(formattedAmount);
    return (
      <View>
        <View style={styles.container} >
          <View style={styles.icon}>
            <SimasIcon name={credit ? 'path2' : 'path2'} size={15} style={credit ? styles.iconSuccess : styles.iconFailure}/>
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.transactionHeading}>{description}</Text>
              <Text style={styles.transactionDate}>{historyDateFormatter(date, 'DD MMM YYYY') === 'Invalid date' ? date : historyDateFormatter(date, 'DD MMM YYYY')}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, credit ? styles.statusSuccess : styles.statusFailure]}>{!credit && '- '}{currencySymbol(currency)} {transactionAmount}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
      </View>
    );
  }

  render () {
    const {goToAllTransactions, accountNumber, sendMail, transactions = []} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.containerBillpay3}>
          <View style={styles.containerRowServiceBillpay} >
            <View style={styles.textBillPayStyleBL} >
              <Text style={styles.styleMessage}>{language.DASHBOARD__TRANSACTION_HISTORY}</Text>
            </View>
            <Touchable onPress={sendMail(accountNumber)} style={styles.filterButton}>
              <SimasIcon name='download_ico' style={styles.exportIcon} size={20}/>
            </Touchable>
          </View>
          {transactions.map(this.renderItem)}
          <Touchable style={styles.textBillPayStyleBL2} onPress={goToAllTransactions}>
            <Text style={styles.styleMessage}>{language.DASHBOARD__VIEW_ALL}</Text>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default GetTransactionHistory;
