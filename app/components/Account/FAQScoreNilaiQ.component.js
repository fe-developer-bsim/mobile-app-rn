import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './FAQScoreNilaiQ.styles';
import WebView from 'react-native-webview';

class FAQScoreNilaiQ extends React.Component {
  static propTypes = {
    urlFAQ: PropTypes.string,
  };

  render () {
    const {urlFAQ} = this.props;
    return (
      <View style={styles.container}>
        <WebView source={{uri: urlFAQ}} />
      </View>
    );
  }
}

export default FAQScoreNilaiQ;
