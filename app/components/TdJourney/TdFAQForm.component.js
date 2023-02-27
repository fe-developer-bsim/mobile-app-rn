import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './TdFAQ.component.style';
import WebView from 'react-native-webview';

class TdFAQForm extends React.Component {
  static propTypes = {
    confirmsTd: PropTypes.func,
    url: PropTypes.string,
    navigation: PropTypes.object,
  };

  render () {
    const {confirmsTd, url} = this.props;
    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} />
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={confirmsTd}>
            <Text style={styles.nextButton}>
              {language.TIME_DEPOSIT__AGREEMENT__BTN}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default TdFAQForm;
