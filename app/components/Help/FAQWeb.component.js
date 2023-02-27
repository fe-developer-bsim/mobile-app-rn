import React from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
class FAQWebComponent extends React.Component {
  static propTypes = {
    urlFAQ: PropTypes.string
  };

  render () {
    const {urlFAQ = ''} = this.props;
    return <WebView source={{uri: urlFAQ}} />;
  }
}

export default FAQWebComponent;
