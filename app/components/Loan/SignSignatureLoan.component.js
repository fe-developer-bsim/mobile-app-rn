import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './TnCLoan.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {WebView} from 'react-native-webview';

class SignSignatureLoan extends React.Component {
  static propTypes = {
    onFinalizeForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    payBill: PropTypes.func,
    tncUrl: PropTypes.string,
    goToTNC: PropTypes.func,
    urlAndroid: PropTypes.string,
    urlIos: PropTypes.string,
    goBackHome: PropTypes.func
  }
  state ={
    buttonDisable: false,
    hideWeb: ''
  }

  onSubmit = () => {
    const {goBackHome} = this.props;
    this.setState({buttonDisable: true}, () => {
      goBackHome();
      setTimeout(() => {
        this.setState({buttonDisable: false});
      }, 5000);
    });
  }

  onMessage= (data) => {
    if (data.nativeEvent.data === '00') {
      this.setState({hideWeb: '1'});
    }
  }
  
  render () {
    const {urlAndroid} = this.props;
    let jsCode = `
        window.addEventListener("message", Return, false);
        function Return(name) {
            window.ReactNativeWebView.postMessage(name.data.result);
        }
        `;
    return (
      <View style={styles.container}>
        {this.state.hideWeb === '1' ? 
          <View style={styles.successTextWeb}>
            <Text>{language.PGO__SUCCESS_MESSAGE_SIGN_TITLE}</Text>
            <Text>
              {language.PGO__SUCCESS_MESSAGE_SIGN_SUBTITLE}</Text>
          </View> :
          <WebView
            source={{html: urlAndroid}}
            injectedJavaScript={jsCode}
            onMessage={this.onMessage}
            javaScriptEnabled={true}
            ignoreSslError={true}
            domStorageEnabled={true}
          />
        }
        <View style={styles.buttonContainer}>
          <View style={styles.anotherLink}>
            <Text>{language.PGO__NOTE_AFTER_SIGN}</Text>
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

export default SignSignatureLoan;
