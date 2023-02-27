import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './TransactionSummary.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import {isEmptyOrNull, getDayName} from '../../utils/transformer.util';
import PropTypes from 'prop-types';
import moment from 'moment';
import {language} from '../../config/language';

class TransactionSummary extends Component {
  payerView = (info) => {
    const accNo = result(info, 'accNo', '');
    const name = result(info, 'name', '');
    const productType = result(info, 'productType', '');
    return (
      <View style={styles.rowAlign}>
        <View>
          <SimasIcon name={'wallet'} size={30} style={styles.wallet}/>
        </View>
        <View>
          <Text style={styles.accNo}>{accNo}</Text> 
          <Text style={[styles.product]}>{name}</Text> 
          <Text style={[styles.product]}>{productType}</Text>
        </View>
      </View>);
  }

  targetView = (info) => this.props.txType === 'genericBiller' ? this.billerView(info) : this.payeeView(info)

  payeeView = (info) => 
    (<View style={styles.payeeDetail}>            
      <SimasIcon name={'sendto'} size={30} style={styles.profileIcon}/>
      <View>
        <Text style={styles.accNo}>{result(info, 'accNo', 'NA')}</Text>              
        <Text style={styles.product}>{result(info, 'name', 'NA')}</Text>
        <Text style={styles.product}>{result(info, 'productType', 'NA')}</Text>
      </View>
    </View>)

  billerView = (info) => 
    <View style={styles.rowAlign}>
      <View>
        <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
      </View>
      <View>
        <Text style={styles.accNo}>{result(info, 'subsNumber', 'N/A')}</Text> 
        <Text style={styles.product}>{result(info, 'name', 'N/A')}</Text> 
      </View>
    </View>
  
  parsePayerData = (data) => ({
    ...data,
    accNo: result(data, 'accountNumber', 'N/A'),
    name: result(data, 'name', 'N/A'), 
    productType: result(data, 'productType', 'N/A'),
  })

  parsePayeeData = (data) => {
    const isSimas = result(data, 'detailNetworkCode', '') === '153';
    const isUnknownAccount = result(data, 'accountType', '') === 'UnknownAccount' || isEmptyOrNull(result(data, 'accountType', ''));
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(data, 'bankName', 'N/A') : result(data, 'accountType', 'N/A')
      : result(data, 'bankName', 'N/A');
    return ({
      ...data,
      accNo: result(data, 'accountNumber', 'N/A'),
      name: result(data, 'name', 'N/A'),
      productType: targetAccountType,
    });  
  }

  parseBillerData = ({subscriberNoInput = '', targetAccount = 'N/A', ...data}) => ({
    subsNumber: subscriberNoInput,
    name: targetAccount,
    ...data,
  })

  parseTargetData = (info) => this.props.txType === 'genericBiller' ? this.parseBillerData(info) : this.parsePayeeData(info)

  render () {
    const {payer, target, txTime = new Date(), customPayerView = this.payerView, customTargetView = this.targetView} = this.props;
    const payerInfo = this.parsePayerData(payer);
    const targetInfo = this.parseTargetData(target); // fund transfer as default atm
    const showTime = `${language.GENERIC__ON} ${getDayName(txTime)}, ${moment(txTime).format('DD MMM YYYY')}`;
    return (
      <View style={styles.container}>
        <View style={styles.timeInitiate}>
          <Text style={styles.timeInitiateText}>{showTime}</Text>                  
        </View>
        {
          customPayerView(payerInfo)
        }
        <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
        {
          customTargetView(targetInfo)
        }
      </View>
    );
  }
  static propTypes = {
    txType: PropTypes.string,
    txTime: PropTypes.object,
    payer: PropTypes.object,
    target: PropTypes.object,
    customPayerView: PropTypes.func,
    customTargetView: PropTypes.func,
  }
}

export default TransactionSummary;