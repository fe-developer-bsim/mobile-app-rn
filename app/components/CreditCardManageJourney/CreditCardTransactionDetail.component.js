import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking} from 'react-native';
import styles from './CreditCardTransactionDetail.style';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {toCCFormater} from '../../utils/transformer.util';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import creditCard from '../../assets/images/icon-CreditCard.png';
import Transfer from '../../assets/images/Transfer.png';
import moment from 'moment';
import {Toast} from '../../utils/RNHelpers.util';



class CreditCardTransactionDetail extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    selectedAccount: PropTypes.object,
    moveTo: PropTypes.func,
    CCtransaction: PropTypes.object,
    chageToInstallment: PropTypes.func,
    isDisable: PropTypes.bool,
  }

  call = () => {
    Linking.canOpenURL('tel:1500153').then((supported) => {
      if (supported) {
        Linking.openURL('tel:1500153');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  toastDisable = () => {
    Toast.show(language.DASHBOARD__CREDIT_CARD_TOAST_KOLEK_2);
  }

  render () {
    const {selectedAccount, CCtransaction, chageToInstallment, isDisable} = this.props;
    const trans = result(CCtransaction, 'label');
    const amount = result(CCtransaction, 'amount');
    const date = result(CCtransaction, 'date');
    const installable = result(CCtransaction, 'installable');
    const completeDate = moment(date).format('dddd, DD MMM YYYY');
    const isON = installable === 'Y' && isDisable === false;
    const cardStatus = result(selectedAccount, 'cardStatus', '');
    return (
      <View style={styles.halfWidth}>
        <View style={styles.halfWidth}>
          <ScrollView contentContainerStyle={{paddingBottom: 60}} style={styles.container}>
            <View style={styles.top}>
              <View style={styles.backgroundColor1}/>
              <View style={styles.containerBox}>
                <View style={styles.containerLeft}>
                  <SimasIcon name='success-circle' size={40} style={styles.successIcon}/>
                  <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_SUCCESS}</Text>


                  <View style={styles.greyLine}/>

                  <Text style={styles.detailSubTitle}>{language.OPEN_NEW_ACCOUNT__TRANSACTION}</Text>
                  <View style={styles.detailInside}>
                    <View style={styles.detailInsideName}>
                      <Text style={styles.detailText}>{trans}</Text>
                    </View>
                    <View style={styles.detailInsideAmt}>
                      <Text style={styles.detailText}>{'Rp ' + toCCFormater(amount)}</Text>
                    </View>
                  </View>

                  <View style={styles.detail}>
                    <View style={{paddingHorizontal: 20, marginBottom: 10}}>
                      <Text style={styles.detailTextB}>{completeDate}</Text>
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                      <View style={styles.senderDetail}>
                        <Image source={creditCard} style={styles.walletIcon}/>
                        <View style={styles.rightItemContainer}>
                          <Text style={styles.sendAccName}>{result(selectedAccount, 'name')}</Text>
                          <Text style={styles.sendAccNumber}>{result(selectedAccount, 'accountNumber')}</Text>
                          <Text style={styles.sendAccType}>Credit Card</Text>
                        </View>
                      </View>
                      <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                      <View style={styles.senderDetail}>
                        <Image source={Transfer} style={styles.walletIcon}/>
                        <View style={styles.rightItemContainer}>
                          <Text style={styles.sendAccName}>{trans}</Text>

                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.detail}>

                    <View style={{paddingHorizontal: 20, marginBottom: 10}}>
                      <Text style={styles.detailTextB}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.detailTextCall} onPress={this.call}>{language.HELP__CALL_US__SUBTITLE}</Text> </Text>
                      <Text style={styles.sendAccType}>{language.PAYMENT_STATUS__HELP_01}</Text>
                      <Text style={styles.sendAccType}>{language.PAYMENT_STATUS__HELP_02}</Text>
                    </View>
                  </View>

                </View>
              </View>
            </View>
          </ScrollView>

          {isON === true ?
            <View style={styles.bottomButton}>
              <SinarmasButton onPress={cardStatus === '4' ? this.toastDisable : chageToInstallment} text={language.DASHBOARD__CREDIT_CARD_CONVERT} />
            </View>
            :
            null}

        </View>
      </View>
    );
  }
}

export default CreditCardTransactionDetail;
