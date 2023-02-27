import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavListItem from '../../components/NavListItem/NavListItem.component';
import {ScrollView} from 'react-native';

export default class Invest extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  onTimeDepositClick = () => {
    this.props.navigation.navigate('Transfer');
  }
  onBondsClick = () => {
    // console.log('go bonds page');
  }
  onStocksClick = () => {
    // console.log('go stocks page');
  }
  onFundsClick = () => {
    // console.log('go funds page');
  }
  render () {
    return (
      <ScrollView keyboardShouldPersistTaps='handled' >
        <NavListItem disabled label='Time Deposit' featureIconName='expense' onPress={this.onTimeDepositClick} />
        <NavListItem disabled label='Bonds' featureIconName='expense' onPress={this.onBondsClick} />
        <NavListItem disabled label='Stocks' featureIconName='expense' onPress={this.onStocksClick} />
        <NavListItem disabled label='Funds' featureIconName='expense' onPress={this.onFundsClick} />
        <NavListItem label='Transfer' featureIconName='expense' onPress={this.onTimeDepositClick} />
      </ScrollView>
    );
  }
}
