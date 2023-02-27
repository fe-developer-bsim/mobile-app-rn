import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, FlatList, View, Image} from 'react-native';
import TransactionItem from './RecurringDetail.component';
import {listViewComparator} from '../../utils/transformer.util';
import styles from './RecurringDetail.style';
import {language} from '../../config/language';
import size from 'lodash/size';
import noScheduled from '../../assets/images/no-scheduled.png';

class Transactions extends React.Component {
  static propTypes = {
    dataRecurring: PropTypes.array,
    header: PropTypes.string,
    selectedFilters: PropTypes.string,
    filterValue: PropTypes.string,
    currency: PropTypes.string,
    goToEditTransfer: PropTypes.func,
    goToDetailTransaction: PropTypes.func,
    goToDeleteTransferPage: PropTypes.func,
    accountName: PropTypes.string
  }
  comparator = listViewComparator

  renderListItemDetailTransaction = (value) => () => {
    const {goToEditTransfer = {}} = this.props;
    return goToEditTransfer ? goToEditTransfer(value) : {};
  }

  renderListItemDeleteTransaction = (value) => () => {
    const {goToDeleteTransferPage = {}} = this.props;
    return goToDeleteTransferPage ? goToDeleteTransferPage(value) : {};
  }
  renderListItemAccountName = () => {
    const {accountName} = this.props;
    return accountName ? accountName : '';
  }

  renderListItem = ({item}) => (<TransactionItem {...item} getDetailTransactionHistory={this.renderListItemDetailTransaction(item)} accountName={this.renderListItemAccountName()} renderListItemDeleteTransaction={this.renderListItemDeleteTransaction(item)}/>)

  render () {
    
    const {dataRecurring} = this.props;
    const compareVar = size(dataRecurring);
    return (
      <ScrollView style={styles.container}>
        {compareVar !== 0 ?
          <FlatList enableEmptySections data={dataRecurring} renderItem={this.renderListItem} removeClippedSubviews={false}/>
          :
          <View style={styles.noofferImage}>
            <Image source={noScheduled} style={styles.imageSize} />
            <View>
              <Text style={styles.informationVoucher}>{language.RECURRING__NOT_ACTIVE_TRANSFER}</Text>
            </View>
          </View>
        }
      </ScrollView>
    );
  }
}

export default Transactions;
