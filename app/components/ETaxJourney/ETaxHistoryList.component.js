import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result} from 'lodash';
import styles from './ETaxHistoryList.styles';
import Touchable from '../../components/Touchable.component';
import moment from 'moment';

class EtaxHistoryList extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    formValues: PropTypes.object,
    billerAccount: PropTypes.func,
    handleSubmit: PropTypes.func,
    goBack: PropTypes.func,
    clearFitler: PropTypes.func,
    navigation: PropTypes.object,
    retryTransaction: PropTypes.func,
    downloadReceipt: PropTypes.func,
    backHome: PropTypes.func
  }

  state = {
    setDate: ''
  }

  renderHistory = (historyTransaction, index) => {
    const {downloadReceipt, navigation} =  this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const billerName = result(biller, 'name', '');
    const idBilling = result(historyTransaction, 'idBilling', '');
    const NTPN = result(historyTransaction, 'ntpn', '');
    const total = result(historyTransaction, 'amount', 0);
    const date = result(historyTransaction, 'transactionDate', '');
    const status = result(historyTransaction, 'status', '');
    const dateObject = new Date(date);
    const humanDateFormat =  moment(dateObject).format('DD MMM YYYY');
    return (
      <View>
        <View style={styles.historyContainer} key={index}>
          <View style={styles.statusContainer}>
            {
              status === 'Success' ?
                <View style={styles.successCircle}> 
                  <SimasIcon name='check-black' style={styles.succesIcon} size={20}/>
                </View>
                :
                <View style={styles.failCircle}> 
                  <SimasIcon name='close-black' style={styles.failIcon} size={15}/>
                </View>
            }
            <Text style={status === 'Success' ? styles.successText : styles.failText}>{status}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.billingText}>{language.ETAX__HISTORY_LIST_IDBILLING}: {idBilling}</Text>
            <Text style={styles.typeText}>{billerName}</Text>
            <Text style={styles.typeText}>{language.ETAX__HISTORY_LIST_NTPN}: {NTPN}</Text>
            <Text style={styles.typeText}>{language.GENERIC__GRAND_TOTAL}: {total}</Text>
            <Text style={styles.date}>{humanDateFormat}</Text>
          </View>
          <View style={styles.iconContainer}>
            {
              status === 'Success' ? 
                <Touchable onPress={downloadReceipt(idBilling)}>
                  <SimasIcon name='download_ico' style={styles.exportIcon} size={20}/>
                </Touchable>
                :
                <Touchable onPress={downloadReceipt(idBilling)}>
                  <SimasIcon name='download_ico' style={styles.exportIcon} size={20}/>
                </Touchable>
            }
          </View>
        </View>
        <View style={styles.bottomLine}/>
      </View>

    );
  }

  
  render () {
    const {navigation, backHome} = this.props;
    const listData = result(navigation, 'state.params.resData', []);
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120}>
            {listData.map(this.renderHistory)}
          </ScrollView>
          <View style={styles.footer}>
            <SinarmasButton text={language.TAB_TITLE__OVERVIEW} onPress={backHome}/>
          </View>
        </View>
        
      </View>
    );
  }
}

export default EtaxHistoryList;