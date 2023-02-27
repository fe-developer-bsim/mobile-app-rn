import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './ActivationSuccess.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import LogoImage from '../../assets/images/simobiplus.png';
import topUpPhoneBalance from '../../assets/images/top-up-phone-balance.jpg';
import payByQr from '../../assets/images/pay-by-qr.jpg';
import payBills from '../../assets/images/pay-bills.jpg';
import payAtTokopedia from '../../assets/images/pay-at-tokopedia.jpg';
import gopay from '../../assets/images/gopay.jpg';
import {SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';

class ActivationSuccess extends React.Component {
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
    fullName: PropTypes.string,
  }

  render () {
    const {goToDashboard, fullName} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.topContainer}>
            <View style={styles.logoContainer}>
              <Image source={LogoImage} style={styles.logoImage}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.blackTitle}>
                {language.ACTIVATION_SUCCESS_TITLE}{fullName}!
              </Text>
              <SimasIcon name='check-black' style={styles.iconStyle} size={30}/>
            </View>
            <Text style={styles.blackSubtitle}>
              {language.ACTIVATION_SUCCESS_SUBTITLE}
            </Text>
            <Touchable style={styles.rowGotoDashboard} onPress={goToDashboard}>
              <Text style={styles.redText}>
                {language.ACTIVATION_SUCCESS_BUTTON}
              </Text>
              <SimasIcon name='arrow' style={styles.arrowIcon} size={13}/>
            </Touchable>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.title}>
                {language.ACTIVATION_SUCCESS_PROMO_TITLE}
              </Text>
            </View>

            <View style={styles.whiteContainer}>
              <Image source={topUpPhoneBalance} style={styles.imageOffer} />
              <View>
                <Text style={styles.titleOffer}>
                  {language.ACTIVATION_SUCCESS_PROMO_SUBTITLE1}
                </Text>
              </View>
            </View>

            <View style={styles.whiteContainer}>
              <Image source={payAtTokopedia} style={styles.imageOffer} />
              <View>
                <Text style={styles.titleOffer}>
                  {language.ACTIVATION_SUCCESS_PROMO_SUBTITLE2}
                </Text>
              </View>
            </View>

            <View style={styles.whiteContainer}>
              <Image source={gopay} style={styles.imageOffer} />
              <View>
                <Text style={styles.titleOffer}>
                  {language.ACTIVATION_SUCCESS_PROMO_SUBTITLE3}
                </Text>
              </View>
            </View>

            <View style={styles.whiteContainer}>
              <Image source={payByQr} style={styles.imageOffer}/>
              <View>
                <Text style={styles.titleOffer}>
                  {language.ACTIVATION_SUCCESS_PROMO_SUBTITLE4}
                </Text>
              </View>
            </View>

            <View style={styles.whiteContainer}>
              <Image source={payBills} style={styles.imageOffer} />
              <View>
                <Text style={styles.titleOffer}>
                  {language.ACTIVATION_SUCCESS_PROMO_SUBTITLE5}
                </Text>
              </View>
            </View>

          </View>
        </View>
        <View style={styles.bottomContainer}>
          <SinarmasButton onPress={goToDashboard} text={language.ACTIVATION_SUCCESS_BOTTOM_BUTTON}/>
        </View>
      </ScrollView>
    );
  }
}

export default ActivationSuccess;
