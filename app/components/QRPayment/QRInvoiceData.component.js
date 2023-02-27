import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import result from 'lodash/result';
import styles from './QRInvoiceData.component.styles';
import ticket from '../../assets/images/coupon.png';
import {language} from '../../config/language';
import {SinarmasButton} from '../../components/FormComponents';

class QRInvoiceDetail extends Component {
  static propTypes = {
    QRVoucherData: PropTypes.object,
    diskon: PropTypes.string,
    merchant: PropTypes.string,
    logo: PropTypes.string,
    goToLanding: PropTypes.func,
  }

  render () {
    const {QRVoucherData, goToLanding} = this.props;
    const diskon = result(QRVoucherData, 'diskon', '');
    const merchant = result(QRVoucherData, 'merchant', '');
    const logo = result(QRVoucherData, 'logo', '');
    const promo = result(QRVoucherData, 'promo', '');
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.ticketContainer}>
            <View style={styles.ticketImageContainer}>
              <Text style={styles.discountTopTitle}>{language.QR_DISCOUNT__INVOICE_TOPTITLE}</Text>
              <Image source={ticket} style={styles.ticketImage} />
              <View style={styles.ticketTextContainer}>
                {diskon ? 
                  <View>
                    <Text style={styles.discountAmount}>{diskon}</Text>
                    <Text style={styles.discountText}>{language.QR_DISCOUNT__INVOICE_DISCOUNT}</Text>
                  </View>
                  :
                  <Text style={styles.promo}>{promo}</Text>}
              </View>
            </View>
          </View>
          
          <View style={styles.merchantDetailContainer}>
            <View style={styles.logoMerchantContainer}>
              <Image source={{uri: logo}} style={styles.logoMerchant}/>
            </View>
            <Text style={styles.merchantText}>{merchant}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <SinarmasButton style={styles.buttonSpacing} onPress={goToLanding}><Text style={styles.buttonLargeText}>{language.QR_DISCOUNT__DONE_BUTTON}</Text></SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default QRInvoiceDetail;
