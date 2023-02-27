import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CloseCardAccounts.styles';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import savingPay from '../../assets/images/saving-paycard.png';

import savingGold from '../../assets/images/saving-gold.png';
import gpnCard from '../../assets/images/gpn-card.png';
import simasDiamondCard from '../../assets/images/diamond-card.png';
import tabungankuKonvenCard from '../../assets/images/tabunganku-konven-card.png';
import linkCard from '../../assets/images/link-cc.png';
import audImg  from '../../assets/images/aud.png';
import usdImg from '../../assets/images/usd.png';
import sgdImg from '../../assets/images/sgd.png';
import nzdImg from '../../assets/images/nzd.png';
import cnyImg from '../../assets/images/cny.png';
import eurImg from '../../assets/images/eur.png';

class CloseCardAccount extends React.Component {
  static propTypes = {
    accountNumber: PropTypes.string,
    productType: PropTypes.string,
    name: PropTypes.string,
    balances: PropTypes.object,
    getConfirmation: PropTypes.func,
    currency: PropTypes.string,
    accountTypeCode: PropTypes.string,
    getAccountData: PropTypes.func
  }

  render () {
    const {accountNumber, productType, balances, getAccountData, accountTypeCode, currency} = this.props;
    const availableBalance = result(balances, 'availableBalance', '');
    const srcImage = productType === 'SavingAccount' ? savingPay : accountTypeCode === '6002' ? savingGold :
      accountTypeCode === '6005' || accountTypeCode === '6006' || accountTypeCode === '6013' 
    || accountTypeCode === '6014' || accountTypeCode === '6015' || accountTypeCode === '6019' 
    || accountTypeCode === '6020' || accountTypeCode === '6021' || accountTypeCode === '6022' 
    || accountTypeCode === '6025' || accountTypeCode === '6026' || accountTypeCode === '6027' 
    || accountTypeCode === '6029' ? gpnCard : accountTypeCode === '6009' ? tabungankuKonvenCard :
          accountTypeCode === '6018' ? simasDiamondCard : currency === 'AUD' ? audImg : 
            currency === 'USD' ? usdImg : currency === 'SGD' ? sgdImg : currency === 'NZD' ? nzdImg : currency === 'CNY' ? cnyImg : currency === 'EUR' ? eurImg : linkCard;

    return (
      <ScrollView style={styles.contentContainerStyle} keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image style={styles.imageList} source={srcImage}/>
                </View>
                   
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{productType}</Text>
                  <Text style={styles.txtLight}>{language.DASHBOARD__ACCOUNT_NUMBER}: {accountNumber}</Text>
                  <Text style={styles.txtLight}>{language.SERVICE__AVAILABLE_BALANCE}: {currency === 'IDR' ? 'Rp' : currency} {currencyFormatter(availableBalance)}</Text>
                  <SinarmasButton style={styles.button2} onPress={getAccountData}>
                    <Text style={styles.closeBtn}>{language.GENERIC__CLOSE}</Text>
                  </SinarmasButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default CloseCardAccount;
