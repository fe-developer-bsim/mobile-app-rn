import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './EForm.styles';
import WebView from 'react-native-webview';

class EFormloanTnC extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    currentLanguage: PropTypes.string
  };

  render () {
    const {url} = this.props;
    return (
      <View style={styles.termsContainer}>
        <WebView source={{uri: url}} />
      </View>
    );
  }
}

export default EFormloanTnC;
