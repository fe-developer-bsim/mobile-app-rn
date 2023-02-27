import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import NavListItem from '../NavListItem/NavListItem.component';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import styles from './CreditCardIndex.style.js';
import {language} from '../../config/language';

class CreditCardIndex extends Component {
  static propTypes = {
    onNewccBill: PropTypes.func,
    onRecentBill: PropTypes.func,
    recentTransactionList: PropTypes.array
  }

  render () {
    const {recentTransactionList, onNewccBill, onRecentBill} = this.props;
    return (
      <View style={styles.container}>
        <NavListItem label={language.CREDIT_CARD__NEW_BILL} subtitle={language.CREDIT_CARD__MAKE_NEW_BILL} featureIconName='card-number-input' iconSize={25} theme='primary' onPress={onNewccBill}/>
        <View style={styles.paddingContent}>
          <Text style={styles.pickPayeeHeader}>{language.CREDIT_CARD__PICK_FROM}</Text>
        </View>
        <QuickPickList listOfItems={recentTransactionList} textKey='accNo' subtextKey='name' secondaryTextKey='bank.bankName' onSelect={onRecentBill}/>
      </View>
    );
  }
}

export default CreditCardIndex;
