import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './SinarmasSekuritasInfo.styles';
import Touchable from '../Touchable.component';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import GetTransactionHistory from './GetTransactionHistory.component';
import {theme} from '../../styles/core.styles';
import {language} from '../../config/language';

class Casa extends React.Component {
  static propTypes = {
    productList: PropTypes.array,
    showReload: PropTypes.bool,
    loadingError: PropTypes.bool,
    onReloadPress: PropTypes.func,
    transactions: PropTypes.array,
    showLoader: PropTypes.bool,
    
  }

  render () {
    const {showLoader = true, loadingError, onReloadPress = noop, showReload} = this.props;
    let transactionList = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return (showLoader && isEmpty(transactionList) ?
      <View style={styles.transactionsContainer}><ActivityIndicator color={theme.primary} size={theme.spinnerSizeLarge}/></View> :
      loadingError ?
        <View style={styles.transactionsContainer}>
          {showReload && <Touchable onPress={onReloadPress}><Text style={styles.reload}>{'\n'}{language.DASHBOARD__SHOW_RECENT_TRANSACTIONS}</Text></Touchable>}
        </View> : <GetTransactionHistory transactions={transactionList.slice(0, 4)} hideIcon={true} isSaving={true}/>
    );
  }
}

export default Casa;
