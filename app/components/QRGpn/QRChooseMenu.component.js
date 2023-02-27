import {View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRMerchantDetail.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';

class QRMerchantDetail extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    QRCustomer: PropTypes.func,
    WithdrawalForms: PropTypes.func,
  }

  toScannPayment = () => {
    const {QRCustomer} = this.props;
    QRCustomer(1);
  }

  toScannTransfer = () => {
    const {QRCustomer} = this.props;
    QRCustomer(2);
  }

  toScannWithdrawal = () => {
    const {QRCustomer} = this.props;
    QRCustomer(3);
  }

  render () {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View>
          <View style={styles.merchantContainer}>
            <View>
              <SinarmasButton onPress={this.toScannPayment} text={language.QR_GPN__CHOOSE_MENU_01}/>
            </View>
            <View>
              <SinarmasButton onPress={this.toScannTransfer} text={language.QR_GPN__CHOOSE_MENU_02}/>
            </View>
            <View>
              <SinarmasButton onPress={this.toScannWithdrawal} text={language.QR_GPN__CHOOSE_MENU_03}/>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default QRMerchantDetail;
