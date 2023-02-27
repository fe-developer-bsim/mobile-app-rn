import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './TransactionHeaderOptionsEmoney.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {exportTransactionHistory} from '../../state/thunks/transactionHistory.thunks';
import result from 'lodash/result';

class TransactionHeaderOptions extends React.Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    navProps: PropTypes.object
  }
  goToFilter = () => {
    this.props.navigate('TransactionFilterEmoneyScreen');
  }

  sendMail = () => {
    const {navProps, dispatch} = this.props;
    const accountNumber = result(navProps, 'params.accountNumber');
    dispatch(exportTransactionHistory(accountNumber));
  }

  render () {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.goToFilter} style={styles.touchableContainer}>
          <SimasIcon name='filter' style={styles.icon} size={20}/>
        </Touchable>
        <Touchable onPress={this.sendMail} style={styles.touchableContainer}>
          <SimasIcon name='export' style={styles.icon} size={20}/>
        </Touchable>
      </View>
    );
  }
}

export default TransactionHeaderOptions;
