import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './IndigoTnC.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {noop} from 'lodash';
import WebView from 'react-native-webview';

class IndigoTnC extends React.Component {
  static propTypes = {
    onFinalizeForm: PropTypes.func,
    goToNextPage: PropTypes.func,
    url: PropTypes.string,
    currentLanguage: PropTypes.string,
    nav: PropTypes.object
  };

  render () {
    const {url, currentLanguage, goToNextPage = noop, nav} = this.props;
    return (
      <View style={styles.container}>
        {currentLanguage === 'en' ? (
          <WebView source={{uri: url}} />
        ) : (
          <WebView source={{uri: url}} />
        )}
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={goToNextPage(nav)}>
            <Text style={styles.nextButton}>
              {language.SMARTFREN__AGREE_BUTTON}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default IndigoTnC;
