import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import NavListItem from '../NavListItem/NavListItem.component';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import styles from './CardLessWithdrawalIndex.style.js';
import {language} from '../../config/language';
import {payeesAddSecondaryText, payeesFromTransactions} from '../../utils/transformer.util';

class CardLessWithdrawalIndex extends Component {
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
        <NavListItem label={language.CARDLESSWITHDRAWAL__NEW_WITHDRAWAL} subtitle={language.CARDLESSWITHDRAWAL__PHONE_NUMBER} featureIconName='send' onPress={onNewTransfer}/>
        <Text style={styles.pickPayeeHeader}>{language.CARDLESSWITHDRAWAL__PICK_FROM}</Text>
        <QuickPickList listOfItems={payeesAddSecondaryText(payeesFromTransactions(recentTransferList, payees))} textKey='name' subtextKey='accountNumber' secondaryTextKey='secondaryText' onSelect={onRecentTransfer}/>
      </View>
    );
  }
}

export default CardLessWithdrawalIndex;
