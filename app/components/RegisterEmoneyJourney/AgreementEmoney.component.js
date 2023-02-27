import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './AgreementEmoney.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {noop, result} from 'lodash';
import WebView from 'react-native-webview';


class TermandConditionEMoney extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    onAgreeTnc: PropTypes.func,
    TncURL: PropTypes.string,
    login: PropTypes.func,
    tncLockdown: PropTypes.bool,
    isLockedDevice: PropTypes.bool,
    endReached: PropTypes.func,
    onAgreeTncLockdown: PropTypes.func,
  }

  constructor (props) {
    super(props);
  }
  state ={
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
    const {onAgreeTnc, TncURL, tncLockdown, isLockedDevice, onAgreeTncLockdown} = this.props;
    const uriTnc = TncURL === '' ? 'https://www.banksinarmas.com/PersonalBanking/externalContent/OnboardingTnC.html' : TncURL;
    let pressFunc = noop;
    if (tncLockdown) {
      if (isLockedDevice) {
        pressFunc = onAgreeTncLockdown;
      } else {
        pressFunc = onAgreeTnc;
      }
    }

    let GET_VALUE_CHECKBOX = `document.getElementById('checkbox').addEventListener('click', function(){
      window.ReactNativeWebView.postMessage("true")
    })
    true`;

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <WebView style={styles.containerTnc} source={{uri: uriTnc} }
            javaScriptEnabled={true}
            injectedJavaScript={GET_VALUE_CHECKBOX}
            onMessage={this.message}
          />
          <View style={styles.buttonContainer}>
            <SinarmasButton onPress={pressFunc} disabled={!this.state.checked}>
              <Text style={styles.nextButton}>{language.SMARTFREN__AGREE_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default TermandConditionEMoney;
