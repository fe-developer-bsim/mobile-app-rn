import React from 'react';
import WebView from 'react-native-webview';
class LearnMoreProductwebComponent extends React.Component {
  render () {
    return (
      <WebView
        source={{uri: 'https://www.banksinarmas.com/tabunganonline/'}}
      />
    );
  }
}

export default LearnMoreProductwebComponent;
