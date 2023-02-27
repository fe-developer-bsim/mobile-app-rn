import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './QRDiscountEULA.component.styles';
import result from 'lodash/result';
import WebView from 'react-native-webview';

class QRDiscountEULA extends React.Component {
  static propTypes = {
    goToDiscountQR: PropTypes.func,
    url: PropTypes.string,
    navigation: PropTypes.object,
  };

  render () {
    const {goToDiscountQR, url, navigation} = this.props;
    const showButton = result(navigation, 'state.params.showButton', '');
    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} />
        <View style={styles.buttonContainer}>
          {showButton ? null : (
            <SinarmasButton onPress={goToDiscountQR}>
              <Text style={styles.nextButton}>
                {language.QR_DISCOUNT__I_AGREE}
              </Text>
            </SinarmasButton>
          )}
        </View>
      </View>
    );
  }
}

export default QRDiscountEULA;
