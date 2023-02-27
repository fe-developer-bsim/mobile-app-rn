import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './HistoryHeaderOptions.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import {exportCreditCardHistory} from '../../state/thunks/transactionHistory.thunks.js';

class HistoryHeaderOptions extends React.Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  sendMail = () => {
    const state = result(this.props, 'state', {});
    const {dispatch} = this.props;
    const creditCardNumber = result(state, 'params.creditCardDetail.accountNumber', '');
    dispatch(exportCreditCardHistory(creditCardNumber));
  }

  render () {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.sendMail} style={styles.touchableContainer}>
          <SimasIcon name='export' style={styles.icon} size={20}/>
        </Touchable>
      </View>
    );
  }
}

export default HistoryHeaderOptions;
