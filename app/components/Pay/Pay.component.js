import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {language} from '../../config/language';
import ServiceNavItem from '../ServiceNavItem/ServiceNavItem.component';
import PaymentHistory from '../PaymentHistory/PaymentHistory.component';
import styles from './Pay.component.styles';
import noop from 'lodash/noop';
import {generateBillerMenu, generateBillerMenuBeforeLogin} from '../../utils/transformer.util';
import startsWith from 'lodash/startsWith';

class Pay extends React.Component {

  static propTypes = {
    serviceList: PropTypes.array,
    onBuyMobileTopTop: PropTypes.func,
    goToQrPayment: PropTypes.func,
    navigateTo: PropTypes.func,
    goPayNavigateTo: PropTypes.func,
    onQR: PropTypes.func,
    billerMenuOrder: PropTypes.array,
    billpayHistory: PropTypes.object,
    billerList: PropTypes.array,
    goToIndex: PropTypes.func,
    deleteBillpayHistory: PropTypes.func,
    goToBiller: PropTypes.func,
    reloadHistory: PropTypes.func,
    toGenerateMain: PropTypes.func,
    flagLKDPurchase: PropTypes.bool,
    transactionTypeLKD: PropTypes.object,
    toPushInvoiceHistory: PropTypes.func,
    drawer: PropTypes.bool,
    isLogin: PropTypes.bool,
    cifString: PropTypes.string,
    messageNK: PropTypes.func
  }

  render () {
    const {onBuyMobileTopTop, navigateTo = noop, goPayNavigateTo = noop, onQR = noop, billerMenuOrder,
      billpayHistory, billerList, goToIndex, deleteBillpayHistory, goToBiller, reloadHistory, drawer, cifString, messageNK,  isLogin} = this.props;
    const isVerified = !startsWith(cifString, 'NK');
    const serviceList = isLogin ? generateBillerMenu(billerMenuOrder, {navigateTo, onBuyMobileTopTop, onQR, goPayNavigateTo, goToBiller, messageNK}, isVerified)
      : generateBillerMenuBeforeLogin(billerMenuOrder, {navigateTo, onBuyMobileTopTop, onQR, goPayNavigateTo, goToBiller});
    serviceList.push({
      iconName: '',
      title: '',
    });
    const serviceList2 = serviceList.slice(0, serviceList.length - 1);
    const serviceNavItems = serviceList2.map((item, index) => {
      const {iconName, title, onPress, disable, iconSize, layers} = item;
      return (<ServiceNavItem key={`service_${index}`} iconName={iconName} iconSize={iconSize}
        text={title} onPress={onPress} disable={disable} layers={layers}/>);
    });
    return (
      <ScrollView style={styles.container}>
        <View style={styles.serviceContainer}>
          <Text style={styles.featureTitle}>{language.PAY_BILLS__TITLE}</Text>
          <View style={styles.serviceItemRow}>
            {serviceNavItems}
          </View>
        </View>
        <PaymentHistory billpayHistory={billpayHistory} billerList={billerList}
          goToIndex={goToIndex} deleteBillpayHistory={deleteBillpayHistory}
          drawer={drawer} reloadHistory={reloadHistory} />
      </ScrollView>
    );
  }
}

export default Pay;
