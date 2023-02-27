import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';
import TransactionItem from './TransactionItemPageEmoney.component';
import {listViewComparator} from '../../utils/transformer.util';
import styles from './TransactionsEmoney.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import noop from 'lodash/noop';

class Transactions extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    header: PropTypes.string,
    selectedFilters: PropTypes.string,
    filterValue: PropTypes.string,
    currency: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
    isShariaAccount: PropTypes.bool,
    sendMail: PropTypes.func,
    accountNumber: PropTypes.string,
    goToFilter: PropTypes.func,
  }
  comparator = listViewComparator
  renderListItemCurency = () => {
    const {currency} = this.props;
    return currency ? currency : '';
  }
  renderListItemDetailTransaction = () => {
    const {goToDetailTransaction = {}} = this.props;
    return goToDetailTransaction ? goToDetailTransaction : {};
  }
  renderListItem = ({item}) => (<TransactionItem {...item} currency={this.renderListItemCurency()} getDetailTransactionHistory={this.renderListItemDetailTransaction()} isShariaAccount={this.props.isShariaAccount}/>)

  render () {
    
    const {transactions = [], sendMail = noop, accountNumber, goToFilter} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <View style={styles.containerRowServiceBillpay} >
            <View style={styles.textBillPayStyleBL} >
              <Text style={styles.styleMessage}>{language.DASHBOARD__TRANSACTION_HISTORY}</Text>
            </View>
            <View style={styles.filterButton}>
              <Touchable onPress={goToFilter} >
                <SimasIcon name='filter_ico' style={styles.filterIcon} size={20}/>
              </Touchable>
              <Touchable onPress={sendMail(accountNumber)}>
                <SimasIcon name='download_ico' style={styles.exportIcon} size={20}/>
              </Touchable>
            </View>
          </View>
          <FlatList enableEmptySections data={transactions} renderItem={this.renderListItem}/>
        </View>
      </View>
    );
  }
}

export default Transactions;
