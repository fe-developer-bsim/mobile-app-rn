import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './AboutSmartPromo.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import WebView from 'react-native-webview';

class AboutPromocomponent extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    onFinalizeForm: PropTypes.func
  };

  render () {
    const {currentLanguage, onFinalizeForm} = this.props;
    const urlPromo =
      currentLanguage === 'en'
        ? 'http://www.banksinarmas.com/PersonalBanking/externalContent/SmartfrenPromo_en.html'
        : 'http://www.banksinarmas.com/PersonalBanking/externalContent/SmartfrenPromo_id.html';
    return (
      <View style={styles.container}>
        <WebView source={{uri: urlPromo}} />
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={onFinalizeForm}>
            <Text style={styles.nextButton}>
              {language.SMARTFREN__AGREE_BUTTON}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default AboutPromocomponent;
