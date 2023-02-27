import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './ClosingTnc.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {result} from 'lodash';
import WebView from 'react-native-webview';

class ClosingTnc extends React.Component {
  static propTypes = {
    goToNextPage: PropTypes.func,
    currentLanguage: PropTypes.string,
    nav: PropTypes.object,
    urlTNCID: PropTypes.string,
    urlTNCEN: PropTypes.string,
    sendClosing: PropTypes.func,
    endReached: PropTypes.func
  }

  state = {
    checked: false
  }

  scollingToEnd = () => {
    this.webscroll.scrollToEnd();
  }

  message = (data) => {
    const {endReached} = this.props;
    endReached();
    const checkBox = result(data, 'nativeEvent.data', false);
    if (checkBox) {
      this.setState({checked: !this.state.checked});
    }
  }

  render () {
    const {currentLanguage, sendClosing, urlTNCID, urlTNCEN} = this.props;
    const url = currentLanguage === 'en' ? urlTNCEN : urlTNCID;

    let GET_VALUE_CHECKBOX = `document.getElementById('checkbox').addEventListener('click', function(){
      window.ReactNativeWebView.postMessage("true")
    })
    true`;

   
    return (
      <View style={styles.container}>
        <View style={styles.whiteBgProductItems}>
          <WebView 
            source={{uri: url}}
            javaScriptEnabled={true}
            injectedJavaScript={GET_VALUE_CHECKBOX}
            onMessage={this.message}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.buttonContainer}>
            <SinarmasButton onPress={sendClosing} disabled={!this.state.checked}>
              <Text style={styles.nextButton}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default ClosingTnc;
