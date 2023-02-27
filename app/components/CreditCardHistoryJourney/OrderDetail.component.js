import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './OrderDetail.styles';
import WebView from 'react-native-webview';

class DetailOrder extends React.Component {
  static propTypes = {
    urlOrder: PropTypes.string,
    detail: PropTypes.object,
    url: PropTypes.string
  };

  render () {
    const {url} = this.props;
    return (
      <View style={styles.WebViewContainer}>
        <WebView source={{uri: url}} />
      </View>
    );
  }
}

export default DetailOrder;
