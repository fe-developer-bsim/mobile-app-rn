import React from 'react';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import WebView from 'react-native-webview';

class DetailPAComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  render () {
    const {navigation} = this.props;
    const url = result(navigation, 'state.params.url', '');
    return <WebView source={{uri: url}} />;
  }
}

export default DetailPAComponent;
