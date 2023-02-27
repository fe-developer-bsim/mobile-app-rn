import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import NavListItem from '../NavListItem/NavListItem.component';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import styles from './FundTransferIndex.style.js';
import {language} from '../../config/language';
import {payeesAddSecondaryText, payeesFromTransactions} from '../../utils/transformer.util';

class FundTransferIndex extends Component {
  static propTypes = {
    onNewTransfer: PropTypes.func,
    onRecentTransfer: PropTypes.func,
    recentTransferList: PropTypes.array,
    payees: PropTypes.array,
    promoLink: PropTypes.string
  }

  render () {
    const {recentTransferList, payees, onNewTransfer, onRecentTransfer} = this.props;
    return (
      <View style={styles.container}>
        <NavListItem label={language.SEND__NEW_TRANSFER} subtitle={language.SEND__NEW_TRANSFER_SUBTITLE} featureIconName='send' onPress={onNewTransfer}/>
        <Text style={styles.pickPayeeHeader}>{language.TRANSFER__PICK_FROM}</Text>
        <QuickPickList listOfItems={payeesAddSecondaryText(payeesFromTransactions(recentTransferList, payees))} textKey='name' subtextKey='accountNumber' secondaryTextKey='secondaryText' onSelect={onRecentTransfer}/>
      </View>
    );
  }
}

export default FundTransferIndex;
