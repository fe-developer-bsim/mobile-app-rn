import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './EmoneyClosingConfirmationNoBalance.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import LogoImage from '../../assets/images/white-simobi.png';
import {SinarmasButtonOnboarding} from '../FormComponents';

class EmoneyClosingConfirmationNoBalance extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    userName: PropTypes.string,
    emoney: PropTypes.object,
    copyAccountNumber: PropTypes.func,
    cif: PropTypes.string,
    showOffer: PropTypes.bool,
    getBalanceEmoney: PropTypes.func,
    showUpgradeEmoney: PropTypes.func,
    goCloseEmoney: PropTypes.func,
  }

  render () {
    const {goCloseEmoney} = this.props;
    return (
      <View style={styles.redContainer}>
        <View>
          <View>
            <Image source={LogoImage} style={styles.logoImage}/>
          </View>
          <View style={styles.row}>
            <Text style={styles.whiteTitle}>
              {language.EMONEY__CLOSING_CONFIRMATION_TITLE}
            </Text>
            <SimasIcon name='sad' style={styles.iconStyle} size={40}/>
          </View>
          <Text style={styles.whiteSubtitle}>
            {language.EMONEY__CLOSING_CONFIRMATION_SUBTITLE_NO_BALANCE}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <SinarmasButtonOnboarding onPress={goCloseEmoney} text={language.EMONEY__CLOSING_EMONEY_BUTTON}/>
        </View>
      </View>
    );
  }
}

export default EmoneyClosingConfirmationNoBalance;
