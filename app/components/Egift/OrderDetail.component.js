import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './OrderDetail.styles';
import result from 'lodash/result';
import WebView from 'react-native-webview';

class DetailOrder extends React.Component {
  static propTypes = {
    urlOrder: PropTypes.string,
    detail: PropTypes.object,
  };

  render () {
    const {detail} = this.props;
    const urlOrder = result(detail, 'voucher.url');
    return (
      <View style={styles.WebViewContainer}>
        <WebView source={{uri: urlOrder}} />
      </View>
    );
  }
}

export default DetailOrder;
