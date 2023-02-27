import React from 'react';
import WebView from 'react-native-webview';

class SimasPoinComponent extends React.Component {
  render () {
    return <WebView source={{uri: 'https://simaspoin.excite.co.id'}} />;
  }
}

export default SimasPoinComponent;
