import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Keyboard} from 'react-native';
import {language} from '../../config/language';
import styles from './ETaxLanding.styles';
import Touchable from '../../components/Touchable.component';
import etaxFirst from '../../assets/images/etaxone.png';
import etaxSecond from '../../assets/images/etaxtwo.png';
import etaxHistory from '../../assets/images/etaxhistory.png';

class ProductList extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    gotoHistory: PropTypes.func,
    biller: PropTypes.array,
    isLogin: PropTypes.bool,
    gotoEasyPin: PropTypes.func,
  }

  componentDidMount () {
    Keyboard.dismiss();
  }

  render () {
    const {createIDBilling, gotoPayment, gotoHistory, biller, isLogin, gotoEasyPin} = this.props;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>

            <Touchable onPress={createIDBilling(biller)} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={etaxFirst} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.ETAX__LANDING_CREATE_ID_BILLING}</Text>
                  <Text style={styles.txtLight}>{language.ETAX__LANDING_CREATE_ID_BILLING_SUBTITLE}</Text>
                </View>
              </View>
            </Touchable>

            <Touchable onPress={gotoPayment(biller)} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={etaxSecond} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.ETAX__LANDING_ETAX_PAYMENT}</Text>
                  <Text style={styles.txtLight}>{language.ETAX__LANDING_ETAX_PAYMENT_SUBTITLE}</Text>
                </View>
              </View>
            </Touchable>

            <Touchable onPress={isLogin ? gotoHistory(biller) : gotoEasyPin(biller)} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={etaxHistory} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.ETAX__LANDING_TRANSACTION_HISTORY}</Text>
                  <Text style={styles.txtLight}>{language.ETAX__LANDING_TRANSACTION_HISTORY_SUBTITLE}</Text>
                </View>
              </View>
            </Touchable>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ProductList;