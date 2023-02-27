import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './SILChooseTnc.styles';
import {language} from '../../config/language';
import {noop} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import WebView from 'react-native-webview';

class SmartInvestaLinkPolisTnCComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    onGoNext: PropTypes.func,
    currentLanguage: PropTypes.string,
    url: PropTypes.string,
  };

  render () {
    const {currentLanguage, onGoNext = noop, url} = this.props;

    return (
      <View style={styles.container}>
        {currentLanguage === 'en' ? (
          <WebView source={{uri: url}} />
        ) : (
          <WebView source={{uri: url}} />
        )}
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={onGoNext}>
            <Text style={styles.nextButton}>
              {language.SIL__BUY_POLICY_BUTTON}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default SmartInvestaLinkPolisTnCComponent;
