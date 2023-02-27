import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './EmoneyClosingConfirmation.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import LogoImage from '../../assets/images/white-simobi.png';
import topUpPhoneBalance from '../../assets/images/top-up-phone-balance.jpg';
import payByQr from '../../assets/images/pay-by-qr.jpg';
import payBills from '../../assets/images/pay-bills.jpg';
import payAtTokopedia from '../../assets/images/pay-at-tokopedia.jpg';
import gopay from '../../assets/images/gopay.jpg';
import {SinarmasButton} from '../FormComponents';

class EmoneyClosingConfirmation extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    userName: PropTypes.string,
    emoney: PropTypes.object,
    copyAccountNumber: PropTypes.func,
    cif: PropTypes.string,
    showOffer: PropTypes.bool,
    getBalanceEmoney: PropTypes.func,
    showUpgradeEmoney: PropTypes.func,
    goToDashboard: PropTypes.func,
  }

  render () {
    const {goToDashboard} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.redContainer}>
            <Image source={LogoImage} style={styles.logoImage}/>
            <View style={styles.row}>
              <Text style={styles.whiteTitle}>
                {language.EMONEY__CLOSING_CONFIRMATION_TITLE}
              </Text>
              <SimasIcon name='sad' style={styles.iconStyle} size={40}/>
            </View>
            <Text style={styles.whiteSubtitle}>
              {language.EMONEY__CLOSING_CONFIRMATION_SUBTITLE_WITH_BALANCE}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.title}>
                {language.EMONEY__CLOSING_CONFIRMATION_TITLE_OFFER}
              </Text>
            </View>
            <View style={styles.greyContainer}>
              <Image source={topUpPhoneBalance} style={styles.imageOffer} />
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.titleOffer}>
                  {language.EMONEY__CLOSING_CONFIRMATION_TITLE_OFFER_1}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.greyContainer}>
                <Image source={payAtTokopedia} style={styles.imageOffer} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleOffer}>
                  {language.EMONEY__CLOSING_CONFIRMATION_TITLE_OFFER_2}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.greyContainer}>
                <Image source={gopay} style={styles.imageOffer} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleOffer}>
                  {language.EMONEY__CLOSING_CONFIRMATION_TITLE_OFFER_3}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.greyContainer}>
                <Image source={payByQr} style={styles.imageOffer}/>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleOffer}>
                  {language.EMONEY__CLOSING_CONFIRMATION_TITLE_OFFER_4}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.greyContainer}>
                <Image source={payBills} style={styles.imageOffer} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleOffer}>
                  {language.EMONEY__CLOSING_CONFIRMATION_TITLE_OFFER_5}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <SinarmasButton onPress={goToDashboard} text={language.GENERIC__OK}/>
        </View>
      </ScrollView>
    );
  }
}

export default EmoneyClosingConfirmation;

