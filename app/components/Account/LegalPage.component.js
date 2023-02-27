import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './LegalPage.styles';
import WebView from 'react-native-webview';

class LegalWebComponent extends React.Component {
  static propTypes = {
    urlLegal: PropTypes.string
  };

  render () {
    const {urlLegal = ''} = this.props;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <WebView source={{uri: urlLegal}} />
        </View>
      </View>
    );
  }
}

export default LegalWebComponent;
