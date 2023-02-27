import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './LuckyDrawTnC.styles';
import WebView from 'react-native-webview';

class LuckyDrawTnC extends React.Component {
  static propTypes = {
    openAccount: PropTypes.func,
    url: PropTypes.string,
  };

  render () {
    const {url} = this.props;
    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} />
      </View>
    );
  }
}

export default LuckyDrawTnC;
