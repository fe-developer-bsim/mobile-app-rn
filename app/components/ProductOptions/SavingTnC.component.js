import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './IndigoTnC.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {noop} from 'lodash';
import WebView from 'react-native-webview';

class SavingTnC extends React.Component {
  static propTypes = {
    goToNextPage: PropTypes.func,
    currentLanguage: PropTypes.string,
    nav: PropTypes.object,
    urlTNCID: PropTypes.string,
    urlTNCEN: PropTypes.string
  };

  render () {
    const {
      currentLanguage,
      goToNextPage = noop,
      nav,
      urlTNCID,
      urlTNCEN,
    } = this.props;
    return (
      <View style={styles.container}>
        {currentLanguage === 'en' ? (
          <WebView source={{uri: urlTNCEN}} />
        ) : (
          <WebView source={{uri: urlTNCID}} />
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

export default SavingTnC;
