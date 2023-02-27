import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './SILInformasiTnC.styles';
import {language} from '../../config/language';
import {noop} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import WebView from 'react-native-webview';

class SmartInvestaLinkPolisTnCComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    onBackPage: PropTypes.func,
    currentLanguage: PropTypes.string,
    url: PropTypes.string,
    isSilIdrUsd: PropTypes.string
  };

  render () {
    const {currentLanguage, onBackPage = noop, url, isSilIdrUsd} = this.props;
    return (
      <View style={styles.container}>
        {currentLanguage === 'en' ? (
          <WebView source={{uri: url}} />
        ) : (
          <WebView source={{uri: url}} />
        )}
        <View style={styles.buttonContainer}>
          {isSilIdrUsd === 'IDR' ? (
            <SinarmasButton onPress={onBackPage}>
              <Text style={styles.nextButton}>{language.GENERIC__CLOSE}</Text>
            </SinarmasButton>
          ) : (
            <SinarmasButton onPress={onBackPage}>
              <Text style={styles.nextButton}>{language.GENERIC__CLOSE}</Text>
            </SinarmasButton>
          )}
        </View>
      </View>
    );
  }
}

export default SmartInvestaLinkPolisTnCComponent;
