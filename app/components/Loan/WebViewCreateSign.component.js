import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './TnCLoan.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import WebView from 'react-native-webview';
import includes from 'lodash/includes';

class TermConditionEmoney extends React.Component {
  static propTypes = {
    onFinalizeForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    payBill: PropTypes.func,
    urlCreate: PropTypes.string,
    goCheckSign: PropTypes.func
  }

  state={
    hideWeb: '',
    buttonDisable: false
  }

  onMessage= (data) => {
    const dataFlag = includes(data.nativeEvent.data, '00');
    if (dataFlag) {
      this.setState({hideWeb: '1'});
    }
  }

  onSubmit = () => {
    const {goCheckSign} = this.props;
    this.setState({buttonDisable: true}, () => {
      goCheckSign();
      setTimeout(() => {
        this.setState({buttonDisable: false});
      }, 5000);
    });
  }
  render () {
    const {urlCreate} = this.props;
    let jsCode = `
        window.addEventListener("message", Return, false);
        function Return(name) {
            window.ReactNativeWebView.postMessage(name.data);
        }
        `;
    return (
      <View style={styles.container}>
        {this.state.hideWeb === '1' ? 
          <View style={styles.successTextWeb}><Text>{language.PGO__SUCCESS_MESSAGE_DIGISIGN_TITLE}</Text>
            <Text>
              {language.PGO__SUCCESS_MESSAGE_DIGISIGN_SUBTITLE}</Text>
          </View> :
          <WebView source={{html: urlCreate}}
            injectedJavaScript={jsCode}
            onMessage={this.onMessage}
            domStorageEnabled = {true}
            javaScriptEnabled={true}/>}
        <View style={styles.buttonContainer}>
          <View style={styles.anotherLink}>
            <Text>{language.PGO__NOTE_AFTER_REGISTER}</Text>
          </View>
          {this.state.hideWeb === '1' &&
          <SinarmasButton onPress={this.onSubmit} disabled={this.state.buttonDisable}>
            <Text style={styles.nextButton}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
          }
        </View>
      </View>
    );
  }
}

export default TermConditionEmoney;
