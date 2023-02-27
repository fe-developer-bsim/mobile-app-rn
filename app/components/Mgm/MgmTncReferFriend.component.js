import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './ShareReferralCodeMgm.styles';
import {language} from '../../config/language';
import {noop} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import WebView from 'react-native-webview';

class MgmTncReferFriend extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    onBackPage: PropTypes.func,
    urlTncMgm: PropTypes.string,
  };

  render () {
    const {onBackPage = noop, urlTncMgm} = this.props;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <WebView
            style={styles.containerTnc}
            source={{uri: urlTncMgm}}
            javaScriptEnabled={true}
            onMessage={this.message}
          />
          <View style={styles.buttonContainer}>
            <SinarmasButton onPress={onBackPage}>
              <Text style={styles.nextButton}>{language.GENERIC__CLOSE}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default MgmTncReferFriend;
