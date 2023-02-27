import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './QROnboard.styles';
import WebView from 'react-native-webview';

class QROnboard extends React.Component {
  static propTypes = {
    openAccount: PropTypes.func,
    url: PropTypes.string,
  };

  render () {
    const {openAccount, url} = this.props;
    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} />
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={openAccount}>
            <Text style={styles.nextButton}>
              {language.OPEN_NEW_ACCOUNT__I_AGREE}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default QROnboard;
